import React, {useEffect, useState} from "react";
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
  LockOpen,
} from "lucide-react";
import { Button, Chip } from "@mui/material";

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

export default function SimplePaper() {
  const width = useWindowWidth();
  const isMobile = width <= 768;
  return (
    <>
      {isMobile ? (
        <>
          <div className="mobileCardWrapper">
            <div className="flex mt-2 mb-2 mr-2">
              <div className="flex gap-4">
                <input type="checkbox" className="ml-4" />

                <Avatar sx={{ bgcolor:"#ff5722" }}>R</Avatar>
              </div>
              <div className=" flex w-full justify-between items-center ml-4">
                <div>
                  <strong>Ruchi</strong>
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
                <p>1 yr 10 mos</p>
              </div>
              <div></div>
              <div className="flex flex-col items-center flex-wrap gap-1 ">
                <IndianRupee size={18} />
                <p>Not Disclosed</p>
              </div>
              <div></div>
              <div className="flex flex-col items-center flex-wrap gap-1 mr-3">
                <MapPin size={18} />
                <p>Rajendra Nagar,Ghaziabad</p>
              </div>
            </div>

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
                    <p className="mobile-current-work">
                      Full Stack Web Developer at CodeVertex
                    </p>
                  </div>

                  {/* Item 2 */}
                  <div className="flex items-start relative">
                    <div className="w-2 h-2 bg-gray-400 rounded-full absolute -left-1 top-1" />
                    <p className="mobile-previous-work -ml-2">
                      Developer at Dodev Technology
                    </p>
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
                <div className="mobile-education">
                  BE/B.Tech, Computer Science and Engineering, IIMT COLLEGE OF
                  ENGINEERING
                </div>
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
                    <Chip label="Noida" size="small" />
                    <Chip label="Pune" size="small" />
                    <Chip label="Bangalore" size="small" />
                    <Chip label="Kolkata" size="small" />
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
                <div className="mobile-skills">
                  <Chip label="React" size="small" />
                  <Chip label="Node" size="small" />
                  <Chip label="Javascript" size="small" />
                  <Chip label="My sql" size="small" />
                </div>
              </div>
              <div className="flex flex-col mt-2">
                <div className="flex items-center gap-2 flex-nowrap whitespace-nowrap mb-2">
                  <span className="text-gray-400">
                    <Languages size={18} />
                  </span>
                  <div className="text-gray-400 font-semibold">Languages</div>
                </div>
                <div className="mobile-education ">
                  English (Good)
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
            </div>
            
          </div>
          <div className="mobile-card-bottom-section text-xs ">
            
            <div className="flex flex-row gap-1">
              <div className="flex flex-row items-center">
                <span>
                  
                  <Paperclip size={12} />
                </span>
                Cv Attached
              </div>
              |<div>Active on 29 May</div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="card-wrapper">
            <div className="custom-card">
              <label>
                <input type="checkbox" className="corner-checkbox" />
              </label>
              <div className="card-top-section">
                <div className="left-avatar-section">
                  <Avatar sx={{ bgcolor: "#ff5722" }}>R</Avatar>
                </div>
                <div className="right-info-section">
                  <div className="info-section">
                    <div className="candidate-name">
                      <h1>
                        <strong>Ruchi</strong>
                      </h1>
                    </div>
                    <div className="info">
                      <div className="candidate-experience flex flex-row gap-1 items-center">
                        <span className="experience-icon">
                          <BriefcaseBusiness size={16} />
                        </span>
                        <div className="experience">
                          <p>1yr 10 months</p>
                        </div>
                      </div>
                      <div className="candidate-salary flex flex-row gap-1 items-center">
                        <span className="salary-icon">
                          <IndianRupee size={16} />
                        </span>
                        <div className="salary">
                          <p>Not Disclosed</p>
                        </div>
                      </div>
                      <div className="candidate-current-location flex flex-row gap-1 items-center">
                        <span className="location-icon">
                          <MapPin size={16} />
                        </span>
                        <div className="location">
                          <p>Raj Nagar, Ghaziabad</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="unlock-badge-section">
                    <Chip label="Unlocked" size="small" />
                  </div>
                </div>
              </div>
              
              <div className="mid-section flex flex-col mt-5 gap-2 self-center w-full">
                <DetailRow
                  logo={<BriefcaseBusiness size={18} />}
                  label="Current"
                  value="Full Stack Web Developer at CodeVertex services Pvt Ltd"
                />
                <DetailRow
                  logo={<BriefcaseBusiness size={18} />}
                  label="Previous"
                  value="Developer at Dodev technology Pvt.Ltd."
                />
                <DetailRow
                  logo={<School size={18} />}
                  label="Education"
                  value="BE/B.Tech, Computer Science and Engineering, IIMT COLLEGE OF ENGINEERING"
                />
                <DetailRow
                  logo={<MapPin size={18} />}
                  label="Pef. Location"
                  value="Bengaluru/Bangalore RegionDelhi-NCRHyderabad RegionPune Region"
                />
                <DetailRow
                  logo={<ShipWheel size={18} />}
                  label="Skills"
                  value=" Web developmentData structuresC++/CPythonJavaScript"
                />
                <DetailRow
                  logo={<Languages size={18} />}
                  label="Languages"
                  value="English (Good)"
                />
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
                Cv Attached
              </div>
              |<div>Active on 29 May</div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
