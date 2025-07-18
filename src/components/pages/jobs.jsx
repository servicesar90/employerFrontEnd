import React, { useEffect } from "react";
import { Button, Card, CardContent } from "@mui/material";
import { Plus, FileText } from "lucide-react";
import { useNavigate, useOutletContext } from "react-router-dom";
import JobCard from "../ui/cards/jobCards";
import { useDispatch, useSelector } from "react-redux";
import { fetchJobs } from "../../Redux/getData";

export default function Jobs() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { onIntroReady } = useOutletContext();

  useEffect(() => {
    onIntroReady?.();
  }, []);

  useEffect(() => {
    dispatch(fetchJobs());
  }, [dispatch]);

  const { jobs, loading } = useSelector((state) => state.getDataReducer);

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

  if (jobs?.length > 0) {
    return (
      <>
        <div className="min-h-[95vh] w-full bg-[#DFF3F9] px-6 pt-6 rounded-xl ">
          <div className="max-w-6xl mx-auto ">
            <div className="flex items-center justify-between py-1 ">
              <h1 className="text-lg md:text-xl font-semibold text-gray-800">
                All Jobs({jobs.length})
              </h1>
              <button
                id="PostJob"
                onClick={() => navigate(`/jobsModal/${null}/new`)}
                className="btn-slanted"
              >
                Post a New Job
              </button>
              {/* <Button
                 variant="contained"
                 onClick={() => navigate(`/jobsModal/${null}/new`)}
                 color="success"
                 sx={{
                   fontSize: { xs: "0.75rem", sm: "0.875rem", md: "0.9rem" },
                   padding: { xs: "4px 10px", sm: "6px 14px", md: "6px 15px" },
                   backgroundColor: "#0784C9",
                 }}
               >
                 Post a new job
               </Button> */}
            </div>

            <Card className="mt-5 ">
              <CardContent
                className="p-0 md:p-10 text-center max-h-[80vh] overflow-scroll flex flex-col gap-4 shadow-xl ]"
                style={{ scrollbarWidth: "none" }}
              >
                {jobs?.map((job, index) => (
                  <div key={index}>
                    <JobCard job={job} style={{ borderColor: "#0784C9" }} />
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </>
    );
  } else {
    return (
      <div className="min-h-screen w-full bg-gray-100 p-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between py-4">
            <h1 className="text-2xl font-semibold text-gray-800">Jobs</h1>
            <button
              onClick={() => navigate(`/jobsModal/${null}/new`)}
              className="btn-slanted"
            >
              Post a New Job
            </button>
          </div>

           <div
            style={{
              backgroundColor: "white",
              padding: "40px",
              borderRadius: "8px",
              boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
              textAlign: "center",
            }}
          >
            <h2
              style={{
                fontSize: "18px",
                fontWeight: "600",
                marginBottom: "32px",
                color: "#003B70",
              }}
            >
              Post your first job
            </h2>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                gap: "40px",
              }}
            >
              <div
                onClick={() => navigate(`/jobsModal/${null}/new`)}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  cursor: "pointer",
                }}
              >
                <div
                  style={{
                    backgroundColor: "#DEF3F9",
                    color: "#0784C9",
                    padding: "16px",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Plus size={28} />
                </div>
                <p
                  style={{
                    marginTop: "16px",
                    fontWeight: "600",
                    fontSize: "12px",
                    color: "#003B70",
                  }}
                >
                  Start with blank form
                </p>
                <p
                  style={{
                    fontSize: "12px",
                    color: "#0784C9",
                    marginTop: "4px",
                    marginBottom: "16px",
                  }}
                >
                  Use our blank form to create your job and fill manually
                </p>
                <button
                  onClick={() => navigate("/jobsModal")}
                  style={{
                    padding: "6px 16px",
                    fontSize: "12px",
                    border: "1px solid #0784C9",
                    borderRadius: "20px",
                    backgroundColor: "white",
                    color: "#0784C9",
                    cursor: "pointer",
                    fontWeight: "500",
                    transition: "all 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = "#DEF3F9";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = "white";
                  }}
                >
                  Start with blank form
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
