import { useForm } from "react-hook-form";
import {
  TextField,
  MenuItem,
  Button,
  FormControlLabel,
  Radio,
  RadioGroup,
  FormLabel,
  FormControl,
  Select,
  InputLabel,
} from "@mui/material";

import { useDispatch, useSelector } from "react-redux";
import { fetchSearchedCandidate } from "../../Redux/getData";
import CandidateManagementPage from "./unlockCandidate";
import { useEffect, useState } from "react";
import { Briefcase, DollarSign, Filter, GraduationCap, MapPin, Search, Users } from "lucide-react";
import SimpleNewPaper from "../ui/cards/candidateCard";

import FilterListOffIcon from "@mui/icons-material/FilterListOff";





export default function SearchCandidates() {
  const { register, handleSubmit, reset } = useForm();
 const dispatch = useDispatch();
 const [showSearched, setShowSearched] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [candidatess, setCandidate] = useState(null);
  const [isFilter, setIsFilter] = useState(false);
  const [allCandidates, setAllCandidates] = useState(null);
  const [jobTittle, setJobTitle] = useState(null)
  const [activeFilters, setActiveFilters] = useState({
    time: null,
    education: null,
    gender: null,
  });
 

  const onSubmit = async (data) => {
    console.log("Form Data:", data);
    
    dispatch(fetchSearchedCandidate(data))
    setShowSearched(true)
    setJobTitle(data?.jobTitle)

  };

   const {  searchedData, loading } = useSelector((state) => state.getDataReducer);

    useEffect(()=>{
      if(searchedData){
        
        setCandidate(searchedData);
        setAllCandidates(searchedData)
      }
    
    
    },[ searchedData])

 


  const handlefilter = (type, value) => {
    const updatedFilters = {
      ...activeFilters,
      [type]: value,
    };
    setActiveFilters(updatedFilters);
    setIsFilter(true);

    let filtered = [...candidatess];

    // Apply gender filter
    if (updatedFilters.gender) {
      filtered = filtered.filter((candidate) => {
        return candidate?.EmployeeProfile?.gender === updatedFilters.gender;
      });
    }

    // Apply education filter
    if (updatedFilters.education) {
      filtered = filtered.filter((candidate) => {
        const educations = candidate?.EmployeeProfile?.EmployeeEducations;

        const highestEducation =
          Array.isArray(educations) && educations.length > 0
            ? educations.reduce((latest, current) => {
                const latestDate = new Date(latest.startDate);
                const currentDate = new Date(current.startDate);
                return currentDate > latestDate ? current : latest;
              })
            : null;

        const qualification = highestEducation?.qualification;

        console.log(qualification);

        switch (updatedFilters.education) {
          case "10th pass":
            return true;
          case "12th pass":
            return qualification !== "10th_or_Below_10th";
          case "ITI":
            return qualification === "ITI";
          case "Graduate":
            return (
              qualification === "Graduate" || qualification === "Postgraduate"
            );
          case "post Graduate":
            return qualification === "Postgraduate";
          default:
            return true;
        }
      });
    }

    // Apply time filter
    if (updatedFilters.time) {
      const now = new Date();
      let compareDate = null;

      if (updatedFilters.time === "24 hours") {
        compareDate = new Date(now.getTime() - 24 * 60 * 60 * 1000);
      } else if (updatedFilters.time === "10 days") {
        compareDate = new Date(now.getTime() - 10 * 24 * 60 * 60 * 1000);
      } else if (updatedFilters.time === "30 days") {
        compareDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
      }

      filtered = filtered.filter((item) => {
        const appliedAt = item?.appliedAt ? new Date(item.appliedAt) : null;
        return appliedAt && appliedAt >= compareDate;
      });
    }

    setCandidate(filtered);
  };

  if (loading)
    return (
      <div
        className="flex justify-center items-center w-full min-h-[100vh]"
        style={{ backgroundColor: "#DFF3F9" }}
      >
        <img
          src="/unigrowLogo.png"
          alt="logo"
          className="w-40 h-16 animate-heartbeat"
        />
      </div>
    );

 
if(showSearched){
return (
<div className="min-h-[90vh] w-full" style={{ backgroundColor: "#DFF3F9" }}>
      

      
   
      {/* bottom section */}

      <div className="flex gap-2 p-4 flex-col md:flex-row relative">
        {/* Mobile Filter Button */}
        <div className="md:hidden flex justify-center mb-2">
          <button
            className="text-14 font-medium border px-4 py-1 rounded hover:opacity-90 transition-opacity"
            style={{
              color: "#DFF3F9",
              backgroundColor: "#0784C9",
              borderColor: "#003B70",
            }}
            onClick={() => setShowFilters(true)}
          >
            Show Filters
          </button>
        </div>

        {/* Left Filters - Drawer on mobile, visible on md+ */}
        <div
          className={`
    ${
      showFilters
        ? "fixed bottom-0 left-0 w-full max-w-full h-[80vh] z-50 shadow-xl p-4 rounded-t-2xl animate-slideUp overflow-y-auto"
        : "hidden"
    }
    md:static md:block md:w-1/4 md:space-y-4 md:bg-transparent md:shadow-none md:p-0
  `}
          style={{
            backgroundColor: showFilters ? "white" : "transparent",
          }}
        >
          {/* Close Button for mobile drawer */}
          <div className="flex justify-between items-center mb-4 md:hidden">
            <h3
              className="text-base font-semibold"
              style={{ color: "#003B70" }}
            >
              Filters
            </h3>
            <button
              onClick={() => setShowFilters(false)}
              className="text-lg font-bold hover:opacity-70 transition-opacity"
              style={{ color: "#003B70" }}
            >
              ×
            </button>
          </div>

          <div
            className="flex items-center gap-2 font-semibold text-sm mb-2"
            style={{ color: "#003B70" }}
          >
            {isFilter ? (
              <FilterListOffIcon
                onClick={() => {
                  setCandidate(allCandidates);
                  setIsFilter(false);
                  setActiveFilters({
                    time: null,
                    education: null,
                    gender: null,
                  });
                }}
                style={{ color: "#0784C9", width: "20px", height: "20px" }}
              />
            ) : (
              <Filter className="w-4 h-4" style={{ color: "#0784C9" }} />
            )}
            Filters
          </div>

         

          <div
            className="rounded-lg max-h-[40vh] overflow-scroll border shadow-sm p-4 space-y-2 text-14 text-left"
            style={{
              scrollbarWidth: "none",
              backgroundColor: "white",
              borderColor: "#0784C9",
              color: "#003B70",
            }}
          >
            <details open>
              <summary
                className="cursor-pointer font-medium hover:opacity-80 transition-opacity"
                style={{ color: "#003B70" }}
              >
                Applied in
              </summary>
              <div className="ml-4 mt-2 space-y-1">
                <div
                  className="flex flex-row items-center gap-3 hover:opacity-80 p-1 rounded transition-opacity"
                  style={{
                    backgroundColor: "#DFF3F9",
                  }}
                >
                  <input
                    type="radio"
                    checked={activeFilters.time === "24 hours"}
                    onChange={() => handlefilter("time", "24 hours")}
                    style={{ accentColor: "#0784C9" }}
                  />{" "}
                  <span style={{ color: "#003B70" }}>Last 24 Hours</span>
                </div>
                <div
                  className="flex flex-row items-center gap-3 hover:opacity-80 p-1 rounded transition-opacity"
                  style={{
                    backgroundColor: "#DFF3F9",
                  }}
                >
                  <input
                    type="radio"
                    checked={activeFilters.time === "10 days"}
                    onChange={() => handlefilter("time", "10 days")}
                    style={{ accentColor: "#0784C9" }}
                  />
                  <span style={{ color: "#003B70" }}>Last 10 days</span>
                </div>
                <div
                  className="flex flex-row items-center gap-3 hover:opacity-80 p-1 rounded transition-opacity"
                  style={{
                    backgroundColor: "#DFF3F9",
                  }}
                >
                  <input
                    type="radio"
                    checked={activeFilters.time === "30 days"}
                    onChange={() => handlefilter("time", "30 days")}
                    style={{ accentColor: "#0784C9" }}
                  />
                  <span style={{ color: "#003B70" }}>Last 30 days</span>
                </div>
              </div>
            </details>
            <details>
              <summary
                className="cursor-pointer font-medium hover:opacity-80 transition-opacity"
                style={{ color: "#003B70" }}
              >
                Education
              </summary>
              <div className="ml-4 mt-2 space-y-1">
                <div
                  className="flex flex-row items-center gap-3 hover:opacity-80 p-1 rounded transition-opacity"
                  style={{
                    backgroundColor: "#DFF3F9",
                  }}
                >
                  <input
                    type="radio"
                    checked={activeFilters.education === "10th pass"}
                    onChange={() => handlefilter("education", "10th pass")}
                    style={{ accentColor: "#0784C9" }}
                  />
                  <span style={{ color: "#003B70" }}>10th pass</span>
                </div>
                <div
                  className="flex flex-row items-center gap-3 hover:opacity-80 p-1 rounded transition-opacity"
                  style={{
                    backgroundColor: "#DFF3F9",
                  }}
                >
                  <input
                    type="radio"
                    checked={activeFilters.education === "12th pass"}
                    onChange={() => handlefilter("education", "12th pass")}
                    style={{ accentColor: "#0784C9" }}
                  />
                  <span style={{ color: "#003B70" }}>12th Pass</span>
                </div>
                <div
                  className="flex flex-row items-center gap-3 hover:opacity-80 p-1 rounded transition-opacity"
                  style={{
                    backgroundColor: "#DFF3F9",
                  }}
                >
                  <input
                    type="radio"
                    checked={activeFilters.education === "ITI"}
                    onChange={() => handlefilter("education", "ITI")}
                    style={{ accentColor: "#0784C9" }}
                  />
                  <span style={{ color: "#003B70" }}>ITI</span>
                </div>
                <div
                  className="flex flex-row items-center gap-3 hover:opacity-80 p-1 rounded transition-opacity"
                  style={{
                    backgroundColor: "#DFF3F9",
                  }}
                >
                  <input
                    type="radio"
                    checked={activeFilters.education === "Graduate"}
                    onChange={() => handlefilter("education", "Graduate")}
                    style={{ accentColor: "#0784C9" }}
                  />
                  <span style={{ color: "#003B70" }}>Graduation</span>
                </div>
                <div
                  className="flex flex-row items-center gap-3 hover:opacity-80 p-1 rounded transition-opacity"
                  style={{
                    backgroundColor: "#DFF3F9",
                  }}
                >
                  <input
                    type="radio"
                    checked={activeFilters.education === "post Graduate"}
                    onChange={() => handlefilter("education", "post Graduate")}
                    style={{ accentColor: "#0784C9" }}
                  />
                  <span style={{ color: "#003B70" }}>Post Graduation</span>
                </div>
              </div>
            </details>
            <details>
              <summary
                className="cursor-pointer font-medium hover:opacity-80 transition-opacity"
                style={{ color: "#003B70" }}
              >
                Gender
              </summary>
              <div className="ml-4 mt-2 space-y-1">
                <div
                  className="flex flex-row items-center gap-3 hover:opacity-80 p-1 rounded transition-opacity"
                  style={{
                    backgroundColor: "#DFF3F9",
                  }}
                >
                  <input
                    type="radio"
                    checked={activeFilters.gender === "Male"}
                    onChange={() => handlefilter("gender", "Male")}
                    style={{ accentColor: "#0784C9" }}
                  />
                  <span style={{ color: "#003B70" }}>Male</span>
                </div>
                <div
                  className="flex flex-row items-center gap-3 hover:opacity-80 p-1 rounded transition-opacity"
                  style={{
                    backgroundColor: "#DFF3F9",
                  }}
                >
                  <input
                    type="radio"
                    checked={activeFilters.gender === "female"}
                    onChange={() => handlefilter("gender", "female")}
                    style={{ accentColor: "#0784C9" }}
                  />
                  <span style={{ color: "#003B70" }}>Female</span>
                </div>
                <div
                  className="flex flex-row items-center gap-3 hover:opacity-80 p-1 rounded transition-opacity"
                  style={{
                    backgroundColor: "#DFF3F9",
                  }}
                >
                  <input
                    type="radio"
                    checked={activeFilters.gender === "Other"}
                    onChange={() => handlefilter("gender", "Other")}
                    style={{ accentColor: "#0784C9" }}
                  />
                  <span style={{ color: "#003B70" }}>Other</span>
                </div>
              </div>
            </details>
          </div>
        </div>

        {/* Overlay for mobile filter drawer */}
        {showFilters && (
          <div
            onClick={() => setShowFilters(false)}
            className="fixed inset-0 bg-black/40 z-40 md:hidden"
          />
        )}

        {/* Right: Candidate List */}
        <div className="w-full md:w-3/4 max-h-[85vh] overflow-scroll">
          

          <div
            className="text-16 font-semibold mb-7"
            style={{ color: "#003B70" }}
          >
            Showing{" "}
            {candidatess?.length}{" "}
            candidates
          </div>
          {candidatess?.map(
            (candidate, index) => (
              <div
                key={index}
                className="mb-10 shadow-lg rounded-lg border hover:shadow-xl transition-shadow duration-200"
                style={{
                  backgroundColor: "white",
                  borderColor: "#0784C9",
                }}
              >
                <SimpleNewPaper candidate={candidate} jobTitle={jobTittle} />
              </div>
            )
          )}

          {/* Pagination */}
          {/* <div className="flex justify-end mt-4">
            <div
              className="border rounded-md px-3 py-1 text-sm hover:opacity-80 transition-opacity cursor-pointer"
              style={{
                borderColor: "#0784C9",
                color: "#003B70",
                backgroundColor: "white",
              }}
            >
              1
            </div>
          </div> */}
        </div>
      </div>
    </div>
)
} 
else{
return (
   <div
      style={{
        height: "100vh",
        backgroundColor: "#DEF3F9",
        padding: "16px",
        overflow: "hidden",
      }}
    >
      <div style={{ maxWidth: "800px", margin: "0 auto", height: "100%" }}>
        {/* Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "20px",
            marginTop:"-10px",
            backgroundColor: "white",
            padding: "16px",
            borderRadius: "8px",
            boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div
              style={{
                backgroundColor: "#DEF3F9",
                padding: "8px",
                borderRadius: "8px",
                border: "1px solid #0784C9",
              }}
            >
              <Search size={20} color="#0784C9" />
            </div>
            <h1
              style={{
                fontSize: "20px",
                fontWeight: "600",
                color: "#003B70",
                margin: "0",
              }}
            >
              Search Candidates
            </h1>
          </div>
          <p
            style={{
              color: "#0784C9",
              fontSize: "12px",
              margin: "0",
              fontStyle: "italic",
            }}
          >
            Find the perfect candidate for your role
          </p>
        </div>

        {/* Main Form Container */}
        <div
          style={{
            backgroundColor: "white",
            borderRadius: "8px",
            boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
            height: "calc(100vh - 120px)",
            overflow: "auto",
          }}
        >
          <form
            onSubmit={handleSubmit(onSubmit)}
            style={{
              padding: "20px",
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "20px",
              height: "100%",
            }}
          >
            {/* Left Column */}
            <div
              style={{ display: "flex", flexDirection: "column", gap: "20px" }}
            >
              {/* Experience Type Card */}
              <div
                style={{
                  backgroundColor: "#DEF3F9",
                  padding: "16px",
                  borderRadius: "8px",
                  border: "1px solid #0784C9",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    marginBottom: "12px",
                  }}
                >
                  <Briefcase size={16} color="#0784C9" />
                  <FormLabel
                    style={{
                      fontSize: "14px",
                      fontWeight: "600",
                      color: "#003B70",
                      margin: "0",
                    }}
                  >
                    Searching for
                  </FormLabel>
                </div>
                <RadioGroup row defaultValue="any" {...register("experience")}>
                  <FormControlLabel
                    value="Fresher Only"
                    control={<Radio style={{ color: "#0784C9" }} />}
                    label={
                      <span style={{ fontSize: "12px", color: "#003B70" }}>
                        Freshers only
                      </span>
                    }
                  />
                  <FormControlLabel
                    value="Experienced Only"
                    control={<Radio style={{ color: "#0784C9" }} />}
                    label={
                      <span style={{ fontSize: "12px", color: "#003B70" }}>
                        Experienced only
                      </span>
                    }
                  />
                  <FormControlLabel
                    value="Any"
                    control={<Radio style={{ color: "#0784C9" }} />}
                    label={
                      <span style={{ fontSize: "12px", color: "#003B70" }}>
                        Any
                      </span>
                    }
                  />
                </RadioGroup>
              </div>

              {/* Keywords */}
              <div
                style={{
                  backgroundColor: "#DEF3F9",
                  padding: "16px",
                  borderRadius: "8px",
                  border: "1px solid #0784C9",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    marginBottom: "12px",
                  }}
                >
                  <Search size={16} color="#0784C9" />
                  <label
                    style={{
                      fontSize: "14px",
                      fontWeight: "600",
                      color: "#003B70",
                      margin: "0",
                    }}
                  >
                    Keywords
                  </label>
                </div>
                <TextField
                  variant="outlined"
                  placeholder="Enter JobTitle/JobRole"
                  fullWidth
                  size="small"
                  required
                  {...register("jobTitle")}
                  sx={{
                    backgroundColor: "white",
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: "#0784C9",
                      },
                      "&:hover fieldset": {
                        borderColor: "#0784C9",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#0784C9",
                      },
                      fontSize: "12px",
                    },
                  }}
                />
              </div>

              {/* Location */}
              <div
                style={{
                  backgroundColor: "#DEF3F9",
                  padding: "16px",
                  borderRadius: "8px",
                  border: "1px solid #0784C9",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    marginBottom: "12px",
                  }}
                >
                  <MapPin size={16} color="#0784C9" />
                  <label
                    style={{
                      fontSize: "14px",
                      fontWeight: "600",
                      color: "#003B70",
                      margin: "0",
                    }}
                  >
                    Current City/Region
                  </label>
                </div>
                <TextField
                  variant="outlined"
                  placeholder="Enter city or region"
                  size="small"
                  fullWidth
                  {...register("location")}
                  sx={{
                    backgroundColor: "white",
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: "#0784C9",
                      },
                      "&:hover fieldset": {
                        borderColor: "#0784C9",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#0784C9",
                      },
                      fontSize: "12px",
                    },
                  }}
                />
              </div>
            </div>

            {/* Right Column */}
            <div
              style={{ display: "flex", flexDirection: "column", gap: "20px" }}
            >
              {/* Experience Range */}
              <div
                style={{
                  backgroundColor: "#DEF3F9",
                  padding: "16px",
                  borderRadius: "8px",
                  border: "1px solid #0784C9",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    marginBottom: "12px",
                  }}
                >
                  <Users size={16} color="#0784C9" />
                  <label
                    style={{
                      fontSize: "14px",
                      fontWeight: "600",
                      color: "#003B70",
                      margin: "0",
                    }}
                  >
                    Experience Range (Years)
                  </label>
                </div>
                <div style={{ display: "flex", gap: "12px" }}>
                  <TextField
                    placeholder="Min"
                    variant="outlined"
                    size="small"
                    type="number"
                    {...register("minExperience")}
                    style={{ flex: 1 }}
                    sx={{
                      backgroundColor: "white",
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": {
                          borderColor: "#0784C9",
                        },
                        "&:hover fieldset": {
                          borderColor: "#0784C9",
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: "#0784C9",
                        },
                        fontSize: "12px",
                      },
                    }}
                  />
                  <TextField
                    placeholder="Max"
                    variant="outlined"
                    size="small"
                    type="number"
                    {...register("maxExperience")}
                    style={{ flex: 1 }}
                    sx={{
                      backgroundColor: "white",
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": {
                          borderColor: "#0784C9",
                        },
                        "&:hover fieldset": {
                          borderColor: "#0784C9",
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: "#0784C9",
                        },
                        fontSize: "12px",
                      },
                    }}
                  />
                </div>
              </div>

              {/* Salary Range */}
              <div
                style={{
                  backgroundColor: "#DEF3F9",
                  padding: "16px",
                  borderRadius: "8px",
                  border: "1px solid #0784C9",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    marginBottom: "12px",
                  }}
                >
                  <DollarSign size={16} color="#0784C9" />
                  <label
                    style={{
                      fontSize: "14px",
                      fontWeight: "600",
                      color: "#003B70",
                      margin: "0",
                    }}
                  >
                    Monthly Salary Range
                  </label>
                </div>
                <div style={{ display: "flex", gap: "12px" }}>
                  <TextField
                    placeholder="Minimum"
                    variant="outlined"
                    size="small"
                    type="number"
                    {...register("minimumSalary")}
                    style={{ flex: 1 }}
                    sx={{
                      backgroundColor: "white",
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": {
                          borderColor: "#0784C9",
                        },
                        "&:hover fieldset": {
                          borderColor: "#0784C9",
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: "#0784C9",
                        },
                        fontSize: "12px",
                      },
                    }}
                  />
                  <TextField
                    placeholder="Maximum"
                    variant="outlined"
                    size="small"
                    type="number"
                    {...register("maximumSalary")}
                    style={{ flex: 1 }}
                    sx={{
                      backgroundColor: "white",
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": {
                          borderColor: "#0784C9",
                        },
                        "&:hover fieldset": {
                          borderColor: "#0784C9",
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: "#0784C9",
                        },
                        fontSize: "12px",
                      },
                    }}
                  />
                </div>
              </div>

              {/* Education */}
              <div
                style={{
                  backgroundColor: "#DEF3F9",
                  padding: "16px",
                  borderRadius: "8px",
                  border: "1px solid #0784C9",
                  flex: 1,
                 
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    marginBottom: "12px",
                  }}
                >
                  <GraduationCap size={16} color="#0784C9" />
                  <FormLabel
                    style={{
                      fontSize: "14px",
                      fontWeight: "600",
                      color: "#003B70",
                      margin: "0",
                    }}
                  >
                    Minimum Education
                  </FormLabel>
                </div>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr 1fr",
                    gap: "0px",
                    textAlign:"left",
                  }}
                >
                  {[
                    "10th pass",
                    "12th pass",
                    "ITI",
                    "Diploma",
                    "Graduate",
                    "Post Graduate",
                  ].map((edu) => (
                    <FormControlLabel
                      key={edu}
                      control={
                        <Radio
                          {...register("education")}
                          style={{ color: "#0784C9" }}
                        />
                      }
                      value={edu}
                      label={
                        <span style={{ fontSize: "11px", color: "#003B70" }}>
                          {edu}
                        </span>
                      }
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Action Buttons - Full Width */}
            <div
              style={{
                gridColumn: "1 / -1",
                display: "flex",
                gap: "16px",
                justifyContent: "center",
                paddingTop: "20px",
                
                borderTop: "1px solid #0784C9",
                marginTop: "auto",
              }}
            >
              <Button
                type="submit"
                variant="contained"
                style={{
                  backgroundColor: "#0784C9",
                  color: "white",
                  padding: "12px 24px",
                  borderRadius: "6px",
                  border: "none",
                  cursor: "pointer",
                  fontWeight: "600",
                  fontSize: "14px",
                  textTransform: "none",
                  minWidth: "150px",
                }}
              >
                Search Candidates
              </Button>
              <Button
                type="button"
                variant="outlined"
                onClick={() => reset()}
                style={{
                  backgroundColor: "white",
                  color: "#0784C9",
                  padding: "12px 24px",
                  borderRadius: "6px",
                  border: "1px solid #0784C9",
                  cursor: "pointer",
                  fontWeight: "600",
                  fontSize: "14px",
                  textTransform: "none",
                  minWidth: "150px",
                }}
              >
                Reset
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
     
  )
}
 
  
    

}
    