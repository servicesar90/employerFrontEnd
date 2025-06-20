// export default BillingPage;
import { useEffect, useState } from "react";
import { Download, Mail } from "lucide-react";
import { getBill } from "../../API/ApiFunctions";
import { showErrorToast } from "../ui/toast";

const BillingPage = () => {
  const [filter, setFilter] = useState("All");
  const [data, setData] = useState(null);
  const [allData, setAllData] = useState(null);

  useEffect(() => {
    const getData = async () => {
      const response = await getBill();
      if (response) {
        setData(response.data.data);
        setAllData(response.data.data);
        console.log(response.data.data);
      } else {
        showErrorToast("could not fetch bills");
      }
    };

    getData();
  }, []);

  const applyFilter = (filters) => {
    if (filters == "All") {
      setData(allData);
    } else if (filters == "Success") {
      const successData = allData.filter((el) => el.status == "success");
      setData(successData);
    } else if (filters == "Pending") {
      const successData = allData.filter((el) => el.status == "pending");
      setData(successData);
    } else if (filters == "Failed") {
      const successData = allData.filter((el) => el.status == "failed");
      setData(successData);
    }
  };

  return (
    <div
      style={{
        padding: "16px",
        backgroundColor: "#DEF3F9",
        minHeight: "100vh",
        width: "100%",
        color: "#003B70",
      }}
    >
      {/* Billing History */}
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
          Billing History
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
          {["All", "Success", "Pending", "Failed"].map((tab) => (
            <button
              key={tab}
              style={{
                padding: "6px 16px",
                fontSize: "12px",
                border: filter === tab ? "none" : "1px solid #0784C9",
                borderRadius: "20px",
                backgroundColor: filter === tab ? "#0784C9" : "white",
                color: filter === tab ? "white" : "#0784C9",
                cursor: "pointer",
                fontWeight: "500",
                transition: "all 0.2s",
              }}
              onClick={() => {
                setFilter(tab);
                applyFilter(tab);
              }}
              onMouseEnter={(e) => {
                if (filter !== tab) {
                  e.target.style.backgroundColor = "#DEF3F9";
                }
              }}
              onMouseLeave={(e) => {
                if (filter !== tab) {
                  e.target.style.backgroundColor = "white";
                }
              }}
            >
              {tab}
            </button>
          ))}
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
                  Date
                </th>
                <th
                  style={{
                    padding: "12px 16px",
                    fontWeight: "600",
                    color: "#003B70",
                    borderBottom: "1px solid #0784C9",
                  }}
                >
                  Plan details
                </th>
                <th
                  style={{
                    padding: "12px 16px",
                    fontWeight: "600",
                    color: "#003B70",
                    borderBottom: "1px solid #0784C9",
                  }}
                >
                  Expires on
                </th>
                <th
                  style={{
                    padding: "12px 16px",
                    fontWeight: "600",
                    color: "#003B70",
                    borderBottom: "1px solid #0784C9",
                  }}
                >
                  Amount
                </th>
                <th
                  style={{
                    padding: "12px 16px",
                    fontWeight: "600",
                    color: "#003B70",
                    borderBottom: "1px solid #0784C9",
                  }}
                >
                  Status
                </th>
                <th
                  style={{
                    padding: "12px 16px",
                    fontWeight: "600",
                    color: "#003B70",
                    borderBottom: "1px solid #0784C9",
                  }}
                >
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {data?.map((entry, index) => (
                <tr
                  key={index}
                  style={{
                    borderBottom: "1px solid #DEF3F9",
                  }}
                 
                >
                  <td style={{ padding: "12px 16px", color: "#003B70" }}>
                    {entry.created_at.split("T")[0]}
                  </td>
                  <td
                    style={{
                      padding: "12px 16px",
                      color: "#0784C9",
                      textDecoration: "underline",
                      cursor: "pointer",
                    }}
                  >
                    <p style={{ margin: "0 0 2px 0" }}>
                      {entry.Plan?.job_credits} Jobs
                    </p>
                    <p style={{ margin: "0" }}>
                      {entry.Plan?.Database_credits} Databases
                    </p>
                  </td>
                  <td style={{ padding: "12px 16px", color: "#003B70" }}>
                    {entry.expired_at.split("T")[0]}
                  </td>
                  <td style={{ padding: "12px 16px", color: "#003B70" }}>
                    {entry.amount_paid}
                  </td>
                  <td style={{ padding: "12px 16px" }}>
                    {entry.status === "success" && (
                      <span
                        style={{
                          color: "#0784C9",
                          backgroundColor: "#DEF3F9",
                          padding: "4px 8px",
                          borderRadius: "12px",
                          fontSize: "10px",
                          fontWeight: "600",
                        }}
                      >
                        Success
                      </span>
                    )}
                    {entry.status === "failed" && (
                      <span
                        style={{
                          color: "#003B70",
                          backgroundColor: "#DEF3F9",
                          padding: "4px 8px",
                          borderRadius: "12px",
                          fontSize: "10px",
                          fontWeight: "600",
                        }}
                      >
                        Failed
                      </span>
                    )}
                    {entry.status === "Pending" && (
                      <span
                        style={{
                          color: "#0784C9",
                          backgroundColor: "#DEF3F9",
                          padding: "4px 8px",
                          borderRadius: "12px",
                          fontSize: "10px",
                          fontWeight: "600",
                        }}
                      >
                        Pending
                      </span>
                    )}
                  </td>
                  <td style={{ padding: "12px 16px" }}>
                    {entry.status === "Success" ? (
                      <button
                        style={{
                          display: "flex",
                          alignItems: "center",
                          color: "#0784C9",
                          textDecoration: "underline",
                          background: "none",
                          border: "none",
                          cursor: "pointer",
                          fontSize: "12px",
                        }}
                      >
                        <Download
                          style={{
                            width: "14px",
                            height: "14px",
                            marginRight: "4px",
                          }}
                        />
                        Invoice
                      </button>
                    ) : (
                      <button
                        style={{
                          display: "flex",
                          alignItems: "center",
                          color: "#003B70",
                          textDecoration: "underline",
                          background: "none",
                          border: "none",
                          cursor: "pointer",
                          fontSize: "12px",
                        }}
                      >
                        <Mail
                          style={{
                            width: "14px",
                            height: "14px",
                            marginRight: "4px",
                          }}
                        />
                        Contact us
                      </button>
                    )}
                  </td>
                </tr>
              ))}
              {!data ||
                (data?.length === 0 && (
                  <tr>
                    <td
                      colSpan="6"
                      style={{
                        textAlign: "center",
                        color: "#0784C9",
                        padding: "24px",
                        fontStyle: "italic",
                      }}
                    >
                      No records found.
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default BillingPage;
