import React, { useEffect, useState } from "react";
import { Briefcase, Users, X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCredits } from "../../Redux/getData";
import { useNavigate } from "react-router-dom";
import { creditReportFunc } from "../../API/ApiFunctions";
import { Paper, Tab, Tabs } from "@mui/material";

const CreditsUsage = () => {
  const [showDatabaseCredit, setShowDatabaseCredit] = useState(false);
  const [showJobCredit, setShowJobCredit] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [tab, setTab] = useState(null);
  const [allTransections, setAllTransection] = useState(null)
  const [transactions,setTransection ] = useState(null);

  const getTransection =async()=>{
    const response = await creditReportFunc();
    if(response){
      console.log(response);
      setTransection(response?.data?.data)
      setAllTransection(response?.data?.data)
    }
  }

    const formatTime = (dateTimeString) => {
    const date = new Date(dateTimeString);
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    });
  };


  useEffect(() => {
    dispatch(fetchCredits());
    getTransection()
  }, [dispatch]);

  const { jobCredit, dataBaseCredit, creditsData } = useSelector(
    (state) => state.getDataReducer,
  );


const handleTabChange = (event, newValue) => {
  setTab(newValue);

  switch (newValue) {
    case 0: {
      setTransection(allTransections);
      break;
    }
    case 1: {
      const added = allTransections.filter((trx) => trx.credit === "added");
      setTransection(added);
      break;
    }
    case 2: {
      const spent = allTransections.filter((trx) => trx.credit === "spent");
      setTransection(spent);
      break;
    }
    default: {
      setTransection(allTransections);
      break;
    }
  }
};



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
     <div
      style={{
        padding: "16px",
        backgroundColor: "#DEF3F9",
        minHeight: "100vh",
        width: "100%",
        color: "#003B70",
      }}
    >
      <div
        style={{
          backgroundColor: "white",
          padding: "20px",
          borderRadius: "8px",
          boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
        }}
      >
        <h2
          style={{
            fontSize: "18px",
            fontWeight: "600",
            marginBottom: "16px",
            color: "#003B70",
          }}
        >
          Transaction History
        </h2>

        {/* Filter Tabs */}
        <div
          style={{
            display: "flex",
            gap: "8px",
            marginBottom: "16px",
            flexWrap: "wrap",
          }}
        >
          <button
            onClick={() => handleTabChange(null, 0)}
            style={{
              padding: "6px 16px",
              fontSize: "12px",
              border: tab === 0 ? "none" : "1px solid #0784C9",
              borderRadius: "20px",
              backgroundColor: tab === 0 ? "#0784C9" : "white",
              color: tab === 0 ? "white" : "#0784C9",
              cursor: "pointer",
              fontWeight: "500",
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => {
              if (tab !== 0) {
                e.target.style.backgroundColor = "#DEF3F9";
              }
            }}
            onMouseLeave={(e) => {
              if (tab !== 0) {
                e.target.style.backgroundColor = "white";
              }
            }}
          >
            All
          </button>
          <button
            onClick={() => handleTabChange(null, 1)}
            style={{
              padding: "6px 16px",
              fontSize: "12px",
              border: tab === 1 ? "none" : "1px solid #0784C9",
              borderRadius: "20px",
              backgroundColor: tab === 1 ? "#0784C9" : "white",
              color: tab === 1 ? "white" : "#0784C9",
              cursor: "pointer",
              fontWeight: "500",
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => {
              if (tab !== 1) {
                e.target.style.backgroundColor = "#DEF3F9";
              }
            }}
            onMouseLeave={(e) => {
              if (tab !== 1) {
                e.target.style.backgroundColor = "white";
              }
            }}
          >
            Credits added
          </button>
          <button
            onClick={() => handleTabChange(null, 2)}
            style={{
              padding: "6px 16px",
              fontSize: "12px",
              border: tab === 2 ? "none" : "1px solid #0784C9",
              borderRadius: "20px",
              backgroundColor: tab === 2 ? "#0784C9" : "white",
              color: tab === 2 ? "white" : "#0784C9",
              cursor: "pointer",
              fontWeight: "500",
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => {
              if (tab !== 2) {
                e.target.style.backgroundColor = "#DEF3F9";
              }
            }}
            onMouseLeave={(e) => {
              if (tab !== 2) {
                e.target.style.backgroundColor = "white";
              }
            }}
          >
            Credits spent
          </button>
        </div>

        {/* Table */}
        <div style={{ overflowX: "auto" }}>
          <table
            style={{
              minWidth: "100%",
              fontSize: "12px",
              textAlign: "left",
              borderTop: "1px solid #0784C9",
              borderCollapse: "collapse",
            }}
          >
            <thead style={{ backgroundColor: "#DEF3F9" }}>
              <tr>
                <th
                  style={{
                    padding: "12px 16px",
                    fontWeight: "600",
                    color: "#003B70",
                    borderBottom: "1px solid #0784C9",
                  }}
                >
                  Transaction details
                </th>
                <th
                  style={{
                    padding: "12px 16px",
                    fontWeight: "600",
                    color: "#003B70",
                    borderBottom: "1px solid #0784C9",
                  }}
                >
                  Credits
                </th>
                <th
                  style={{
                    padding: "12px 16px",
                    fontWeight: "600",
                    color: "#003B70",
                    borderBottom: "1px solid #0784C9",
                  }}
                >
                  Date & Time
                </th>
              </tr>
            </thead>
            <tbody>
              {transactions?.map((txn, index) => (
                <tr
                  key={index}
                  style={{
                    borderBottom: "1px solid #DEF3F9",
                  }}
                >
                  <td style={{ padding: "12px 16px" }}>
                    <div className="flex flex-col">
                      <span style={{ color: "#003B70" }}>
                        {txn?.credit === "spent"
                          ? "Credit Spent"
                          : "Credit Added"}
                      </span>
                      <span style={{ color: "#0784C9" }}>{txn.action}</span>
                    </div>
                  </td>
                  <td style={{ padding: "12px 16px" }}>
                    <span style={{ color: "#003B70" }}>{txn?.creditsUsed}</span>
                    <span style={{ marginLeft: "8px", color: "#0784C9" }}>
                      {txn?.type}
                    </span>
                  </td>
                  <td style={{ padding: "12px 16px" }}>
                    <div className="flex flex-col">
                      <span style={{ color: "#003B70" }}>
                        {txn?.createdAt.split("T")[0]}
                      </span>
                      <span style={{ color: "#0784C9" }}>
                      {formatTime(txn?.createdAt)}
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
    </div>
    
  );
};

export default CreditsUsage;