import React, { useState } from 'react';
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
  Radio
} from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { Plus, X } from 'lucide-react';

const steps = ['Job details', '', '', '', ''];

const PERKS = [
  'Flexible Working Hours',
  'Weekly Payout',
  'Overtime Pay',
  'Joining Bonus',
  'Annual Bonus',
  'PF',
  'Travel Allowance (TA)',
  'Petrol Allowance',
  'Mobile Allowance',
  'Internet Allowance',
  'Laptop',
  'Health Insurance',
  'ESI (ESIC)',
  'Food/Meals',
  'Accommodation',
  '5 Working Days',
  'One-Way Cab',
  'Two-Way Cab',

];

const educationOptions = [
  '10th Or Below 10th',
  '12th Pass',
  'Diploma',
  'ITI',
  'Graduate',
  'Post Graduate',

];

const ADDITIONAL_FIELDS = {
  gender: ['Male', 'Female', 'Other'],
  distance: ['<10km', '10-20km', '>20km'],
  languages: ['Hindi', 'English', 'Tamil'],
  skills: ['Communication', 'Sales', 'Excel'],
  age: ['18-25', '26-35', '36+'],
  specialization: ['Marketing', 'Finance', 'HR'],
};

const englishLevels = ['No English', 'Basic English', 'Good English'];

const experienceOptions = ['Any', 'Experienced Only', 'Fresher Only'];

const experienceLevelOptions = ["6 Months", "1 year", "2 year", "3 year", "4 year", "5 year", "5+ year",]

const PostJob = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedLocationType, setSelectedLocationType] = useState(null);
  const [selectedPayType, setSelectedPayType] = useState(null);
  const [joiningFees, setjoiningfee] = useState("false");
  const [joiningFeesReason, setjoiningFeesReason] = useState(null);
  const [experienceLevel, setExperience] = useState(null);
  const [educationLevel, setEducation] = useState(null);
  const [expanded, setExpanded] = useState([]);
  const [walkIn, setWalkIn] = useState(null);
  const [contactpermission, setContactPermission] = useState(null);

  const {
    handleSubmit,
    control,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: {
      companyName: '',
      jobTitle: '',
      jobType: 'Full Time',
      nightShift: false,
      workLocationType: '',
      location: "",
      payType: '',
      minimumSalary: "",
      maximumSalary: "",
      incentive: "",
      perks: [],
      joiningfee: "",
      joiningFeeAmount: "",
      joiningFeesAmountReason: "",
      joiningFeesAmountReasonDetail: "",
      joiningFeeAmountTime: "",
      education: '',
      english: '',
      experience: '',
      experienceLevel: "",
      specialization: "",
      gender: '',
      age: '',
      languages: '',
      distance: '',
      skills: '',
      jobDescription: '',
      walkIn: '',
      walkInAddress: "",
      walkInStartDate: "",
      walkInEndDate: "",
      walkInStartTime: "",
      walkInInstructions: "",
      contactPreference: '',
      otherRecruiterName: "",
      otherRecruiterNumber: "",
      otherRecruiterEmail: "",
      candidateType: "",
      notificationPreference: ""
    },
  });

  const toggleField = (field) => {
    if (expanded.includes(field)) {
      setExpanded(expanded.filter((f) => f !== field));

    } else {
      setExpanded([...expanded, field]);
    }
  };

  const onSubmit = (data) => {

    console.log('Form Submitted:', data);
  };

  return (
    <Box className="p-6 bg-gray-200 min-h-screen">
      <Typography variant="h5" fontWeight="bold" className="mb-6 flex justify-start" sx={{ fontSize: "1.5rem" }}>
        Post a new job
      </Typography>


      <div className='mt-2 pt-6 h-auto bg-white rounded-lg'>
        <Stepper activeStep={currentStep} alternativeLabel className="mb-8">
          {steps.map((label, index) => (
            <Step key={index}>
              <StepLabel >{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </div>


      {currentStep === 0 &&
        <form onSubmit={handleSubmit(onSubmit)}>

          <Box className="bg-white p-6 flex justify-start flex-col items-start rounded shadow">
            {/* Job Details Section */}
            <Typography variant="h6" className="mb-2" sx={{ fontWeight: 700, fontSize: "1rem" }}>
              Job details
            </Typography>
            <Typography variant="body2" className="mb-2" sx={{ color: "gray", fontSize: "0.8rem" }}>
              We use this information to find the best candidates for the job.
            </Typography>

            <Box className="mt-4 flex justify-start flex-col items-start" >
              <Typography sx={{ fontWeight: 500, fontSize: "0.9rem", color: "#464343" }}>
                Company you belong to <strong>GAME OF TRADING ASS.</strong>
              </Typography>
            </Box>

            <Box className="flex items-center flex-col w-full gap-2 mt-4">
            <Typography variant="h6" className="self-start" sx={{ fontWeight: 700, fontSize: "0.9rem" }}>
              Company You are Hiring For
            </Typography>
            <Box className="flex items-start flex-row w-full gap-2 mt-2">
              <Controller
                name="companyName"
                control={control}
                rules={{ required: 'Company name is required' }}
                render={({ field }) => (
                  <>
                    <TextField
                      {...field}
                      label="Company you're hiring for"
                      fullWidth
                      size='small'
                      error={!!errors.companyName}
                      helperText={errors.companyName?.message}
                    />
                    <Button variant="text" sx={{ color: "green", fontSize: "1rem", fontWeight: 700 }}>Change</Button>
                  </>
                )}
              />
              </Box>
            </Box>

            <Box className="mt-4 w-1/2 flex flex-col items-start">
            <Typography variant="h6" className="mb-2 self-start" sx={{ fontWeight: 700, fontSize: "0.9rem" }}>
            Job title / Designation
            </Typography>
            <Box className="flex items-start flex-row w-full gap-2 mt-2">
              <Controller
                name="jobTitle"
                control={control}
                rules={{ required: 'Job title is required' }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Eg. Accounant"
                    size='small'
                    fullWidth
                    error={!!errors.jobTitle}
                    helperText={errors.jobTitle?.message}
                  />
                )}
              />
              </Box>
            </Box>

            <Box className="mt-6 flex flex-col items-start">
            <Typography variant="h6" className="mb-2 self-start" sx={{ fontWeight: 700, fontSize: "0.9rem" }}>
            Type of Job
            </Typography>
              <Controller
                name="jobType"
                control={control}
                rules={{ required: 'Job type is required' }}
                render={({ field }) => (
                  <div className="flex flex-wrap gap-4 mt-2">
                    {["full-time", "part-time", "internship", "contract"].map((type) => {

                      return (
                        <div
                          key={type}
                          onClick={() => field.onChange(type)}
                          className={`cursor-pointer px-6 py-1 rounded-full border ${field.value === type
                            ? "bg-green-600 text-white border-green-900"
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

            </Box>

            <Box className="mt-4">
              <Controller
                name="nightShift"
                control={control}
                render={({ field }) => (
                  <FormControlLabel
                    control={<Checkbox {...field} checked={field.value} />}
                    label="This is a night shift job"
                  />
                )}
              />
            </Box>

          </Box>

          <Box className="bg-white p-6 mt-2 flex justify-start flex-col items-start rounded shadow">

            {/* Location Type Section */}

            <Typography className="mb-2" sx={{ fontWeight: 700, fontSize: "1rem" }}>Location</Typography>
            <Typography className="mb-2" sx={{ color: "gray", fontSize: "0.8rem" }}>Let candidates know where they will be working from.</Typography>
            <Box className="mt-6 flex items-start flex-col">
              <Typography className="mb-2 font-medium">Work location type *</Typography>
              <Controller
                name="workLocationType"
                control={control}
                rules={{ required: 'Location type is required' }}
                render={({ field }) => (
                  <div className="flex flex-wrap gap-4 mt-2">
                    {["work-from-office", "work-from-home", "field-job"].map((type) => {

                      return (
                        <div
                          key={type}
                          onClick={() => {
                            field.onChange(type)
                            setSelectedLocationType(type)
                          }
                          }
                          className={`cursor-pointer px-6 py-1 rounded-full border ${field.value === type
                            ? "bg-green-600 text-white border-green-900"
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

              {errors.workLocationType && (
                <Typography variant="caption" color="error">
                  {errors.workLocationType.message}
                </Typography>
              )}

            </Box>

            {selectedLocationType && (
              <Box className="mt-6 w-1/2 flex items-start flex-col">
                <Typography className="mt-4 mb-2 font-medium">
                  {selectedLocationType === "work-from-office"
                    ? "Office Address"
                    : selectedLocationType === "work-from-home"
                      ? "Job City"
                      : "Which area will the candidates be working in?"}
                </Typography> <Controller
                  name="location"
                  control={control}
                  rules={{ required: 'Location is required' }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      size="small"
                      placeholder="Enter job location"
                      error={!!errors.location}
                      helperText={errors.location?.message}
                    />
                  )}
                />
              </Box>

            )}
          </Box>

          {/* Pay Type Section */}
          <Box className="bg-white p-6 mt-2 flex justify-start flex-col items-start rounded shadow">
            <Typography className="mb-2" sx={{ fontWeight: 700, fontSize: "1rem" }}>Compensation</Typography>
            <Typography className="mb-2" sx={{ color: "gray", fontSize: "0.8rem" }}>Job postings with right salary & incentives will help you find the right candidates.</Typography>
            <Box className="mt-6 flex flex-col items-start">
              <Typography className="mb-2 font-medium">What is the pay type? *</Typography>

              <Controller
                name="payType"
                control={control}
                rules={{ required: 'Pay type is required' }}
                render={({ field }) => (
                  <div className="flex flex-wrap gap-4 mt-2">
                    {["fixed-only", "fixed-incentive", "incentive-only"].map((type) => {

                      return (
                        <div
                          key={type}
                          onClick={() => {
                            field.onChange(type)
                            setSelectedPayType(type)
                          }
                          }
                          className={`cursor-pointer px-6 py-1 rounded-full border ${field.value === type
                            ? "bg-green-600 text-white border-green-900"
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

              {errors.payType && (
                <Typography variant="caption" color="error">
                  {errors.payType.message}
                </Typography>
              )}
            </Box>

            <div className='w-full flex flex-row'>
              <div className={`${selectedPayType === "incentive-only" ? "hidden" : "w-1/2 flex flex-row"}`}>
                {(selectedPayType === "fixed-only" || selectedPayType === "fixed-incentive") && (
                  <Box className="mt-6 w-1/2">
                    <Typography className="mt-4 mb-2  font-medium">Minimum Salary</Typography>
                    <Controller
                      name="minimumSalary"
                      control={control}
                      rules={{
                        required: 'Minimum Salary is required',
                        pattern: {
                          value: /^[0-9]+$/,
                          message: 'Only numeric values are allowed',
                        },
                        validate: (value) => {
                          const numericValue = Number(value);
                          if (numericValue < 1000) {
                            return "Minimum salary should be at least ₹1000";
                          }
                          if (numericValue > 10000000) {
                            return "Salary cannot exceed ₹1 crore";
                          }
                          return true;
                        },
                      }}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          value={field.value || ""}
                          label="Minimum Salary"
                          type="tel"
                          size='small'
                          fullWidth
                          placeholder="Enter Minimum Salary"
                          error={!!errors.minimumSalary}
                          helperText={errors.minimumSalary?.message}
                        />
                      )}
                    />

                  </Box>
                )}

                {(selectedPayType === "fixed-only" || selectedPayType === "fixed-incentive") && (
                  <Box className="mt-6 w-1/2">
                    <Typography className="mt-4 mb-2 font-medium">Maximum Salary</Typography>
                    <Controller
                      name="maximumSalary"
                      control={control}
                      rules={{
                        required: 'Maximum Salary is required',
                        pattern: {
                          value: /^[0-9]+$/,
                          message: 'Only numeric values are allowed',
                        },
                        validate: (value) => {
                          const numericValue = Number(value);
                          const minSalary = Number(getValues('minimumSalary'));

                          if (numericValue < 1000) {
                            return "Maximum salary should be at least ₹1000";
                          }
                          if (numericValue > 100000000) {
                            return "Salary cannot exceed ₹10 crore";
                          }
                          if (minSalary && numericValue <= minSalary) {
                            return "Maximum salary must be greater than minimum salary";
                          }
                          return true;
                        },
                      }}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          label="Maximum Salary"
                          fullWidth
                          size='small'
                          placeholder="Enter Minimum Salary"
                          error={!!errors.maximumSalary}
                          helperText={errors.maximumSalary?.message}
                        />
                      )}
                    />
                  </Box>
                )}

              </div>

              {(selectedPayType === "fixed-incentive") && (
                <Box className="flex items-end justify-end"><span className='font-bold text-[1.5rem] m-2'>+</span></Box>
              )}

              {(selectedPayType === "incentive-only" || selectedPayType === "fixed-incentive") && (

                <Box className="mt-6 w-1/2">
                  <Typography className="mt-4 mb-2 font-medium">Incentive</Typography>
                  <Controller
                    name="incentive"
                    control={control}
                    rules={{
                      required: 'Incentive is required',
                      pattern: {
                        value: /^[0-9]+$/,
                        message: 'Only numeric values are allowed',
                      },
                    }}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        value={field.value || ""} // Ensures it's always controlled
                        label="Incentive"
                        fullWidth
                        size='small'
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
              <Typography className="mb-2 font-medium">Do you offer any additional perks?</Typography>
              <FormGroup row className='mt-4' sx={{ gap: 1 }}>
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
                              borderColor: selected ? "darkgreen" : "grey.400",
                              backgroundColor: selected ? "green" : "transparent",
                              color: selected ? "white" : "text.primary",
                              cursor: "pointer",
                              userSelect: "none",
                              fontSize: "0.875rem",
                              fontWeight: 500,
                              transition: "all 0.2s",
                              "&:hover": {
                                backgroundColor: selected ? "lightgreen" : "grey.100",
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
              <Typography className="mb-2 font-medium">Is there any joining fee or deposit required from the candidate?</Typography>
              <Controller
                name="joiningfee"
                control={control}
                render={({ field }) => (
                  <div className="flex flex-wrap gap-4 mt-2">
                    {["yes", "no"].map((type) => {

                      return (
                        <div
                          key={type}
                          onClick={() => {
                            field.onChange(type == "yes" ? "true" : "false")
                            setjoiningfee(type == "yes" ? "true" : "false")
                          }
                          }
                          className={`cursor-pointer px-6 py-1 rounded-full border ${field.value === type
                            ? "bg-green-600 text-white border-green-900"
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


              {errors.joiningfee && (
                <Typography variant="caption" color="error">
                  {errors.joiningfee.message}
                </Typography>
              )}
            </Box>

            {joiningFees === "true" &&
              <>
                <Box className="mt-6 w-1/2 flex flex-col items-start">
                  <Typography className="mt-4 mb-2 font-medium">Fee Amount</Typography>
                  <Controller
                    name="joiningFeeAmount"
                    control={control}
                    rules={{
                      required: "Amount is Required",
                      pattern: {
                        value: /^[0-9]+$/,
                        message: 'Only numeric values are allowed',
                      },
                    }}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Joining Fee Amount"
                        fullWidth
                        size='small'
                        placeholder="Enter Fee Amount"
                        error={!!errors.joiningFeeAmount}
                        helperText={errors.joiningFeeAmount?.message}
                      />
                    )}
                  />
                </Box>

                <Box className="mt-4 flex flex-col items-start">
                  <Typography className="mt-4 mb-2 font-medium">What is this fee for?</Typography>
                  <Controller
                    name="joiningfee"
                    control={control}
                    render={({ field }) => (
                      <div className="flex flex-wrap gap-4 mt-2">
                        {["inventory-charge", "security-deposit", "registration-fees", "commission", "IRDA-exam", "other-reason"].map((type) => {

                          return (
                            <div
                              key={type}
                              onClick={() => {
                                field.onChange(type)
                                setjoiningFeesReason(type)
                              }
                              }
                              className={`cursor-pointer px-6 py-1 rounded-full border ${field.value === type
                                ? "bg-green-600 text-white border-green-900"
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

                {(joiningFeesReason === "inventory-charge" || joiningFeesReason === "registration-fees" || joiningFeesReason === "other-reason") &&


                  <Box className="mt-6 w-full flex flex-col items-start">
                    <Typography className="mt-4 mb-2 font-medium">Mention {joiningFeesReason} Here</Typography>
                    <Controller
                      name="joiningFeesAmountReasonDetail"
                      control={control}
                      rules={{ required: 'Fees Reason is required' }}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          label="joining fees amount reason Amount"
                          fullWidth
                          size='small'
                          placeholder="Mention the Reason"
                          error={!!errors.joiningFeesAmountReason}
                          helperText={errors.joiningFeesAmountReason?.message}
                        />
                      )}
                    />
                  </Box>

                }

                <Box className="mt-4 flex flex-col items-start">
                  <Typography className="mt-4 mb-2 font-medium">When should the fee be paid?</Typography>
                  <Controller
                    name="joiningFeeAmountTime"
                    control={control}
                    render={({ field }) => (
                      <div className="flex flex-wrap gap-4 mt-2">
                        {["before-interview", "after-interview", "deducted-from-salary"].map((type) => {

                          return (
                            <div
                              key={type}
                              onClick={() => {
                                field.onChange(type)

                              }
                              }
                              className={`cursor-pointer px-6 py-1 rounded-full border ${field.value === type
                                ? "bg-green-600 text-white border-green-900"
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
            }

          </Box>

          <Box className="bg-white p-6 mt-2 flex justify-center flex-col items-center rounded shadow">

            <Box className="mt-2">
              <Button
                variant="contained"
                sx={{ backgroundColor: "green", color: "white" }}
                onClick={handleSubmit(() => {
                  setCurrentStep((prev) => prev + 1); // only runs if form is valid
                })}
              >
                Continue
              </Button>
            </Box>
          </Box>

        </form>
      }



      {/* step 2 */}

      {currentStep === 1 &&
        <form onSubmit={handleSubmit(onSubmit)}>

          <Box className="bg-white p-6 rounded shadow space-y-6 flex flex-col items-start">

            <Typography variant="h6" className="mb-2" sx={{ fontWeight: 700, fontSize: "1rem" }}>
              Basic Requirements
            </Typography>
            <Typography variant="body2" className="mb-2" sx={{ color: "gray", fontSize: "0.8rem" }}>
              We’ll use these requirement details to make your job visible to the right candidates.
            </Typography>

            {/* Minimum Education */}
            <FormControl fullWidth className='flex flex-col items-start'>
              <FormLabel className="mt-6">Minimum Education *</FormLabel>

              <Controller
                name="education"
                control={control}
                render={({ field }) => (
                  <div className="flex flex-wrap gap-4 mt-2">
                    {educationOptions.map((type) => {

                      return (
                        <div
                          key={type}
                          onClick={() => {
                            field.onChange(type)
                            setEducation(type)
                          }
                          }
                          className={`cursor-pointer px-6 py-1 rounded-full border ${field.value === type
                            ? "bg-green-600 text-white border-green-900"
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



              {errors.education && (
                <Typography color="error" variant="caption">
                  {errors.education.message}
                </Typography>
              )}
            </FormControl>

            {/* English Level */}
            <FormControl fullWidth className='flex flex-col items-start'>
              <FormLabel className="mt-6">English level required *</FormLabel>

              <Controller
                name="english"
                control={control}
                render={({ field }) => (
                  <div className="flex flex-wrap gap-4 mt-2">
                    {englishLevels.map((type) => {

                      return (
                        <div
                          key={type}
                          onClick={() => {
                            field.onChange(type)

                          }
                          }
                          className={`cursor-pointer px-6 py-1 rounded-full border ${field.value === type
                            ? "bg-green-600 text-white border-green-900"
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
            <FormControl fullWidth className='flex flex-col items-start'>
              <FormLabel className="mt-6">Total experience required *</FormLabel>
              <Controller
                name="experience"
                control={control}
                render={({ field }) => (
                  <div className="flex flex-wrap gap-4 mt-2">
                    {experienceOptions.map((type) => {

                      return (
                        <div
                          key={type}
                          onClick={() => {
                            field.onChange(type)
                            setExperience(type)
                          }
                          }
                          className={`cursor-pointer px-6 py-1 rounded-full border ${field.value === type
                            ? "bg-green-600 text-white border-green-900"
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

            {experienceLevel === "Experienced Only" &&
              <FormControl fullWidth className='flex flex-col items-start'>
                <FormLabel className="mt-6">Experience Level</FormLabel>

                <Controller
                  name="experienceLevel"
                  control={control}
                  rules={{ required: 'Experience Level is required' }}
                  render={({ field }) => (
                    <div className="flex flex-wrap gap-4 mt-2">
                      {experienceLevelOptions.map((type) => {

                        return (
                          <div
                            key={type}
                            onClick={() => {
                              field.onChange(type)

                            }
                            }
                            className={`cursor-pointer px-6 py-1 rounded-full border ${field.value === type
                              ? "bg-green-600 text-white border-green-900"
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


                {errors.experienceLevel && (
                  <Typography color="error" variant="caption">
                    {errors.experienceLevel.message}
                  </Typography>
                )}
              </FormControl>
            }

          </Box>

          <Box className="bg-white p-6 rounded mt-4 shadow space-y-6 ">

            {/* Optional Additional Requirements */}
            <FormGroup className="space-y-4 flex flex-col items-start">
              <Typography variant="h6" className="mb-2" sx={{ fontWeight: 700, fontSize: "1rem" }}>
                Additional Requirements (Optional)
              </Typography>
              <Typography variant="body2" className="mb-2" sx={{ color: "gray", fontSize: "0.8rem" }}>
                Add additional requirement so that we can help you find the right candidates
              </Typography>


              <Controller
                name="additionalRequirements"
                control={control}
                defaultValue={[]}
                render={({ field }) => {
                  const options =
                    (educationLevel === 'Diploma' ||
                      educationLevel === 'Graduate' ||
                      educationLevel === 'Post Graduate'
                      ? ["specialization",
                        "gender",
                        "age",
                        "distance",
                        "languages",
                        "skills"]
                      :
                      ["gender",
                        "age",
                        "distance",
                        "languages",
                        "skills"])
                    ;

                  const labels = {
                    specialization: "Specialization",
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

                              toggleField(val); // maintain existing behavior
                              field.onChange(newValue);
                            }}
                            className={`px-4 py-1.5 rounded-full cursor-pointer text-sm font-medium transition border ${selected
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
                  {fieldKey} Options
                </Typography>

                <Controller
                  name={fieldKey}
                  control={control}
                  render={({ field }) => (
                    <div className="flex flex-wrap gap-4 mt-2">
                      {ADDITIONAL_FIELDS[fieldKey].map((type) => {
                        return (
                          <div
                            key={type}
                            onClick={() => {
                              field.onChange(type);
                            }}
                            className={`cursor-pointer px-6 py-1 rounded-full border transition ${field.value === type
                              ? "bg-green-600 text-white border-green-900"
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
              </Box>
            ))}

          </Box>

          <Box className="bg-white p-6 rounded mt-4 shadow space-y-6 flex flex-col items-start">

            <Typography variant="h6" className="mb-2" sx={{ fontWeight: 700, fontSize: "1rem" }}>
              Job Description
            </Typography>
            <Typography variant="body2" className="mb-2" sx={{ color: "gray", fontSize: "0.8rem" }}>
              Describe the responsibilities of this job and other specific requirements here.
            </Typography>


            {/* Job Description */}
            <Box className="mt-6 w-full">
              <Controller
                name="jobDescription"
                control={control}
                rules={{ required: 'Job description is required' }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Job Description"
                    multiline
                    rows={4}
                    fullWidth
                    error={!!errors.jobDescription}
                    helperText={errors.jobDescription?.message}
                  />
                )}
              />
            </Box>

          </Box>



          <Box className="bg-white p-6 rounded mt-4 shadow space-y-6 flex flex-col items-center">
            <Button
              variant="contained"
              sx={{ backgroundColor: "green" }}
              onClick={handleSubmit(() => {
                setCurrentStep((prev) => prev + 1); // only runs if form is valid
              })}
            >
              Continue
            </Button>
          </Box>

        </form>
      }

      {currentStep === 2 &&


        <form onSubmit={handleSubmit(onSubmit)}>
          <Box className="bg-white p-6 rounded shadow space-y-6 flex flex-col items-start">

            <Typography variant="h6" className="mb-2" sx={{ fontWeight: 700, fontSize: "1rem" }}>
              Interview method and address
            </Typography>
            <Typography variant="body2" className="mb-2" sx={{ color: "gray", fontSize: "0.8rem" }}>
              Let candidates know how interview will be conducted for this job.
            </Typography>

            {/* Walk-in Interview */}
            <FormControl component="fieldset" fullWidth className='flex flex-col items-start'>
              <FormLabel className="mt-6">
                Is this a walk-in interview? *
              </FormLabel>
              <Controller
                name="walkIn"
                control={control}
                rules={{ required: 'Please select an option' }}
                render={({ field }) => (
                  <RadioGroup
                    {...field}
                    onChange={(e) => {
                      const value = e.target.value;
                      setWalkIn(value);
                      field.onChange(value);
                    }}
                  >
                    <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                    <FormControlLabel value="no" control={<Radio />} label="No" />
                  </RadioGroup>
                )}
              />
              {errors.walkIn && (
                <Typography color="error" variant="caption">
                  {errors.walkIn.message}
                </Typography>
              )}
            </FormControl>


            {walkIn === "yes" &&
              <>
                <FormControl fullWidth className='flex flex-col items-start'>
                  <FormLabel className='mt-6'>Walk-in Interview address *</FormLabel>
                  <Controller
                    name="walkInAddress"
                    control={control}
                    rules={{ required: "Address is required" }}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        placeholder="Enter full address"
                        size="small"
                        fullWidth
                        error={!!errors.walkInAddress}
                        helperText={errors.walkInAddress?.message}
                      />
                    )}
                  />
                </FormControl>



                {/* Walk-in Start and End Date */}
                <Box className="flex flex-row w-full gap-4 mt-4">

                  <div className='w-1/2'>
                    <FormControl fullWidth>
                      <FormLabel className='self-start'>Walk-in Start date *</FormLabel>
                      <Controller
                        name="walkInStartDate"
                        control={control}
                        rules={{ required: "Start date is required" }}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            type="date"
                            size='small'
                            fullWidth
                            error={!!errors.walkInStartDate}
                            helperText={errors.walkInStartDate?.message}
                          />
                        )}
                      />
                    </FormControl>
                  </div>


                  <div className='w-1/2'>
                    <FormControl fullWidth>
                      <FormLabel className='self-start'>Walk-in End Date *</FormLabel>
                      <Controller
                        name="walkInEndDate"
                        control={control}
                        rules={{ required: "End date is required" }}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            type="date"
                            size='small'
                            fullWidth
                            error={!!errors.walkInEndDate}
                            helperText={errors.walkInEndDate?.message}
                          />
                        )}
                      />
                    </FormControl>
                  </div>

                </Box>

                {/* Walk-in Timings */}
                <Box className="flex gap-4 mt-4 w-1/2">
                  <FormControl fullWidth>
                    <FormLabel className='self-start'>Walk-in Start Time *</FormLabel>
                    <Controller
                      name="walkInStartTime"
                      control={control}
                      rules={{ required: "Start time is required" }}

                      render={({ field }) => (
                        <TextField
                          {...field}
                          type="text"
                          size="small"
                          fullWidth
                          error={!!errors.walkInStartTime}
                          helperText={errors.walkInStartTime?.message}
                        />
                      )}
                    />
                  </FormControl>


                </Box>

                {/* Other Instructions */}
                <FormControl fullWidth className="mt-4">
                  <FormLabel className='self-start'>Other Instructions</FormLabel>
                  <Controller
                    name="walkInInstructions"
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
            }

          </Box>
          <Box className="bg-white p-6 mt-4 rounded shadow space-y-6 flex flex-col items-start">


            <Typography variant="h6" className="mb-2" sx={{ fontWeight: 700, fontSize: "1rem" }}>
              Communication Preferences
            </Typography>
            {/* Communication Preferences */}
            <Box className="bg-blue-50 p-3 mt-4 rounded border border-blue-200">
              <Typography variant="body2">
                📥 Leads information will be accessible on Apna portal and can be{' '}
                <strong>downloaded in excel format</strong>
              </Typography>
            </Box>

            <FormControl component="fieldset" fullWidth>
              <FormLabel className="mt-4 mb-2 self-start">
                Do you want candidates to contact you via Call / WhatsApp after they apply? *
              </FormLabel>
              <Controller
                name="contactPreference"
                control={control}
                rules={{ required: 'Please select your preference' }}
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
                      label="No, I will contact candidates first"
                    />
                  </RadioGroup>
                )}
              />
              {errors.contactPreference && (
                <Typography color="error" variant="caption">
                  {errors.contactPreference.message}
                </Typography>
              )}
            </FormControl>

            {contactpermission === "other" && (
              <FormGroup className="space-y-4 flex flex-col w-full items-start">
                <Typography variant="subtitle1" className="font-medium self-start">
                  Fill other recruiter details
                </Typography>

                {/* Recruiter's Name */}
                <Box className="w-1/2 flex flex-col mt-2 items-start">
                  <Typography variant="subtitle1" className="font-medium self-start">
                    Recruiter's Name
                  </Typography>
                  <Controller
                    name="otherRecruiterName"
                    control={control}
                    rules={{ required: "Recruiter's Name is required" }}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        fullWidth
                        size='small'
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
                  <Typography variant="subtitle1" className="font-medium self-start">
                    Recruiter’s Whatsapp No.
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
                        size='small'
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
                  <Typography variant="subtitle1" className="font-medium self-start">
                    Recruiter’s Email ID *
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
                        size='small'
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

            {(contactpermission === "self" || contactpermission === "other") &&
              <>
                <FormControl component="fieldset" fullWidth>
                  <FormLabel className="mt-4 mb-2 self-start">
                    Which candidates should be able to contact you ?
                  </FormLabel>
                  <Controller
                    name="candidateType"
                    control={control}
                    rules={{ required: 'Please select your preference' }}
                    render={({ field }) => (
                      <RadioGroup
                        {...field}

                      >
                        <FormControlLabel
                          value="all candidate"
                          control={<Radio />}
                          label="All candidates"
                        />
                        <FormControlLabel
                          value="matched-candidate"
                          control={<Radio />}
                          label="Only matched candidates (~60% of all candidates)"
                        />

                      </RadioGroup>
                    )}
                  />
                  {errors.contactPreference && (
                    <Typography color="error" variant="caption">
                      {errors.contactPreference.message}
                    </Typography>
                  )}
                </FormControl>

              </>

            }
          </Box>

          <Box className="bg-white p-6 mt-4 rounded shadow space-y-6 flex flex-col items-start">

            {(contactpermission === "no" || contactpermission === "self" || contactpermission === "other") &&
              <>
                <Typography variant="h6" className="mb-2" sx={{ fontWeight: 700, fontSize: "1rem" }}>
                  Communication Preferences
                </Typography>
                <FormControl component="fieldset" fullWidth>
                  <FormLabel className="mt-4 mb-2 self-start">
                    Every time you receive a candidate application,do you wantWhatsapp Alerts from Apna? *
                  </FormLabel>
                  <Controller
                    name="notificationPreference"
                    control={control}
                    rules={{ required: 'Please select your preference' }}
                    render={({ field }) => (
                      <RadioGroup
                        {...field}
                        onChange={(e) => {
                          const value = e.target.value;
                          field.onChange(value);
                          if (value === "self") {
                            setContactPermission(value);
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
                          label="No, send me summary once a day"
                        />

                      </RadioGroup>
                    )}
                  />
                  {errors.contactPreference && (
                    <Typography color="error" variant="caption">
                      {errors.contactPreference.message}
                    </Typography>
                  )}
                </FormControl>
              </>
            }


          </Box>



          <Box className="bg-white p-6 rounded mt-4 shadow space-y-6 flex flex-col items-center">
            <Button
              variant="contained"
              sx={{ backgroundColor: "green" }}
              onClick={handleSubmit(() => {
                setCurrentStep((prev) => prev + 1); // only runs if form is valid
              })}
            >
              Continue
            </Button>
          </Box>

        </form>

      }

    </Box>
  );
};

export default PostJob;
