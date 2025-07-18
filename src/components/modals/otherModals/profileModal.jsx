import { useEffect, useState } from "react";
import {
  X,
  Phone,
  MessageCircle,
  FileText,
  Eye,
  MapPin,
  Briefcase,
  GraduationCap,
  Check,
} from "lucide-react";
import { showErrorToast, showSuccessToast } from "../../ui/toast";
import { fetchJobsById } from "../../../Redux/getData";
import { useDispatch } from "react-redux";
import { updateApplication } from "../../../API/ApiFunctions";
import { handlestring } from "../../../utils/functions";
import { Tooltip } from "@mui/material";

const ProfileModal = ({
  open,
  onClose,
  jobId,
  candidate,
  phone,
  isDatabase,
  id,
  status,
}) => {
  const [age, setAge] = useState(0);
  const dispatch = useDispatch()

  // Keep all your existing logic
  const handleReject = async (id) => {
    
    const response = await updateApplication(id, { status: "Rejected" });
    if (response) {
      showSuccessToast("Successfully Rejected");
      dispatch(fetchJobsById(jobId));
    } else {
      showErrorToast("Could not process, Try again!");
    }
  };

  const handleShortList = async (id) => {
    const response = await updateApplication(id, { status: "Selected" });
    if (response) {
      showSuccessToast("Successfully Shortlisted");
      dispatch(fetchJobsById(jobId));
    } else {
      showErrorToast("Could not process, Try again!");
    }
  };

   const whatsApp = (name, number) => {
  const message = `Hey ${name}, I got your number through Unigrow Talent.`;
  const url = `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
  window.open(url, '_blank');
};

const call = (number) => {
  window.location.href = `tel:${number}`;
};


  useEffect(() => {
    const dob = candidate?.dob;
    const years = dob.split("-")[0];
    const currentYear = new Date().getFullYear();
    setAge(currentYear - years);
  }, []);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="relative bg-white rounded-xl shadow-xl w-full max-w-4xl max-h-[95vh] overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#003B70] to-[#0784C9] p-5 text-white">
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-white/20 rounded-lg flex items-center justify-center text-xl font-bold">
                {candidate.fullName.split("")[0].toUpperCase()}
              </div>
              <div>
                <h1 className="text-xl font-bold mb-1">{candidate.fullName}</h1>
                <div className="text-white/90 text-sm">
                  {candidate.gender? candidate.gender: "N/A"}, {age && `${age} years,`}  {candidate?.salary && `• ₹ ${candidate?.salary}"/mo.`} 
                  {candidate.currentLocation}
                </div>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="p-5 grid lg:grid-cols-3 gap-5 max-h-[65vh] overflow-y-auto">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-4">
            {/* Work Experience */}
            <div className="bg-[#dff3f9]/50 rounded-lg p-4 border border-[#0784C9]/20">
              <div className="flex items-center gap-2 mb-3">
                <Briefcase className="w-4 h-4 text-[#003B70]" />
                <h3 className="text-base font-semibold text-[#003B70]">
                  Work Experience
                </h3>
              </div>
              <div className="space-y-3">
                {(candidate.EmployeeExperiences.length >0) ?candidate.EmployeeExperiences?.map((experience, index) => (
                  <div key={index} className="bg-white rounded-lg p-3">
                    <div className="font-medium text-[#003B70] text-sm">
                      {experience.jobTitle}
                    </div>
                    <div className="text-[#0784C9] text-sm">
                      {experience.companyName}
                    </div>
                    <div className="text-[#6A6A6A] text-xs">
                      {experience.startDate} - {experience.endDate}
                    </div>
                  </div>
                )): <p className="text-gray-500">No Experience provided</p>}
              </div>
            </div>

            {/* Education */}
            <div className="bg-[#dff3f9]/50 rounded-lg p-4 border border-[#0784C9]/20">
              <div className="flex items-center gap-2 mb-3">
                <GraduationCap className="w-4 h-4 text-[#003B70]" />
                <h3 className="text-base font-semibold text-[#003B70]">
                  Education
                </h3>
              </div>
              <div className="space-y-3">
                {(candidate.EmployeeEducations.length > 0) ? candidate.EmployeeEducations?.map((edu, index) => (
                  <div key={index} className="bg-white rounded-lg p-3">
                    <div className="font-medium text-[#003B70] text-sm">
                      {edu?.degree && `${edu.degree},`} {edu.specialization}
                    </div>
                    <div className="text-[#0784C9] text-sm">
                      {edu.instituteName}
                    </div>
                    <div className="text-[#6A6A6A] text-xs">
                      {edu.startDate?.split("-")[0]} -{" "}
                      {edu.endDate?.split("-")[0]}
                    </div>
                  </div>
                )): <p className="text-gray-500">No Education provided</p>}
              </div>
            </div>

            {/* Skills & Languages */}
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-[#dff3f9]/50 rounded-lg p-4 border border-[#0784C9]/20">
                <h3 className="text-sm font-semibold text-[#003B70] mb-3">
                  Skills
                </h3>
                <div className="flex flex-wrap gap-1">
                  {(Array.isArray(candidate.skills)
                    ? candidate.skills
                    : JSON.parse(candidate.skills || "[]")
                  )?.map((skill, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-1 bg-[#003B70] text-white rounded text-xs"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="bg-[#dff3f9]/50 rounded-lg p-4 border border-[#0784C9]/20">
                <h3 className="text-sm font-semibold text-[#003B70] mb-3">
                  Languages
                </h3>
                <div className="flex flex-wrap gap-1">
                  <span className="px-2 py-1 bg-[#0784C9] text-white rounded text-xs">
                    English ({candidate.englishProficiency})
                  </span>
                  {(Array.isArray(candidate.otherLanguages)
                    ? candidate.otherLanguages
                    : JSON.parse(candidate.otherLanguages || "[]")
                  )?.map((lang, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-1 bg-[#dff3f9] text-[#003B70] border border-[#0784C9]/30 rounded text-xs"
                    >
                      {lang}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Contact & Resume */}
            <div className="bg-gradient-to-br from-[#003B70] to-[#0784C9] rounded-2xl p-6 text-white shadow-lg">
              <h3 className="text-lg font-bold mb-4">Contact & Resume</h3>

              <div className="space-y-4">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 w-50">
                  <div className="text-white/80 text-sm mb-1">Email</div>
                  <div className="font-small w-[70]"><Tooltip title={candidate?.email}>{handlestring(candidate.email, 15) }</Tooltip></div>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-white/80 text-sm mb-1">Resume</div>
                      <div className="font-medium text-sm">
                        {candidate.resumeURL?.split("/").pop() || "No resume"}
                      </div>
                    </div>
                    <button
                      onClick={()=>{
                        if(candidate.resumeURL){
                              window.open(candidate.resumeURL, "_blank");
                        }else{
                            showErrorToast('Resume not uploaded')
                        }
                      }}
                      className="p-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors"
                    >
                      <Eye className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Preferences */}
            <div className="bg-gradient-to-br from-[#dff3f9] to-white rounded-2xl p-6 border border-[#0784C9]/20 shadow-lg">
              <h3 className="text-lg font-bold text-[#003B70] mb-4">
                Preferences
              </h3>

              <div className="space-y-4">
                <div>
                  <div className="text-[#6A6A6A] text-sm font-medium mb-2">
                    Shifts
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {(Array.isArray(candidate.preferredShifts)
                      ? candidate.preferredShifts
                      : JSON.parse(candidate.preferredShifts || "[]")
                    )?.map((shift, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 bg-[#dff3f9] text-[#003B70] rounded-lg text-xs border border-[#0784C9]/20"
                      >
                        {shift}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="text-[#6A6A6A] text-sm font-medium mb-2">
                    Job Types
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {(Array.isArray(candidate.prefferedEmploymentTypes)
                      ? candidate.prefferedEmploymentTypes
                      : JSON.parse(candidate.prefferedEmploymentTypes || "[]")
                    )?.map((type, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 bg-[#dff3f9] text-[#003B70] rounded-lg text-xs border border-[#0784C9]/20"
                      >
                        {type}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="text-[#6A6A6A] text-sm font-medium mb-2">
                    Cities
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {(Array.isArray(candidate.preferredJobCity)
                      ? candidate.preferredJobCity
                      : JSON.parse(candidate.preferredJobCity || "[]")
                    )?.map((city, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 bg-[#dff3f9] text-[#003B70] rounded-lg text-xs border border-[#0784C9]/20"
                      >
                        {city}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Application Status */}
            <div className="bg-gradient-to-br from-white to-[#dff3f9] rounded-2xl p-6 border border-[#0784C9]/20 shadow-lg">
              <h3 className="text-lg font-bold text-[#003B70] mb-4">
                Application
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-[#6A6A6A] text-sm">Applied</span>
                  <span className="text-[#003B70] font-medium">
                    {candidate.appliedAgo}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[#6A6A6A] text-sm">Status</span>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      status === "Selected"
                        ? "bg-green-100 text-green-800"
                        : status === "Rejected"
                          ? "bg-red-100 text-red-800"
                          : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {status || "Pending"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Footer */}
        <div className="border-t border-[#dff3f9] bg-gradient-to-r from-white to-[#dff3f9]/30 p-3">
          <div className="flex flex-wrap gap-4 justify-center ">
            <button onClick={()=>call(phone)} className="flex items-center gap-2 md:px-6 px-2 md:py-3 py-1 bg-secondary text-white rounded-xl hover:bg-primary transition-all duration-200 font-medium shadow-lg hover:shadow-xl hover:scale-105">
              <Phone className="md:w-5 md:h-5 w-6 h-6" />
              <span className="hidden md:flex">Call {phone}</span>
            </button>

            <button onClick={()=>whatsApp(candidate.fullName, phone)} className="flex items-center gap-2 md:px-6 px-2 md:py-3 py-1 bg-secondary text-white rounded-xl hover:bg-primary transition-all duration-200 font-medium shadow-lg hover:shadow-xl hover:scale-105">
              <MessageCircle className="md:w-5 md:h-5 w-6 h-6" />
              <span className="hidden md:flex">WhatsApp</span> 
            </button>

            {!isDatabase && (
      <>
        <button
          onClick={() => handleShortList(id)}
          disabled={status === "Selected"}
          className={`flex items-center gap-2 md:px-6 px-2 md:py-3 py-1 rounded-xl font-medium transition-all duration-200 shadow-lg hover:shadow-xl ${
            status === "Selected"
              ? "bg-green-100 text-green-800 cursor-not-allowed"
              : "bg-[#0784C9] text-white hover:bg-[#003B70] hover:scale-105"
          }`}
        >
          <Check className="md:w-5 md:h-5 w-6 h-6" />
          <span className="hidden md:flex">Shortlist</span>
        </button>

        <button
          onClick={() => handleReject(id)}
          disabled={status === "Rejected"}
          className={`flex items-center gap-2 md:px-6 px-2 md:py-3 py-1 rounded-xl font-medium transition-all duration-200 shadow-lg hover:shadow-xl ${
            status === "Rejected"
              ? "bg-red-100 text-red-800 cursor-not-allowed"
              : "bg-red-600 text-white hover:bg-red-700 hover:scale-105"
          }`}
        >
          <X className="md:w-5 md:h-5 w-6 h-6" />
          <span className="hidden md:flex">Reject</span>
        </button>
      </>
    )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileModal;
