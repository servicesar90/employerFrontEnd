import { useEffect, useState } from "react";
import {
  ChevronDown,
  ChevronLeft,
  ChevronUp,
  Filter,
  Users,
} from "lucide-react";
import FilterListOffIcon from "@mui/icons-material/FilterListOff";

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
  const [isFilter, setIsFilter] = useState(false);
  const [activeFilters, setActiveFilters] = useState({
    time: null,
    education: null,
    gender: null,
  });

  const [filterSet, setFilterSet] = useState(new Set());

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
        if (
          jobsById[0]?.gender.toUpperCase() ===
          candidate?.EmployeeProfile?.gender?.toUpperCase()
        ) {
          matchedCount++;
          newMatchedFields.push("Gender");
        }
      } else {
        matchedCount++;
      }

      // Education match
      const educations = candidate?.EmployeeProfile?.EmployeeEducations;
      const highestEducation =
        Array.isArray(educations) && educations.length > 0
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
        const candidateLanguages = JSON.parse(
          candidate?.EmployeeProfile?.otherLanguages || "[]"
        );

        const matchLanguageCount = totalLanguages.filter((item) =>
          candidateLanguages.includes(item)
        ).length;
        const increaseCount = totalLanguages.length
          ? matchLanguageCount / totalLanguages.length
          : 0;

        matchedCount += increaseCount;
        newMatchedFields.push(`Languages(${matchLanguageCount})`);
      } else {
        matchedCount++;
      }

      // English level
      if (
        jobsById[0]?.english === candidate?.EmployeeProfile?.englishProficiency
      ) {
        matchedCount++;
        newMatchedFields.push("English Level");
      }

      // Location
      const preferredCities = JSON.parse(
        candidate?.EmployeeProfile?.preferredJobCity || "[]"
      );
      if (preferredCities.includes(jobsById[0]?.city)) {
        matchedCount++;
        newMatchedFields.push("Location");
      }

      // Experience match
      const minExperienceLevel =
        Number(jobsById[0]?.experienceLevel?.split("-")[0]) || 0;
      const candidateExpYears =
        candidate?.EmployeeProfile?.TotalExperience?.years || 0;

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
      const preferredTypes = JSON.parse(
        candidate?.EmployeeProfile?.prefferedEmploymentTypes || "[]"
      );
      if (
        jobsById[0]?.jobType &&
        preferredTypes.includes(jobsById[0]?.jobType.replace(/-/g, " "))
      ) {
        matchedCount++;
        newMatchedFields.push("Job Type");
      }

      // Job Location Type
      const preferredLocationTypes = JSON.parse(
        candidate?.EmployeeProfile?.preferredLocationTypes || "[]"
      );
      if (preferredLocationTypes.includes(jobsById[0]?.workLocationType)) {
        matchedCount++;
        newMatchedFields.push("Job Location Type");
      }

      // Skills (partial match)
      if (jobsById[0].skills) {
        const totalSkills = JSON.parse(jobsById[0]?.skills || "[]");
        const candidateSkills = JSON.parse(
          candidate?.EmployeeProfile?.skills || "[]"
        );

        const matchSkillsCount = totalSkills.filter((skill) =>
          candidateSkills.includes(skill)
        ).length;
        const increaseCount = totalSkills.length
          ? matchSkillsCount / totalSkills.length
          : 0;

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
    setOriginalCandidates(newCandidate);
    setCandidate(newCandidate);
  }, [allCandidates, filterIndex, jobsById]);

  const filters = [
    { label: "Matched to job requirements" },
    { label: "Have Resume Attached" },
  ];

  const filterFunctions = {
    "Matched to job requirements": (list) =>
      [...list].sort((a, b) => b.matchingPrecent - a.matchingPrecent),
    "Have Resume Attached": (list) =>
      list.filter((item) => item.EmployeeProfile.resumeURL !== null),
  };

  const applyFilters = (filtersSet) => {
    let updatedList = [...originalCandidates];


    filtersSet.forEach((label) => {
      const filterFunc = filterFunctions[label];
      if (filterFunc) {
        updatedList = filterFunc(updatedList);
       
      }
    });

    setCandidate(updatedList);
  };

  const handlefilter = (type, value) => {
    const updatedFilters = {
      ...activeFilters,
      [type]: value,
    };
    setActiveFilters(updatedFilters);
    setIsFilter(true);

    let filtered = [...originalCandidates];

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

        const highestEducation =
          Array.isArray(educations) && educations.length > 0
            ? educations.reduce((latest, current) => {
                const latestDate = new Date(latest.startDate);
                const currentDate = new Date(current.startDate);
                return currentDate > latestDate ? current : latest;
              })
            : null;

        const qualification = highestEducation?.qualification;

        console.log(qualification);

        switch (updatedFilters.education) {
          case "10th pass":
            return true;
          case "12th pass":
            return qualification !== "10th_or_Below_10th";
          case "ITI":
            return qualification === "ITI";
          case "Graduate":
            return (
              qualification === "Graduate" || qualification === "Postgraduate"
            );
          case "post Graduate":
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
      <div
        className="flex justify-center items-center w-full min-h-[100vh]"
        style={{ backgroundColor: "#DFF3F9" }}
      >
        <img
          src="/unigrowLogo.png"
          alt="logo"
          className="w-40 h-16 animate-heartbeat"
        />
      </div>
    );

  return (
    <div className="min-h-[80vh] w-full" style={{ backgroundColor: "#DFF3F9" }}>
      <div
        className="flex items-center justify-between pl-2 pr-6 py-3 border-b border-t"
        style={{
          backgroundColor: "#003B70",
          borderColor: "#0784C9",
        }}
      >
        {/* Left Side */}
        <div className="flex items-center space-x-1">
          <ChevronLeft
            className="cursor-pointer hover:opacity-80 transition-opacity w-5 h-5"
            style={{ color: "#DFF3F9" }}
            onClick={() => navigate("/employerHome/jobs")}
          />
          <div className="flex flex-row gap-2 items-center justify-center">
            <div className="flex md:flex-row flex-col">
              <h2
                className="text-16 font-semibold"
                style={{ color: "#DFF3F9" }}
              >
                {data?.jobTitle}
              </h2>
              <div
                className="ml-2 px-2 py-0.5 text-12 rounded font-medium"
                style={{
                  backgroundColor: "#0784C9",
                  color: "#DFF3F9",
                }}
              >
                {data?.status === "P"
                  ? "Pending"
                  : data?.status === "A"
                  ? "Active"
                  : "Expired"}
              </div>
            </div>

            <p
              className="text-16 font-semibold px-3 border-l border-r"
              style={{
                color: "#DFF3F9",
                borderColor: "#0784C9",
              }}
            >
              {data?.location}
            </p>
          </div>

          <div className="flex items-center">
            <div
              className="ml-2 text-16 font-semibold"
              style={{ color: "#DFF3F9" }}
            >
              Current: {data?.JobApplications?.length}
            </div>

            <span
              className="ml-2 text-14 font-medium border rounded px-2 py-1 cursor-pointer hover:opacity-90 transition-opacity"
              style={{
                color: "#DFF3F9",
                backgroundColor: "#0784C9",
                borderColor: "#DFF3F9",
              }}
              onClick={() => navigate(`/jobsModal/${id}`)}
            >
              Edit Job
            </span>
          </div>
        </div>
      </div>

      {/* Top Summary Box */}
      <div
        className="shadow-sm rounded-lg p-4 mx-4 mt-4 border"
        style={{
          backgroundColor: "white",
          borderColor: "#0784C9",
        }}
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5" style={{ color: "#0784C9" }} />
            <h2 className="text-16 font-semibold" style={{ color: "#003B70" }}>
              Applied to job ({data?.JobApplications?.length})
            </h2>
            {showbutton ? (
              <ChevronUp
                className="cursor-pointer hover:opacity-70 transition-opacity w-5 h-5"
                style={{ color: "#0784C9" }}
                onClick={() => setShowButtons(!showbutton)}
              />
            ) : (
              <ChevronDown
                className="cursor-pointer hover:opacity-70 transition-opacity w-5 h-5"
                style={{ color: "#0784C9" }}
                onClick={() => setShowButtons(!showbutton)}
              />
            )}
          </div>
        </div>

        {/* Tabs */}
        {showbutton && (
          <div className="flex flex-wrap gap-3 transition-all duration-300 ease-in-out transform">
            {[
              `All candidates (${allCandidates[0]?.length})`,
              `Action Pending (${allCandidates[1]?.length})`,
              `Downloaded/Viewed Number`,
              `Shortlisted (${allCandidates[3]?.length})`,
              `Rejected (${allCandidates[4]?.length})`,
            ].map((tab, idx) => (
              <button
                key={idx}
                className={`text-14 font-medium border rounded px-2 py-1 transition-all hover:opacity-90 ${
                  idx === filterIndex ? "" : ""
                }`}
                style={{
                  color: idx === filterIndex ? "#DFF3F9" : "#003B70",
                  backgroundColor: idx === filterIndex ? "#0784C9" : "white",
                  borderColor: "#0784C9",
                }}
                onClick={() => setFilterIndex(idx)}
              >
                {tab}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* bottom section */}

      <div className="flex gap-2 p-4 flex-col md:flex-row relative">
        {/* Mobile Filter Button */}
        <div className="md:hidden flex justify-center mb-2">
          <button
            className="text-14 font-medium border px-4 py-1 rounded hover:opacity-90 transition-opacity"
            style={{
              color: "#DFF3F9",
              backgroundColor: "#0784C9",
              borderColor: "#003B70",
            }}
            onClick={() => setShowFilters(true)}
          >
            Show Filters
          </button>
        </div>

        {/* Left Filters - Drawer on mobile, visible on md+ */}
        <div
          className={`
    ${
      showFilters
        ? "fixed bottom-0 left-0 w-full max-w-full h-[80vh] z-50 shadow-xl p-4 rounded-t-2xl animate-slideUp overflow-y-auto"
        : "hidden"
    }
    md:static md:block md:w-1/4 md:space-y-4 md:bg-transparent md:shadow-none md:p-0
  `}
          style={{
            backgroundColor: showFilters ? "white" : "transparent",
          }}
        >
          {/* Close Button for mobile drawer */}
          <div className="flex justify-between items-center mb-4 md:hidden">
            <h3
              className="text-base font-semibold"
              style={{ color: "#003B70" }}
            >
              Filters
            </h3>
            <button
              onClick={() => setShowFilters(false)}
              className="text-lg font-bold hover:opacity-70 transition-opacity"
              style={{ color: "#003B70" }}
            >
              ×
            </button>
          </div>

          <div
            className="flex items-center gap-2 font-semibold text-sm mb-2"
            style={{ color: "#003B70" }}
          >
            {isFilter ? (
              <FilterListOffIcon
                onClick={() => {
                  setCandidate(originalCandidates);
                  setIsFilter(false);
                  setActiveFilters({
                    time: null,
                    education: null,
                    gender: null,
                  });
                }}
                
                style={{ color: "#0784C9", width: "20px", height: "20px" }}
              />
            ) : (
              <Filter className="w-4 h-4" style={{ color: "#0784C9" }} />
            )}
            Filters
          </div>

          <div
            className="rounded-lg border shadow-sm mb-5 p-4 space-y-3"
            style={{
              backgroundColor: "white",
              borderColor: "#0784C9",
            }}
          >
            {filters.map((item, idx) => (
              <label
                key={idx}
                className="flex items-center gap-2 text-14 text-left cursor-pointer hover:opacity-80 transition-opacity p-1 rounded"
                style={{ color: "#003B70" }}
              >
                <input
                  type="checkbox"
                  className="form-checkbox h-4 w-4 rounded focus:ring-2"
                  style={{
                    accentColor: "#0784C9",
                  }}
                  onChange={(e) => {
                    const newFilters = new Set(filterSet);

                    if (e.target.checked) {
                      newFilters.add(item.label);
                    } else {
                      newFilters.delete(item.label);
                    }

                    setFilterSet(newFilters);
                    applyFilters(newFilters);
                  }}
                />
                <span>
                  {item.label}
                  {item.badge && (
                    <span
                      className="ml-2 text-xs px-2 py-0.5 rounded-full font-medium"
                      style={{
                        backgroundColor: "#DFF3F9",
                        color: "#0784C9",
                      }}
                    >
                      {item.badge}
                    </span>
                  )}
                </span>
              </label>
            ))}
          </div>

          <div
            className="rounded-lg max-h-[30vh] overflow-scroll border shadow-sm p-4 space-y-2 text-14 text-left"
            style={{
              scrollbarWidth: "none",
              backgroundColor: "white",
              borderColor: "#0784C9",
              color: "#003B70",
            }}
          >
            <details open>
              <summary
                className="cursor-pointer font-medium hover:opacity-80 transition-opacity"
                style={{ color: "#003B70" }}
              >
                Applied in
              </summary>
              <div className="ml-4 mt-2 space-y-1">
                <div
                  className="flex flex-row items-center gap-3 hover:opacity-80 p-1 rounded transition-opacity"
                  style={{
                    backgroundColor: "#DFF3F9",
                  }}
                >
                  <input
                    type="radio"
                    checked={activeFilters.time === "24 hours"}
                    onChange={() => handlefilter("time", "24 hours")}
                    style={{ accentColor: "#0784C9" }}
                  />{" "}
                  <span style={{ color: "#003B70" }}>Last 24 Hours</span>
                </div>
                <div
                  className="flex flex-row items-center gap-3 hover:opacity-80 p-1 rounded transition-opacity"
                  style={{
                    backgroundColor: "#DFF3F9",
                  }}
                >
                  <input
                    type="radio"
                    checked={activeFilters.time === "10 days"}
                    onChange={() => handlefilter("time", "10 days")}
                    style={{ accentColor: "#0784C9" }}
                  />
                  <span style={{ color: "#003B70" }}>Last 10 days</span>
                </div>
                <div
                  className="flex flex-row items-center gap-3 hover:opacity-80 p-1 rounded transition-opacity"
                  style={{
                    backgroundColor: "#DFF3F9",
                  }}
                >
                  <input
                    type="radio"
                    checked={activeFilters.time === "30 days"}
                    onChange={() => handlefilter("time", "30 days")}
                    style={{ accentColor: "#0784C9" }}
                  />
                  <span style={{ color: "#003B70" }}>Last 30 days</span>
                </div>
              </div>
            </details>
            <details>
              <summary
                className="cursor-pointer font-medium hover:opacity-80 transition-opacity"
                style={{ color: "#003B70" }}
              >
                Education
              </summary>
              <div className="ml-4 mt-2 space-y-1">
                <div
                  className="flex flex-row items-center gap-3 hover:opacity-80 p-1 rounded transition-opacity"
                  style={{
                    backgroundColor: "#DFF3F9",
                  }}
                >
                  <input
                    type="radio"
                    checked={activeFilters.education === "10th pass"}
                    onChange={() => handlefilter("education", "10th pass")}
                    style={{ accentColor: "#0784C9" }}
                  />
                  <span style={{ color: "#003B70" }}>10th pass</span>
                </div>
                <div
                  className="flex flex-row items-center gap-3 hover:opacity-80 p-1 rounded transition-opacity"
                  style={{
                    backgroundColor: "#DFF3F9",
                  }}
                >
                  <input
                    type="radio"
                    checked={activeFilters.education === "12th pass"}
                    onChange={() => handlefilter("education", "12th pass")}
                    style={{ accentColor: "#0784C9" }}
                  />
                  <span style={{ color: "#003B70" }}>12th Pass</span>
                </div>
                <div
                  className="flex flex-row items-center gap-3 hover:opacity-80 p-1 rounded transition-opacity"
                  style={{
                    backgroundColor: "#DFF3F9",
                  }}
                >
                  <input
                    type="radio"
                    checked={activeFilters.education === "ITI"}
                    onChange={() => handlefilter("education", "ITI")}
                    style={{ accentColor: "#0784C9" }}
                  />
                  <span style={{ color: "#003B70" }}>ITI</span>
                </div>
                <div
                  className="flex flex-row items-center gap-3 hover:opacity-80 p-1 rounded transition-opacity"
                  style={{
                    backgroundColor: "#DFF3F9",
                  }}
                >
                  <input
                    type="radio"
                    checked={activeFilters.education === "Graduate"}
                    onChange={() => handlefilter("education", "Graduate")}
                    style={{ accentColor: "#0784C9" }}
                  />
                  <span style={{ color: "#003B70" }}>Graduation</span>
                </div>
                <div
                  className="flex flex-row items-center gap-3 hover:opacity-80 p-1 rounded transition-opacity"
                  style={{
                    backgroundColor: "#DFF3F9",
                  }}
                >
                  <input
                    type="radio"
                    checked={activeFilters.education === "post Graduate"}
                    onChange={() => handlefilter("education", "post Graduate")}
                    style={{ accentColor: "#0784C9" }}
                  />
                  <span style={{ color: "#003B70" }}>Post Graduation</span>
                </div>
              </div>
            </details>
            <details>
              <summary
                className="cursor-pointer font-medium hover:opacity-80 transition-opacity"
                style={{ color: "#003B70" }}
              >
                Gender
              </summary>
              <div className="ml-4 mt-2 space-y-1">
                <div
                  className="flex flex-row items-center gap-3 hover:opacity-80 p-1 rounded transition-opacity"
                  style={{
                    backgroundColor: "#DFF3F9",
                  }}
                >
                  <input
                    type="radio"
                    checked={activeFilters.gender === "Male"}
                    onChange={() => handlefilter("gender", "Male")}
                    style={{ accentColor: "#0784C9" }}
                  />
                  <span style={{ color: "#003B70" }}>Male</span>
                </div>
                <div
                  className="flex flex-row items-center gap-3 hover:opacity-80 p-1 rounded transition-opacity"
                  style={{
                    backgroundColor: "#DFF3F9",
                  }}
                >
                  <input
                    type="radio"
                    checked={activeFilters.gender === "female"}
                    onChange={() => handlefilter("gender", "female")}
                    style={{ accentColor: "#0784C9" }}
                  />
                  <span style={{ color: "#003B70" }}>Female</span>
                </div>
                <div
                  className="flex flex-row items-center gap-3 hover:opacity-80 p-1 rounded transition-opacity"
                  style={{
                    backgroundColor: "#DFF3F9",
                  }}
                >
                  <input
                    type="radio"
                    checked={activeFilters.gender === "Other"}
                    onChange={() => handlefilter("gender", "Other")}
                    style={{ accentColor: "#0784C9" }}
                  />
                  <span style={{ color: "#003B70" }}>Other</span>
                </div>
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
          <div
            className="text-16 font-semibold mb-7"
            style={{ color: "#003B70" }}
          >
            Showing {candidatess?.length} candidates
          </div>
          {candidatess?.map((candidate, index) => (
            <div
              key={index}
              className="mb-10 shadow-lg rounded-lg border hover:shadow-xl transition-shadow duration-200"
              style={{
                backgroundColor: "white",
                borderColor: "#0784C9",
              }}
            >
              <SimplePaper job={data} jobId={id} candidate={candidate} />
            </div>
          ))}

          {/* Pagination */}
          <div className="flex justify-end mt-4">
            <div
              className="border rounded-md px-3 py-1 text-sm hover:opacity-80 transition-opacity cursor-pointer"
              style={{
                borderColor: "#0784C9",
                color: "#003B70",
                backgroundColor: "white",
              }}
            >
              1
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CandidateManagementPage;
