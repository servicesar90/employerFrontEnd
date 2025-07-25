import { useEffect, useState } from "react";
import { Filter } from "lucide-react";
import FilterListOffIcon from "@mui/icons-material/FilterListOff";

import { useDispatch, useSelector } from "react-redux";
import { fetchUnlockedCandidate } from "../../Redux/getData";
import SimpleNewPaper from "../ui/cards/candidateCard";

const CandidateManagementPage = () => {
  const dispatch = useDispatch();
  const [showFilters, setShowFilters] = useState(false);
  const [candidatess, setCandidate] = useState(null);
  const [isFilter, setIsFilter] = useState(false);
  const [allCandidates, setAllCandidates] = useState(null);
  const [activeFilters, setActiveFilters] = useState({
    time: null,
    education: null,
    gender: null,
  });

  useEffect(() => {
    dispatch(fetchUnlockedCandidate());
  }, [dispatch]);

  const { unlockedData, loading } = useSelector(
    (state) => state.getDataReducer,
  );

  useEffect(() => {
    if (unlockedData) {
      setCandidate(unlockedData);
      setAllCandidates(unlockedData);
    }
  }, [unlockedData]);

  const handlefilter = (type, value) => {
    const updatedFilters = {
      ...activeFilters,
      [type]: value,
    };
    setActiveFilters(updatedFilters);
    setIsFilter(true);

    let filtered = [...candidatess];

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
    <div className="min-h-[95vh] w-full" style={{ backgroundColor: "#DFF3F9" }}>
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
          className={`    ${
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
                  setCandidate(allCandidates);
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
            className="rounded-lg max-h-[40vh] overflow-scroll border shadow-sm p-4 space-y-2 text-14 text-left"
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
        <div className="w-full md:w-3/4 max-h-[85vh] overflow-y-scroll">
          <div
            className="text-16 font-semibold mb-7"
            style={{ color: "#003B70" }}
          >
            Showing {candidatess?.length || 0} candidates
          </div>

          {candidatess && candidatess.length > 0 ? (
            candidatess.map((candidate, index) => (
              <div
                key={index}
                className="mb-10 shadow-lg rounded-lg border hover:shadow-xl transition-shadow duration-200"
                style={{
                  backgroundColor: "white",
                  borderColor: "#0784C9",
                }}
              >
                <SimpleNewPaper candidate={candidate} />
              </div>
            ))
          ) : (
            <div
              className="p-20 text-center rounded-lg shadow-lg border"
              style={{
                backgroundColor: "white",
                borderColor: "#0784C9",
              }}
            >
              <div
                className="mx-auto mb-6 rounded-full flex items-center justify-center"
                style={{
                  backgroundColor: "#DEF3F9",
                  width: "80px",
                  height: "80px",
                }}
              >
                <svg
                  width="40"
                  height="40"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#0784C9"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
              </div>
              <h2
                className="text-18 font-semibold mb-4"
                style={{ color: "#003B70" }}
              >
                No Candidates Found
              </h2>
              <p className="text-12 mb-6" style={{ color: "#0784C9" }}>
                No candidates match your current filter criteria. Try adjusting
                your filters or check back later for new applications.
              </p>
              <button
                onClick={() => {
                  setCandidate(allCandidates);
                  setIsFilter(false);
                  setActiveFilters({
                    time: null,
                    education: null,
                    gender: null,
                  });
                }}
                className="px-6 py-2 rounded-full text-12 font-medium transition-all"
                style={{
                  backgroundColor: "#0784C9",
                  color: "white",
                  border: "none",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = "#0066A3";
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = "#0784C9";
                }}
              >
                Clear All Filters
              </button>
            </div>
          )}

          
        </div>
      </div>
    </div>
  );
};

export default CandidateManagementPage;
