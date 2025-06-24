// export default SelectPlan;

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getPlans } from "../../API/ApiFunctions";
import { showErrorToast } from "../ui/toast";
import { BadgeCheck, Briefcase, Database } from "lucide-react";
import { Chip, Stack } from "@mui/material";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import AlignVerticalTopIcon from '@mui/icons-material/AlignVerticalTop';
import HighlightIcon from '@mui/icons-material/Highlight';
import ManIcon from "@mui/icons-material/Man";
import AvTimerIcon from '@mui/icons-material/AvTimer';

const SelectPlan = () => {
  const [allplans, setAllPlans] = useState([]);
  const [filter, setFilter] = useState("Starter");
  const [plans, setPlan] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getData = async () => {
      const response = await getPlans();
      if (response) {
        setAllPlans(response.data.data);
      } else {
        showErrorToast("Could not fetch Plans");
      }
    };

    getData();
  }, []);

  useEffect(() => {
    setPlan(allplans);
    if (filter === "Starter") {
      const newPlan = allplans.filter((ele) => ele.Validity == 20);
      setPlan(newPlan);
    } else if (filter === "Monthly") {
      const newPlan = allplans.filter((ele) => ele.Validity == 30);
      setPlan(newPlan);
    } else if (filter === "Quarterly") {
      const newPlan = allplans.filter((ele) => ele.Validity == 90);
      setPlan(newPlan);
    } else if (filter === "Half Yearly") {
      const newPlan = allplans.filter((ele) => ele.Validity == 180);
      setPlan(newPlan);
    } else if (filter === "Yearly") {
      const newPlan = allplans.filter((ele) => ele.Validity == 365);
      setPlan(newPlan);
    }
  }, [allplans, filter]);

  const handleSelect = (plan) => {
    localStorage.setItem("selectedPlan", JSON.stringify(plan));
    navigate("/employerHome/checkout");
  };

  const icons = [{icon:RemoveRedEyeIcon, color: "black"},{ icon:WhatsAppIcon, color:"green"},{ icon: AvTimerIcon, color: "blue"},{icon:LocalFireDepartmentIcon, color: "orange"},{icon:AlignVerticalTopIcon, color:"darkBlue"},{icon: HighlightIcon, color: "yellow"}, {icon: ManIcon, color:"black"}
  ];

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
      <Stack
        direction="row"
        spacing={2}
        flexWrap="wrap"
        sx={{
          p: 2,
          backgroundColor: "#fff",
          borderRadius: 2,
          boxShadow: 2,
          marginBottom: 4,
        }}
      >
        {["Starter", "Monthly", "Quarterly", "Half Yearly", "Yearly"].map(
          (type, index) => (
            <Chip
              key={index}
              label={type}
              onClick={() => setFilter(type)}
              clickable
              variant={filter === type ? "filled" : "outlined"}
              color={filter === type ? "primary" : "default"}
              sx={{
                fontWeight: 500,
                fontSize: "0.875rem",
                px: 2,
                py: 1,
                borderRadius: "16px",
                "&:hover": {
                  backgroundColor:
                    filter === type ? undefined : "rgba(0, 0, 0, 0.04)",
                },
              }}
            />
          )
        )}
      </Stack>
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
                position: "relative",
                height: "100%",
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
                Plan Valid for{" "}
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
                  <span style={{ fontWeight: "500", marginRight: "5px" }}>
                    {plan.job_credits}
                  </span>
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
                  <span style={{ fontWeight: "500", marginRight: "5px" }}>
                    {plan.Database_credits}{" "}
                  </span>
                  Database Credits
                </div>
              </div>

              {(Array.isArray(plan?.features)? plan?.features : JSON.parse(plan?.features))?.map((item, index) => {
                const IconComponent = icons[index].icon; 
                return (
                  <div key={index} className="flex items-center gap-2 my-2">
                    {IconComponent && (
                      <IconComponent
                        style={{ color: `${icons[index].color}`, fontSize: 15 }}
                      />
                    )}
                    <p
                      style={{
                        fontWeight: "500",
                        margin: 0,
                        color: "#003B70",
                      }}
                      className="text-left text-12"
                    >
                      {item}
                    </p>
                  </div>
                );
              })}

               <div className="h-10"></div>


              <p
                style={{
                  position: "absolute",
                  width: "40%",
                  right: "30%",
                  bottom: "15%",
                  fontSize: "18px",
                  fontWeight: "700",
                  color: "#0784C9",
                  marginBottom: "12px",
                }}
              >
                ₹{plan.price}
              </p>

              <div className="h-10"></div>

              <button
                onClick={() => handleSelect(plan)}
                style={{
                  position: "absolute",
                  bottom: "5%",
                  right: "10%",
                  width: "80%",
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
