import { useEffect, useState } from "react";
import { ChevronLeft, Filter, Users } from "lucide-react";

import { useNavigate, useParams } from "react-router-dom";
import SimplePaper from "../ui/cards/NewCard";
import { useDispatch, useSelector } from "react-redux";
import { fetchJobsById } from "../../Redux/getData";

const filters = [
  { label: "Matched to job requirements (10)" },
  { label: "Have Resume Attached (12)" },
  { label: "Tried contacting you (5)", badge: "New" },
];

const CandidateManagementPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [filterIndex, setFilterIndex] = useState(0);
  const [allCandidates, setAllCandidates] = useState({});
  const dispatch = useDispatch();
  const [showFilters, setShowFilters] = useState(false);

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
      <div className="flex items-center justify-between pl-2 pr-6 pt-3 bg-white border-b border-t   ">
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
        <div className="flex flex-wrap gap-3">
          {[
            `All candidates (${allCandidates[0]?.length})`,
            `Action Pending (${allCandidates[1]?.length})`,
            `Downloaded/Viewed Number`,
            `Shortlisted (${allCandidates[3]?.length})`,
            `Rejected (${allCandidates[4]?.length})`,
          ].map((tab, idx) => (
            <button
              key={idx}
              className={`  ${
                idx === filterIndex
                  ? "text-14 text-white bg-secondary font-medium border border-gray-300 rounded px-2 py-1"
                  : "bg-white  text-14 text-gray-650 text-gray-600 border-[2px] rounded px-2 py-1"
              }`}
              onClick={() => setFilterIndex(idx)}
            >
              {tab}
            </button>
          ))}
        </div>
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
    ${
      showFilters
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

          <div className="bg-white rounded-lg border shadow-sm p-4 space-y-2 text-14 text-gray-650 text-left">
            <details open>
              <summary className="cursor-pointer font-medium">
                Applied in
              </summary>
            </details>
            <details>
              <summary className="cursor-pointer font-medium">Location</summary>
            </details>
            <details>
              <summary className="cursor-pointer font-medium">Gender</summary>
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
            Showing {allCandidates[filterIndex]?.length} candidates
          </div>
          {allCandidates[filterIndex]?.map((candidate, index) => (
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
