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
import { Filter } from "lucide-react";
import SimplePaper from "../ui/cards/NewCard";




export default function SearchCandidates() {
  const { register, handleSubmit, reset } = useForm();
 const dispatch = useDispatch();
 const [showSearched, setShowSearched] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [candidatess, setCandidate] = useState(null);
  const [isFilter, setIsFilter] = useState(false);
  const [allCandidates, setAllCandidates] = useState(null)
  const [activeFilters, setActiveFilters] = useState({
    time: null,
    education: null,
    gender: null,
  });
 

  const onSubmit = async (data) => {
    console.log("Form Data:", data);
    
    dispatch(fetchSearchedCandidate(data))
    setShowSearched(true)

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
                <SimplePaper candidate={candidate} />
              </div>
            )
          )}

          {/* Pagination */}
          <div className="flex justify-end mt-4">
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
          </div>
        </div>
      </div>
    </div>
)
} 
else{
return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow rounded-xl mt-10">
      <h2 className="text-2xl font-semibold mb-6">Search Candidates</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Searching For */}
        <FormControl component="fieldset" className="w-full">
          <FormLabel>Searching for</FormLabel>
          <RadioGroup row defaultValue="any" {...register("experience")}>
            <FormControlLabel
              value="Fresher Only"
              control={<Radio />}
              label="Freshers only"
            />
            <FormControlLabel
              value="Experienced Only"
              control={<Radio />}
              label="Experienced only"
            />
            <FormControlLabel
              value="Any"
              control={<Radio />}
              label="Any"
            />
          </RadioGroup>
        </FormControl>

        {/* Keywords */}
        <TextField
          label="Keywords"
          variant="outlined"
          placeholder="Enter JobTitle/JobRole"
          fullWidth
          size="small"
          required
          {...register("jobTitle")}
        />

        {/* Current city/region */}
        <TextField
          label="Current City/Region"
          variant="outlined"
          size="small"
          fullWidth
          {...register("location")}
        />

        {/* Experience */}
        <div className="flex gap-4">
          <TextField
            label="Min Experience"
            variant="outlined"
            size="small"
            type="number"
            {...register("minExperience")}
          />
          <TextField
            label="Max Experience"
            variant="outlined"
            size="small"
            type="number"
            {...register("maxExperience")}
          />
        </div>

        {/* Salary */}
        <div className="flex gap-4">
          <TextField
            label="Min Monthly Salary"
            variant="outlined"
            size="small"
            type="number"
            {...register("minimumSalary")}
          />
          <TextField
            label="Max Monthly Salary"
            variant="outlined"
            size="small"
            type="number"
            {...register("maximumSalary")}
          />
        </div>

        {/* Minimum Education */}
        <div>
          <FormLabel>Minimum Education</FormLabel>
          <div className="flex flex-wrap gap-2 mt-2">
            {["10th pass", "12th pass", "ITI", "Diploma", "Graduate", "Post Graduate"].map(
              (edu) => (
                <FormControlLabel
                  key={edu}
                  control={<Radio {...register("education")} />}
                  value={edu}
                  label={edu}
                />
              )
            )}
          </div>
        </div>


       

        {/* Buttons */}
        <div className="flex gap-4 mt-6">
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className="bg-blue-600"
          >
            Search Candidates
          </Button>
          <Button
            type="button"
            variant="outlined"
            onClick={() => reset()}
          >
            Reset
          </Button>
        </div>
      </form>

    
    </div>
     
  )
}
 
  
    

}
    