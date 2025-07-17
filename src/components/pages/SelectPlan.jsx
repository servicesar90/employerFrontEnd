import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getBill, getPlans } from "../../API/ApiFunctions";
import { showErrorToast } from "../ui/toast";
import { Briefcase, Database } from "lucide-react";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import AlignVerticalTopIcon from "@mui/icons-material/AlignVerticalTop";
import HighlightIcon from "@mui/icons-material/Highlight";
import ManIcon from "@mui/icons-material/Man";
import AvTimerIcon from "@mui/icons-material/AvTimer";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";

const SelectPlan = () => {
  const [allplans, setAllPlans] = useState([]);
  const [filter, setFilter] = useState("Starter");
  const [plans, setPlan] = useState([]);
  const [freeUsed, setFreeUsed] = useState(false);
  const [openBillModal, setOpenBillModal]= useState(false);
  const [choosePlan, setChoosePlan] = useState(null);
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

    const checkFreePlan = async ()=>{
      const response = await getBill();
      if(response){
        const purchesed = response?.data?.data?.filter((dat)=> dat.Plan?.name == "Basic");
      
        if(purchesed.length >0){
          setFreeUsed(true)
        } 
      }
    }
    getData();
    checkFreePlan();
  }, []);



  useEffect(() => {
    if (filter === "Starter") {
      setPlan(allplans.filter((ele) => ele.Validity === 20));
    } else if (filter === "Monthly") {
      setPlan(allplans.filter((ele) => ele.Validity === 30));
    } else if (filter === "Quarterly") {
      setPlan(allplans.filter((ele) => ele.Validity === 90));
    } else if (filter === "Half Yearly") {
      setPlan(allplans.filter((ele) => ele.Validity === 180));
    } else if (filter === "Yearly") {
      setPlan(allplans.filter((ele) => ele.Validity === 365));
    } else {
      setPlan(allplans);
    }
  }, [allplans, filter]);

  console.log(plans)

  const handleSelect = (plan) => {
 

  const price = plan?.price || 0;

  // calculate numbers first
  const CGST = +(price * 0.09).toFixed(2);
  const SGST = +(price * 0.09).toFixed(2);
  const basePlan = +price.toFixed(2);
  const total = +(basePlan + CGST + SGST).toFixed(2);

  setChoosePlan({
    plan: basePlan,
    CGST,
    SGST,
    total,
    desc: plan?.description
  });

  const selectedPlan = {...plan, price: total};

   localStorage.setItem("selectedPlan", JSON.stringify(selectedPlan));

  setOpenBillModal(true);
};


  const icons = [
    { icon: RemoveRedEyeIcon, color: "black" },
    { icon: AvTimerIcon, color: "blue" },
    { icon: WhatsAppIcon, color: "green" },
    { icon: LocalFireDepartmentIcon, color: "orange" },
    { icon: AlignVerticalTopIcon, color: "darkBlue" },
    { icon: HighlightIcon, color: "yellow" },
    { icon: ManIcon, color: "black" },
  ];

  return (
    <>
    <div
      style={{
        background: "#DEF3F9",
        minHeight: "100vh",
        padding: "20px 10px",
      }}
    >
      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <h1
          style={{
            color: "#065a94",
            fontSize: "36px",
            fontWeight: "800",
            marginBottom: "8px",
          
          }}
        >
          Choose Your Plan
        </h1>
        <p
          style={{
            color: "#065a94",
            fontSize: "18px",
            fontWeight: "400",
            margin: "0",
          }}
        >
          Select the perfect plan that fits your needs
        </p>
      </div>

      {/* Filter Buttons */}
    <div className="flex justify-center flex-wrap gap-2 mb-12">
  {["Starter", "Monthly", "Quarterly", "Half Yearly", "Yearly"].map((type) => (
    <div
      key={type}
      onClick={() => setFilter(type)}
      className={`px-5 py-2 rounded-full border font-semibold text-sm cursor-pointer transition-all duration-300 backdrop-blur-sm shadow-sm ${
        filter === type
          ? "bg-white text-[#0784C9] border-white scale-105"
          : "bg-white/70 text-slate-700 border-slate-300 hover:bg-white hover:scale-105"
      }`}
    >
      {type}
    </div>
  ))}
</div>



      {/* Plans */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
          gap: "24px",
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        {plans.map((plan) => (
          <div
            key={plan.id}
            style={{
              width: "280px",
              background: "rgba(255,255,255,0.95)",
              borderRadius: "12px",
              padding: "30px 24px",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(255,255,255,0.3)",
              boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
              transition: "all 0.4s ease",
              position: "relative",
              overflow: "hidden",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-10px) scale(1.02)";
              e.currentTarget.style.boxShadow = "0 30px 60px rgba(0,0,0,0.2)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0) scale(1)";
              e.currentTarget.style.boxShadow = "0 20px 40px rgba(0,0,0,0.1)";
            }}
          >
            <div
              style={{
                position: "absolute",
                top: 0,
                right: 0,
                width: "60px",
                height: "60px",
                background: "linear-gradient(135deg, #0784C9, #065a94)",
                borderBottomLeftRadius: "100%",
              }}
            />
            <div style={{ textAlign: "center", marginBottom: "20px" }}>
              <h3
                style={{
                  fontSize: "22px",
                  fontWeight: "700",
                  color: "#2d3748",
                  margin: "0 0 8px",
                }}
              >
                {plan.name}
              </h3>
              <div
                style={{
                  fontSize: "12px",
                  color: "#718096",
                  background: "#f7fafc",
                  padding: "4px 8px",
                  borderRadius: "12px",
                  display: "inline-block",
                }}
              >
                {plan.Validity} days validity
              </div>
            </div>

{/* plan price */}
            <div style={{ textAlign: "center", marginBottom: "12px" }}>
              <span
                style={{
                  fontSize: "22px",
                  fontWeight: "800",
                  background: "linear-gradient(135deg, #0784C9, #065a94)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                ₹{plan.price}
              </span>
            </div>

            {/* Credits */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "12px",
                marginBottom: "24px",
              }}
            >
              <div
                style={{
                  background: "linear-gradient(135deg, #ebf8ff, #bee3f8)",
                  padding: "10px 18px",
                  borderRadius: "12px",
                  textAlign: "center",
                  border: "1px solid #90cdf4",
                }}
              >
                <div className="w-full flex items-center justify-center">
                  <Briefcase
                    style={{
                      fontSize: "20px",
                      color: "#0784C9",
                      marginBottom: "4px",
                    }}
                  />
                </div>

                <div
                  style={{
                    fontSize: "18px",
                    fontWeight: "700",
                    color: "#0784C9",
                  }}
                >
                  {plan.job_credits}
                </div>
                <div
                  style={{
                    fontSize: "10px",
                    color: "#4a5568",
                    fontWeight: "500",
                  }}
                >
                  Job Credits
                </div>
              </div>

              <div
                style={{
                  background: "linear-gradient(135deg, #f0fff4, #c6f6d5)",
                  padding: "10px 8px",
                  borderRadius: "12px",
                  textAlign: "center",
                  border: "1px solid #9ae6b4",
                }}
              >
                <div className="w-full flex items-center justify-center">
                  <Database
                    style={{
                      fontSize: "20px",
                      color: "#16a34a",
                      marginBottom: "4px",
                    }}
                  />
                </div>

                <div
                  style={{
                    fontSize: "18px",
                    fontWeight: "700",
                    color: "#16a34a",
                  }}
                >
                  {plan.Database_credits}
                </div>
                <div
                  style={{
                    fontSize: "10px",
                    color: "#4a5568",
                    fontWeight: "500",
                  }}
                >
                  Database
                </div>
              </div>
            </div>

            {/* Features */}
            <div style={{ marginBottom: "30px" }}>
              <div
                style={{
                  display: "grid",
                  gridTemplateRows: "1fr 1fr",
                  gap: "2px",
                  textAlign: "left",
                }}
              >
                {(Array.isArray(plan.features)
                  ? plan.features
                  : JSON.parse(plan.features)
                ).map((item, index) => {
                  const IconComponent = icons[index]?.icon;
                  const iconColor =
                    {
                      black: "#000000",
                      blue: "#2563eb",
                      green: "#16a34a",
                      orange: "#ea580c",
                      darkBlue: "#1e40af",
                      yellow: "#eab308",
                    }[icons[index]?.color] || "#666";

                  return (
                    <div
                      key={index}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "6px",
                        padding: "6px 4px",
                        fontSize: "11px",
                        color: "#4a5568",
                        fontWeight: "500",
                      }}
                    >
                      {IconComponent && (
                        <IconComponent
                          style={{ fontSize: 14, color: iconColor }}
                        />
                      )}
                      <span>{item}</span>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="h-[35px] w-full"></div>

            <button
              onClick={() => handleSelect(plan)}
              disabled={plan?.name == "Basic" && freeUsed}
              style={{
                width: "90%",
                background: `${(plan?.name == "Basic" && freeUsed)? "linear-gradient(135deg,rgb(149, 173, 185),rgb(124, 168, 202))": "linear-gradient(135deg, #0784C9, #065a94)"}`,
                color: "white",
                border: "none",
                borderRadius: "12px",
                padding: "14px 0",
                fontSize: "16px",
                fontWeight: "600",
                cursor: "pointer",
                transition: "all 0.3s ease",
                boxShadow: "0 4px 15px rgba(7, 132, 201, 0.4)",
                position: "absolute",
                bottom: "5%",
                right: "5%",
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = "translateY(-2px)";
                e.target.style.boxShadow = "0 6px 20px rgba(7, 132, 201, 0.6)";
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = "translateY(0)";
                e.target.style.boxShadow = "0 4px 15px rgba(7, 132, 201, 0.4)";
              }}
            >
              {plan?.name == "Basic" && freeUsed ? "Plan Used" : "Choose Plan"}
            </button>
          </div>
        ))}
      </div>

      {plans.length === 0 && (
        <div style={{ textAlign: "center", color: "white", marginTop: "60px" }}>
          <div style={{ fontSize: "48px", marginBottom: "20px", opacity: 0.7 }}>
            📋
          </div>
          <h3
            style={{ fontSize: "24px", fontWeight: "600", marginBottom: "8px" }}
          >
            No plans available
          </h3>
          <p style={{ fontSize: "16px", opacity: 0.8 }}>
            Please try selecting a different plan type.
          </p>
        </div>
      )}
    </div>

    {openBillModal && (
  <Dialog open={openBillModal} onClose={() => setOpenBillModal(false)} maxWidth="sm" fullWidth>
    <DialogTitle sx={{ textAlign: 'center', fontWeight: 'bold', fontSize: '1.5rem' }}>
      Invoice / Bill
    </DialogTitle>
    <DialogContent>
      <div
        style={{
          border: '1px solid #ccc',
          borderRadius: '8px',
          padding: '16px',
          marginTop: '8px',
          fontFamily: 'Arial, sans-serif',
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '16px' }}>
          {/* <h2 style={{ margin: 0 }}>{choosePlan?.desc}</h2> */}
          <h2 style={{ margin: 0 }}>Thank you for your purchase!</h2>

          <small style={{ color: '#777' }}>Here is the breakdown of your bill:</small>
        </div>

        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <tbody>
            <tr>
              <td style={{ padding: '8px 0', fontWeight: 500 }}>Base Amount</td>
              <td style={{ textAlign: 'right' }}>₹ {choosePlan?.plan}</td>
            </tr>
            <tr>
              <td style={{ padding: '8px 0', fontWeight: 500 }}>CGST (9%)</td>
              <td style={{ textAlign: 'right' }}>₹ {choosePlan?.CGST}</td>
            </tr>
            <tr>
              <td style={{ padding: '8px 0', fontWeight: 500 }}>SGST (9%)</td>
              <td style={{ textAlign: 'right' }}>₹ {choosePlan?.SGST}</td>
            </tr>
            <tr>
              <td colSpan={2}>
                <hr style={{ border: '0.5px solid #ddd', margin: '12px 0' }} />
              </td>
            </tr>
            <tr>
              <td style={{ padding: '8px 0', fontWeight: 'bold', fontSize: '1.1rem' }}>
                Total Payable
              </td>
              <td
                style={{
                  textAlign: 'right',
                  fontWeight: 'bold',
                  fontSize: '1.1rem',
                  color: '#1976d2',
                }}
              >
                ₹ {choosePlan?.total}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </DialogContent>
    <DialogActions sx={{ justifyContent: 'space-between', padding: '16px' }}>
      <Button
        variant="outlined"
        onClick={() => setOpenBillModal(false)}
      >
        Back
      </Button>
      <Button
        variant="contained"
        onClick={() => {
          setOpenBillModal(false);
          navigate('/employerHome/checkout');
        }}
      >
        Confirm & Pay
      </Button>
    </DialogActions>
  </Dialog>
)}

    </>
  );
};

export default SelectPlan;