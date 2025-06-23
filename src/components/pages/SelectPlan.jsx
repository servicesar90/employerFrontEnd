// export default SelectPlan;

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getPlans } from "../../API/ApiFunctions";
import { showErrorToast } from "../ui/toast";
import { BadgeCheck, Briefcase, Database } from "lucide-react";

const SelectPlan = () => {
  const [plans, setPlans] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getData = async () => {
      const response = await getPlans();
      if (response) {
        setPlans(response.data.data);
      } else {
        showErrorToast("Could not fetch Plans");
      }
    };

    getData();
  }, []);

  const handleSelect = (plan) => {
    localStorage.setItem("selectedPlan", JSON.stringify(plan));
    navigate("/employerHome/checkout");
  };

  return (
    <div
      style={{
        padding: "16px",
        backgroundColor: "#DEF3F9",
        minHeight: "100vh",
        width: "100%",
        overflow: "auto",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <h1
          style={{
            fontSize: "20px",
            fontWeight: "600",
            color: "#003B70",
            marginBottom: "20px",
          }}
        >
          Choose a Plan
        </h1>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
            gap: "12px",
            maxWidth: "100%",
          }}
        >
          {plans?.map((plan) => (
            <div
              key={plan.id}
              style={{
                backgroundColor: "white",
                borderRadius: "8px",
                boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                padding: "16px",
                border: "1px solid #0784C9",
                transition: "box-shadow 0.2s",
              }}
            
            >
              <h2
                style={{
                  fontSize: "16px",
                  fontWeight: "700",
                  color: "#003B70",
                  marginBottom: "6px",
                }}
              >
                {plan.name}
              </h2>
              <p
                style={{
                  color: "#0784C9",
                  fontSize: "11px",
                  marginBottom: "12px",
                }}
              >
                Valid for{" "}
                <span style={{ fontWeight: "500" }}>{plan.Validity} days</span>
              </p>

              <div
                style={{
                  marginBottom: "12px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "6px",
                  fontSize: "11px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    color: "#003B70",
                  }}
                >
                  <Briefcase
                    style={{
                      width: "12px",
                      height: "12px",
                      marginRight: "6px",
                      color: "#0784C9",
                    }}
                  />
                  <span style={{ fontWeight: "500",marginRight:"5px" }}>{plan.job_credits}</span>
                  Job Credits
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    color: "#003B70",
                  }}
                >
                  <Database
                    style={{
                      width: "12px",
                      height: "12px",
                      marginRight: "6px",
                      color: "#0784C9",
                    }}
                  />
                  <span style={{ fontWeight: "500", marginRight:"5px"}}>
                    {plan.Database_credits} </span>
                  Database Credits
                </div>
              </div>

              <p
                style={{
                  fontSize: "18px",
                  fontWeight: "700",
                  color: "#0784C9",
                  marginBottom: "12px",
                }}
              >
                ₹{plan.price}
              </p>

              <button
                onClick={() => handleSelect(plan)}
                style={{
                  width: "100%",
                  backgroundColor: "#0784C9",
                  color: "white",
                  padding: "8px 0",
                  borderRadius: "6px",
                  border: "none",
                  cursor: "pointer",
                  fontSize: "12px",
                  fontWeight: "500",
                  transition: "background-color 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = "#065a94";
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = "#0784C9";
                }}
              >
                Choose Plan
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SelectPlan;
