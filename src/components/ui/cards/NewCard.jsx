import React, { useEffect, useState } from "react";
import "../cards/NewCard.css";
import Avatar from "@mui/material/Avatar";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import {
  BriefcaseBusiness,
  IndianRupee,
  Languages,
  MapPin,
  School,
  ShipWheel,
  Paperclip,
} from "lucide-react";
import { Button, Chip } from "@mui/material";
import { updateApplication } from "../../../API/ApiFunctions";
import { showErrorToast, showSuccessToast } from "../toast";
import ProfileModal from "../../modals/otherModals/profileModal";

function useWindowWidth() {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return width;
}

const DetailRow = ({ logo, label, value }) => (
  <div className="flex justify-center w-full gap-20">
    <div className="flex flex-row items-center gap-2.5 w-1/5 text-gray-600">
      <div className="text-gray-400">{logo}</div>
      <div className=" text-left font-semibold text-gray-400">{label}</div>
    </div>

    <div className="w-2/3 text-gray-900 text-left">{value}</div>
  </div>
);

export default function SimplePaper({ job, candidate, candidateStatus, setCandidateStatus }) {
  const width = useWindowWidth();
  const isMobile = width <= 768;
  const [matchingFields, setMatchedField] = useState([]);
  const [matchingPrecent, setMatchingPrecent] = useState(0);
  const [openProfileModal, setOpenProfileModal] = useState(false);

  useEffect(() => {
    if (!job || !candidate) return;
    console.log(job, candidate)
    const totalFields = Object.keys(job).length;
    let matchedCount = 0;

    for (const key in job) {
      if (candidate[key] !== undefined) {
        // For string/number matching
        if (typeof job[key] === 'string' || typeof job[key] === 'number') {
          if (job[key] === candidate.EmployeeProfile[key]) {
            matchedCount++;
            setMatchedField((prev) => [...prev, key])
          }
        }
        // For arrays (like skills or tools)
        else if (Array.isArray(job[key]) && Array.isArray(candidate[key])) {
          const intersection = job[key].filter(val => candidate.EmployeeProfile[key].includes(val));
          if (intersection.length > 0) {
            matchedCount++;
            setMatchedField((prev) => [...prev, key])
          }
        }
        // Add more logic if needed (e.g. objects, nested fields)
      }
    }

    const matchPercentage = Math.round((matchedCount / totalFields) * 100);
    setMatchingPrecent(matchPercentage)


  }, [candidate, job]);


  const handleReject = async (id) => {
    console.log(id)
    const response = await updateApplication(id, { status: "Rejected" });
    if (response) {
      showSuccessToast("succesfully Rejected")
      setCandidateStatus(id, "Rejected")
    } else {
      showErrorToast("could not processed, Try again!")
    }
  }

  const handleShortList = async (id) => {
    const response = await updateApplication(id, { status: "Selected" });
    if (response) {
      showSuccessToast("succesfully Shortlisted")
      setCandidateStatus(id, "Selected")
    } else {
      showErrorToast("could not processed, Try again!")
    }
  }

  return (
    <>
      {isMobile ? (
        <>
          <div className="mobileCardWrapper border rounded-md border-gray-400">
            <div className="flex mt-2 mb-2 mr-2">
              <div className="flex gap-4">
                <input type="checkbox" className="ml-4" />

                <Avatar sx={{ bgcolor: "#ff5722" }}> {candidate?.EmployeeProfile.fullName
                  .split(' ')
                  .map(word => word[0])
                  .slice(0, 2)
                  .join('')
                  .toUpperCase()}</Avatar>
              </div>
              <div className=" flex w-full justify-between items-center ml-4">
                <div>
                  <strong>{candidate?.EmployeeProfile.fullName}</strong>
                </div>
                <div>
                  <Chip
                    icon={<LockOpenIcon size={15} />}
                    label=" "
                    size="small"
                  />
                </div>
              </div>
            </div>
            <div className="flex line-info  w-full items-center justify-between pt-2 pb-2  gap-2">
              <div className="flex flex-col items-center flex-wrap gap-1 ml-3">
                <BriefcaseBusiness size={18} />
                <p>{candidate?.EmployeeProfile.TotalExperience?.years} years {candidate?.EmployeeProfile.TotalExperience?.months} months</p>
              </div>
              <div></div>
              <div className="flex flex-col items-center flex-wrap gap-1 ">
                <IndianRupee size={18} />
                <p>{candidate?.EmployeeProfile.salary}</p>
              </div>
              <div></div>
              <div className="flex flex-col items-center flex-wrap gap-1 mr-3">
                <MapPin size={18} />
                <p>{candidate?.EmployeeProfile.currentLocation}</p>
              </div>
            </div>

            <button onClick={()=> setOpenProfileModal(true)} className="flex w-full justify-start m-4 font-bold cursor-pointer text-sm text-green-500">View Profile</button>
              

            <div className="mid-info ml-3 mr-3 mt-3">
              <div className="flex flex-col">
                <div className="flex items-center gap-2 flex-nowrap whitespace-nowrap mb-2">
                  <span className="text-gray-400">
                    <BriefcaseBusiness size={16} />
                  </span>
                  <div className="text-gray-400 font-semibold" >Current/Previous Work</div>
                </div>
                <div className="flex flex-col  flex-wrap gap-x-4 gap-y-2 pl-2 ">
                  {/* Item 1 */}
                  <div className="flex items-start relative ">
                    <div className="w-2 h-2 bg-gray-400 rounded-full absolute -left-1 top-1" />
                    {candidate?.EmployeeProfile.EmployeeExperiences[0] && <p className="mobile-current-work">
                      {candidate?.EmployeeProfile.EmployeeExperiences[0].jobTitle} at {candidate?.EmployeeProfile.EmployeeExperiences[0].companyName}
                    </p>}
                  </div>

                  {/* Item 2 */}
                  <div className="flex items-start relative">
                    <div className="w-2 h-2 bg-gray-400 rounded-full absolute -left-1 top-1" />
                    {candidate?.EmployeeProfile.EmployeeExperiences[1] && <p className="mobile-current-work">
                      {candidate?.EmployeeProfile.EmployeeExperiences[1].jobTitle} at {candidate?.EmployeeProfile.EmployeeExperiences[1].companyName}
                    </p>}
                  </div>
                </div>
              </div>
              <div className="flex flex-col mt-2">
                <div className="flex items-center gap-2 flex-nowrap whitespace-nowrap mb-2">
                  <span className="text-gray-400">
                    <School size={18} />
                  </span>
                  <div className="text-gray-400 font-semibold">Education</div>
                </div>
                {candidate?.EmployeeProfile.EmployeeEducations[0] && <div className="mobile-education">
                  {candidate?.EmployeeProfile.EmployeeEducations[0].degree}, {candidate?.EmployeeProfile.EmployeeEducations[0].specialization}, {candidate?.EmployeeProfile.EmployeeEducations[0].instituteName}
                </div>}
              </div>

              <div>
                <div className="flex flex-col mt-2">
                  <div className="flex items-center gap-2 flex-nowrap whitespace-nowrap mb-2">
                    <span className="text-gray-400">
                      <MapPin size={18} />
                    </span>
                    <div className="text-gray-400 font-semibold">Pref. Location</div>
                  </div>

                  <div className="mobile-location">
                    {candidate?.EmployeeProfile.preferredJobCity && JSON.parse(candidate?.EmployeeProfile.preferredJobCity).map((city, index) => (
                      <Chip key={index} label={city} size="small" />
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex flex-col mt-2">
                <div className="flex items-center gap-2 flex-nowrap whitespace-nowrap mb-2">
                  <span className="text-gray-400">
                    <ShipWheel size={18} />
                  </span>
                  <div className="text-gray-400 font-semibold">Skills</div>
                </div>

                <div className="mobile-location">
                  {candidate?.EmployeeProfile.skills && JSON.parse(candidate?.EmployeeProfile.skills).map((skill, index) => (
                    <Chip key={index} label={skill} size="small" />
                  ))}
                </div>
              </div>
              <div className="flex flex-col mt-2">
                <div className="flex items-center gap-2 flex-nowrap whitespace-nowrap mb-2">
                  <span className="text-gray-400">
                    <Languages size={18} />
                  </span>
                  <div className="text-gray-400 font-semibold">Languages</div>
                </div>
                <div className="mobile-education  ">
                  English ({candidate?.EmployeeProfile.englishProficiency})
                  <div className="flex flex-row gap-4 mt-4 mb-2">

                    {candidate?.EmployeeProfile.otherLanguages && JSON.parse(candidate?.EmployeeProfile.otherLanguages).map((language, index) => (
                      <Chip key={index} label={language} size="small" />
                    ))}
                  </div>
                </div>
              </div>
              <div className="mobile-contact-button">
                <Button
                  variant="contained"
                  size="small"
                  sx={{
                    fontSize: {
                      xs: "12px", // small screen
                      sm: "12px", // small-medium
                      md: "15px", // default
                    },
                    padding: {
                      xs: "4px 8px",
                      sm: "6px 12px",
                    },
                  }}
                >
                  <div>View Phone Number</div>
                </Button>
              </div>


              <div className="flex flex-row gap-4 w-full justify-end">
                <Button variant="outlined" onClick={() => handleShortList(candidate.id)} disabled={candidateStatus === "Selected"} color="success">{(candidateStatus === "Selected") ? "Shortlisted" : "ShortList"}</Button>
                <Button variant="contained" onClick={() => handleReject(candidate.id)} disabled={candidateStatus === "Rejected"} color="error">{(candidateStatus === "Rejected") ? "Rejected" : "Reject"}</Button>
              </div>
            </div>

          </div>
          <div className="mobile-card-bottom-section text-xs ">

            <div className="flex flex-row gap-1">
              <div className="flex flex-row items-center">
                <span>

                  <Paperclip size={12} />
                </span>
                {candidate?.EmployeeProfile.resumeURL?"Cv Attached": "Cv Not attached"}
              </div>
              |<div>Active on {candidate?.EmployeeProfile.updatedAt.split("T")[0]}</div>
            </div>
          </div>
        </>
      ) : (
        <div className="mb-4 mr-2 w-full  border border-black-500 rounded-lg">
          <div className="card-wrapper">
            <div className="custom-card">
              <label>
                <input type="checkbox" className="corner-checkbox" />
              </label>
              <div className="card-top-section">
                <div className="left-avatar-section">
                  <Avatar sx={{ bgcolor: "#ff5722" }}> {candidate?.EmployeeProfile.fullName
                    .split(' ')
                    .map(word => word[0])
                    .slice(0, 2)
                    .join('')
                    .toUpperCase()}</Avatar>
                </div>
                <div className="right-info-section">
                  <div className="info-section">
                    <div className="candidate-name gap-4">
                      <h1>
                        <strong>{candidate?.EmployeeProfile.fullName}</strong>

                      </h1>
                      <button onClick={() => setOpenProfileModal(true)} className="font-bold cursor-pointer text-sm text-green-500">View Profile</button>
                    </div>
                    <div className="info">
                      <div className="candidate-experience flex flex-row gap-1 items-center">
                        <span className="experience-icon">
                          <BriefcaseBusiness size={16} />
                        </span>
                        <div className="experience">
                          <p>{candidate?.EmployeeProfile.TotalExperience?.years} years {candidate?.EmployeeProfile.TotalExperience?.months} months</p>
                        </div>
                      </div>
                      <div className="candidate-salary flex flex-row gap-1 items-center">
                        <span className="salary-icon">
                          <IndianRupee size={16} />
                        </span>
                        <div className="salary">
                          <p>{candidate?.EmployeeProfile.salary}</p>
                        </div>
                      </div>
                      <div className="candidate-current-location flex flex-row gap-1 items-center">
                        <span className="location-icon">
                          <MapPin size={16} />
                        </span>
                        <div className="location">
                          <p>{candidate?.EmployeeProfile.currentLocation}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="unlock-badge-section">
                    <Chip label="Unlocked" size="small" />
                  </div>

                  <div className="unlock-badge-section">
                    <Chip label={`${matchingPrecent}% matched`} size="small" />
                  </div>
                </div>
              </div>

              <div className="mid-section flex flex-col mt-5 gap-2 self-center w-full">

                {candidate?.EmployeeProfile.EmployeeExperiences[0] && <DetailRow
                  logo={<BriefcaseBusiness size={18} />}
                  label="Current"
                  value={`${candidate?.EmployeeProfile.EmployeeExperiences[0].jobTitle} at ${candidate?.EmployeeProfile.EmployeeExperiences[0].companyName}`}
                />}
                {candidate?.EmployeeProfile.EmployeeExperiences[1] &&
                  <DetailRow
                    logo={<BriefcaseBusiness size={18} />}
                    label="Previous"
                    value={`${candidate?.EmployeeProfile.EmployeeExperiences[1].jobTitle} at ${candidate?.EmployeeProfile.EmployeeExperiences[1].companyName}`}
                  />
                }

                <DetailRow
                  logo={<School size={18} />}
                  label="Education"
                  value={`${candidate?.EmployeeProfile.EmployeeEducations[0]?.degree}, ${candidate?.EmployeeProfile.EmployeeEducations[0]?.specialization}, ${candidate?.EmployeeProfile.EmployeeEducations[0]?.instituteName}`}
                />
                <DetailRow
                  logo={<MapPin size={18} />}
                  label="Pef. Location"
                  value={candidate?.EmployeeProfile.preferredJobCity && JSON.parse(candidate?.EmployeeProfile.preferredJobCity).map((city, index) => (
                    <span key={index} className="mr-4">{city}</span>
                  ))}
                />
                <DetailRow
                  logo={<ShipWheel size={18} />}
                  label="Skills"
                  value={candidate?.EmployeeProfile.skills && JSON.parse(candidate?.EmployeeProfile.skills).map((skill, index) => (
                    <span key={index} className="mr-4">{skill}</span>
                  ))}
                />
                <DetailRow
                  logo={<Languages size={18} />}
                  label="Languages"
                  value={`English (${candidate?.EmployeeProfile.englishProficiency})`}
                />
                <DetailRow
                  logo={<Languages size={18} />}
                  label="Other Languages"
                  value={candidate?.EmployeeProfile.otherLanguages && JSON.parse(candidate?.EmployeeProfile.otherLanguages).map((language, index) => (
                    <span key={index} className="mr-4">{language}</span>
                  ))}
                />

                <DetailRow
                  logo={<Languages size={18} />}
                  label="Matching Crerterion"
                  value={(matchingFields).map((language, index) => (
                    <span key={index} className="mr-4">{language}</span>
                  ))}
                />
                <div className="flex flex-row justify-between">
                  <div className="flex">
                    <Button
                      variant="contained"
                      size="small"
                      sx={{
                        fontSize: {
                          xs: "10px", // small screen
                          sm: "12px", // small-medium
                          md: "15px", // default
                        },
                        padding: {
                          xs: "4px 8px",
                          sm: "6px 12px",
                        },
                      }}
                    >
                      <div>View Phone Number</div>
                    </Button>
                  </div>

                  <div className="flex flex-row gap-4 ">
                    <Button variant="outlined" onClick={() => handleShortList(candidate.id)} disabled={candidateStatus === "Selected"} color="success">{(candidateStatus === "Selected") ? "Shortlisted" : "ShortList"}</Button>
                    <Button variant="contained" onClick={() => handleReject(candidate.id)} disabled={candidateStatus === "Rejected"} color="error">{(candidateStatus === "Rejected") ? "Rejected" : "Reject"}</Button>
                  </div>
                </div>

              </div>
            </div>
          </div>
          <div className="card-bottom-section text-xs ">
            <div className="flex flex-row gap-1 ">
              <div>29 unlocks</div>|<div>Proile Unlocked</div>
            </div>
            <div className="flex flex-row gap-1">
              <div className="flex flex-row items-center">
                <span>

                  <Paperclip size={12} />
                </span>
                {candidate?.EmployeeProfile.resumeURL? "Cv Attached": "Cv not Attached"}
              </div>
              |<div>Active on {candidate?.EmployeeProfile.updatedAt.split("T")[0]}</div>
            </div>
          </div>
        </div>
      )}

      {openProfileModal && (
        <ProfileModal open={openProfileModal} onClose={()=>setOpenProfileModal(false)} candidate={candidate} candidateStatus={candidateStatus} setCandidateStatus={setCandidateStatus} />
      )}
    </>
  );
}
