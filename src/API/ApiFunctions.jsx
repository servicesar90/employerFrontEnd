import axios from "axios";
import { applicationApi, createProfileApi, jobPostApi, logoUploadApi, mobileApi, otpApi, profilePicUploadApi } from "./APIs";


// data={ phone: "string", role: "string" }
export const handlelogin = async (data) => {
    const response = await axios.post(mobileApi, data);
    return response;
}

// data={phone:"string",role:"string",otp:"string"}
export const handleOtp = async (data) => {
    try {
        const response = await axios.post(otpApi, data);

        localStorage.setItem("TokenId", response.data.token)
        localStorage.setItem("User", JSON.stringify(response.data.user))

        return response;
    } catch (err) {
        console.log("error response", err);
        alert("Login Unsucessfull")

    }
}

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
        const token = localStorage.getItem('TokenId')

        const headers = {
            Authorization: `Bearer ${token}`
        };


        const response = await axios.post(createProfileApi, data, { headers });

        return response;

    } catch (err) {
        console.log("error response", err);
        alert("could not post")

    }
}

export const getProfile = async () => {
    try {
        const token = localStorage.getItem('TokenId')

        const headers = {
            Authorization: `Bearer ${token}`
        };


        const response = await axios.get(createProfileApi, { headers });

        return response;
    }
    catch (e) {
        console.log("errorResponse", e)
    }
}

export const postJob = async (data) => {

    console.log("data from function", data)
    try {
        const token = localStorage.getItem('TokenId')

        const headers = {
            Authorization: `Bearer ${token}`
        };
        const response = await axios.post(jobPostApi, data, { headers });

        return response;


    } catch (err) {
        console.log("error response", err);
        alert("could not post")

    }
}

export const editPostJob = async(id, data)=>{
   
    try {
        const token = localStorage.getItem('TokenId')

        const headers = {
            Authorization: `Bearer ${token}`
        };
        const response = await axios.patch(`${jobPostApi}/${id}`, data, { headers });

        return response;


    } catch (err) {
        console.log("error response", err);
        alert("could not post")

    }
}


export const getJob = async () => {
    try {
        const token = localStorage.getItem('TokenId')
        const headers = {
            Authorization: `Bearer ${token}`
        };
        const response = await axios.get(jobPostApi, { headers });

        return response;

    } catch (err) {
        console.log("Error from get Profile api", err)
    }
}

export const getJobById = async (id) => {
    try {
        const token = localStorage.getItem('TokenId')
        const headers = {
            Authorization: `Bearer ${token}`
        };

        console.log("id", id)
        const response = await axios.get(`${jobPostApi}/${id}`, { headers });

        return response;

    } catch (err) {
        console.log("Error from get Profile api", err)
    }
}

export const updateJobById = async (data, jobId) => {
    try {
        const token = localStorage.getItem('TokenId')
        const headers = {
            Authorization: `Bearer ${token}`
        };

        console.log("data", data, "id", jobId)
        const response = await axios.patch(`${jobPostApi}/${jobId}`,data, { headers });

        return response;

    } catch (err) {
        console.log("Error from  Update job api", err)
    }
}

export const updateApplication = async (id, data) => {
    try {
        const token = localStorage.getItem('TokenId')
        const headers = {
            Authorization: `Bearer ${token}`
        };
        console.log("id", id)
        const response = await axios.patch(`${applicationApi}/${id}`,data,  { headers });

        return response;
    } catch (e) {
        console.log("error from update Application", e)
    }
}

export const profilePicUpload = async (data)=>{
     try {
        const token = localStorage.getItem('TokenId')
        const headers = {
            Authorization: `Bearer ${token}`
        };

           const newData = new FormData();
        newData.append("employerProfile", data)
       

        const response = await axios.post(profilePicUploadApi , newData,  { headers });

        return response;
    } catch (e) {
        console.log("error from update Application", e)
    }
}

export const logoUpload = async (data)=>{
     try {
        const token = localStorage.getItem('TokenId')
        const headers = {
            Authorization: `Bearer ${token}`
        };

        const newData = new FormData();
        newData.append("logo", data)
        const response = await axios.post(logoUploadApi , newData,  { headers });

        return response;
    } catch (e) {
        console.log("error from update Application", e)
    }
}



