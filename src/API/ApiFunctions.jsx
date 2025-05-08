import axios from "axios";
import { createProfileApi, jobPostApi, mobileApi, otpApi } from "./APIs";


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
        localStorage.setItem("User", JSON.stringify(response.data.user) )
      
    return response;
    }catch(err){
        console.log("error response",err);
        alert("Login Unsucessfull")
        
    }
}

export const createProfile = async (data)=>{
    try{
        const token = localStorage.getItem('TokenId')
        
        const headers = {
            Authorization: `Bearer ${token}`
          };
    
          
        const response= await axios.post(createProfileApi, data, {headers});

        return response;
    
    }catch(err){
        console.log("error response",err);
        alert("could not post")
        
    }
}

export const getProfile = async()=>{
    try{
        const token = localStorage.getItem('TokenId')
        
        const headers = {
            Authorization: `Bearer ${token}`
          };
    
          
        const response= await axios.get(createProfileApi, {headers});

        return response;
    }
    catch(e){
        console.log("errorResponse", e)
    }
}

export const postJob = async (data)=>{

    console.log("data from function", data)
    try{
        const token = localStorage.getItem('TokenId')
        
        const headers = {
            Authorization: `Bearer ${token}`
          };
        const response= await axios.post(jobPostApi, data, {headers});

        return response;
      
    
    }catch(err){
        console.log("error response",err);
        alert("could not post")
        
    }
}


export const getJob = async ()=>{
    try{
        const token = localStorage.getItem('TokenId')
        const headers = {
            Authorization: `Bearer ${token}`
          };
        const response= await axios.get(jobPostApi, {headers});
      
        return response;
        
    }catch(err){
        console.log("Error from get Profile api",err)
    }
}