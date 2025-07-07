import { useEffect, useState } from "react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import {
  Box,
  Button,
  TextField,
  Typography,
  Stepper,
  Step,
  StepLabel,
  Checkbox,
  FormControlLabel,
  FormControl,
  FormLabel,
  FormGroup,
  RadioGroup,
  Radio,
  Card,
  CardContent,
  Select,
  MenuItem,
  Autocomplete,
  Chip,
  Grid,
  InputAdornment,
  IconButton,
  Menu,
  Popper,
  Dialog,
  DialogTitle,
  DialogContent,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import {
  ArrowLeft,
  Award,
  BriefcaseBusiness,
  ChevronDown,
  ChevronUp,
  Cross,
  Handshake,
  MapPin,
  Pencil,
  Plus,
  X,
} from "lucide-react";
import {
  editPostJob,
  getCitiesbyPincode,
  getEducationSuggestions,
  getJobRolesSuggestions,
  getSkillSuggestions,
  postJob,
  updateCompany,
} from "../../../API/ApiFunctions";
import { useNavigate, useParams } from "react-router-dom";
import { showErrorToast, showSuccessToast } from "../../ui/toast";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchJobsById,
  fetchUserProfile,
  setJobData,
} from "../../../Redux/getData";
import { Close } from "@mui/icons-material";

const steps = [
  "Job details",
  "Basic Details",
  "Interview Details",
  "Preview",
  "Payment Mode",
];

const PERKS = [
  "Flexible Working Hours",
  "Weekly Payout",
  "Overtime Pay",
  "Joining Bonus",
  "Annual Bonus",
  "PF",
  "Travel Allowance (TA)",
  "Petrol Allowance",
  "Mobile Allowance",
  "Internet Allowance",
  "Laptop",
  "Health Insurance",
  "ESI (ESIC)",
  "Food/Meals",
  "Accommodation",
  "5 Working Days",
  "One-Way Cab",
  "Two-Way Cab",
];

const educationOptions = [
  "10th_or_Below_10th",
  "12th_Pass",
  "Diploma_Categories",
  "ITI",
  "Graduate",
  "Postgraduate",
  "Professional_Certification",
];

const ADDITIONAL_FIELDS = {
  gender: ["Male", "Female", "Other"],
  distance: ["<10KM", "10-20KM", ">20KM"],
  languages: [
    "Assamese",
    "Bengali",
    "Bodo",
    "Dogri",
    "Gujarati",
    "Hindi",
    "Kannada",
    "Kashmiri",
    "Konkani",
    "Maithili",
    "Malayalam",
    "Manipuri",
    "Marathi",
    "Nepali",
    "Odia",
    "Punjabi",
    "Sanskrit",
    "Santali",
    "Sindhi",
    "Tamil",
    "Telugu",
    "Urdu",
  ],
  skills: ["Communication", "Sales", "Excel"],
  age: ["18-25", "26-35", "36+"],
};

const englishLevels = ["Basic", "Intermediate", "Advanced"];

const experienceOptions = ["Any", "Experienced Only", "Fresher Only"];

const DetailRow = ({ label, value }) => (
  <div className="flex">
    <div className="w-1/3 text-gray-600 text-left font-bold">{label}</div>
    <div className="w-2/3 text-gray-900 text-left">{value}</div>
  </div>
);

const PostJob = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedPayType, setSelectedPayType] = useState(null);
  const [joiningFees, setjoiningfee] = useState(false);
  const [joiningFeeReason, setjoiningFeeReason] = useState(null);
  const [experienceLevel, setExperience] = useState(null);
  const [educationLevel, setEducation] = useState(null);
  const [educationSuggestions, setEducationSuggestions] = useState(["hello"]);
  const [expanded, setExpanded] = useState([]);
  const [walkIn, setWalkIn] = useState(false);
  const [contactpermission, setContactPermission] = useState("self");
  const [showJobDetailpreview, setShowJobDetailpreview] = useState(false);
  const [showCandidateRequirementsPreview, setShowCandidateRequirementPreview] =
    useState(false);
  const [shownterviewDetailPreview, setShowInterviewDetailPreview] =
    useState(false);
  const [changeSelected, setSelectedChange] = useState(true);
  const [isGetAddress, setIsGetAddress] = useState(false);
  const [skillsSuggestions, setSkillsSuggestions] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [jobRoleSuggestions, setJobRoleSuggestions] = useState([]);
  const [showCompanyChangeOptions, setShowCompanyChangeOoptions] =
    useState(false);
  const [anchorEl, setAnchorE1] = useState(null);
  const [showCompanyModal, setShowCompanyModal] = useState(null);
  const [selectedEmployees, setSelectedEmployees] = useState(null);
  const [isConsultancyCompany, setIsConsultancyCompany] = useState(false);
  const [newCompanyName, setNewCompanyName] = useState(null);

  const { id, action } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUserProfile());
  }, [dispatch]);

  useEffect(() => {
    if (id) {
      dispatch(fetchJobsById(id));
    }
  }, [id, dispatch]);

  const { employer, jobsById } = useSelector((state) => state.getDataReducer);

  const navigate = useNavigate();

  const modules = {
    toolbar: [
      ["bold", "italic", "underline"],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ align: [] }],
      ["clean"],
    ],
  };
  const formats = ["bold", "italic", "underline", "list", "bullet", "align"];

  const {
    handleSubmit,
    control,
    getValues,
    setValue,
    reset,

    clearErrors,
    setError,
    formState: { errors },
  } = useForm({
    defaultValues: {
      companyName: employer?.company.companyName || "",
      jobTitle: null,
      jobRoles: null,
      jobType: null,
      nightShift: "Day Shift",
      workLocationType: null,
      location: null,
      state: null,
      city: null,
      pinCode: null,
      payType: null,
      minimumSalary: null,
      maximumSalary: null,
      incentive: null,
      perks: [],
      joiningFee: false,
      joiningFeeAmount: null,
      joiningFeeReason: null,
      joiningFeeReasonDetail: null,
      joiningFeeAmountTime: null,
      education: null,
      english: null,
      experience: null,
      experienceLevel: null,
      educationSpecialization: null,
      gender: null,
      age: null,
      languages: null,
      distance: null,
      skills: null,
      jobDescription: null,
      walkIn: false,
      walkInAddress: null,
      walkInStartDate: null,
      WalkInEndDate: null,
      walkInStartTime: null,
      walkInInstruction: null,
      contactPrefernece: null,
      otherRecruiterName: null,
      otherRecruiterNumber: null,
      otherRecruiterEmail: null,
      candidateType: null,
      notificationPreference: null,
    },
  });

  const handleCurrentLocation = async () => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        setError("Geolocation is not supported by your browser.");
        return resolve(null);
      }

      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const address = await getAddressFromCoords(
              position.coords.latitude,
              position.coords.longitude
            );
            resolve(address);
          } catch (err) {
            showErrorToast("Error while converting coordinates.");
            resolve(null);
          }
        },
        (err) => {
          showErrorToast("Couldn't fetch the location");
          resolve(null);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0,
        }
      );
    });
  };

  const getAddressFromCoords = async (lat, lon) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lon}`
      );
      const data = await response.json();

      return data?.display_name;
    } catch (err) {
      return "Unable to fetch address";
    }
  };

  useEffect(() => {
    if (employer) {
      setValue("companyName", employer?.company.companyName);
    }
  }, [employer]);

  useEffect(() => {
    if (jobsById) {
      const selectedJob = jobsById?.[0];

      reset({
        companyName: employer?.company.companyName,
        jobTitle: selectedJob?.jobTitle,
        jobRoles: selectedJob.jobRoles,
        jobType: selectedJob.jobType || "Full Time",
        nightShift: selectedJob.nightShift,
        workLocationType: selectedJob.workLocationType,
        location: selectedJob.location,
        payType: selectedJob.payType,
        minimumSalary: selectedJob.minimumSalary,
        maximumSalary: selectedJob.maximumSalary,
        incentive: selectedJob.incentive,
        perks: selectedJob?.perks
          ? Array.isArray(selectedJob.perks)
            ? selectedJob.perks
            : JSON.parse(selectedJob.perks)
          : [],
        joiningFee: selectedJob.joiningFee,
        joiningFeeAmount: selectedJob.joiningFeeAmount,
        joiningFeeReason: selectedJob.joiningFeeReason,
        joiningFeeReasonDetail: selectedJob.joiningFeeReasonDetail,
        joiningFeeAmountTime: selectedJob.joiningFeeAmountTime,
        education: selectedJob.education,
        english: selectedJob.english,
        experience: selectedJob.experience,
        experienceLevel: selectedJob.experienceLevel,
        educationSpecialization: selectedJob.educationSpecialization,
        gender: selectedJob.gender,
        age: selectedJob.age,
        languages: selectedJob?.languages
          ? Array.isArray(selectedJob.languages)
            ? selectedJob.languages
            : JSON.parse(selectedJob.languages)
          : [],
        distance: selectedJob.distance,
        state: selectedJob.state,
        city: selectedJob.city,
        pinCode: selectedJob.pinCode,
        skills: selectedJob?.skills
          ? Array.isArray(selectedJob.skills)
            ? selectedJob.skills
            : JSON.parse(selectedJob.skills)
          : [],
        jobDescription: selectedJob.jobDescription,
        walkIn: selectedJob.walkIn,
        walkInAddress: selectedJob.walkInAddress,
        walkInStartDate: selectedJob.walkInStartDate,
        WalkInEndDate: selectedJob.WalkInEndDate,
        walkInStartTime: selectedJob.walkInStartTime,
        walkInInstruction: selectedJob.walkInInstruction,
        contactPrefernece: selectedJob.contactPrefernece,
        otherRecruiterName: selectedJob.otherRecruiterName,
        otherRecruiterNumber: selectedJob.otherRecruiterNumber,
        otherRecruiterEmail: selectedJob.otherRecruiterEmail,
        candidateType: selectedJob.candidateType,
        notificationPreference: selectedJob.notificationPreference,
      });
      if (selectedJob?.walkIn) {
        setWalkIn(true);
        console.log(selectedJob?.walkIn);
      }
      if (selectedJob?.contactPrefernece === "no") {
        setContactPermission("other");
      }
    } else {
      reset({
        companyName: employer?.company.companyName,
        jobTitle: null,
        jobRoles: null,
        jobType: null,
        nightShift: "Day Shift",
        workLocationType: null,
        location: null,
        state: null,
        city: null,
        pinCode: null,
        payType: null,
        minimumSalary: null,
        maximumSalary: null,
        incentive: null,
        perks: [],
        joiningFee: false,
        joiningFeeAmount: null,
        joiningFeeReason: null,
        joiningFeeReasonDetail: null,
        joiningFeeAmountTime: null,
        education: null,
        english: null,
        experience: null,
        experienceLevel: null,
        educationSpecialization: null,
        gender: null,
        age: null,
        languages: null,
        distance: null,
        skills: null,
        jobDescription: null,
        walkIn: false,
        walkInAddress: null,
        walkInStartDate: null,
        WalkInEndDate: null,
        walkInStartTime: null,
        walkInInstruction: null,
        contactPrefernece: null,
        otherRecruiterName: null,
        otherRecruiterNumber: null,
        otherRecruiterEmail: null,
        candidateType: null,
        notificationPreference: null,
      });
    }
  }, [jobsById]);

  const values = getValues();

  const toggleField = (field) => {
    if (expanded.includes(field)) {
      setExpanded(expanded.filter((f) => f !== field));
    } else {
      setExpanded([...expanded, field]);
    }
  };

  const handleLocation = async (value) => {
    if (value.length === 6) {
      try {
        const response = await getCitiesbyPincode(value);

        if (response && response.data.length > 0) {
          clearErrors("pinCode");
          const address = response.data[0];

          setIsGetAddress(true);
          setValue("state", address.state);
          setValue("city", address.district);
          setValue("pinCode", address.pincode);
        } else {
          setIsGetAddress(false);
          setValue("state", null);
          setValue("city", null);
          setError("pinCode", {
            type: "manual",
            message: "Not a Valid Pincode",
          });
        }
      } catch (e) {
        console.log(e);
        setIsGetAddress(false);
        setError("pinCode", {
          type: "manual",
          message: "Could not fetch data",
        });
      }
    }
  };

  const handleEducationSuggestions = async (value) => {
    const response = await getEducationSuggestions(value);

    if (response) {
      console.log(response.data);
      setEducation(value);
      setEducationSuggestions(response.data);
    } else {
      showErrorToast("Could not fetch suggestionas");
    }
  };

  const handleSkillsSuggestions = async (value) => {
    console.log(value);
    const response = await getSkillSuggestions(value);
    if (response) {
      console.log(response.data.data);
      setSkillsSuggestions(response.data.data);
    } else {
      showErrorToast("Could not fetch suggestions");
    }
  };

  const handleRoleSuggestions = async (value) => {
    if (value.length >= 3) {
      const response = await getJobRolesSuggestions(value);
      if (response) {
        setJobRoleSuggestions(response.data?.data);
      } else {
        showErrorToast("could not fetch suggestions");
      }
    }
  };

  const handleChageCompany = (e) => {
    setShowCompanyChangeOoptions(!showCompanyChangeOptions);
    setAnchorE1(e);
  };

  const handleCompanyChange = async (value) => {
    if (value === "same") {
      const response = await updateCompany({ companyName: newCompanyName });
      if (response) {
        dispatch(fetchUserProfile());
        showSuccessToast("successfully changed");
        setShowCompanyModal(null);
      } else {
        showErrorToast("Could not update");
      }
    } else {
      reset({ companyName: newCompanyName });
      showSuccessToast("successfully changed");
      setShowCompanyModal(null);
    }
  };

  const onSubmit = async (data) => {
    console.log("Form Submitted:", data);

    let response = null;

    if (id !== "null") {
      if (action == "duplicate") {
        response = await postJob(data, null);
      } else {
        response = await editPostJob(id, data);
      }
    } else {
      response = await postJob(data, null);
    }

    if (response) {
      if (response == "plan") {
        dispatch(setJobData(data));
        navigate("/employerHome/selectPlan");
      } else {
        showSuccessToast("job Post succesfully");
        navigate("/employerHome/jobs");
      }
    } else {
      showErrorToast("Could not post job");
    }
  };

  return (
    <Box className="p-6 pt-0 bg-gray-200 min-h-screen">
      <div className="w-full z-50 fixed bg-white flex flex-row justify-between rounded-lg shadow-md">
        <div className="flex flex-row gap-4 text-lg font-bold p-4">
          <ArrowLeft
            onClick={() => {
              const confirmed = window.confirm(
                "Are you sure?\nYou will lose all the filled data."
              );
              if (confirmed) {
                navigate("/employerHome/jobs");
              }
            }}
          />
          Jobs
        </div>
      </div>

      <div className="h-[64px]" />
      <Typography
        variant="h5"
        fontWeight="bold"
        className="mb-6 flex justify-start"
        sx={{ fontSize: "1.5rem", margin: "10px" }}
      >
        Post a new job
      </Typography>

      <div className="mt-2 pt-6 h-auto bg-white rounded-lg">
        <Stepper activeStep={currentStep} alternativeLabel className="mb-8">
          {steps.map((label, index) => (
            <Step key={index}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </div>

      {currentStep === 0 && (
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box className="bg-white p-6 flex justify-start flex-col items-start rounded shadow">
            {/* Job Details Section */}
            <Typography
              variant="h6"
              className="mb-2"
              sx={{ fontWeight: 700, fontSize: "1rem" }}
            >
              Job details
            </Typography>
            <Typography
              variant="body2"
              className="mb-2"
              sx={{ color: "gray", fontSize: "0.8rem" }}
            >
              We use this information to find the best candidates for the job.
            </Typography>

            <Box className="mt-4 flex justify-start flex-col items-start">
              <Typography
                sx={{ fontWeight: 500, fontSize: "0.9rem", color: "#464343" }}
              >
                Company you belong to{" "}
                <strong>{employer?.company.companyName}</strong>
              </Typography>
            </Box>

            <Box className="flex items-center flex-col w-full gap-2 mt-4">
              <Typography
                variant="h6"
                className="self-start"
                sx={{ fontWeight: 700, fontSize: "0.9rem" }}
              >
                Company You are Hiring For <span className="text-red-500">*</span>
              </Typography>
              <Box className="flex items-start flex-row w-full gap-2 mt-2">
                <Controller
                  name="companyName"
                  control={control}
                  rules={{ required: "Company name is required" }}
                  render={({ field }) => (
                    <>
                      <TextField
                        {...field}
                        fullWidth
                        disabled={changeSelected}
                        size="small"
                        error={!!errors.companyName}
                        helperText={errors.companyName?.message}
                      />
                      <Button
                        onClick={(e) => handleChageCompany(e.currentTarget)}
                        variant="text"
                        sx={{
                          color: "secondary",
                          fontSize: "1rem",
                          fontWeight: 700,
                        }}
                      >
                        Change
                      </Button>
                    </>
                  )}
                />
              </Box>
            </Box>

            <Box className="mt-4 w-1/2 flex flex-col items-start">
              <Typography
                variant="h6"
                className="mb-2 self-start"
                sx={{ fontWeight: 700, fontSize: "0.9rem" }}
              >
                Job title / Designation <span className="text-red-500">*</span>
              </Typography>
              <Box className="flex items-start flex-row w-full gap-2 mt-2">
                <Controller
                  name="jobTitle"
                  control={control}
                  disabled={action === "edit"}
                  rules={{ required: "Job title is required" }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      placeholder="Eg. Accountant"
                      size="small"
                      fullWidth
                      error={!!errors.jobTitle}
                      helperText={errors.jobTitle?.message}
                    />
                  )}
                />
              </Box>
            </Box>

            <Box className="mt-4 w-1/2 flex flex-col items-start">
              <Typography
                variant="h6"
                className="mb-2 self-start"
                sx={{ fontWeight: 700, fontSize: "0.9rem" }}
              >
                Job Role
              </Typography>

              <Box className="flex items-start flex-row w-full gap-2 mt-2">
                <Controller
                  name="jobRoles"
                  control={control}
                  render={({ field }) => (
                    <Autocomplete
                      freeSolo
                      options={jobRoleSuggestions}
                      className="w-full"
                      value={field.value || ""}
                      onChange={(_, newValue) => field.onChange(newValue)}
                      onInputChange={(event, newInputValue, reason) => {
                        if (reason === "input") {
                          handleRoleSuggestions(newInputValue);
                        }
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          placeholder="Choose Job Roles"
                          disabled={action === "edit"}
                          size="small"
                          fullWidth
                          error={!!errors.jobRoles}
                          helperText={errors.jobRoles?.message}
                        />
                      )}
                    />
                  )}
                />
              </Box>
            </Box>

            <Box className="mt-6 flex flex-col items-start">
              <Typography
                variant="h6"
                className="mb-2 self-start"
                sx={{ fontWeight: 700, fontSize: "0.9rem" }}
              >
                Type of Job <span className="text-red-500">*</span>
              </Typography>
              <Controller
                name="jobType"
                control={control}
                rules={{ required: "Job type is required" }}
                render={({ field }) => {
                  if (!field.value) {
                    field.onChange("Full-Time");
                  }

                  return (
                    <div className="flex flex-wrap gap-4 mt-2">
                      {[
                        { val: "Full-Time", lab: "Full Time" },
                        { val: "Part-Time", lab: "Part Time" },
                        { val: "internship", lab: "Internship" },
                        { val: "contract", lab: "Contract" },
                      ].map((type) => {
                        return (
                          <div
                            key={type.val}
                            onClick={() => field.onChange(type.val)}
                            className={`cursor-pointer chip-3d ${
                              field.value === type.val
                                ? "bg-secondary text-white border-secondary"
                                : "bg-white text-gray-700 border-gray-300 hover:bg-blue-50"
                            }`}
                          >
                            {type.lab}
                          </div>
                        );
                      })}
                    </div>
                  );
                }}
              />
            </Box>

            <Box className="mt-4">
              <Controller
                name="nightShift"
                control={control}
                render={({ field }) => (
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={field.value === "Night Shift"}
                        onChange={(e) => {
                          field.onChange(
                            e.target.checked ? "Night Shift" : "Day Shift"
                          );
                          console.log("Night shift:", e.target.checked);
                        }}
                      />
                    }
                    label="This is a night shift job"
                  />
                )}
              />
            </Box>
          </Box>

          <Box className="bg-white p-6 mt-2 flex justify-start flex-col items-start rounded shadow">
            {/* Location Type Section */}

            <Typography
              className="mb-2"
              sx={{ fontWeight: 700, fontSize: "1rem" }}
            >
              Location 
            </Typography>
            <Typography
              className="mb-2"
              sx={{ color: "gray", fontSize: "0.8rem" }}
            >
              Let candidates know where they will be working from.
            </Typography>
            <Box className="mt-6 flex items-start flex-col">
              <Typography
                variant="h6"
                className="mb-2 self-start"
                sx={{ fontWeight: 700, fontSize: "0.9rem" }}
              >
                Work Location Type <span className="text-red-500">*</span>
              </Typography>
              <Controller
                name="workLocationType"
                control={control}
                rules={{ required: "Location type is required" }}
                render={({ field }) => (
                  <div className="flex flex-wrap gap-4 mt-2">
                    {[
                      { val: "onSite", lab: "On-Site" },
                      { val: "remote", lab: "Remote" },
                      { val: "hybrid", lab: "Hybrid" },
                      { val: "field-work", lab: "Field-Work" },
                    ].map((type) => {
                      return (
                        <div
                          key={type.val}
                          onClick={() => {
                            field.onChange(type.val);
                          }}
                          className={`cursor-pointer chip-3d ${
                            field.value === type.val
                              ? "bg-secondary text-white border-secondary"
                              : "bg-white text-gray-700 border-gray-300 hover:bg-blue-50"
                          }`}
                        >
                          {type.lab}
                        </div>
                      );
                    })}
                  </div>
                )}
              />

              {errors.workLocationType && (
                <Typography variant="caption" color="error">
                  {errors.workLocationType.message}
                </Typography>
              )}
            </Box>

            {/* Address Section */}
            <Box className="mt-6 flex items-start flex-col">
              <Typography
                className="mb-2"
                sx={{ fontWeight: 700, fontSize: "1rem" }}
              >
                Address
              </Typography>

              <Typography
                className="mb-2"
                sx={{ color: "gray", fontSize: "0.8rem" }}
              >
                Fill Your Office Address
              </Typography>

              <Box className="mt-6 flex flex-row flex-wrap items-start gap-4">
                <Box className="flex items-start min-w-[30vw] gap-2 flex-col">
                  <Typography
                    variant="h6"
                    className="mb-2 self-start"
                    sx={{ fontWeight: 700, fontSize: "0.9rem" }}
                  >
                    Address Line 1
                  </Typography>

                  <Box className="flex items-start flex-row w-full gap-2">
                    <Controller
                      name="location"
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          placeholder="Enter Flat No./House No."
                          size="small"
                          disabled={action === "edit"}
                          fullWidth
                        />
                      )}
                    />
                  </Box>
                </Box>

                <Box className="flex items-start min-w-[30vw] gap-2 flex-col">
                  <Typography
                    variant="h6"
                    className="mb-2 self-start"
                    sx={{ fontWeight: 700, fontSize: "0.9rem" }}
                  >
                    Pin Code <span className="text-red-500">*</span>
                  </Typography>

                  <Controller
                    name="pinCode"
                    control={control}
                    rules={{
                      required: "PinCode is required",
                      pattern: {
                        value: /^\d{6}$/, // Only 6 digits
                        message: "PinCode must be exactly 6 digits",
                      },
                    }}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        fullWidth
                        size="small"
                        disabled={action === "edit"}
                        placeholder="Enter PinCode"
                        inputProps={{ maxLength: 6 }}
                        onChange={(e) => {
                          field.onChange(e);
                          handleLocation(e.target.value);
                        }}
                        error={!!errors.pinCode}
                        helperText={errors.pinCode?.message}
                      />
                    )}
                  />
                </Box>

                {isGetAddress && (
                  <>
                    <Box className="flex items-start min-w-[30vw] gap-2 flex-col">
                      <Typography
                        variant="h6"
                        className="mb-2 self-start"
                        sx={{ fontWeight: 700, fontSize: "0.9rem" }}
                      >
                        City
                      </Typography>

                      <Controller
                        name="city"
                        control={control}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            fullWidth
                            size="small"
                            placeholder="Enter Your City"
                            slotProps={{
                              input: {
                                readOnly: true,
                              },
                            }}
                          />
                        )}
                      />
                    </Box>

                    <Box className="flex items-start min-w-[30vw] gap-2 flex-col">
                      <Typography
                        variant="h6"
                        className="mb-2 self-start"
                        sx={{ fontWeight: 700, fontSize: "0.9rem" }}
                      >
                        State
                      </Typography>

                      <Controller
                        name="state"
                        control={control}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            fullWidth
                            size="small"
                            placeholder="Enter State"
                            value={field.value}
                            slotProps={{
                              input: {
                                readOnly: true,
                              },
                            }}
                          />
                        )}
                      />
                    </Box>
                  </>
                )}
              </Box>
            </Box>
          </Box>

          {/* Pay Type Section */}
          <Box className="bg-white p-6 mt-2 flex justify-start flex-col items-start rounded shadow">
            <Typography
              className="mb-2"
              sx={{ fontWeight: 700, fontSize: "1rem" }}
            >
              Compensation
            </Typography>
            <Typography
              className="mb-2"
              sx={{ color: "gray", fontSize: "0.8rem" }}
            >
              Job postings with right salary & incentives will help you find the
              right candidates.
            </Typography>
            <Box className="mt-6 flex flex-col items-start">
              <Typography
                variant="h6"
                className="mb-2 self-start"
                sx={{ fontWeight: 700, fontSize: "0.9rem" }}
              >
                What is the monthly pay type? <span className="text-red-500">*</span>
              </Typography>

              <Controller
                name="payType"
                control={control}
                rules={{ required: "Pay type is required" }}
                render={({ field }) => (
                  <div className="flex flex-wrap gap-4 mt-2">
                    {[
                      { val: "Fixed-only", lab: "Fixed Only" },
                      { val: "Fixed+Incentive", lab: "Fixed+Incentive" },
                      { val: "Fixed+variable", lab: "Fixed+Variable" },
                      { val: "incentive", lab: "Incentive" },
                    ].map((type) => {
                      return (
                        <div
                          key={type.val}
                          onClick={() => {
                            field.onChange(type.val);
                            setSelectedPayType(type.val);
                          }}
                          className={`cursor-pointer chip-3d ${
                            field.value === type.val
                              ? "bg-secondary text-white border-secondary"
                              : "bg-white text-gray-700 border-gray-300 hover:bg-blue-50"
                          }`}
                        >
                          {type.lab}
                        </div>
                      );
                    })}
                  </div>
                )}
              />

              {errors.payType && (
                <Typography variant="caption" color="error">
                  {errors.payType.message}
                </Typography>
              )}
            </Box>

            <div className="w-full flex flex-wrap gap-2 items-start">
              {/* Fixed or Fixed+Incentive: Minimum Salary */}
              {(selectedPayType === "Fixed-only" ||
                selectedPayType === "Fixed+Incentive" ||
                selectedPayType === "Fixed+variable") && (
                <Box className="mt-6 w-[25%]">
                  <Typography
                    variant="h6"
                    className="mb-2 self-start"
                    sx={{ fontWeight: 700, fontSize: "0.9rem" }}
                  >
                    Minimum Salary <span className="text-red-500">*</span>
                  </Typography>
                  <Controller
                    name="minimumSalary"
                    control={control}
                    rules={{
                      required: "Minimum Salary is required",
                      pattern: {
                        value: /^[0-9]+$/,
                        message: "Only numeric values are allowed",
                      },
                      validate: (value) => {
                        const numericValue = Number(value);
                        if (numericValue < 3000)
                          return "Minimum salary should be at least ₹3000";
                        if (numericValue > 150000)
                          return "Salary cannot exceed ₹1.5 Lakh";
                        return true;
                      },
                    }}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        value={field.value || ""}
                        disabled={action === "edit"}
                        type="number"
                        size="small"
                        fullWidth
                        placeholder="Enter Monthly Salary"
                        error={!!errors.minimumSalary}
                        helperText={errors.minimumSalary?.message}
                      />
                    )}
                  />
                </Box>
              )}

              {/* Fixed or Fixed+Incentive: Maximum Salary */}
              {(selectedPayType === "Fixed-only" ||
                selectedPayType === "Fixed+Incentive" ||
                selectedPayType === "Fixed+variable") && (
                <Box className="mt-6 w-[25%]">
                  <Typography
                    variant="h6"
                    className="mb-2 self-start"
                    sx={{ fontWeight: 700, fontSize: "0.9rem" }}
                  >
                    Maximum Salary <span className="text-red-500">*</span>
                  </Typography>
                  <Controller
                    name="maximumSalary"
                    control={control}
                    rules={{
                      required: "Maximum Salary is required",
                      pattern: {
                        value: /^[0-9]+$/,
                        message: "Only numeric values are allowed",
                      },
                      validate: (value) => {
                        const numericValue = Number(value);
                        const minSalary = Number(getValues("minimumSalary"));
                        if (numericValue < 3000)
                          return "Maximum salary should be at least ₹3000";
                        if (numericValue > 1000000)
                          return "Salary cannot exceed ₹10 lakh";
                        if (minSalary && numericValue <= minSalary) {
                          return "Maximum salary must be greater than minimum salary";
                        }
                        return true;
                      },
                    }}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        fullWidth
                        disabled={action === "edit"}
                        size="small"
                        type="number"
                        placeholder="Enter Monthly Salary"
                        error={!!errors.maximumSalary}
                        helperText={errors.maximumSalary?.message}
                      />
                    )}
                  />
                </Box>
              )}

              {/* Incentive (either incentive-only or Fixed+Incentive) */}
              {(selectedPayType === "incentive" ||
                selectedPayType === "Fixed+Incentive") && (
                <Box
                  className={`mt-6 ${
                    selectedPayType === "incentive" ? "w-[25%]" : "w-[25%]"
                  }`}
                >
                  <Typography
                    variant="h6"
                    className="mb-2 self-start"
                    sx={{ fontWeight: 700, fontSize: "0.9rem" }}
                  >
                    Incentive <span className="text-red-500">*</span>
                  </Typography>
                  <Controller
                    name="incentive"
                    control={control}
                    rules={{
                      required: "Incentive is required",
                      pattern: {
                        value: /^[0-9]+$/,
                        message: "Only numeric values are allowed",
                      },
                    }}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        value={field.value || ""}
                        disabled={action === "edit"}
                        fullWidth
                        type="number"
                        size="small"
                        placeholder="Enter Incentive"
                        error={!!errors.incentive}
                        helperText={errors.incentive?.message}
                      />
                    )}
                  />
                </Box>
              )}
            </div>

            {/* Perks Section */}
            <Box className="mt-6 flex flex-col items-start">
              <Typography
                variant="h6"
                className="mb-2 self-start"
                sx={{ fontWeight: 700, fontSize: "0.9rem" }}
              >
                Do you offer any additional perks?
              </Typography>
              <FormGroup row className="mt-4" sx={{ gap: 1 }}>
                <Controller
                  name="perks"
                  control={control}
                  render={({ field }) => (
                    <>
                      {PERKS.map((perk) => {
                        const selected = field.value.includes(perk);
                        return (
                          <Box
                            key={perk}
                            onClick={() => {
                              const newValue = selected
                                ? field.value.filter((v) => v !== perk)
                                : [...field.value, perk];
                              field.onChange(newValue);
                            }}
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              px: 1.5,
                              py: 0.75,
                              borderRadius: "999px",
                              border: "1px solid",
                              borderColor: selected ? "secondary" : "grey.400",
                              backgroundColor: selected
                                ? "#0784C9"
                                : "transparent",
                              color: selected ? "white" : "text.primary",
                              cursor: "pointer",
                              userSelect: "none",
                              fontSize: "0.875rem",
                              fontWeight: 500,
                              transition: "all 0.2s",
                              "&:hover": {
                                backgroundColor: selected
                                  ? "light"
                                  : "grey.100",
                              },
                            }}
                          >
                            {perk}
                            {selected ? (
                              <X className="ml-2 font-semibold" size={16} />
                            ) : (
                              <Plus className="ml-2 font-semibold" size={16} />
                            )}
                          </Box>
                        );
                      })}
                    </>
                  )}
                />
              </FormGroup>
            </Box>

            {/* joiningFees section */}
            <Box className="mt-4">
              <Typography
                variant="h6"
                className="mb-2 self-start"
                sx={{ fontWeight: 700, fontSize: "0.9rem" }}
              >
                Is there any joining fee or deposit required from the candidate?
              </Typography>
              <Controller
                name="joiningFee"
                control={control}
                render={({ field }) => (
                  <div className="flex flex-wrap gap-4 mt-2">
                    {[
                      { label: "Yes", value: true },
                      { label: "No", value: false },
                    ].map((option) => (
                      <div
                        key={option.label}
                        onClick={() => {
                          field.onChange(option.value);
                          setjoiningfee(option.value);

                          if (!option.value) {
                            setValue("joiningFeeAmount", null);
                            setValue("joiningFeeReason", null);
                            setValue("joiningFeeReasonDetail", null);
                            setValue("joiningFeeAmountTime", null);
                          }
                        }}
                        className={`cursor-pointer chip-3d transition ${
                          field.value === option.value
                            ? "bg-secondary text-white border-secondary"
                            : "bg-white text-gray-700 border-gray-300 hover:bg-blue-50"
                        }`}
                      >
                        {option.label}
                      </div>
                    ))}
                  </div>
                )}
              />

              {errors.joiningFee && (
                <Typography variant="caption" color="error">
                  {errors.joiningFee.message}
                </Typography>
              )}
            </Box>

            {joiningFees && (
              <>
                <Box className="mt-6 w-1/2 flex flex-col items-start">
                  <Typography
                    variant="h6"
                    className="mb-2 self-start"
                    sx={{ fontWeight: 700, fontSize: "0.9rem" }}
                  >
                    Fee Amount <span className="text-red-500">*</span>
                  </Typography>
                  <Controller
                    name="joiningFeeAmount"
                    control={control}
                    rules={{
                      required: "Amount is Required",
                      pattern: {
                        value: /^[0-9]+$/,
                        message: "Only numeric values are allowed",
                      },
                      validate: (value) =>
                        value <= 10000 || "Amount must be 10000 or less",
                    }}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Joining Fee Amount"
                        fullWidth
                        size="small"
                        placeholder="Enter Fee Amount"
                        error={!!errors.joiningFeeAmount}
                        helperText={errors.joiningFeeAmount?.message}
                      />
                    )}
                  />
                </Box>

                <Box className="mt-4 flex flex-col items-start">
                  <Typography
                    variant="h6"
                    className="mb-2 self-start"
                    sx={{ fontWeight: 700, fontSize: "0.9rem" }}
                  >
                    What is this fee for? <span className="text-red-500">*</span>
                  </Typography>
                  <Controller
                    name="joiningFeeReason"
                    control={control}
                    rules={{
                      required: "Please choose any one",
                    }}
                    render={({ field }) => (
                      <div className="flex flex-wrap gap-4 mt-2">
                        {[
                          "inventory-charge",
                          "security-deposit",
                          "registration-fees",
                          "commission",
                          "Training/Certification",
                          "other-reason",
                        ].map((type) => {
                          return (
                            <div
                              key={type}
                              onClick={() => {
                                field.onChange(type);
                                setjoiningFeeReason(type);
                              }}
                              className={`cursor-pointer chip-3d ${
                                field.value === type
                                  ? "bg-secondary text-white border-secondary"
                                  : "bg-white text-gray-700 border-gray-300 hover:bg-blue-50"
                              }`}
                            >
                              {type.replace("-", " ")}
                            </div>
                          );
                        })}
                      </div>
                    )}
                  />

                  {errors.joiningFeeReason && (
                    <Typography variant="caption" color="error">
                      {errors.joiningFeeReason.message}
                    </Typography>
                  )}
                </Box>

                {(joiningFeeReason === "inventory-charge" ||
                  joiningFeeReason === "registration-fees" ||
                  joiningFeeReason === "other-reason") && (
                  <Box className="mt-6 w-full flex flex-col items-start">
                    <Typography
                      variant="h6"
                      className="mb-2 self-start"
                      sx={{ fontWeight: 700, fontSize: "0.9rem" }}
                    >
                      Mention {joiningFeeReason} Here <span className="text-red-500">*</span>
                    </Typography>
                    <Controller
                      name="joiningFeeReasonDetail"
                      control={control}
                      rules={{ required: "Fees Reason is required" }}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          label="joining fees amount reason Amount"
                          fullWidth
                          size="small"
                          placeholder="Mention the Reason"
                          error={!!errors.joiningFeeReasonDetail}
                          helperText={errors.joiningFeeReasonDetail?.message}
                        />
                      )}
                    />
                  </Box>
                )}

                <Box className="mt-4 flex flex-col items-start">
                  <Typography
                    variant="h6"
                    className="mb-2 self-start"
                    sx={{ fontWeight: 700, fontSize: "0.9rem" }}
                  >
                    When should the fee be paid? <span className="text-red-500">*</span>
                  </Typography>
                  <Controller
                    name="joiningFeeAmountTime"
                    control={control}
                    rules={{ required: "Amount Time is required" }}
                    render={({ field }) => (
                      <div className="flex flex-wrap gap-4 mt-2">
                        {[
                          "before-interview",
                          "after-interview",
                          "deducted-from-salary",
                        ].map((type) => {
                          return (
                            <div
                              key={type}
                              onClick={() => {
                                field.onChange(type);
                              }}
                              className={`cursor-pointer chip-3d ${
                                field.value === type
                                  ? "bg-secondary text-white border-secondary"
                                  : "bg-white text-gray-700 border-gray-300 hover:bg-blue-50"
                              }`}
                            >
                              {type.replace("-", " ")}
                            </div>
                          );
                        })}
                      </div>
                    )}
                  />

                  {errors.joiningFeeAmountTime && (
                    <Typography variant="caption" color="error">
                      {errors.joiningFeeAmountTime.message}
                    </Typography>
                  )}
                </Box>
              </>
            )}
          </Box>

          <Box className="bg-white p-6 mt-2 flex justify-center flex-col items-center rounded shadow">
            <Box className="mt-2">
              <button
                onClick={handleSubmit(() => {
                  setCurrentStep((prev) => prev + 1); // only runs if form is valid
                })}
                className="btn-3d"
              >
                Continue
              </button>

              {/* <Button
                variant="contained"
                sx={{ backgroundColor: "secondary", color: "white" }}
                onClick={handleSubmit(() => {
                  setCurrentStep((prev) => prev + 1); // only runs if form is valid
                })}
              >
                Continue
              </Button> */}
            </Box>
          </Box>
        </form>
      )}

      {/* step 2 */}

      {currentStep === 1 && (
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box className="bg-white p-6 rounded shadow space-y-6 flex flex-col items-start">
            <Typography
              variant="h6"
              className="mb-2"
              sx={{ fontWeight: 700, fontSize: "1rem" }}
            >
              Basic Requirements
            </Typography>
            <Typography
              variant="body2"
              className="mb-2"
              sx={{ color: "gray", fontSize: "0.8rem" }}
            >
              We’ll use these requirement details to make your job visible to
              the right candidates.
            </Typography>

            {/* Minimum Education */}
            <FormControl fullWidth className="flex flex-col items-start">
              <FormLabel
                className="mb-2 self-start"
                sx={{ fontWeight: 700, fontSize: "0.9rem" }}
              >
                Minimum Education <span className="text-red-500">*</span>
              </FormLabel>

              <Controller
                name="education"
                control={control}
                rules={{ required: "Minimum education is required" }}
                render={({ field }) => (
                  <div className="flex flex-wrap gap-4 mt-2">
                    {educationOptions.map((type) => {
                      return (
                        <div
                          key={type}
                          onClick={() => {
                            field.onChange(type);
                            setValue("educationSpecialization", null);
                            handleEducationSuggestions(type);
                          }}
                          className={`cursor-pointer chip-3d ${
                            field.value === type
                              ? "bg-secondary text-white border-secondary"
                              : "bg-white text-gray-700 border-gray-300 hover:bg-blue-50"
                          }`}
                        >
                          {type.replace(/_/g, " ").replace(/Categories/g, " ")}
                        </div>
                      );
                    })}
                  </div>
                )}
              />

              {errors.education && (
                <Typography color="error" variant="caption">
                  {errors.education.message}
                </Typography>
              )}
            </FormControl>

            {educationLevel && (
              <Box className="flex items-center flex-col w-full gap-2 mt-4">
                <Typography
                  variant="h6"
                  className="self-start"
                  sx={{ fontWeight: 700, fontSize: "0.9rem" }}
                >
                  Specialization
                </Typography>
                <Box className="flex items-start flex-row w-full gap-2 mt-2">
                  <Controller
                    name="educationSpecialization"
                    control={control}
                    render={({ field }) => (
                      <Autocomplete
                        freeSolo
                        className="md:w-1/3 w-full"
                        options={educationSuggestions}
                        value={field.value || ""}
                        onChange={(_, newValue) => field.onChange(newValue)}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            size="small"
                            fullWidth
                            className="border border-gray-300 rounded px-3 py-2 w-full"
                            placeholder="Select or type specialization"
                          />
                        )}
                      />
                    )}
                  />
                </Box>
              </Box>
            )}

            {/* English Level */}
            <FormControl fullWidth className="flex flex-col items-start">
              <FormLabel
                className="mb-2 self-start"
                sx={{ fontWeight: 700, fontSize: "0.9rem" }}
              >
                English level required <span className="text-red-500">*</span>
              </FormLabel>

              <Controller
                name="english"
                control={control}
                rules={{ required: "English Level is required" }}
                render={({ field }) => (
                  <div className="flex flex-wrap gap-4 mt-2">
                    {englishLevels.map((type) => {
                      return (
                        <div
                          key={type}
                          onClick={() => {
                            field.onChange(type);
                          }}
                          className={`cursor-pointer chip-3d ${
                            field.value === type
                              ? "bg-secondary text-white border-secondary"
                              : "bg-white text-gray-700 border-gray-300 hover:bg-blue-50"
                          }`}
                        >
                          {type.replace("-", " ")}
                        </div>
                      );
                    })}
                  </div>
                )}
              />

              {errors.english && (
                <Typography color="error" variant="caption">
                  {errors.english.message}
                </Typography>
              )}
            </FormControl>

            {/* Experience */}
            <FormControl fullWidth className="flex flex-col items-start">
              <FormLabel
                className="mb-2 self-start"
                sx={{ fontWeight: 700, fontSize: "0.9rem" }}
              >
                Total experience required <span className="text-red-500">*</span>
              </FormLabel>
              <Controller
                name="experience"
                control={control}
                rules={{ required: "Experience is required" }}
                render={({ field }) => (
                  <div className="flex flex-wrap gap-4 mt-2">
                    {experienceOptions.map((type) => {
                      return (
                        <div
                          key={type}
                          onClick={() => {
                            field.onChange(type);
                            setExperience(type);
                            if (type !== "Experienced Only") {
                              setValue("experienceLevel", null);
                            }
                          }}
                          className={`cursor-pointer chip-3d ${
                            field.value === type
                              ? "bg-secondary text-white border-secondary"
                              : "bg-white text-gray-700 border-gray-300 hover:bg-blue-50"
                          }`}
                        >
                          {type.replace("-", " ")}
                        </div>
                      );
                    })}
                  </div>
                )}
              />

              {errors.experience && (
                <Typography color="error" variant="caption">
                  {errors.experience.message}
                </Typography>
              )}
            </FormControl>

            {experienceLevel === "Experienced Only" && (
              <FormControl className="flex flex-col items-start w-1/4">
                <FormLabel
                  className="mb-2 self-start"
                  sx={{ fontWeight: 700, fontSize: "0.9rem" }}
                >
                  Experience Level <span className="text-red-500">*</span>
                </FormLabel>

                <Controller
                  name="experienceLevel"
                  control={control}
                  rules={{ required: "Experience Level is required" }}
                  render={({ field }) => {
                    const [min, max] = field.value?.split("-").map(Number) || [
                      null,
                      null,
                    ];

                    const handleChange = (type, value) => {
                      const newMin = type === "min" ? value : min;
                      const newMax = type === "max" ? value : max;

                      if (
                        newMin !== null &&
                        newMax !== null &&
                        newMin > newMax
                      ) {
                        // You can also show a warning if needed
                        return;
                      }

                      field.onChange(`${newMin ?? ""}-${newMax ?? ""}`);
                    };

                    return (
                      <div className="flex gap-4 w-full mt-2">
                        <FormControl fullWidth>
                          <FormLabel>Minimum</FormLabel>
                          <Select
                            value={min ?? ""}
                            onChange={(e) =>
                              handleChange("min", e.target.value)
                            }
                            displayEmpty
                            size="small"
                          >
                            <MenuItem value="">Min</MenuItem>
                            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((val) => (
                              <MenuItem key={val} value={val}>
                                {val} yrs
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>

                        <FormControl fullWidth>
                          <FormLabel>Maximum</FormLabel>
                          <Select
                            value={max ?? ""}
                            onChange={(e) =>
                              handleChange("max", e.target.value)
                            }
                            displayEmpty
                            size="small"
                          >
                            <MenuItem value="">Max</MenuItem>
                            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, ">10"].map(
                              (val) => (
                                <MenuItem key={val} value={val}>
                                  {val} yrs
                                </MenuItem>
                              )
                            )}
                          </Select>
                        </FormControl>
                      </div>
                    );
                  }}
                />

                {errors.experienceLevel && (
                  <Typography color="error" variant="caption">
                    {errors.experienceLevel.message}
                  </Typography>
                )}
              </FormControl>
            )}
          </Box>

          <Box className="bg-white p-6 rounded mt-4 shadow space-y-6 ">
            {/* Optional Additional Requirements */}
            <FormGroup className="space-y-4 flex flex-col items-start">
              <Typography
                variant="h6"
                className="mb-2"
                sx={{ fontWeight: 700, fontSize: "1rem" }}
              >
                Additional Requirements (Optional)
              </Typography>
              <Typography
                variant="body2"
                className="mb-2"
                sx={{ color: "gray", fontSize: "0.8rem" }}
              >
                Add additional requirement so that we can help you find the
                right candidates
              </Typography>

              <Controller
                name="additionalRequirements"
                control={control}
                defaultValue={[]}
                render={({ field }) => {
                  const options = [
                    "gender",
                    "age",
                    "distance",
                    "languages",
                    "skills",
                  ];
                  const labels = {
                    gender: "Gender",
                    age: "Age",
                    distance: "Distance",
                    languages: "Regional Language",
                    skills: "Skills",
                  };

                  return (
                    <Box className="flex flex-wrap mt-4 gap-2">
                      {options.map((val) => {
                        const selected = field.value.includes(val);

                        return (
                          <Box
                            key={val}
                            onClick={() => {
                              const newValue = selected
                                ? field.value.filter((v) => v !== val)
                                : [...field.value, val];

                              toggleField(val);
                              field.onChange(newValue);
                            }}
                            className={`px-4 py-1.5 rounded-full cursor-pointer text-sm font-medium transition border ${
                              selected
                                ? "bg-blue-100 text-blue-700 border-blue-500"
                                : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                            }`}
                          >
                            {labels[val]}
                          </Box>
                        );
                      })}
                    </Box>
                  );
                }}
              />
            </FormGroup>

            {expanded.map((fieldKey) => (
              <Box
                key={fieldKey}
                className="mt-6 border-t border-gray-300 py-4 flex flex-col items-start"
              >
                <Typography className="mb-1 font-medium">
                  {`${fieldKey.charAt(0).toUpperCase()}${fieldKey.slice(
                    1
                  )} Options`}
                </Typography>

                <Controller
                  name={fieldKey}
                  control={control}
                  render={({ field }) => {
                    if (fieldKey === "languages" || fieldKey === "skills") {
                      return (
                        <>
                          {/* Render selected chips */}
                          <Box className="flex flex-wrap rounded-2xl gap-2 mb-2">
                            {(field.value || []).map((value, idx) => (
                              <Chip
                                key={idx}
                                label={value}
                                onDelete={() => {
                                  const updated = field.value.filter(
                                    (val) => val !== value
                                  );
                                  field.onChange(updated);
                                }}
                                className="cursor-pointer"
                              />
                            ))}
                          </Box>

                          {/* Autocomplete input */}
                          <div className="flex flex-wrap gap-4 mt-2 w-1/3">
                            <Autocomplete
                              multiple
                              freeSolo
                              className="w-full"
                              inputValue={inputValue}
                              onInputChange={(event, value, reason) => {
                                if (reason === "input") {
                                  setInputValue(value);
                                  if (fieldKey === "skills") {
                                    handleSkillsSuggestions(value);
                                  }
                                }
                              }}
                              options={(fieldKey === "skills"
                                ? skillsSuggestions
                                : ADDITIONAL_FIELDS[fieldKey]
                              ).filter(
                                (option) =>
                                  !(field.value || []).includes(option)
                              )}
                              value={field.value || []}
                              onChange={(event, newValue) => {
                                const currentValues = field.value || [];
                                const lastValue = newValue[newValue.length - 1];

                                if (
                                  lastValue &&
                                  lastValue.trim() !== "" &&
                                  !currentValues.includes(lastValue)
                                ) {
                                  field.onChange([...currentValues, lastValue]);
                                  setInputValue(""); // only clear input if new value added
                                }
                              }}
                              renderTags={() => null}
                              renderInput={(params) => (
                                <TextField
                                  {...params}
                                  size="small"
                                  fullWidth
                                  className="border border-gray-300 rounded px-3 py-2 w-full"
                                  placeholder="Type and Select"
                                />
                              )}
                            />
                          </div>
                        </>
                      );
                    } else {
                      return (
                        <div className="flex flex-wrap gap-4 mt-2">
                          {ADDITIONAL_FIELDS[fieldKey].map((type) => (
                            <div
                              key={type}
                              onClick={() => field.onChange(type)}
                              className={`cursor-pointer chip-3d transition ${
                                field.value === type
                                  ? "bg-secondary text-white border-secondary"
                                  : "bg-white text-gray-700 border-gray-300 hover:bg-blue-50"
                              }`}
                            >
                              {type}
                            </div>
                          ))}
                        </div>
                      );
                    }
                  }}
                />
              </Box>
            ))}
          </Box>

          <Box className="bg-white p-6 rounded mt-4 shadow flex flex-col items-start">
            <Typography
              variant="h6"
              className="mb-2"
              sx={{ fontWeight: 700, fontSize: "1rem" }}
            >
              Job Description
            </Typography>
            <Typography
              variant="body2"
              className="mb-2"
              sx={{ color: "gray", fontSize: "0.8rem" }}
            >
              Describe the responsibilities of this job and other specific
              requirements here.
            </Typography>

            {/* Job Description */}

            <Box className="mt-6 mb-1 w-full" sx={{ marginBottom: "30px" }}>
              <Controller
                name="jobDescription"
                control={control}
                defaultValue=""
                render={({ field: { onChange, onBlur, value } }) => (
                  <ReactQuill
                    theme="snow"
                    value={value}
                    onChange={onChange}
                    onBlur={onBlur}
                    modules={modules}
                    formats={formats}
                    className="quill-editor"
                    placeholder="Write job description..."
                  />
                )}
              />
            </Box>
          </Box>

          <Box className="bg-white p-6 rounded mt-4 gap-4 justify-center shadow  flex flex-row ">
            <Button
              variant="outlined"
              sx={{ color: "#0784C9" }}
              onClick={() => {
                setCurrentStep((prev) => prev - 1); // only runs if form is valid
              }}
            >
              Back
            </Button>

            <button
              className="btn-3d"
              onClick={handleSubmit(() => {
                setCurrentStep((prev) => prev + 1); // only runs if form is valid
              })}
            >
              Continue
            </button>
          </Box>
        </form>
      )}

      {currentStep === 2 && (
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box className="bg-white p-6 rounded shadow space-y-6 flex flex-col items-start">
            <Typography
              variant="h6"
              className="mb-2"
              sx={{ fontWeight: 700, fontSize: "1rem" }}
            >
              Interview method and address
            </Typography>
            <Typography
              variant="body2"
              className="mb-2"
              sx={{ color: "gray", fontSize: "0.8rem" }}
            >
              Let candidates know how interview will be conducted for this job.
            </Typography>

            {/* Walk-in Interview */}
            <FormControl
              component="fieldset"
              fullWidth
              className="flex flex-col items-start"
            >
              <FormLabel
                className="mb-2 self-start"
                sx={{ fontWeight: 700, fontSize: "0.9rem" }}
              >
                Is this a walk-in interview? 
              </FormLabel>
              <Controller
                name="walkIn"
                control={control}
                render={({ field }) => (
                  <RadioGroup
                    {...field}
                    onChange={(e) => {
                      const value = e.target.value === "true";
                      setWalkIn(value);
                      field.onChange(value);
                      if (!value) {
                        setValue("walkInAddress", null);
                        setValue("walkInStartDate", null);
                        setValue("WalkInEndDate", null);
                        setValue("walkInStartTime", null);
                        setValue("walkInInstruction", null);
                      }
                    }}
                  >
                    <FormControlLabel
                      value="true"
                      control={<Radio />}
                      label="Yes"
                    />
                    <FormControlLabel
                      value="false"
                      control={<Radio />}
                      label="No"
                    />
                  </RadioGroup>
                )}
              />
              {errors.walkIn && (
                <Typography color="error" variant="caption">
                  {errors.walkIn.message}
                </Typography>
              )}
            </FormControl>

            {walkIn && (
              <>
                <FormControl fullWidth className="flex flex-col items-start">
                  <FormLabel
                    className="mb-2 self-start"
                    sx={{ fontWeight: 700, fontSize: "0.9rem" }}
                  >
                    Walk-in Interview address <span className="text-red-500">*</span>
                  </FormLabel>
                  <Controller
                    name="walkInAddress"
                    control={control}
                    rules={{ required: "Address is required" }}
                    render={({ field }) => (
                      <div className="flex flex-col gap-2 items-start justify-center">
                        <div className="flex flex-row gap-2">
                          <TextField
                            {...field}
                            placeholder="Enter full address"
                            size="small"
                            error={!!errors.walkInAddress}
                            helperText={errors.walkInAddress?.message}
                          />
                          <IconButton
                            onClick={async () => {
                              const loc = await handleCurrentLocation();
                              if (loc) {
                                console.log(loc);
                                setValue("walkInAddress", loc);
                              }
                            }}
                            edge="end"
                            aria-label="use current location"
                          >
                            <MapPin className="text-[#0784C9] " />
                          </IconButton>
                        </div>

                        <label className="m-0 text-12 text-gray-500">
                          <input
                            type="checkbox"
                            className="p-0 mr-4"
                            onChange={(e) => {
                              if (e.target.checked) {
                                setValue(
                                  "walkInAddress",
                                  `${getValues("location")}, ${getValues(
                                    "city"
                                  )}, ${getValues("state")}`
                                );
                              }
                            }}
                          />
                          Same as office address
                        </label>
                      </div>
                    )}
                  />
                </FormControl>

                {/* Walk-in Start and End Date */}
                <Box className="flex flex-row w-full gap-4 mt-4">
                  <div className="w-1/2">
                    <FormControl fullWidth>
                      <FormLabel
                        className="mb-2 self-start"
                        sx={{ fontWeight: 700, fontSize: "0.9rem" }}
                      >
                        Walk-in Start date <span className="text-red-500">*</span>
                      </FormLabel>
                      <Controller
                        name="walkInStartDate"
                        control={control}
                        rules={{ required: "Start date is required" }}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            type="date"
                            size="small"
                            fullWidth
                            error={!!errors.walkInStartDate}
                            helperText={errors.walkInStartDate?.message}
                          />
                        )}
                      />
                    </FormControl>
                  </div>

                  <div className="w-1/2">
                    <FormControl fullWidth>
                      <FormLabel
                        className="mb-2 self-start"
                        sx={{ fontWeight: 700, fontSize: "0.9rem" }}
                      >
                        Walk-in End Date <span className="text-red-500">*</span>
                      </FormLabel>
                      <Controller
                        name="WalkInEndDate"
                        control={control}
                        rules={{
                          required: "End date is required",
                          validate: (value) => {
                            const startDateStr = getValues("WalkInStartDate");

                            if (!startDateStr) return true; // Skip validation if start date is not yet set

                            const endDate = new Date(value);
                            const startDate = new Date(startDateStr);

                            if (endDate < startDate) {
                              return "End Date should be greater than Start Date";
                            }
                            return true;
                          },
                        }}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            type="date"
                            size="small"
                            fullWidth
                            error={!!errors.WalkInEndDate}
                            helperText={errors.WalkInEndDate?.message}
                          />
                        )}
                      />
                    </FormControl>
                  </div>
                </Box>

                {/* Walk-in Timings */}
                <Box className="flex gap-4 mt-4 w-1/2">
                  <FormControl fullWidth>
                    <FormLabel
                      className="mb-2 self-start"
                      sx={{ fontWeight: 700, fontSize: "0.9rem" }}
                    >
                      Walk-in Time <span className="text-red-500">*</span>
                    </FormLabel>

                    <Controller
                      name="walkInStartTime"
                      control={control}
                      fullWidth
                      rules={{ required: "Walk-in time is required" }}
                      defaultValue=""
                      render={({ field }) => {
                        const [startHour, setStartHour] = useState("");
                        const [startPeriod, setStartPeriod] = useState("A.M");
                        const [endHour, setEndHour] = useState("");
                        const [endPeriod, setEndPeriod] = useState("P.M");

                        // On mount, parse the initial value into individual time fields
                        useEffect(() => {
                          if (field.value) {
                            const [start, end] = field.value.split(" - ") || [
                              "",
                              "",
                            ];
                            const [sh = "", sp = ""] = start.trim().split(" ");
                            const [eh = "", ep = ""] = end.trim().split(" ");
                            setStartHour(sh.replace(":00", ""));
                            setStartPeriod(sp);
                            setEndHour(eh.replace(":00", ""));
                            setEndPeriod(ep);
                          }
                        }, [field.value]);

                        // Update the main field value whenever any time field changes
                        useEffect(() => {
                          if (
                            startHour &&
                            startPeriod &&
                            endHour &&
                            endPeriod
                          ) {
                            const combined = `${startHour}:00 ${startPeriod} - ${endHour}:00 ${endPeriod}`;
                            field.onChange(combined);
                          }
                        }, [startHour, startPeriod, endHour, endPeriod]);

                        return (
                          <Grid container spacing={2} sx={{ mt: 1 }}>
                            {/* Start Time */}
                            <Grid item xs={6}>
                              <FormControl fullWidth size="small">
                                <FormLabel>Start Hour</FormLabel>
                                <Select
                                  value={startHour}
                                  onChange={(e) => setStartHour(e.target.value)}
                                  displayEmpty
                                >
                                  <MenuItem value="">Select</MenuItem>
                                  {[...Array(12)].map((_, i) => {
                                    const hour = (i + 1).toString();
                                    return (
                                      <MenuItem key={hour} value={hour}>
                                        {hour}
                                      </MenuItem>
                                    );
                                  })}
                                </Select>
                              </FormControl>
                            </Grid>
                            <Grid item xs={3}>
                              <FormControl fullWidth size="small">
                                <FormLabel>Start Period</FormLabel>
                                <Select
                                  value={startPeriod}
                                  onChange={(e) =>
                                    setStartPeriod(e.target.value)
                                  }
                                  displayEmpty
                                >
                                  <MenuItem value="A.M">A.M</MenuItem>
                                  <MenuItem value="P.M">P.M</MenuItem>
                                </Select>
                              </FormControl>
                            </Grid>

                            {/* End Time */}
                            <Grid item xs={6}>
                              <FormControl fullWidth size="small">
                                <FormLabel>End Hour</FormLabel>
                                <Select
                                  value={endHour}
                                  onChange={(e) => setEndHour(e.target.value)}
                                  displayEmpty
                                >
                                  <MenuItem value="">Select</MenuItem>
                                  {[...Array(12)].map((_, i) => {
                                    const hour = (i + 1).toString();
                                    return (
                                      <MenuItem key={hour} value={hour}>
                                        {hour}
                                      </MenuItem>
                                    );
                                  })}
                                </Select>
                              </FormControl>
                            </Grid>
                            <Grid item xs={3}>
                              <FormControl fullWidth size="small">
                                <FormLabel>End Period</FormLabel>
                                <Select
                                  value={endPeriod}
                                  onChange={(e) => setEndPeriod(e.target.value)}
                                  displayEmpty
                                >
                                  <MenuItem value="A.M">A.M</MenuItem>
                                  <MenuItem value="P.M">P.M</MenuItem>
                                </Select>
                              </FormControl>
                            </Grid>
                          </Grid>
                        );
                      }}
                    />
                  </FormControl>
                </Box>

                {/* Other Instructions */}
                <FormControl fullWidth className="mt-4">
                  <FormLabel
                    className="mb-2 self-start"
                    sx={{ fontWeight: 700, fontSize: "0.9rem" }}
                  >
                    Other Instructions
                  </FormLabel>
                  <Controller
                    name="walkInInstruction"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        multiline
                        rows={3}
                        placeholder="e.g. Bring ID card, CV, Resume etc."
                        inputProps={{ maxLength: 300 }}
                        helperText={`${field.value?.length || 0}/300`}
                      />
                    )}
                  />
                </FormControl>
              </>
            )}
          </Box>
          <Box className="bg-white p-6 mt-4 rounded shadow space-y-6 flex flex-col items-start">
            <Typography
              variant="h6"
              className="mb-2"
              sx={{ fontWeight: 700, fontSize: "1rem" }}
            >
              Communication Preferences
            </Typography>
            {/* Communication Preferences */}
            <Box className="bg-blue-50 p-3 mt-4 rounded border border-blue-200">
              <Typography variant="body2">
                Leads information will be accessible on Unigrow portal and
                can be <strong>downloaded in excel format</strong>
              </Typography>
            </Box>

            {/* <FormControl component="fieldset" fullWidth>
              <FormLabel
                className="mb-2 self-start"
                sx={{ fontWeight: 700, fontSize: "0.9rem" }}
              >
                Do you want candidates to contact you via Call / WhatsApp after
                they apply? *
              </FormLabel>
              <Controller
                name="contactPrefernece"
                control={control}
                rules={{ required: "Please select your preference" }}
                render={({ field }) => (
                  <RadioGroup
                    {...field}
                    onChange={(e) => {
                      const value = e.target.value;
                      field.onChange(value);
                      if (value) {
                        setContactPermission(value);
                      }
                    }}
                  >
                    <FormControlLabel
                      value="self"
                      control={<Radio />}
                      label="Yes, to myself"
                    />
                    <FormControlLabel
                      value="other"
                      control={<Radio />}
                      label="Yes, to other recruiter"
                    />
                    <FormControlLabel
                      value="no"
                      control={<Radio />}
                      disabled={walkIn === "no"}
                      label="No, I will contact candidates first"
                    />
                  </RadioGroup>
                )}
              />
              {walkIn === "no" && <p>This Option is only valid for walk in</p>}
              {errors.contactPrefernece && (
                <Typography color="error" variant="caption">
                  {errors.contactPrefernece.message}
                </Typography>
              )}
            </FormControl> */}

            <FormControl component="fieldset" fullWidth>
              <FormLabel className="mt-2 mb-2 self-start">
                Every time you receive a candidate application,do you want
                Whatsapp Alerts from Unigrow? <span className="text-red-500">*</span>
              </FormLabel>
              <Controller
                name="notificationPreference"
                control={control}
                rules={{ required: "Please select your preference" }}
                render={({ field }) => (
                  <RadioGroup
                    {...field}
                    onChange={(e) => {
                      const value = e.target.value;
                      field.onChange(value);
                      if (value === "yes") {
                        setContactPermission("other");
                      } else {
                        setContactPermission("self");
                      }
                    }}
                  >
                    <FormControlLabel
                      value="yes"
                      control={<Radio />}
                      label="Yes, to other recruiter"
                    />
                    <FormControlLabel
                      value="no"
                      control={<Radio />}
                      label="No, send me the notifications"
                    />
                  </RadioGroup>
                )}
              />
              {errors.notificationPreference && (
                <Typography color="error" variant="caption">
                  {errors.notificationPreference.message}
                </Typography>
              )}
            </FormControl>

            {contactpermission === "other" && (
              <FormGroup className="space-y-4 flex flex-col w-full items-start">
                <Typography
                  variant="h6"
                  className="mb-2 self-start"
                  sx={{ fontWeight: 700, fontSize: "0.9rem" }}
                >
                  Fill other recruiter details
                </Typography>

                {/* Recruiter's Name */}
                <Box className="w-1/2 flex flex-col mt-2 items-start">
                  <Typography
                    variant="h6"
                    className="mb-2 self-start"
                    sx={{ fontWeight: 700, fontSize: "0.9rem" }}
                  >
                    Recruiter's Name <span className="text-red-500">*</span>
                  </Typography>
                  <Controller
                    name="otherRecruiterName"
                    control={control}
                    rules={{ required: "Recruiter's Name is required" }}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        fullWidth
                        size="small"
                        value={field.value || ""}
                        label="Recruiter's Name"
                        placeholder="Enter Full Name"
                        error={!!errors.otherRecruiterName}
                        helperText={errors.otherRecruiterName?.message}
                      />
                    )}
                  />
                </Box>

                <Box className="w-1/2 flex flex-col mt-2 items-start">
                  <Typography
                    variant="h6"
                    className="mb-2 self-start"
                    sx={{ fontWeight: 700, fontSize: "0.9rem" }}
                  >
                    Recruiter’s Whatsapp No. <span className="text-red-500">*</span>
                  </Typography>
                  <Controller
                    name="otherRecruiterNumber"
                    control={control}
                    rules={{
                      required: "WhatsApp number is required",
                      pattern: {
                        value: /^[0-9]{10}$/,
                        message: "Enter a valid 10-digit number",
                      },
                    }}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        fullWidth
                        size="small"
                        value={field.value || ""}
                        label="Recruiter's WhatsApp No."
                        placeholder="Enter Number"
                        error={!!errors.otherRecruiterNumber}
                        helperText={errors.otherRecruiterNumber?.message}
                      />
                    )}
                  />
                </Box>

                <Box className="w-1/2 flex flex-col mt-2 items-start">
                  <Typography
                    variant="h6"
                    className="mb-2 self-start"
                    sx={{ fontWeight: 700, fontSize: "0.9rem" }}
                  >
                    Recruiter’s Email ID <span className="text-red-500">*</span>
                  </Typography>
                  <Controller
                    name="otherRecruiterEmail"
                    control={control}
                    rules={{
                      required: "Email is required",
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: "Enter a valid email address",
                      },
                    }}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        fullWidth
                        size="small"
                        value={field.value || ""}
                        label="Recruiter's Email ID"
                        placeholder="Enter Email"
                        error={!!errors.otherRecruiterEmail}
                        helperText={errors.otherRecruiterEmail?.message}
                      />
                    )}
                  />
                </Box>
              </FormGroup>
            )}

            {(contactpermission === "self" ||
              contactpermission === "other") && (
              <>
                <FormControl component="fieldset" fullWidth>
                  <FormLabel
                    className="mb-2 self-start"
                    sx={{ fontWeight: 700, fontSize: "0.9rem" }}
                  >
                    Which candidates should be able to contact you ? <span className="text-red-500">*</span>
                  </FormLabel>
                  <Controller
                    name="candidateType"
                    control={control}
                    rules={{ required: "Please select your preference" }}
                    render={({ field }) => (
                      <RadioGroup {...field}>
                        <FormControlLabel
                          value="all candidate"
                          control={<Radio />}
                          label="All candidates"
                        />
                        <FormControlLabel
                          value="matched-candidate"
                          control={<Radio />}
                          label="Only matched candidates (~20% of all candidates)"
                        />
                      </RadioGroup>
                    )}
                  />
                  {errors.candidateType && (
                    <Typography color="error" variant="caption">
                      {errors.candidateType.message}
                    </Typography>
                  )}
                </FormControl>
              </>
            )}
          </Box>

          <Box className="bg-white p-6 rounded mt-4 gap-4 shadow flex flex-row justify-center">
            <Button
              variant="outlined"
              sx={{ backgroundColor: "secondary" }}
              onClick={() => {
                setCurrentStep((prev) => prev - 1); // only runs if form is valid
              }}
            >
              Back
            </Button>

            <button
              className="btn-3d"
              onClick={handleSubmit(() => {
                setCurrentStep((prev) => prev + 1); // only runs if form is valid
              })}
            >
              Continue
            </button>
          </Box>
        </form>
      )}

      {currentStep === 3 && (
        <div className=" w-full">
          <div
            className="w-full borderb-gray bg-white flex p-4 flex-row justify-between"
            onClick={() => setShowJobDetailpreview(!showJobDetailpreview)}
          >
            <div className="flex flex-row gap-4">
              <BriefcaseBusiness />
              <h3 className="font-bold text-lg">JobDetails</h3>
            </div>
            <div className="flex flex-row gap-4">
              <Pencil
                onClick={() => setCurrentStep(0)}
                size={35}
                className="bg-secondary text-black p-2 rounded-lg cursor-pointer"
              />
              {showJobDetailpreview ? (
                <ChevronUp
                  onClick={() => setShowJobDetailpreview(!showJobDetailpreview)}
                />
              ) : (
                <ChevronDown
                  onClick={() => setShowJobDetailpreview(!showJobDetailpreview)}
                />
              )}
            </div>
          </div>

          {showJobDetailpreview && (
            <Card variant="outlined">
              <CardContent className="p-6">
                <div className="space-y-4 text-sm">
                  <DetailRow label="Company name" value={values.companyName} />
                  <DetailRow label="Job title" value={values.jobTitle} />
                  <DetailRow label="Job role" value={values.jobRoles} />
                  <DetailRow label="Job type" value={values.jobType} />
                  <DetailRow label="Is Night Shift" value={values.nightShift} />
                  <DetailRow
                    label="Work type"
                    value={values.workLocationType}
                  />
                  <DetailRow
                    label="Job location"
                    value={`${values.location}, ${values.city}, ${values.state}`}
                  />

                  <DetailRow
                    label="Monthly Salary | Pay Type"
                    value={`${values.minimumSalary}-${values.maximumSalary} ${
                      values.incentive !== ""
                        ? `incentive-${values.incentive}`
                        : ""
                    } per month (${values.payType})`}
                  />
                  <DetailRow label="Additional perks" value={values.perks} />
                  <DetailRow
                    label="Joining Fee"
                    value={`${
                      values.joiningfee === "true"
                        ? `${values.joiningFeeAmount} for ${values.joiningFeeReason}(${values.joiningFeeReasonDetail}) at ${values.joiningFeeAmountTime}`
                        : "No"
                    }`}
                  />
                </div>
              </CardContent>
            </Card>
          )}

          <div
            className="w-full borderb-gray bg-white flex mt-4 p-4 flex-row justify-between"
            onClick={() =>
              setShowCandidateRequirementPreview(
                !showCandidateRequirementsPreview
              )
            }
          >
            <div className="flex flex-row gap-4">
              <Award />
              <h3 className="font-bold text-lg">Candidate Requirement</h3>
            </div>
            <div className="flex flex-row gap-4">
              <Pencil
                onClick={() => setCurrentStep(1)}
                size={35}
                className="bg-secondary text-black p-2 rounded-lg cursor-pointer"
              />
              {showCandidateRequirementsPreview ? (
                <ChevronUp
                  onClick={() =>
                    setShowCandidateRequirementPreview(
                      !showCandidateRequirementsPreview
                    )
                  }
                />
              ) : (
                <ChevronDown
                  onClick={() =>
                    setShowCandidateRequirementPreview(
                      !showCandidateRequirementsPreview
                    )
                  }
                />
              )}
            </div>
          </div>

          {showCandidateRequirementsPreview && (
            <Card variant="outlined">
              <CardContent className="p-6">
                <div className="space-y-4 text-sm">
                  <DetailRow
                    label="Minimum Education"
                    value={values.education}
                  />
                  <DetailRow
                    label="Specialization"
                    value={values.educationSpecialization}
                  />
                  <DetailRow
                    label="Experience Required"
                    value={`${values.experienceLevel}(${values.experience})`}
                  />
                  <DetailRow label="English" value={values.english} />
                  {expanded.map((type) => (
                    <DetailRow label={type} value={values[type]} />
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          <div
            className="w-full borderb-gray bg-white flex mt-4 p-4 flex-row justify-between"
            onClick={() =>
              setShowInterviewDetailPreview(!shownterviewDetailPreview)
            }
          >
            <div className="flex flex-row gap-4">
              <Handshake />
              <h3 className="font-bold text-lg">Interview Information</h3>
            </div>
            <div className="flex flex-row gap-4">
              <Pencil
                onClick={() => setCurrentStep(2)}
                size={35}
                className="bg-secondary text-black p-2 rounded-lg cursor-pointer"
              />
              {shownterviewDetailPreview ? (
                <ChevronUp
                  onClick={() =>
                    setShowInterviewDetailPreview(!shownterviewDetailPreview)
                  }
                />
              ) : (
                <ChevronDown
                  onClick={() =>
                    setShowInterviewDetailPreview(!shownterviewDetailPreview)
                  }
                />
              )}
            </div>
          </div>

          {shownterviewDetailPreview && (
            <Card variant="outlined">
              <CardContent className="p-6">
                <div className="space-y-4 text-sm">
                  <DetailRow
                    label="Is this a walk-in interview ?"
                    value={`${
                      values.walkIn
                        ? `Address-${values.walkInAddress} from ${values.walkInStartDate}-${values.WalkInEndDate} on ${values.walkInStartTime}`
                        : "No"
                    }`}
                  />

                  {contactpermission === "other" && (
                    <DetailRow
                      label="HR Detail"
                      value={`${values.otherRecruiterName}, email: ${values.otherRecruiterEmail}, number ${values.otherRecruiterNumber}`}
                    />
                  )}

                  <DetailRow
                    label="Can candidates contact"
                    value={values.candidateType}
                  />
                  <DetailRow
                    label="Whatsapp alert"
                    value={values.notificationPreference}
                  />
                </div>
              </CardContent>
            </Card>
          )}

          <div className="flex justify-between mt-6">
            <Button
              onClick={() => setCurrentStep((prev) => prev - 1)}
              variant="outlined"
              sx={{ color: "#0784C9" }}
            >
              Back
            </Button>
            <button className="btn-3d" onClick={handleSubmit(onSubmit)}>
              Continue
            </button>
          </div>
        </div>
      )}
      {showCompanyChangeOptions && (
        <Menu
          open={showCompanyChangeOptions}
          onClose={() => setShowCompanyChangeOoptions(false)}
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          sx={{ padding: "40px", borderRadius: "50%", maxWidth: "500px" }}
        >
          <RadioGroup
            onChange={(e) => setShowCompanyModal(e.target.value)}
            className="flex flex-col gap-4 ml-6 py-2 rounded-lg"
          >
            <FormControlLabel
              value="same"
              className="border p-2 flex border-gray text-sm shadow-lg rounded-lg"
              control={<Radio />}
              label="I changed my company"
            />
            <FormControlLabel
              value="consultancy"
              control={<Radio />}
              className="border p-2 flex border-gray shadow-lg rounded-lg "
              label="I belong to a consultancy & want to post for my client's company"
            />
            <FormControlLabel
              value="other"
              className="border p-2 flex  border-gray shadow-lg rounded-lg"
              control={<Radio />}
              label="I want to post for another company/business/consultancy of my own"
            />
          </RadioGroup>
        </Menu>
      )}

      {showCompanyModal && (
        <Dialog
          open={showCompanyModal}
          onClose={() => setShowCompanyModal(null)}
          fullWidth
          maxWidth="sm"
        >
          <DialogTitle
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography fontWeight={600}>Company Hiring For</Typography>
            <IconButton size="small" onClick={() => setShowCompanyModal(null)}>
              <Close />
            </IconButton>
          </DialogTitle>

          <DialogContent dividers>
            {/* Description */}
            <Typography fontSize={14} mb={2}>
              You're changing your company from{" "}
              <b>{employer?.company.companyName}</b> Please select/add company
              below:
            </Typography>

            {/* Company Name Input */}
            <Box mb={2}>
              <Typography fontSize={14} fontWeight={500} mb={0.5}>
                Your company name <span style={{ color: "red" }}>*</span>
              </Typography>
              <TextField
                fullWidth
                placeholder="Select company"
                size="small"
                variant="outlined"
                onChange={(e) => setNewCompanyName(e.target.value)}
              />
            </Box>

            {/* Checkbox */}
            <FormControlLabel
              control={
                <Checkbox
                  checked={
                    showCompanyModal === "consultancy"
                      ? true
                      : isConsultancyCompany
                  }
                  disabled={showCompanyModal === "consultancy"}
                  onChange={(e) => setIsConsultancyCompany(e.target.checked)}
                />
              }
              label="This is a Consultancy (Hiring or Staffing agency)"
            />

            {/* Employee Chips */}
            <Box mt={3}>
              <Typography fontSize={14} fontWeight={500} mb={1}>
                Number of employees in your company{" "}
                <span style={{ color: "red" }}>*</span>
              </Typography>
              <Box display="flex" flexWrap="wrap" gap={1}>
                {[
                  "0-50",
                  "51-100",
                  "101-300",
                  "301-500",
                  "501-1000",
                  "1000 above",
                ].map((option) => (
                  <span
                    key={option}
                    className={`chip-3d cursor-pointer ${
                      selectedEmployees === option
                        ? "bg-blue-600 text-white"
                        : "bg-gray-200 text-gray-800"
                    }`}
                    onClick={() => setSelectedEmployees(option)}
                  >
                    {option}
                  </span>
                ))}
              </Box>
            </Box>

            {/* Action Buttons */}
            <Box display="flex" justifyContent="flex-end" mt={4} gap={1}>
              <Button
                variant="outlined"
                onClick={() => setShowCompanyModal(null)}
              >
                Cancel
              </Button>
              <button
                disabled={!newCompanyName}
                onClick={() => handleCompanyChange(showCompanyModal)}
                className="btn-3d"
              >
                Change
              </button>
            </Box>
          </DialogContent>
        </Dialog>
      )}
    </Box>
  );
};

export default PostJob;
