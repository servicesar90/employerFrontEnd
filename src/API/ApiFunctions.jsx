import axios from "axios";
import { mobileApi, otpApi } from "./APIs";


// data={ phone: "string", role: "string" }
export const handlelogin = async (data) =>{
    const response = await axios.post(mobileApi,data);
    return response;
}

// data={phone:"string",role:"string",otp:"string"}
export const handleOtp = async (data)=>{
    try{
        const response= await axios.post(otpApi, data);
    
        localStorage.setItem("TokenId", response.data.token )
        localStorage.setItem("User", response.data.user )
      
    return response;
    }catch(err){
        console.log("error response",err);
        alert("Login Unsucessfull")
        
    }
}