import { useEffect } from "react";
import axios from "axios";

const Checkout = () => {
  const plan = JSON.parse(localStorage.getItem("selectedPlan"));
  const jobData = JSON.parse(localStorage.getItem("jobData"));

  const loadRazorpay = (orderId) => {
    const options = {
      key: "YOUR_TEST_KEY_ID",
      amount: 5 * 100,
      currency: "INR",
      name: "Job Portal",
      description: plan.name,
      order_id: orderId,
      handler: async function (response) {
        // Payment success, save job and plan to DB
        // await axios.post("/api/save-job", {
        //   jobData,
        //   planId: plan.id,
        //   paymentId: response.razorpay_payment_id,
        // });

        // Redirect to success page
        window.location.href = "/employerHome/jobs";
      },
      prefill: {
        name: "Recruiter",
        email: "recruiter@example.com",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  useEffect(() => {
    // Get Razorpay order from backend
    // axios
    //   .post("/api/create-order", { amount: plan.price })
    //   .then((res) => {
    //     loadRazorpay(res.data.orderId);
    //   });
  }, []);

  return <div>Redirecting to payment...</div>;
};

export default Checkout;
