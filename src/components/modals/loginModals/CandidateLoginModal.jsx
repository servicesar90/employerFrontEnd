import { useState } from "react";
import { handlelogin } from "../../../API/ApiFunctions.jsx";

export default function CandidateLoginModal({ onClose, mobile, setMobile }) {
  const [countryCode, setCountryCode] = useState("+91");
  const [showModal, setShowModal]= useState(true);


  const handleChangeMobile = async (e) => {
    const value = e.target.value.replace(/\D/g, "");

    if (value.length <= 10) {
      setMobile(value);

      if (value.length === 10) {
        const response = await handlelogin({ phone: (value).toString(), role: "employee" });
        console.log("response", response);
        if (response.status == 200) {
          setMobile(value);
          onClose()
        } else {
          setMobile("")
        }
      }
    }
  };

  const isValidMobile = /^\d{10}$/.test(mobile);

  console.log(showModal)

if(!showModal) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-md p-6 shadow-lg relative">
        <button
          onClick={()=>setShowModal(!showModal)}
          className="absolute top-2 right-3 text-gray-500 hover:text-gray-700 text-xl"
        >
          &times;
        </button>

        <h2 className="text-2xl font-semibold text-[#3C78D8] mb-2">Welcome back!</h2>
        <p className="text-sm text-gray-600 mb-6">Enter your mobile number to continue</p>

        <div className="flex gap-2 mb-4">
          <input
            value={countryCode}
            onChange={(e) => setCountryCode(e.target.value)}
            placeholder="+91"
            className="w-20 border rounded px-3 py-2 text-[#666666] focus:outline-none focus:ring-2 focus:ring-[#3C78D8] border-gray-300"
          />
          <input
            type="tel"
            value={mobile}
            onChange={handleChangeMobile}
            placeholder="Enter 10 digit mobile number"
            className="w-full border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#3C78D8] text-[#666666] border-gray-300"
          />
        </div>

        {!isValidMobile && mobile.length > 0 && (
          <p className="text-sm text-red-500 mb-2">Please enter a valid 10-digit mobile number</p>
        )}

        <button
          disabled
          className="w-full font-medium py-2 rounded bg-gray-300 text-gray-600 cursor-not-allowed"
        >
          Continue
        </button>
      </div>


    </div>
  );
}
