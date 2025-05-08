import { useState } from "react";
import { ChevronDown } from "lucide-react";
import CandidateLoginModal from "../modals/loginModals/CandidateLoginModal";
import OtpModal from "../modals/loginModals/OtpModal";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [isJobsOpen, setIsJobsOpen] = useState(false);
  const [isCareerOpen, setIsCareerOpen] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [mobile, setMobile]= useState("");
  const [showOtp, setShowOtp] = useState(false);
 

  


  return (
    <>
      <nav className="bg-[#3C78D8] shadow p-4 flex justify-between items-center relative">
        <Link to="/" className="text-xl font-bold text-white">
          <img src="/LOGO.png" style={{width: "100px", padding: 0, margin:0}} alt="" />
        </Link>

        <div className="flex items-center space-x-8">
          {/* Jobs Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setIsJobsOpen(true)}
            onMouseLeave={() => setIsJobsOpen(false)}
          >
            <button className="flex items-center gap-1 font-semibold text-white">
              Jobs <ChevronDown size={16} />
            </button>
            {isJobsOpen && (
              <div className="absolute top-10 left-0 bg-white shadow-lg p-4 grid grid-cols-2 gap-x-10 rounded-md z-50 w-[500px]">
                {/* Jobs List */}
                <div className="space-y-2 text-sm text-[#666666] font-medium">
                  {[
                    ["Work From Home Jobs", "/jobs/work-from-home"],
                    ["Part Time Jobs", "/jobs/part-time"],
                    ["Freshers Jobs", "/jobs/freshers"],
                    ["Jobs for Women", "/jobs/women"],
                    ["Full Time Jobs", "/jobs/full-time"],
                    ["Night Shift Jobs", "/jobs/night-shift"],
                  ].map(([label, path], i) => (
                    <Link
                      key={i}
                      to={path}
                      className="block px-3 py-1 rounded hover:bg-gray-100 text-left w-full"
                    >
                      {label}
                    </Link>
                  ))}
                </div>
                <div className="space-y-2 text-sm text-[#666666] font-medium">
                  {[
                    ["Jobs By City →", "/jobs/city"],
                    ["Jobs By Department →", "/jobs/department"],
                    ["Jobs By Company →", "/jobs/company"],
                    ["Jobs By Qualification →", "/jobs/qualification"],
                    ["Others →", "/jobs/others"],
                  ].map(([label, path], i) => (
                    <Link
                      key={i}
                      to={path}
                      className="block px-3 py-1 rounded hover:bg-gray-100 text-left w-full"
                    >
                      {label}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Career Compass Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setIsCareerOpen(true)}
            onMouseLeave={() => setIsCareerOpen(false)}
          >
            <button className="flex items-center gap-1 font-semibold text-white">
              Career Compass <ChevronDown size={16} />
            </button>
            {isCareerOpen && (
              <div className="absolute top-10 left-0 bg-white shadow-lg p-4 flex gap-6 rounded-md z-50 w-[600px]">
                <div className="space-y-4 text-sm text-[#666666] font-medium w-1/2">
                  {[
                    ["AI Resume builder", "Create your best resume using AI"],
                    ["AI Resume checker", "Get instant resume feedback"],
                    [
                      "AI Cover letter generator",
                      "Stand out and get hired faster",
                    ],
                    [
                      "Direct connection with recruiter",
                      "Stand out and get hired faster",
                    ],
                    ["Blog", "Guidance for securing your dream job"],
                  ].map(([title, subtitle], i) => (
                    <button
                      key={i}
                      className="text-left w-full px-2 py-1 hover:bg-gray-100 rounded"
                    >
                      <strong>{title}</strong>
                      <br />
                      <span className="text-gray-500">{subtitle}</span>
                    </button>
                  ))}
                </div>
                <div className="w-1/2 space-y-2">
                  <img
                    src=""
                    alt="Career Compass Video"
                    className="rounded-md"
                  />
                  <p className="text-sm font-medium text-[#666666]">
                    Level up your resume: Watch our career compass video guide.
                  </p>
                  <Link
                    to="/career-compass-video"
                    className="text-[#3C78D8] font-semibold text-sm"
                  >
                    Watch video →
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Login Buttons */}
          <div className="flex items-center flex-row gap-4 pl-4">
            <button
              onClick={()=>setShowLoginModal(!showLoginModal)}
              className="text-[#36A85C] bg-white px-4 py-1 rounded text-sm font-semibold"
            >
              Employer Login
            </button>

            <button
              onClick={() => setShowLoginModal(true)}
              className="bg-[#36A85C] text-white px-4 py-1 rounded text-sm font-semibold"
            >
              Candidate Login
            </button>
          </div>
        </div>
      </nav>

      {showLoginModal && <CandidateLoginModal
              mobile= {mobile}
              setMobile={setMobile}
              onClose={() => {
                setShowLoginModal(false)
              }
            }
              onSubmit={()=>{
                setShowOtp(true)
              }
            }
              
            />}
      
            {showOtp && <OtpModal mobile={mobile} onClose={()=>setShowOtp(false)}/>}

      
    </>
  );
}
