import { useEffect } from "react";
import axios from "axios";
import { base_url } from "../../API/APIs";
import { showErrorToast } from "../ui/toast";
import { giveRazor, loadRazorpay } from "../../API/ApiFunctions";

const Checkout = () => {
  const plan = JSON.parse(localStorage.getItem("selectedPlan"));
  const jobData = JSON.parse(localStorage.getItem("jobData"));



  

  useEffect(() => {

    console.log(plan)
    if (plan) {
      const giveData = async() => {
        const response = await giveRazor(plan.id)
        if (response){
          loadRazorpay(plan, response.data.orderId)
        }
      };

      giveData()
    }

    
  }, []);

  return (
    <div>
      Redirecting to payment...
      {plan.id}
    </div>
  );
};

export default Checkout;
