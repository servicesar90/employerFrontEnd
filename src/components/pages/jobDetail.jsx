import { useEffect, useState } from "react";
import { ChevronDown, ChevronLeft, ChevronUp, Filter, Users } from "lucide-react";

import { useNavigate, useParams } from "react-router-dom";
import SimplePaper from "../ui/cards/NewCard";
import { useDispatch, useSelector } from "react-redux";
import { fetchJobsById } from "../../Redux/getData";
import { set } from "react-hook-form";



const CandidateManagementPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [filterIndex, setFilterIndex] = useState(0);
  const [allCandidates, setAllCandidates] = useState({});
  const dispatch = useDispatch();
  const [showFilters, setShowFilters] = useState(false);
  const [showbutton, setShowButtons] = useState(false);
  const [originalCandidates, setOriginalCandidates] = useState(null);
  const [candidatess, setCandidate] = useState(null);
  const [activeFilters, setActiveFilters] = useState({ time: null, education: null, gender: null });


  const { jobsById, loading } = useSelector((state) => state.getDataReducer);

  useEffect(() => {
    dispatch(fetchJobsById(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (jobsById) {
      console.log(jobsById[0]);
      setData(jobsById[0]);
      const jobApps = jobsById[0]?.JobApplications || [];
      const pendingCandidate = jobApps.filter(
        (app) => app.status === "Applied"
      );
      const selectedCandidate = jobApps.filter(
        (app) => app.status === "Selected"
      );
      const rejectedCandidate = jobApps.filter(
        (app) => app.status === "Rejected"
      );

      setAllCandidates({
        0: jobApps,
        1: pendingCandidate,
        3: selectedCandidate,
        4: rejectedCandidate,
      });
    } else {
      console.log("Couldn't fetch the data");
    }
  }, [jobsById]);

  useEffect(() => {
    const currentCandidates = allCandidates?.[filterIndex];

    if (!currentCandidates || !jobsById) return;

    const newCandidate = currentCandidates.map((candidate) => {
      if (!candidate) return candidate;

      let matchedCount = 0;
      const newMatchedFields = [];

      // Gender match

      if (jobsById[0]?.gender) {
        if (jobsById[0]?.gender.toUpperCase() === candidate?.EmployeeProfile?.gender?.toUpperCase()) {
          matchedCount++;
          newMatchedFields.push("Gender");
        }
      } else {
        matchedCount++;
      }

      // Education match
      const educations = candidate?.EmployeeProfile?.EmployeeEducations;
      const highestEducation = Array.isArray(educations) && educations.length > 0
        ? educations.reduce((latest, current) => {
          const latestDate = new Date(latest.startDate);
          const currentDate = new Date(current.startDate);
          return currentDate > latestDate ? current : latest;
        })
        : null;

      if (jobsById[0]?.education === highestEducation?.qualification) {
        matchedCount++;
        newMatchedFields.push("Education");
      }

      // Language match (partial)
      if (jobsById[0]?.languages) {
        const totalLanguages = JSON.parse(jobsById[0]?.languages || "[]");
        const candidateLanguages = JSON.parse(candidate?.EmployeeProfile?.otherLanguages || "[]");

        const matchLanguageCount = totalLanguages.filter(item => candidateLanguages.includes(item)).length;
        const increaseCount = totalLanguages.length ? matchLanguageCount / totalLanguages.length : 0;

        matchedCount += increaseCount;
        newMatchedFields.push(`Languages(${matchLanguageCount})`);
      } else {
        matchedCount++;
      }

      // English level
      if (jobsById[0]?.english === candidate?.EmployeeProfile?.englishProficiency) {
        matchedCount++;
        newMatchedFields.push("English Level");
      }

      // Location
      const preferredCities = JSON.parse(candidate?.EmployeeProfile?.preferredJobCity || "[]");
      if (preferredCities.includes(jobsById[0]?.city)) {
        matchedCount++;
        newMatchedFields.push("Location");
      }

      // Experience match
      const minExperienceLevel = Number(jobsById[0]?.experienceLevel?.split("-")[0]) || 0;
      const candidateExpYears = candidate?.EmployeeProfile?.TotalExperience?.years || 0;

      if (minExperienceLevel === 0 || candidateExpYears >= minExperienceLevel) {
        matchedCount++;
        newMatchedFields.push("Experience");
      }

      // Job Role match
      let candidateJobRoles = [];
      candidate?.EmployeeProfile?.EmployeeExperiences?.forEach((exp) => {
        const roles = JSON.parse(exp?.jobRole || "[]");
        candidateJobRoles.push(...roles);
      });

      if (candidateJobRoles.includes(jobsById[0]?.jobRoles)) {
        matchedCount++;
        newMatchedFields.push("Job Role");
      }

      // Job Type
      const preferredTypes = JSON.parse(candidate?.EmployeeProfile?.prefferedEmploymentTypes || "[]");
      if (
        jobsById[0]?.jobType &&
        preferredTypes.includes(jobsById[0]?.jobType.replace(/-/g, " "))
      ) {
        matchedCount++;
        newMatchedFields.push("Job Type");
      }

      // Job Location Type
      const preferredLocationTypes = JSON.parse(candidate?.EmployeeProfile?.preferredLocationTypes || "[]");
      if (preferredLocationTypes.includes(jobsById[0]?.workLocationType)) {
        matchedCount++;
        newMatchedFields.push("Job Location Type");
      }

      // Skills (partial match)
      if (jobsById[0].skills) {
        const totalSkills = JSON.parse(jobsById[0]?.skills || "[]");
        const candidateSkills = JSON.parse(candidate?.EmployeeProfile?.skills || "[]");

        const matchSkillsCount = totalSkills.filter(skill => candidateSkills.includes(skill)).length;
        const increaseCount = totalSkills.length ? matchSkillsCount / totalSkills.length : 0;

        matchedCount += increaseCount;
        newMatchedFields.push(`Skills(${matchSkillsCount})`);
      } else {
        matchedCount++;
      }


      // Final matching percentage out of 10 total slots
      const matchPercentage = Math.round((matchedCount / 10) * 100);

      return {
        ...candidate,
        matchedField: newMatchedFields,
        matchingPrecent: matchPercentage,
      };
    });
    setOriginalCandidates(newCandidate)
    setCandidate(newCandidate);

  }, [allCandidates, filterIndex, jobsById]);

  const topMatchfilter = () => {
    const sortedCandidates = [...candidatess].sort((a, b) => b.matchingPrecent - a.matchingPrecent);
    console.log(sortedCandidates);
    setCandidate(sortedCandidates);
  };

  const resumeAttachedFilter = () => {
    const newcandidate = candidatess?.filter(item => item?.EmployeeProfile.resumeURL !== null);

    setCandidate(newcandidate)
  }


  const filters = [
    { label: "Matched to job requirements", clickFunc: topMatchfilter },
    { label: "Have Resume Attached", clickFunc: resumeAttachedFilter },
  ];

  console.log(jobsById)

  const handlefilter = (type, value) => {
  const updatedFilters = {
    ...activeFilters,
    [type]: value,
  };
  setActiveFilters(updatedFilters);

  let filtered = [...originalCandidates]; // Start from originalCandidates

  // Apply gender filter
  if (updatedFilters.gender) {
    filtered = filtered.filter((candidate) => {
      return candidate?.EmployeeProfile?.gender === updatedFilters.gender;
    });
  }

  // Apply education filter
  if (updatedFilters.education) {
    filtered = filtered.filter((candidate) => {
      const educations = candidate?.EmployeeProfile?.EmployeeEducations;

      const highestEducation = Array.isArray(educations) && educations.length > 0
        ? educations.reduce((latest, current) => {
          const latestDate = new Date(latest.startDate);
          const currentDate = new Date(current.startDate);
          return currentDate > latestDate ? current : latest;
        })
        : null;

      const qualification = highestEducation?.qualification;

      switch (updatedFilters.education) {
        case "10th pass":
          return true;
        case "12th pass":
          return qualification !== "10th_or_Below_10th";
        case "ITI":
          return qualification === "ITI";
        case "Graduate":
          return qualification === "Graduate" || qualification === "Postgraduate";
        case "Post Graduate":
          return qualification === "Postgraduate";
        default:
          return true;
      }
    });
  }

  // Apply time filter
  if (updatedFilters.time) {
    const now = new Date();
    let compareDate = null;

    if (updatedFilters.time === "24 hours") {
      compareDate = new Date(now.getTime() - 24 * 60 * 60 * 1000);
    } else if (updatedFilters.time === "10 days") {
      compareDate = new Date(now.getTime() - 10 * 24 * 60 * 60 * 1000);
    } else if (updatedFilters.time === "30 days") {
      compareDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    }

    filtered = filtered.filter((item) => {
      const appliedAt = item?.appliedAt ? new Date(item.appliedAt) : null;
      return appliedAt && appliedAt >= compareDate;
    });
  }

  setCandidate(filtered);
};






  if (loading)
    return (
      <div className="flex justify-center items-center w-full min-h-[100vh] bg-black/20">
        <img
          src="/unigrowLogo.png"
          alt="logo"
          className="w-40 h-16 animate-heartbeat"
        />
      </div>
    );

  return (
    <div className="bg-gray-100 min-h-[80vh] w-full  ">
      <div className="flex items-center justify-between pl-2 pr-6 py-3 bg-white border-b border-t   ">
        {/* Left Side */}
        <div className="flex items-center space-x-1">
          <ChevronLeft
            className="cursor-pointer text-gray-600"
            onClick={() => navigate("/employerHome/jobs")}
          />
          <div className="flex flex-row gap-2 items-center justify-center">
            <div className="flex  md:flex-row flex-col ">
              <h2 className="text-16 font-semibold text-gray-800  ">
                {data?.jobTitle}
              </h2>
              <div className="ml-2 px-2 py-0.5 text-12 bg-secondary text-white  rounded ">
                {data?.status === "P"
                  ? "Pending"
                  : data?.status === "A"
                    ? "Active"
                    : "Expired"}
              </div>
            </div>

            <p className="text-16 font-semibold text-gray-800 px-3 border-l border-r">
              {data?.location}
            </p>
          </div>

          <div className="  flex items-center ">
            <div className="ml-2 text-16  font-semibold text-gray-800 ">
              Current: {data?.JobApplications?.length}
            </div>
            {/* <span className="text-sm text-blue-500 cursor-pointer hover:underline ml-2">
            more details
          </span> */}

            <span
              className="ml-2 text-14 text-white bg-secondary font-medium border border-gray-300 rounded px-2 py-1 cursor-pointer"
              onClick={() => navigate(`/jobsModal/${id}`)}
            >
              Edit Job
            </span>
          </div>
        </div>

        {/* Right Side */}
        {/* <div className="flex items-center space-x-4">
          <Info className="text-gray-600 cursor-pointer" />
          <MoreVertical className="text-gray-600 cursor-pointer" />
        </div> */}
      </div>

      {/* Top Summary Box */}
      <div className="bg-white shadow-xs rounded-lg p-4 mx-4 mt-4 border ">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Users className="text-gray-600 text-secondary" />
            <h2 className="text-16 font-semibold text-gray-800">
              Applied to job ({data?.JobApplications?.length})
            </h2>
            {showbutton ? <ChevronUp onClick={() => setShowButtons(!showbutton)} /> : <ChevronDown onClick={() => setShowButtons(!showbutton)} />}
          </div>
          {/* <div className="flex gap-2 items-center">
            <Button variant="outlined" size="small" startIcon={<Download size={16} />}>
              Download excel
            </Button>
            <Button variant="outlined" size="small" endIcon={<ChevronDown size={16} />}>
              Relevance
            </Button>
          </div> */}
        </div>

        {/* Tabs */}
        {showbutton && <div className="flex flex-wrap gap-3 transition-all duration-300 ease-in-out transform ">
          {[
            `All candidates (${allCandidates[0]?.length})`,
            `Action Pending (${allCandidates[1]?.length})`,
            `Downloaded/Viewed Number`,
            `Shortlisted (${allCandidates[3]?.length})`,
            `Rejected (${allCandidates[4]?.length})`,
          ].map((tab, idx) => (
            <button
              key={idx}
              className={`  ${idx === filterIndex
                ? "text-14 text-white bg-secondary font-medium border border-gray-300 rounded px-2 py-1"
                : "bg-white  text-14 text-gray-650 text-gray-600 border-[2px] rounded px-2 py-1"
                }`}
              onClick={() => setFilterIndex(idx)}
            >
              {tab}
            </button>
          ))}
        </div>}
      </div>

      {/* bottom section */}

      <div className="flex gap-2 p-4 flex-col md:flex-row relative">
        {/* Mobile Filter Button */}
        <div className="md:hidden flex justify-center mb-2">
          <button
            className="text-14 font-medium text-white border bg-secondary px-4 py-1 rounded"
            onClick={() => setShowFilters(true)}
          >
            Show Filters
          </button>
        </div>

        {/* Left Filters - Drawer on mobile, visible on md+ */}
        <div
          className={`
    ${showFilters
              ? "fixed bottom-0 left-0 w-full max-w-full h-[80vh] z-50 bg-white shadow-xl p-4 rounded-t-2xl animate-slideUp overflow-y-auto"
              : "hidden"
            }
    md:static md:block md:w-1/4 md:space-y-4 md:bg-transparent md:shadow-none md:p-0
  `}
        >
          {/* Close Button for mobile drawer */}
          <div className="flex justify-between items-center mb-4 md:hidden">
            <h3 className="text-base font-semibold text-gray-700">Filters</h3>
            <button
              onClick={() => setShowFilters(false)}
              className="text-gray-500 text-lg font-bold"
            >
              ×
            </button>
          </div>

          <div className="flex items-center gap-2 text-gray-700 font-semibold text-sm mb-2">
            <Filter className="text-secondary" size={18} /> Filters (0)
          </div>

          <div className="bg-white rounded-lg border shadow-sm mb-5 p-4 space-y-3">
            {filters.map((item, idx) => (
              <label
                key={idx}
                className="flex items-center gap-2 text-14 text-gray-650 text-left "
              >
                <input
                  type="checkbox"
                  className="form-checkbox h-4 w-4 text-blue-600"
                  onClick={item.clickFunc}
                />
                <span>
                  {item.label}
                  {item.badge && (
                    <span className="ml-2 text-xs bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full">
                      {item.badge}
                    </span>
                  )}
                </span>
              </label>
            ))}
          </div>

          <div className="bg-white rounded-lg max-h-[30vh] overflow-scroll border shadow-sm p-4 space-y-2 text-14 text-gray-650 text-left" style={{ scrollbarWidth: "none" }}>
            <details open>
              <summary className="cursor-pointer font-medium">
                Applied in
              </summary>
              <div className="ml-4 mt-2 space-y-1 ">
                <div className="flex flex-row items-center gap-3"><input type="radio" checked={activeFilters.time === "24 hours"} onChange={() => handlefilter("time", "24 hours")} /> <span>Last 24 Hours</span></div>
                <div className="flex flex-row items-center gap-3"><input type="radio" checked={activeFilters.time === "10 days"} onChange={() => handlefilter("time", "10 days")} /><span>Last 10 days</span></div>
                <div className="flex flex-row items-center gap-3"><input type="radio" checked={activeFilters.time === "30 days"} onChange={() => handlefilter("time", "30 days")} /><span>Last 30 days</span></div>
              </div>
            </details>
            <details>
              <summary className="cursor-pointer font-medium">Education</summary>
              <div className="ml-4 mt-2 space-y-1">
                <div className="flex flex-row items-center gap-3"><input type="radio" checked={activeFilters.education === "10th pass"} onChange={() => handlefilter("education", "10th pass")} /><span>10th pass</span></div>
                <div className="flex flex-row items-center gap-3"><input type="radio" checked={activeFilters.education === "12th pass"} onChange={() => handlefilter("education", "12th pass")} /><span>12th Pass</span></div>
                <div className="flex flex-row items-center gap-3"><input type="radio" checked={activeFilters.education === "ITI"} onChange={() => handlefilter("education", "ITI")} /><span>ITI</span></div>
                <div className="flex flex-row items-center gap-3"><input type="radio" checked={activeFilters.education === "Graduate"} onChange={() => handlefilter("education", "Graduate")} /><span>Graduation</span></div>
                <div className="flex flex-row items-center gap-3"><input type="radio" checked={activeFilters.education === "post Graduate"} onChange={() => handlefilter("education", "post Graduate")} /><span>Post Graduation</span></div>
              </div>
            </details>
            <details>
              <summary className="cursor-pointer font-medium">Gender</summary>
              <div className="ml-4 mt-2 space-y-1">
                <div className="flex flex-row items-center gap-3"><input type="radio" checked={activeFilters.gender === "Male"} onChange={() => handlefilter("gender", "Male")} /><span>Male</span></div>
                <div className="flex flex-row items-center gap-3"><input type="radio" checked={activeFilters.gender === "female"} onChange={() => handlefilter("gender", "female")} /><span>Female</span></div>
                <div className="flex flex-row items-center gap-3"><input type="radio" checked={activeFilters.gender === "Other"} onChange={() => handlefilter("gender", "Other")} /><span>Other</span></div>
              </div>
            </details>
          </div>
        </div>

        {/* Overlay for mobile filter drawer */}
        {showFilters && (
          <div
            onClick={() => setShowFilters(false)}
            className="fixed inset-0 bg-black/40 z-40 md:hidden"
          />
        )}

        {/* Right: Candidate List */}
        <div className="w-full md:w-3/4 max-h-[60vh] overflow-scroll">
          <div className="text-16 font-semibold text-gray-800 mb-7">
            Showing {candidatess?.length} candidates
          </div>
          {candidatess?.map((candidate, index) => (
            <div key={index} className="mb-10 shadow-xl rounded-lg">
              <SimplePaper job={data} jobId={id} candidate={candidate} />
            </div>
          ))}

          {/* Pagination */}
          <div className="flex justify-end mt-4">
            <div className="border border-gray-300 rounded-md px-3 py-1 text-sm text-gray-700">
              1
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CandidateManagementPage;
