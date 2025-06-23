import axios from "axios";
import {
  applicationApi,
  createProfileApi,
  getBillApi,
  getCategorySuggestionsApi,
  getCitiesApi,
  getCreditsApi,
  getEducationSuggestionsApi,
  getJobRolesSuggestionsApi,
  getPlansApi,
  getSkillsSuggestionsApi,
  giveRazorpayApi,
  jobPostApi,
  logoUploadApi,
  mobileApi,
  otpApi,
  profilePicUploadApi,
  updateCompanyApi,
  verifyPaymentApi,
} from "./APIs";
import { showErrorToast, showSuccessToast } from "../components/ui/toast";

// data={ phone: "string", role: "string" }
export const handlelogin = async (data) => {
  const response = await axios.post(mobileApi, data);
  return response;
};

// data={phone:"string",role:"string",otp:"string"}
export const handleOtp = async (data) => {
  try {
    const response = await axios.post(otpApi, data);

    localStorage.setItem("TokenId", response.data.token);
    localStorage.setItem("User", JSON.stringify(response.data.user));

    return response;
  } catch (err) {
    console.log("error response", err);
    alert("Login Unsucessfull");
  }
};

export const resendOtpApiCall = async (data) => {
  try {
    const response = await axios.post(resendOtp, data); // resendOtp is your endpoint URL
    return response;
  } catch (error) {
    console.log("Error from resend OTP API", error);
    return null;
  }
};

export const createProfile = async (data) => {
  try {
    const token = localStorage.getItem("TokenId");

    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const response = await axios.post(createProfileApi, data, { headers });

    return response;
  } catch (err) {
    console.log("error response", err);
    if (err.response.status === 400) {
      showErrorToast(`${err.response.data.message}`);
    }
    showErrorToast("could not post");
  }
};

export const getProfile = async () => {
  try {
    const token = localStorage.getItem("TokenId");

    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const response = await axios.get(createProfileApi, { headers });

    return response;
  } catch (e) {
    console.log("errorResponse", e);
  }
};

export const updateProfile = async (data) => {
  try {
    const token = localStorage.getItem("TokenId");

    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const response = await axios.patch(createProfileApi, data, { headers });

    return response;
  } catch (e) {
    console.log("errorResponse", e);
  }
};

export const postJob = async (data, id) => {
  console.log("data from function", data);
  try {
    const token = localStorage.getItem("TokenId");

    const headers = {
      Authorization: `Bearer ${token}`,
    };

    let response;
    if (id) {
      console.log(id)
      response = await axios.post(jobPostApi, { jobId: id }, { headers });
    } else {
      response = await axios.post(jobPostApi, data, { headers });
    }

    return response;
  } catch (err) {
    console.log("error response", err);
    if (err.status == 403) {
      showErrorToast(err.response?.data.message);
      return "plan";
    }
  }
};

export const editPostJob = async (id, data) => {
  try {
    const token = localStorage.getItem("TokenId");

    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const response = await axios.patch(`${jobPostApi}/${id}`, data, {
      headers,
    });

    return response;
  } catch (err) {
    console.log("error response", err);
  }
};

export const getJob = async () => {
  try {
    const token = localStorage.getItem("TokenId");
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const response = await axios.get(jobPostApi, { headers });

    return response;
  } catch (err) {
    console.log("Error from get Profile api", err);
  }
};

export const getJobById = async (id) => {
  try {
    const token = localStorage.getItem("TokenId");
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    console.log("id", id);
    const response = await axios.get(`${jobPostApi}/${id}`, { headers });

    return response;
  } catch (err) {
    console.log("Error from get Profile api", err);
    return err;
  }
};

export const updateJobById = async (data, jobId) => {
  try {
    const token = localStorage.getItem("TokenId");
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    console.log("data", data, "id", jobId);
    const response = await axios.patch(`${jobPostApi}/${jobId}`, data, {
      headers,
    });

    return response;
  } catch (err) {
    console.log("Error from  Update job api", err);
  }
};

export const deleteJobById = async (jobId) => {
  try {
    const token = localStorage.getItem("TokenId");
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const response = await axios.delete(`${jobPostApi}/${jobId}`, {
      headers,
    });

    return response;
  } catch (err) {
    console.log("Error from  Delete job api", err);
  }
};

export const updateApplication = async (id, data) => {
  try {
    const token = localStorage.getItem("TokenId");
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    console.log("id", id);
    const response = await axios.patch(`${applicationApi}/${id}`, data, {
      headers,
    });

    return response;
  } catch (e) {
    console.log("error from update Application", e);
  }
};

export const profilePicUpload = async (data) => {
  try {
    const token = localStorage.getItem("TokenId");
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const newData = new FormData();
    newData.append("employerProfile", data);

    const response = await axios.post(profilePicUploadApi, newData, {
      headers,
    });

    return response;
  } catch (e) {
    console.log("error from update Application", e);
  }
};

export const updateCompany = async (data) => {
  try {
    const token = localStorage.getItem("TokenId");
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const response = await axios.post(updateCompanyApi, data, {
      headers,
    });

    return response;
  } catch (e) {
    console.log("error from update company", e);
  }
};

export const logoUpload = async (data) => {
  try {
    const token = localStorage.getItem("TokenId");
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const newData = new FormData();
    newData.append("logo", data);
    const response = await axios.post(logoUploadApi, newData, { headers });

    return response;
  } catch (e) {
    console.log("error from update Application", e);
  }
};

export const getCitiesbyPincode = async (value) => {
  try {
    const token = localStorage.getItem("TokenId");
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const response = await axios.get(`${getCitiesApi}/pincode/${value}`, {
      headers,
    });

    return response;
  } catch (err) {
    console.log("Error from get city api", err);
  }
};

export const getEducationSuggestions = async (value) => {
  try {
    const token = localStorage.getItem("TokenId");
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const response = await axios.get(`${getEducationSuggestionsApi}/${value}`, {
      headers,
    });

    return response;
  } catch (err) {
    console.log("Error from get education suggestion api", err);
  }
};

export const getSkillSuggestions = async (value) => {
  try {
    const token = localStorage.getItem("TokenId");
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const response = await axios.get(`${getSkillsSuggestionsApi}/${value}`, {
      headers,
    });

    return response;
  } catch (err) {
    console.log("Error from get Skills suggestions api", err);
  }
};

export const getCategorySuggestions = async () => {
  try {
    const token = localStorage.getItem("TokenId");
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const response = await axios.get(getCategorySuggestionsApi, { headers });

    return response;
  } catch (err) {
    console.log("Error from get Skills suggestions api", err);
  }
};

export const getJobRolesSuggestions = async (value) => {
  try {
    const token = localStorage.getItem("TokenId");
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const response = await axios.get(`${getJobRolesSuggestionsApi}/${value}`, {
      headers,
    });

    return response;
  } catch (err) {
    console.log("Error from get Skills suggestions api", err);
  }
};

export const getPlans = async () => {
  try {
    const token = localStorage.getItem("TokenId");
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const response = await axios.get(getPlansApi, { headers });

    return response;
  } catch (err) {
    console.log("Error from get plans api", err);
  }
};

export const giveRazor = async (id) => {
  try {
    const token = localStorage.getItem("TokenId");
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const response = await axios.post(giveRazorpayApi, { id }, { headers });

    return response;
  } catch (err) {
    console.log("Error from give Razor pay api", err);
  }
};

export const loadRazorpay = (plan, orderId, jobData) => {
  const token = localStorage.getItem("TokenId");
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  const options = {
    key: "rzp_test_3gHC9NkJgGTL2w",
    amount: plan.price * 100,
    currency: "INR",
    name: "Job Portal",
    description: plan.name,
    order_id: orderId,
    handler: async function (response) {
      const user = JSON.parse(localStorage.getItem("User"));

      // Post job after payment success
      const res = await axios.post(
        verifyPaymentApi,
        {
          razorpay_order_id: response.razorpay_order_id,
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_signature: response.razorpay_signature,
          employerId: user.id,
          planId: plan.id,
        },
        { headers }
      );
      console.log(res.status);

      if (res.status == 200) {
        localStorage.removeItem("jobData");
        localStorage.removeItem("selectedPlan");
        if (jobData) {
          const response = await postJob(jobData);
          if (response) {
            showSuccessToast("successfully Posted");
            window.location.href = "/employerHome/jobs";
          } else {
            showErrorToast("Could not post");
            window.location.href = "/employerHome/jobs";
          }
        } else {
          window.location.href = "/employerHome/jobs";
        }
      } else {
        showErrorToast("Failed to post job");
      }
    },
    prefill: {
      name: "Recruiter",
      email: "recruiter@example.com",
    },
  };

  const rzp = new window.Razorpay(options);
  rzp.open();
};

export const getBill = async () => {
  try {
    const token = localStorage.getItem("TokenId");
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const response = await axios.get(getBillApi, { headers });

    return response;
  } catch (err) {
    console.log("Error from give get bill api", err);
  }
};

export const getCredits = async () => {
  try {
    const token = localStorage.getItem("TokenId");
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const response = await axios.get(getCreditsApi, { headers });

    return response;
  } catch (err) {
    console.log("Error from give get bill api", err);
  }
};
