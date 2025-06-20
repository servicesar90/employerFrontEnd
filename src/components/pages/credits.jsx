// export default CreditsUsage;
import React, { useEffect, useState } from "react";
import { Briefcase, Users, X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCredits } from "../../Redux/getData";
import { useNavigate } from "react-router-dom";

const CreditsUsage = () => {
  const [showDatabaseCredit, setShowDatabaseCredit] = useState(false);
  const [showJobCredit, setShowJobCredit] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchCredits());
  }, [dispatch]);

  const { jobCredit, dataBaseCredit, creditsData } = useSelector(
    (state) => state.getDataReducer,
  );

  return (
    <div className="w-full"
      style={{
        minHeight: "100vh",
        backgroundColor: "#DEF3F9",
        padding: "16px",
      }}
    >
      <div style={{ maxWidth: "600px", margin: "0 auto" }}>
        {/* Header and Button */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "20px",
            backgroundColor: "white",
            padding: "16px",
            borderRadius: "8px",
            boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
          }}
        >
          <h1
            style={{
              fontSize: "20px",
              fontWeight: "600",
              color: "#003B70",
              margin: "0",
            }}
          >
            Credits & Usage
          </h1>
          <button
            onClick={() => navigate("/employerHome/selectPlan")}
            style={{
              backgroundColor: "#0784C9",
              color: "white",
              padding: "8px 16px",
              borderRadius: "6px",
              border: "none",
              cursor: "pointer",
              fontWeight: "500",
              fontSize: "12px",
            }}
          >
            Buy more credits
          </button>
        </div>

        {/* Available Credits Section */}
        <div
          style={{
            backgroundColor: "white",
            padding: "16px",
            borderRadius: "8px",
            marginBottom: "16px",
            boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
          }}
        >
          <h2
            style={{
              fontSize: "16px",
              fontWeight: "600",
              color: "#003B70",
              marginBottom: "6px",
            }}
          >
            Available Credits
          </h2>
          <p
            style={{
              color: "#0784C9",
              marginBottom: "16px",
              fontSize: "12px",
              margin: "0 0 16px 0",
            }}
          >
            Credits are charged each time you retrieve job posting and database
            unlocks{" "}
          </p>

          <div
            style={{
              display: "flex",
              gap: "16px",
              flexDirection: "row",
            }}
          >
            {/* Job Credits */}
            <div
              style={{
                backgroundColor: "#DEF3F9",
                padding: "14px",
                borderRadius: "6px",
                border: "1px solid #0784C9",
                width: "100%",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: "10px",
                }}
              >
                <div
                  style={{ display: "flex", alignItems: "center", gap: "8px" }}
                >
                  <Briefcase size={16} color="#0784C9" />
                  <h3
                    style={{
                      fontSize: "14px",
                      fontWeight: "600",
                      color: "#003B70",
                      margin: "0",
                    }}
                  >
                    Job Credits
                  </h3>
                </div>
                <span
                  style={{
                    fontSize: "18px",
                    fontWeight: "700",
                    color: "#0784C9",
                  }}
                >
                  {jobCredit}
                </span>
              </div>

              <button
                onClick={() => setShowJobCredit(!showJobCredit)}
                style={{
                  color: "#0784C9",
                  fontSize: "12px",
                  textDecoration: "underline",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  padding: "0",
                }}
              >
                {showJobCredit ? "Hide" : "View"} all
              </button>

              {showJobCredit && (
                <div style={{ marginTop: "12px" }}>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gap: "8px",
                      padding: "8px",
                      backgroundColor: "white",
                      borderRadius: "4px",
                      marginBottom: "8px",
                      fontWeight: "600",
                      fontSize: "12px",
                      color: "#003B70",
                    }}
                  >
                    <div>Job Credits</div>
                    <div>Expires On</div>
                  </div>
                  {creditsData?.map((credit, index) => (
                    <div
                      key={index}
                      style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr",
                        gap: "8px",
                        padding: "8px",
                        backgroundColor: "white",
                        borderRadius: "4px",
                        marginBottom: "4px",
                        fontSize: "12px",
                      }}
                    >
                      <div style={{ color: "#0784C9", fontWeight: "600" }}>
                        {credit.job_credits}
                      </div>
                      <div style={{ color: "#003B70" }}>
                        {credit.expired_at?.split("T")[0]}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Database Credits */}
            <div
              style={{
                backgroundColor: "#DEF3F9",
                padding: "14px",
                borderRadius: "6px",
                border: "1px solid #0784C9",
                width: "100%",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: "10px",
                }}
              >
                <div
                  style={{ display: "flex", alignItems: "center", gap: "8px" }}
                >
                  <Users size={16} color="#0784C9" />
                  <h3
                    style={{
                      fontSize: "14px",
                      fontWeight: "600",
                      color: "#003B70",
                      margin: "0",
                    }}
                  >
                    Database Credits
                  </h3>
                </div>
                <span
                  style={{
                    fontSize: "18px",
                    fontWeight: "700",
                    color: "#0784C9",
                  }}
                >
                  {dataBaseCredit}
                </span>
              </div>

              <button
                onClick={() => setShowDatabaseCredit(!showDatabaseCredit)}
                style={{
                  color: "#0784C9",
                  fontSize: "12px",
                  textDecoration: "underline",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  padding: "0",
                }}
              >
                {showDatabaseCredit ? "Hide" : "View"} all
              </button>

              {showDatabaseCredit && (
                <div style={{ marginTop: "12px" }}>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gap: "8px",
                      padding: "8px",
                      backgroundColor: "white",
                      borderRadius: "4px",
                      marginBottom: "8px",
                      fontWeight: "600",
                      fontSize: "12px",
                      color: "#003B70",
                    }}
                  >
                    <div>Database Credits</div>
                    <div>Expires On</div>
                  </div>
                  {creditsData?.map((credit, index) => (
                    <div
                      key={index}
                      style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr",
                        gap: "8px",
                        padding: "8px",
                        backgroundColor: "white",
                        borderRadius: "4px",
                        marginBottom: "4px",
                        fontSize: "12px",
                      }}
                    >
                      <div style={{ color: "#0784C9", fontWeight: "600" }}>
                        {credit.database_credits}
                      </div>
                      <div style={{ color: "#003B70" }}>
                        {credit.expired_at?.split("T")[0]}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreditsUsage;
