import { useEffect, useRef, useState } from "react";
import { X, Pencil } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { handleOtp } from "../../../API/ApiFunctions.jsx";


export default function OtpModal({  onClose, mobile }) {
  const [otp, setOtp] = useState("");
  const inputsRef = useRef([]);



  const navigate = useNavigate()




  useEffect(() => {
    inputsRef.current[0]?.focus();
  }, []);



  const handleChange = async (index, value) => {
    if (!/^\d?$/.test(value)) return; // allow only a single digit

    let updatedOtp = otp.split(""); // Convert to array for manipulation
    updatedOtp[index] = value;       // Replace the char at the correct index

    const newOtp = updatedOtp.join("");
    setOtp(newOtp);

    // Move focus to next input if a digit was entered
    if (value && index < 3) {
      inputsRef.current[index + 1]?.focus();
    }

    // If OTP is 4 digits long, do something
    if (newOtp.length === 4 ) {
      
      const response= await handleOtp({phone:mobile,role:"employee",otp:(newOtp).toString()})
      console.log("response",response);

      if(response){
        if(response.data.user.profile){
          
          navigate("/employerHome/jobs")
        }else{
        
          navigate("/profile")
        }
        onClose()
      }else{
        setOtp("")
        inputsRef.current[0]?.focus();
      }
      
    }
  };


  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };




  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-[380px] shadow-lg relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-black">
          <X size={20} />
        </button>

        <h2 className="text-lg font-semibold text-[#666666] mb-1">Enter OTP</h2>
        <p className="text-sm text-[#666666] mb-4">
          We have sent an OTP on : <span className="font-medium">{mobile}</span>{" "}
          {/* <button className="inline-flex ml-1 text-[#3C78D8]">
            <Pencil size={14} />
          </button> */}
        </p>

        <div className="flex justify-between gap-2 mb-4">
          {[0, 1, 2, 3].map((idx) => (
            <input
              key={idx}
              value={otp[idx] || ""} // display current digit or empty
              ref={(el) => (inputsRef.current[idx] = el)}
              onChange={(e) => handleChange(idx, e.target.value)}
              onKeyDown={(e) => handleKeyDown(e, idx)}
              maxLength={1}
              className="w-12 h-12 border border-[#3C78D8] rounded-md text-center text-xl focus:outline-none text-[#666666]"
            />
          ))}
        </div>


        <div className="text-sm text-gray-500 text-center mb-2">00:30</div>
        <div className="text-center text-sm">
          Didn’t get the OTP?{" "}
          <button className="text-[#3C78D8] font-medium hover:underline">Resend</button>
        </div>
      </div>
    </div>
  );
}