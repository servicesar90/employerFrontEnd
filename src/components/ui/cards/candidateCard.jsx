import { useCallback, useEffect, useState } from "react";
import "../cards/NewCard.css";
import Avatar from "@mui/material/Avatar";

import {
  BriefcaseBusiness,
  IndianRupee,
  Languages,
  MapPin,
  School,
  ShipWheel,
  Paperclip,
  Database,
} from "lucide-react";
import { Button, Chip } from "@mui/material";
import {
  getPhonenumber,
  getProfileFunc,
  getUnlockedByIdFunc,
  updateApplication,
} from "../../../API/ApiFunctions";
import { showErrorToast, showSuccessToast } from "../toast";
import ProfileModal from "../../modals/otherModals/profileModal";
import { useDispatch, useSelector } from "react-redux";
import { fetchJobsById } from "../../../Redux/getData";

function useWindowWidth() {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
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

export default function SimpleNewPaper({ candidate }) {
  const width = useWindowWidth();
  const isMobile = width <= 768;
  const [openProfileModal, setOpenProfileModal] = useState(false);
  const [unlocked, setUnlocked] = useState(false);
  const [profile, setProfile] = useState(null)

  const [candidateDetail, setCandidateDetail] = useState(null);
  

  const { employer, unlockedData,searchedData } = useSelector((state) => state.getDataReducer);

   useEffect(() => {
    
     setProfile(candidate?.EmployeeProfile)

    if(unlockedData){
       const unlocked = unlockedData?.some(
          (dat) => dat?.user_id === candidate.user_id
        );

        setUnlocked(unlocked)
     
    }

    if(unlockedData){
      setProfile(candidate?.EmployeeProfile)
    }else if(searchedData){
      setProfile(candidate)
    }else{
      setProfile(null)
    }

   
       

        
      }, [unlockedData, candidate]);



  

  const handleViewPhone = async () => {
    if (!candidate) return;

    try {
      if (!unlocked) {
        const data = {
          employeeId: profile?.user_id,
          jobId: null,
          company: employer?.company?.companyName,
          job: jobTitle,
        };

        const response = await getPhonenumber(data);

        if (response) {
          setProfile((prev) => ({ ...prev, number: response }));
        }
      } else {
        const number = profile?.User?.phone || "";
        setProfile((prev) => ({ ...prev, number }));
      }
    } catch (error) {
      showErrorToast("Error fetching phone number");
    }
  };

  const getProfile = async () => {
    if (profile) {
      if (unlocked) {
        setCandidateDetail(candidate);
      } else {
        const data = {
          employeeId: profile?.user_id,
          jobId: null,
          company: employer?.company?.companyName,
          job: jobTitle,
        };
       
        const response = await getProfileFunc(data);
        if (response) {
          setCandidateDetail(response);
        } else {
          showErrorToast("could not get profile");
        }
      }
      setOpenProfileModal(true);
    }
  };

  console.log(profile)

  return (
    <>
      {isMobile ? (
        <>
          <div className="mobileCardWrapper border rounded-lg bg-white border">
            <div className="flex mt-2 mb-2 mr-2">
              <div className="flex gap-4">
                <Avatar sx={{ bgcolor: "#ff5722" }}>
                  {" "}
                  {profile?.fullName && profile?.fullName
                    .split(" ")
                    .map((word) => word[0])
                    .slice(0, 2)
                    .join("")
                    .toUpperCase()}
                </Avatar>
              </div>
              <div className=" flex w-full justify-between items-center ml-4">
                <div>
                  <p className="text-16 font-semibold text-gray-800">
                    {profile?.fullName || "N/A"}
                  </p>
                </div>
                {profile?.unlocked && (
                  <div>
                    <Chip
                      label={
                        <span className="text-white text-12">unlocked</span>
                      }
                      size="small"
                      sx={{ backgroundColor: "#0784C9" }}
                    />
                  </div>
                )}
              </div>
            </div>
            <div className="flex line-info  w-full items-center justify-between pt-2 pb-2  gap-2">
              <div className="flex flex-col items-center flex-wrap gap-1 ml-3">
                <BriefcaseBusiness size={18} className="text-secondary" />
                {profile?.TotalExperience?.years ? (
                  <p className="text-14 text-gray-650">
                    {profile?.TotalExperience?.years} years{" "}
                    {profile?.TotalExperience?.months} months
                  </p>
                ) : (
                  <p>N/A</p>
                )}
              </div>
              <div></div>
              <div className="flex flex-col items-center flex-wrap gap-1 ">
                <IndianRupee size={18} className="text-secondary" />
                <p className="text-14 text-gray-650">
                  {profile?.salary || "N/A"}
                </p>
              </div>
              <div></div>
              <div className="flex flex-col items-center flex-wrap gap-1 mr-3">
                <MapPin size={18} className="text-secondary" />
                <p className="text-14 text-gray-650">
                  {profile?.currentLocation || "N/A"}
                </p>
              </div>
            </div>

            <button
              onClick={() => getProfile()}
              className="flex w-full justify-start m-4 font-bold cursor-pointer text-sm text-green-500"
            >
              View Profile
            </button>

            <div className="mid-info ml-3 mr-3 mt-3">
              <div className="flex flex-col">
                <div className="flex items-center gap-2 flex-nowrap whitespace-nowrap mb-2">
                  <span className="text-gray-400">
                    <BriefcaseBusiness size={16} className="text-secondary" />
                  </span>
                  <div className="text-gray-800 font-semibold text-14">
                    Current/Previous Work
                  </div>
                </div>

                <div className="flex flex-col flex-wrap gap-x-4 gap-y-2 pl-2">
                  {/* Item 1 - Current */}
                  <div className="flex items-start relative">
                    <div className="w-2 h-2 bg-gray-400 rounded-full absolute -left-1 top-1" />
                    <p className="mobile-current-work">
                      {profile?.EmployeeExperiences?.[0] ? (
                        `${profile?.EmployeeExperiences[0].jobTitle} at ${profile?.EmployeeExperiences[0].companyName}`
                      ) : (
                        <span className="text-14 text-gray-650">
                          Not Provided
                        </span>
                      )}
                    </p>
                  </div>

                  {/* Item 2 - Previous */}
                  <div className="flex items-start relative">
                    <div className="w-2 h-2 bg-gray-400 rounded-full absolute -left-1 top-1" />
                    <p className="mobile-current-work">
                      {profile?.EmployeeExperiences?.[1] ? (
                        `${profile?.EmployeeExperiences[1].jobTitle} at ${profile?.EmployeeExperiences[1].companyName}`
                      ) : (
                        <span className="text-14 text-gray-650">
                          Not Provided
                        </span>
                      )}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col mt-2">
                <div className="flex items-center gap-2 flex-nowrap whitespace-nowrap mb-2">
                  <span className="text-gray-400">
                    <School size={18} className="text-secondary" />
                  </span>
                  <div className="text-gray-800 font-semibold text-14">
                    Education
                  </div>
                </div>
                <div className="mobile-education text-14 text-gray-650">
                  {profile?.EmployeeEducations?.[0]?.degree ||
                  profile?.EmployeeEducations?.[0]?.specialization ||
                  profile?.EmployeeEducations?.[0]?.instituteName ? (
                    <>
                      {profile?.EmployeeEducations[0].degree || ""}{" "}
                      {profile?.EmployeeEducations[0].specialization || ""}{" "}
                      {profile?.EmployeeEducations[0].instituteName || ""}
                    </>
                  ) : (
                    "Not Provided"
                  )}
                </div>
              </div>

              <div>
                <div className="flex flex-col mt-2">
                  <div className="flex items-center gap-2 flex-nowrap whitespace-nowrap mb-2">
                    <span className="text-gray-400">
                      <MapPin size={18} className="text-secondary" />
                    </span>
                    <div className="text-gray-800 font-semibold text-14">
                      Pref. Location
                    </div>
                  </div>

                  <div className="mobile-location text-14 text-gray-650 flex flex-wrap gap-2">
                    {(() => {
                      let cities = profile?.preferredJobCity;

                      if (typeof cities === "string") {
                        try {
                          cities = JSON.parse(cities);
                        } catch {
                          cities = [];
                        }
                      }

                      if (Array.isArray(cities) && cities.length > 0) {
                        return cities.map((city, index) => (
                          <Chip
                            key={index}
                            label={city}
                            size="small"
                            sx={{
                              backgroundColor: "#E0F2FE", // light blue
                              color: "gray", // text
                              fontSize: "12px",
                              padding: "2px 4px",
                              fontWeight: 500,
                              borderRadius: "8px",
                            }}
                          />
                        ));
                      }

                      return (
                        <span className="text-14 text-gray-650">
                          Not Provided
                        </span>
                      );
                    })()}
                  </div>
                </div>
              </div>

              <div className="flex flex-col mt-2">
                <div className="flex items-center gap-2 flex-nowrap whitespace-nowrap mb-2">
                  <span className="text-gray-400">
                    <ShipWheel size={18} className="text-secondary" />
                  </span>
                  <div className="text-gray-800 font-semibold text-14">
                    Skills
                  </div>
                </div>

                <div className="mobile-location text-14 text-gray-650 flex flex-wrap gap-2">
                  {(() => {
                    let skills = profile?.skills;

                    if (typeof skills === "string") {
                      try {
                        skills = JSON.parse(skills);
                      } catch {
                        skills = [];
                      }
                    }

                    if (Array.isArray(skills) && skills.length > 0) {
                      return skills.map((skill, index) => (
                        <Chip
                          key={index}
                          label={skill}
                          size="small"
                          sx={{
                            backgroundColor: "#E0F2FE", // light blue
                            color: "gray", // text
                            fontSize: "12px",
                            padding: "2px 4px",
                            fontWeight: 500,
                            borderRadius: "8px",
                          }}
                        />
                      ));
                    }

                    return (
                      <span className="text-14 text-gray-650">
                        Not Provided
                      </span>
                    );
                  })()}
                </div>
              </div>
              <div className="flex flex-col mt-2">
                <div className="flex items-center gap-2 flex-nowrap whitespace-nowrap mb-2">
                  <span className="text-gray-400">
                    <Languages size={18} className="text-secondary" />
                  </span>
                  <div className="text-gray-800 font-semibold text-14">
                    Languages
                  </div>
                </div>
                <div className="mobile-education text-14 text-gray-650   ">
                  English ({profile?.englishProficiency})
                  <div className="flex flex-row gap-1 mt-4 mb-2">
                    {(() => {
                      let langs = profile?.otherLanguages;

                      if (typeof langs === "string") {
                        try {
                          langs = JSON.parse(langs);
                        } catch {
                          langs = [];
                        }
                      }

                      if (Array.isArray(langs) && langs.length > 0) {
                        return langs.map((language, index) => (
                          <Chip
                            key={`lang-${index}`}
                            label={language}
                            size="small"
                            sx={{
                              backgroundColor: "#E0F2FE",
                              color: "gray",
                              fontSize: "12px",
                              padding: "2px 4px",
                              fontWeight: 500,
                              borderRadius: "8px",
                            }}
                          />
                        ));
                      }

                      return (
                        <span className="text-14 text-gray-650">
                          Not Provided
                        </span>
                      );
                    })()}

                    {candidate?.matchedField?.map((skill, index) => (
                      <Chip
                        key={index}
                        label={skill}
                        size="small"
                        sx={{
                          backgroundColor: "#E0F2FE",
                          color: "gray",
                          fontSize: "12px",
                          padding: "2px 1px",
                          fontWeight: 500,
                          borderRadius: "8px",
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>
              <div className="mobile-contact-button">
                <Button
                  variant={profile?.number ? "outlined" : "contained"}
                  size="small"
                  onClick={handleViewPhone}
                  sx={{
                    fontSize: {
                      xs: "12px",
                      sm: "12px",
                      md: "15px",
                    },
                    padding: {
                      xs: "4px 8px",
                      sm: "6px 12px",
                    },
                  }}
                >
                  <div>
                    {profile?.number ? profile?.number : "View Phone Number"}
                  </div>
                </Button>
              </div>

            
            </div>
          </div>
          <div className="mobile-card-bottom-section text-xs bg-white border-l border-r ">
            <div className="flex flex-row gap-1">
              <div className="flex flex-row items-center">
                <span>
                  <Paperclip size={12} className="text-gray-650 text-12" />
                </span>
                <span className="text-gray-650 text-12">
                  {profile?.resumeURL ? "Cv Attached" : "Cv Not attached"}
                </span>
              </div>
              <span className="text-gray-650 text-12">|</span>
              <div className="text-gray-650 text-12">
                Active on {profile?.updatedAt.split("T")[0]}
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className=" mr-2 w-full  border rounded-lg ">
          <div className="card-wrapper">
            <div className="custom-card border  ">
              <label></label>
              <div className="card-top-section">
                <div className="left-avatar-section">
                  <Avatar sx={{ bgcolor: "#ff5722" }}>
                    {" "}
                    {profile?.fullName
                      .split(" ")
                      .map((word) => word[0])
                      .slice(0, 2)
                      .join("")
                      .toUpperCase()}
                  </Avatar>
                </div>
                <div className="right-info-section">
                  <div className="info-section">
                    <div className="candidate-name gap-4">
                      <h1>
                        <p className="text-16 font-semibold text-gray-800">
                          {profile?.fullName}
                        </p>
                      </h1>
                      <button
                        onClick={() => getProfile()}
                        className="font-bold cursor-pointer text-sm text-green-500 "
                      >
                        View Profile
                      </button>
                    </div>
                    <div className="info">
                      <div className="candidate-experience flex flex-row gap-1 items-center">
                        <span className="experience-icon">
                          <BriefcaseBusiness
                            size={16}
                            className="text-secondary"
                          />
                        </span>
                        <div className="experience">
                          <p className="text-gray-650 text-14">
                            {profile?.TotalExperience?.years ||
                            profile?.TotalExperience?.months
                              ? `${profile.TotalExperience.years} years ${profile.TotalExperience.months} months`
                              : "N/A"}
                          </p>
                        </div>
                      </div>
                      <div className="candidate-salary flex flex-row gap-1 items-center">
                        <span className="salary-icon">
                          <IndianRupee size={16} className="text-secondary" />
                        </span>
                        <div className="salary">
                          <p className="text-gray-650 text-14">
                            {profile?.salary ? `${profile?.salary}` : "N/A"}
                          </p>
                        </div>
                      </div>
                      <div className="candidate-current-location flex flex-row gap-1 items-center">
                        <span className="location-icon">
                          <MapPin size={16} className="text-secondary" />
                        </span>
                        <div className="location">
                          <p className="text-gray-650 text-14">
                            {profile?.currentLocation
                              ? `${profile?.currentLocation}`
                              : "N/A"}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                
                </div>
              </div>

              <div className="mid-section flex flex-col mt-5 gap-2 self-center w-full">
                <DetailRow
                  logo={
                    <BriefcaseBusiness size={18} className="text-secondary" />
                  }
                  label={
                    <span className="text-14 font-semibold text-gray-650">
                      Current
                    </span>
                  }
                  value={
                    profile?.EmployeeExperiences?.[0] ? (
                      <span className="text-14 text-gray-650">
                        {" "}
                        {profile?.EmployeeExperiences[0].jobTitle} at{" "}
                        {profile?.EmployeeExperiences[0].companyName}
                      </span>
                    ) : (
                      <span className="text-14 text-gray-650">
                        Not Provided
                      </span>
                    )
                  }
                />

                <DetailRow
                  logo={
                    <BriefcaseBusiness size={18} className="text-secondary" />
                  }
                  label={
                    <span className="text-14 font-semibold text-gray-650">
                      Previous
                    </span>
                  }
                  value={
                    profile?.EmployeeExperiences?.[1] ? (
                      <span className="text-14 text-gray-650">
                        {profile?.EmployeeExperiences[1].jobTitle} at $
                        {profile?.EmployeeExperiences[1].companyName}
                      </span>
                    ) : (
                      <span className="text-14 text-gray-650">
                        Not Provided
                      </span>
                    )
                  }
                />

                <DetailRow
                  logo={<School size={18} className="text-secondary" />}
                  label={
                    <span className="text-14 font-semibold text-gray-650">
                      Education
                    </span>
                  }
                  value={
                    profile?.EmployeeEducations?.[0] ? (
                      <span className="text-14 text-gray-650 mr-2">
                        {profile?.EmployeeEducations[0]?.degree || ""}{" "}
                        {profile?.EmployeeEducations[0]?.specialization || ""}{" "}
                        {profile?.EmployeeEducations[0]?.instituteName || ""}
                      </span>
                    ) : (
                      <span className="text-14 text-gray-650">
                        Not Provided
                      </span>
                    )
                  }
                />
                <DetailRow
                  logo={<MapPin size={18} className="text-secondary" />}
                  label={
                    <span className="text-14 font-semibold text-gray-650">
                      Pref. City
                    </span>
                  }
                  value={(() => {
                    let cities = profile?.preferredJobCity;

                    if (typeof cities === "string") {
                      try {
                        cities = JSON.parse(cities);
                      } catch {
                        cities = [];
                      }
                    }

                    if (Array.isArray(cities) && cities.length > 0) {
                      return (
                        <div className="flex flex-wrap gap-2">
                          {cities.map((city, idx) => (
                            <span
                              key={idx}
                              className="px-2 py-1 bg-light rounded-full text-12 text-gray-700"
                            >
                              {city}
                            </span>
                          ))}
                        </div>
                      );
                    }

                    return (
                      <span className="text-14 text-gray-650">
                        Not Provided
                      </span>
                    );
                  })()}
                />

                <DetailRow
                  logo={<ShipWheel size={18} className="text-secondary" />}
                  label={
                    <span className="text-14 font-semibold text-gray-650">
                      Skills
                    </span>
                  }
                  value={(() => {
                    let skills = profile?.skills;

                    if (typeof skills === "string") {
                      try {
                        skills = JSON.parse(skills);
                      } catch {
                        skills = [];
                      }
                    }

                    if (Array.isArray(skills) && skills.length > 0) {
                      return (
                        <div className="flex flex-wrap gap-2">
                          {skills.map((skill, idx) => (
                            <span
                              key={idx}
                              className="px-2 py-1 bg-light rounded-full text-12 text-gray-700"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      );
                    }

                    return (
                      <span className="text-14 text-gray-650">
                        Not Provided
                      </span>
                    );
                  })()}
                />

                <DetailRow
                  logo={<Languages size={18} className="text-secondary" />}
                  label={
                    <span className="text-14 font-semibold text-gray-650">
                      English
                    </span>
                  }
                  value={
                    profile?.englishProficiency ? (
                      <span className="text-14 text-gray-650">
                        {profile?.englishProficiency}
                      </span>
                    ) : (
                      <span className="text-14 text-gray-650">
                        Not Provided
                      </span>
                    )
                  }
                />
                <DetailRow
                  logo={<Languages size={18} className="text-secondary" />}
                  label={
                    <span className="text-14 font-semibold text-gray-650">
                      Languages
                    </span>
                  }
                  value={(() => {
                    let langs = profile?.otherLanguages;

                    if (typeof langs === "string") {
                      try {
                        langs = JSON.parse(langs);
                      } catch {
                        langs = [];
                      }
                    }

                    if (Array.isArray(langs) && langs.length > 0) {
                      return (
                        <div className="flex flex-wrap gap-2">
                          {langs.map((lang, idx) => (
                            <span
                              key={idx}
                              className="px-2 py-1 bg-light rounded-full text-12 text-gray-700"
                            >
                              {lang}
                            </span>
                          ))}
                        </div>
                      );
                    }

                    return (
                      <span className="text-14 text-gray-650">
                        Not Provided
                      </span>
                    );
                  })()}
                />

               
                <div className="flex flex-row justify-between">
                  <div className="flex">
                    <Button
                      variant={profile?.number ? "outlined" : "contained"}
                      size="small"
                      onClick={handleViewPhone}
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
                      <div>
                        {profile?.number
                          ? profile?.number
                          : "View Phone Number"}
                      </div>
                    </Button>
                  </div>

                
                </div>
              </div>
            </div>
          </div>
          <div className="card-bottom-section text-xs border">
            <div className="flex flex-row gap-1 ">
              <div className="text-gray-650 text-12">
                Proile {profile?.unlocked ? "Unlocked" : "locked"}
              </div>
            </div>
            <div className="flex flex-row gap-1">
              <div className="flex flex-row items-center">
                <span>
                  <Paperclip size={12} className="text-gray-650 text-12" />
                </span>
                <span className="text-gray-650 text-12">
                  {profile?.resumeURL ? "Cv Attached" : "Cv not Attached"}
                </span>
              </div>
              <span className="text-gray-650 text-12">|</span>
              <div className="text-gray-650 text-12">
                Active on {profile?.updatedAt.split("T")[0]}
              </div>
            </div>
          </div>
        </div>
      )}

      {openProfileModal && (
        <ProfileModal
          open={openProfileModal}
          onClose={() => setOpenProfileModal(false)}
          jobId={jobId}
          candidate={candidateDetail?.EmployeeProfile}
          phone={!unlocked? candidateDetail?.phone : candidateDetail?.EmployeeProfile?.User?.phone}
          isDatabase={!unlocked}
          id={candidateDetail?.id}
          status={candidateDetail?.status}
        />
      )}
    </>
  );
}
