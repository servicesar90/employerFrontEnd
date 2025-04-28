import React, { useState } from 'react'
import CandidateLoginModal from '../components/modals/loginModals/CandidateLoginModal';

export default function Home() {

const [showLoginModal, setShowLoginModel]= useState(false);


  return (
    <div>
      <button
        onClick={()=>setShowLoginModel(true)}
        className="text-[#36A85C] bg-white px-4 py-1 rounded text-sm font-semibold"
      >
        Employer Login
      </button>

      {showLoginModal && <CandidateLoginModal onClose={()=> setShowLoginModel(false)}/>}
    </div>
  )
}
