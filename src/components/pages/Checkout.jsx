// export default Checkout;
import { useEffect, useRef } from "react";

import {
  getFreeCredit,
  giveRazor,
  loadRazorpay,
  postJob,
} from "../../API/ApiFunctions";
import { useDispatch, useSelector } from "react-redux";
import { setJobData } from "../../Redux/getData";
import { showErrorToast, showSuccessToast } from "../ui/toast";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const plan = JSON.parse(localStorage.getItem("selectedPlan"));
  const checkRef = useRef(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const jobData = useSelector((state) => state.getDataReducer.jobData);

  useEffect(() => {
    if (!checkRef.current) {
      checkRef.current = true;
      if (plan && plan?.name !== "Basic") {
        const giveData = async () => {
          const response = await giveRazor(plan.id);
          if (response) {
            loadRazorpay(plan, response.data.orderId, jobData);
            dispatch(setJobData(null));
          }
        };

        giveData();
      } else if (plan?.name === "Basic") {
        console.log("plan basic");
        const giveFreeCredit = async () => {
          const response = await getFreeCredit({ planId: plan?.id });
          if (response) {
            showSuccessToast("Successfully Added");
            if (jobData) {
              const response = await postJob(jobData);
              if (response) {
                showSuccessToast("successfully Posted");
              } else {
                showErrorToast("Could not post");
              }
              dispatch(setJobData(null));
            }
            navigate("/employerHome/jobs");
          } else {
            showErrorToast("Could not add");
          }
        };

        giveFreeCredit();
      }
      
    }
  }, []);

  return (
    <div
      className="w-full "
      style={{
        minHeight: "100vh",
        backgroundColor: "#DEF3F9",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
      }}
    >
      <div
        style={{
          backgroundColor: "white",
          padding: "40px",
          borderRadius: "12px",
          boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
          textAlign: "center",
          maxWidth: "400px",
          width: "100%",
        }}
      >
        <div
          style={{
            width: "60px",
            height: "60px",
            backgroundColor: "#0784C9",
            borderRadius: "50%",
            margin: "0 auto 20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              width: "20px",
              height: "20px",
              border: "3px solid white",
              borderTop: "3px solid transparent",
              borderRadius: "50%",
              animation: "spin 1s linear infinite",
            }}
          />
        </div>

        <h2
          style={{
            fontSize: "24px",
            fontWeight: "600",
            color: "#003B70",
            marginBottom: "12px",
          }}
        >
          Processing Payment
        </h2>

        <p
          style={{
            color: "#0784C9",
            fontSize: "16px",
            marginBottom: "20px",
          }}
        >
          Redirecting to payment...
        </p>

        <div
          style={{
            backgroundColor: "#DEF3F9",
            padding: "12px",
            borderRadius: "8px",
            border: "1px solid #0784C9",
          }}
        >
          <p
            style={{
              color: "#003B70",
              fontSize: "14px",
              margin: "0",
              fontWeight: "500",
            }}
          >
            Plan ID: {plan.id}
          </p>
        </div>

        <style>
          {`
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          `}
        </style>
      </div>
    </div>
  );
};

export default Checkout;
