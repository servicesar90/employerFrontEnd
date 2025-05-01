import React, { useState } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  Stepper,
  Step,
  StepLabel,
  ToggleButtonGroup,
  ToggleButton,
  Checkbox,
  FormControlLabel,
  FormControl,
  FormLabel,
  FormGroup,
  RadioGroup,
  Radio
} from '@mui/material';
import { useForm, Controller } from 'react-hook-form';

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
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </div>


      {currentStep === 0 &&
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box className="bg-white p-6 flex justify-start flex-col items-start rounded shadow">
            {/* Job Details Section */}
            <Typography variant="h6" className="mb-2" sx={{ fontWeight: 700, fontSize: "1rem"}}>
              Job details
            </Typography>
            <Typography variant="body2" className="mb-2" sx={{color: "gray", fontSize: "0.8rem"}}>
              We use this information to find the best candidates for the job.
            </Typography>

            <Box className="mt-4 flex justify-start flex-col items-start" >
              <Typography sx={{fontWeight: 500, fontSize: "0.9rem", color:  "#464343"}}>
                Company you belong to <strong>GAME OF TRADING ASS.</strong>
              </Typography>

              <Box className="flex items-center w-full gap-2 mt-4">
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
                      <Button variant="text" sx={{color: "green", fontSize: "1rem", fontWeight: 700}}>Change</Button>
                    </>
                  )}
                />
              </Box>

              <Box className="mt-4 w-1/2">
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

              <Box className="mt-6 flex flex-col items-start">
                <Typography className="mb-2 font-medium">Type of Job *</Typography>
                <Controller
  name="jobType"
  control={control}
  rules={{ required: 'Job type is required' }}
  render={({ field }) => (
    <div className="flex flex-wrap gap-4">
      {["full-time", "part-time", "internship", "contract"].map((type) => {
       
        return (
          <div
            key={type}
            onClick={() => field.onChange(type)}
            className={`cursor-pointer px-4 py-2 rounded-full border ${
              field.value === type
                ? "bg-blue-600 text-white border-blue-600"
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

              {/* Location Type Section */}
              <Box className="mt-6">
                <Typography className="mb-2 font-medium">Work location type *</Typography>
                <Controller
                  name="workLocationType"
                  control={control}
                  rules={{ required: 'Location type is required' }}
                  render={({ field }) => (
                    <ToggleButtonGroup
                      exclusive
                      {...field}
                      onChange={(e, value) => {
                        value && field.onChange(value)
                        setSelectedLocationType(value)

                      }}
                    >
                      <ToggleButton value="work-from-office">Work From Office</ToggleButton>
                      <ToggleButton value="work-from-home">Work From Home</ToggleButton>
                      <ToggleButton value="field-job">Field Job</ToggleButton>
                    </ToggleButtonGroup>
                  )}
                />
                {errors.workLocationType && (
                  <Typography variant="caption" color="error">
                    {errors.workLocationType.message}
                  </Typography>
                )}
              </Box>

              {selectedLocationType && (
                <Box className="mt-6">
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
                        placeholder="Enter job location"
                        error={!!errors.location}
                        helperText={errors.location?.message}
                      />
                    )}
                  />
                </Box>

              )}
              {/* Pay Type Section */}
              <Box className="mt-6">
                <Typography className="mb-2 font-medium">What is the pay type? *</Typography>
                <Controller
                  name="payType"
                  control={control}
                  rules={{ required: 'Pay type is required' }}
                  render={({ field }) => (
                    <ToggleButtonGroup
                      exclusive
                      {...field}
                      onChange={(e, value) => {
                        if (value) {
                          field.onChange(value);
                          setSelectedPayType(value);
                        }
                      }
                      }
                    >
                      <ToggleButton value="fixed-only">Fixed Only</ToggleButton>
                      <ToggleButton value="fixed-incentive">Fixed + Incentive</ToggleButton>
                      <ToggleButton value="incentive-only">Incentive Only</ToggleButton>
                    </ToggleButtonGroup>
                  )}
                />
                {errors.payType && (
                  <Typography variant="caption" color="error">
                    {errors.payType.message}
                  </Typography>
                )}
              </Box>

              {(selectedPayType === "fixed-only" || selectedPayType === "fixed-incentive") && (
                <Box className="mt-6">
                  <Typography className="mt-4 mb-2 font-medium">Minimum Salary</Typography>
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
                <Box className="mt-6">
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
                        placeholder="Enter Minimum Salary"
                        error={!!errors.maximumSalary}
                        helperText={errors.maximumSalary?.message}
                      />
                    )}
                  />
                </Box>
              )}

              {(selectedPayType === "incentive-only" || selectedPayType === "fixed-incentive") && (
                <Box className="mt-6">
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
                        placeholder="Enter Incentive"
                        error={!!errors.incentive}
                        helperText={errors.incentive?.message}
                      />
                    )}
                  />

                </Box>
              )}


              {/* Perks Section */}
              <Box className="mt-6">
                <Typography className="mb-2 font-medium">Do you offer any additional perks?</Typography>
                <FormGroup row>
                  <Controller
                    name="perks"
                    control={control}
                    render={({ field }) =>
                      PERKS.map((perk) => (
                        <FormControlLabel
                          key={perk}
                          control={
                            <Checkbox
                              value={perk}
                              checked={field.value.includes(perk)}
                              onChange={(e) => {
                                const value = e.target.value;
                                field.onChange(
                                  field.value.includes(value)
                                    ? field.value.filter((v) => v !== value)
                                    : [...field.value, value]
                                );
                              }}
                            />
                          }
                          label={perk}
                        />
                      ))
                    }
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
                    <ToggleButtonGroup
                      exclusive
                      {...field}
                      onChange={(e, value) => {
                        if (value) {
                          field.onChange(value);
                          setjoiningfee(value);
                        }
                      }
                      }
                    >
                      <ToggleButton value="true">Yes</ToggleButton>
                      <ToggleButton value="false">No</ToggleButton>
                    </ToggleButtonGroup>
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
                  <Box className="mt-6">
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
                          placeholder="Enter Fee Amount"
                          error={!!errors.joiningFeeAmount}
                          helperText={errors.joiningFeeAmount?.message}
                        />
                      )}
                    />
                  </Box>

                  <Box className="mt-4">
                    <Controller
                      name="joiningFeesAmountReason"
                      control={control}
                      render={({ field }) => (
                        <ToggleButtonGroup
                          exclusive
                          {...field}
                          onChange={(e, value) => {
                            if (value) {
                              field.onChange(value);
                              setjoiningFeesReason(value)
                            }
                          }
                          }
                        >
                          <ToggleButton value="inventory-charge">Inventory Charge</ToggleButton>
                          <ToggleButton value="security-deposit">Security Deposit</ToggleButton>
                          <ToggleButton value="registration-fees">Registration Fees</ToggleButton>
                          <ToggleButton value="commission">Commission</ToggleButton>
                          <ToggleButton value="IRDA-exam">IRDA Exam</ToggleButton>
                          <ToggleButton value="other-reason">Other Reason</ToggleButton>
                        </ToggleButtonGroup>
                      )}
                    />
                    {errors.joiningFeeAmountTime && (
                      <Typography variant="caption" color="error">
                        {errors.joiningFeeAmountTime.message}
                      </Typography>
                    )}
                  </Box>

                  {(joiningFeesReason === "inventory-charge" || joiningFeesReason === "registration-fees" || joiningFeesReason === "other-reason") &&
                    <Box className="mt-6">
                      <Typography className="mt-4 mb-2 font-medium">Menton {joiningFeesReason} Here</Typography>
                      <Controller
                        name="joiningFeesAmountReasonDetail"
                        control={control}
                        rules={{ required: 'Fees Reason is required' }}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            label="joining fees amount reason Amount"
                            fullWidth
                            placeholder="Mention the Reason"
                            error={!!errors.joiningFeesAmountReason}
                            helperText={errors.joiningFeesAmountReason?.message}
                          />
                        )}
                      />
                    </Box>

                  }

                  <Box className="mt-4">
                    <Controller
                      name="joiningFeeAmountTime"
                      control={control}
                      render={({ field }) => (
                        <ToggleButtonGroup
                          exclusive
                          {...field}
                          onChange={(e, value) => {
                            if (value) {
                              field.onChange(value);

                            }
                          }
                          }
                        >
                          <ToggleButton value="before-interview">Before The Interview</ToggleButton>
                          <ToggleButton value="after-interview">After Job Confirmation</ToggleButton>
                          <ToggleButton value="deducted-from-salary">Deducted From Salary</ToggleButton>
                        </ToggleButtonGroup>
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

              <Box className="mt-6">
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSubmit(() => {
                    setCurrentStep((prev) => prev + 1); // only runs if form is valid
                  })}
                >
                  Submit Job Details
                </Button>
              </Box>
            </Box>
          </Box>
        </form>
      }



      {/* step 2 */}

      {currentStep === 1 &&
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box className="bg-white p-6 rounded shadow space-y-6">

            {/* Minimum Education */}
            <FormControl fullWidth>
              <FormLabel className="mb-2">Minimum Education *</FormLabel>
              <Controller
                name="education"
                control={control}
                rules={{ required: 'Education is required' }}
                render={({ field }) => (
                  <ToggleButtonGroup
                    exclusive
                    {...field}
                    onChange={(e, value) => {
                      if (value) {
                        field.onChange(value);
                        setEducation(value);
                      }
                    }
                    }
                    className="flex flex-wrap gap-2"
                  >
                    {educationOptions.map((option) => (
                      <ToggleButton key={option} value={option}>
                        {option}
                      </ToggleButton>
                    ))}
                  </ToggleButtonGroup>
                )}
              />
              {errors.education && (
                <Typography color="error" variant="caption">
                  {errors.education.message}
                </Typography>
              )}
            </FormControl>

            {/* English Level */}
            <FormControl fullWidth>
              <FormLabel className="mb-2">English level required *</FormLabel>
              <Controller
                name="english"
                control={control}
                rules={{ required: 'English level is required' }}
                render={({ field }) => (
                  <ToggleButtonGroup
                    exclusive
                    {...field}
                    onChange={(e, value) => value && field.onChange(value)}
                    className="flex gap-2"
                  >
                    {englishLevels.map((level) => (
                      <ToggleButton key={level} value={level}>
                        {level}
                      </ToggleButton>
                    ))}
                  </ToggleButtonGroup>
                )}
              />
              {errors.english && (
                <Typography color="error" variant="caption">
                  {errors.english.message}
                </Typography>
              )}
            </FormControl>

            {/* Experience */}
            <FormControl fullWidth>
              <FormLabel className="mb-2">Total experience required *</FormLabel>
              <Controller
                name="experience"
                control={control}
                rules={{ required: 'Experience is required' }}
                render={({ field }) => (
                  <ToggleButtonGroup
                    exclusive
                    {...field}
                    onChange={(e, value) => {
                      if (value) {
                        field.onChange(value);
                        setExperience(value)
                      }
                    }
                    }
                    className="flex gap-2"
                  >
                    {experienceOptions.map((opt) => (
                      <ToggleButton key={opt} value={opt}>
                        {opt}
                      </ToggleButton>
                    ))}
                  </ToggleButtonGroup>
                )}
              />
              {errors.experience && (
                <Typography color="error" variant="caption">
                  {errors.experience.message}
                </Typography>
              )}
            </FormControl>

            {experienceLevel === "Experienced Only" &&
              <FormControl fullWidth>
                <FormLabel className="mb-2">Experience Level</FormLabel>
                <Controller
                  name="experienceLevel"
                  control={control}
                  rules={{ required: 'Experience Level is required' }}
                  render={({ field }) => (
                    <ToggleButtonGroup
                      exclusive
                      {...field}
                      onChange={(e, value) => {
                        if (value) {
                          field.onChange(value);

                        }
                      }
                      }
                      className="flex gap-2"
                    >
                      {experienceLevelOptions.map((opt) => (
                        <ToggleButton key={opt} value={opt}>
                          {opt}
                        </ToggleButton>
                      ))}
                    </ToggleButtonGroup>
                  )}
                />
                {errors.experienceLevel && (
                  <Typography color="error" variant="caption">
                    {errors.experienceLevel.message}
                  </Typography>
                )}
              </FormControl>
            }

            {/* Optional Additional Requirements */}
            <FormGroup className="space-y-4">
              <Typography variant="subtitle1" className="mt-4 font-medium">
                Additional Requirements (Optional)
              </Typography>

              <Controller
                name="additionalRequirements"
                control={control}
                defaultValue={[]}
                render={({ field }) => (
                  <ToggleButtonGroup
                    value={field.value}
                    onChange={(e, newVal) => {
                      const latest = newVal.filter((v) => !field.value.includes(v));
                      const removed = field.value.filter((v) => !newVal.includes(v));

                      latest.forEach((val) => toggleField(val));
                      removed.forEach((val) => {
                        toggleField(val);

                      });

                      field.onChange(newVal);

                    }}
                    className="flex gap-2 flex-wrap"
                  >
                    {(educationLevel === 'Diploma' ||
                      educationLevel === 'Graduate' ||
                      educationLevel === 'Post Graduate') && (
                        <ToggleButton value="specialization">Specialization</ToggleButton>
                      )}
                    <ToggleButton value="gender">Gender</ToggleButton>
                    <ToggleButton value="age">Age</ToggleButton>
                    <ToggleButton value="distance">Distance</ToggleButton>
                    <ToggleButton value="languages">Regional Language</ToggleButton>
                    <ToggleButton value="skills">Skills</ToggleButton>
                  </ToggleButtonGroup>
                )}
              />

              {expanded.map((fieldKey) => (
                <Box key={fieldKey} className="mt-4">
                  <Typography className="mb-1 font-medium">{fieldKey} Options</Typography>
                  <Controller
                    name={fieldKey}
                    control={control}
                    render={({ field }) => (
                      <ToggleButtonGroup
                        value={field.value || ''}
                        exclusive
                        onChange={(e, val) => {
                          if (val) {
                            field.onChange(val)
                          }
                        }
                        }
                      >
                        {ADDITIONAL_FIELDS[fieldKey].map((option) => (
                          <ToggleButton key={option} value={option}>
                            {option}
                          </ToggleButton>
                        ))}
                      </ToggleButtonGroup>
                    )}
                  />
                </Box>
              ))}
            </FormGroup>



            {/* Job Description */}
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

            <Box className="pt-4">
              <Button
                variant="contained"
                color="primary"
                onClick={handleSubmit(() => {
                  setCurrentStep((prev) => prev + 1); // only runs if form is valid
                })}
              >
                Submit Requirements
              </Button>
            </Box>
          </Box>
        </form>
      }

      {currentStep === 2 &&
        <Box className="p-6 bg-gray-50 min-h-screen">
          <Typography variant="h5" fontWeight="bold" className="mb-6">
            Interviewer Information
          </Typography>

          <form onSubmit={handleSubmit(onSubmit)}>
            <Box className="bg-white p-6 rounded shadow space-y-6">

              {/* Walk-in Interview */}
              <FormControl component="fieldset" fullWidth>
                <FormLabel className="mb-2">
                  Is this a walk-in interview? *
                </FormLabel>
                <Controller
                  name="walkIn"
                  control={control}
                  rules={{ required: 'Please select an option' }}
                  render={({ field }) => (
                    <RadioGroup
                      {...field}
                      row
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
                  <FormControl fullWidth className="mt-4">
                    <FormLabel>Walk-in Interview address *</FormLabel>
                    <Controller
                      name="walkInAddress"
                      control={control}
                      rules={{ required: "Address is required" }}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          placeholder="Enter full address"
                          error={!!errors.walkInAddress}
                          helperText={errors.walkInAddress?.message}
                        />
                      )}
                    />
                  </FormControl>



                  {/* Walk-in Start and End Date */}
                  <Box className="flex gap-4 mt-4">
                    <FormControl fullWidth>
                      <FormLabel>Walk-in Start date *</FormLabel>
                      <Controller
                        name="walkInStartDate"
                        control={control}
                        rules={{ required: "Start date is required" }}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            type="date"
                            error={!!errors.walkInStartDate}
                            helperText={errors.walkInStartDate?.message}
                          />
                        )}
                      />
                    </FormControl>

                    <FormControl fullWidth>
                      <FormLabel>Walk-in End Date *</FormLabel>
                      <Controller
                        name="walkInEndDate"
                        control={control}
                        rules={{ required: "End date is required" }}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            type="date"

                            error={!!errors.walkInEndDate}
                            helperText={errors.walkInEndDate?.message}
                          />
                        )}
                      />
                    </FormControl>
                  </Box>

                  {/* Walk-in Timings */}
                  <Box className="flex gap-4 mt-4">
                    <FormControl fullWidth>
                      <FormLabel>Walk-in Start Time *</FormLabel>
                      <Controller
                        name="walkInStartTime"
                        control={control}
                        rules={{ required: "Start time is required" }}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            type="time"

                            error={!!errors.walkInStartTime}
                            helperText={errors.walkInStartTime?.message}
                          />
                        )}
                      />
                    </FormControl>

                    <FormControl fullWidth>
                      <FormLabel>Walk-in End Time *</FormLabel>
                      <Controller
                        name="walkInEndTime"
                        control={control}
                        rules={{ required: "End time is required" }}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            type="time"
                            value={field.value || ""} // 👈 ensure it's always controlled
                            InputLabelProps={{ shrink: true }}
                            error={!!errors.walkInEndTime}
                            helperText={errors.walkInEndTime?.message}
                          />
                        )}
                      />
                    </FormControl>
                  </Box>

                  {/* Other Instructions */}
                  <FormControl fullWidth className="mt-4">
                    <FormLabel>Other Instructions</FormLabel>
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



              {/* Communication Preferences */}
              <Box className="bg-blue-50 p-3 rounded border border-blue-200">
                <Typography variant="body2">
                  📥 Leads information will be accessible on Apna portal and can be{' '}
                  <strong>downloaded in excel format</strong>
                </Typography>
              </Box>

              <FormControl component="fieldset" fullWidth>
                <FormLabel className="mt-4 mb-2">
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
                <FormGroup className="space-y-4">
                  <Typography variant="subtitle1" className="font-medium">
                    Fill other recruiter details
                  </Typography>

                  {/* Recruiter's Name */}
                  <Controller
                    name="otherRecruiterName"
                    control={control}
                    rules={{ required: "Recruiter's Name is required" }}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        fullWidth
                        value={field.value || ""}
                        label="Recruiter's Name"
                        placeholder="Enter Full Name"
                        error={!!errors.otherRecruiterName}
                        helperText={errors.otherRecruiterName?.message}
                      />
                    )}
                  />

                  {/* Recruiter's WhatsApp No. */}
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
                        value={field.value || ""}
                        label="Recruiter's WhatsApp No."
                        placeholder="Enter Number"
                        error={!!errors.otherRecruiterNumber}
                        helperText={errors.otherRecruiterNumber?.message}
                      />
                    )}
                  />

                  {/* Recruiter's Email ID */}
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
                        value={field.value || ""}
                        label="Recruiter's Email ID"
                        placeholder="Enter Email"
                        error={!!errors.otherRecruiterEmail}
                        helperText={errors.otherRecruiterEmail?.message}
                      />
                    )}
                  />
                </FormGroup>
              )}

              {(contactpermission === "self" || contactpermission === "other") &&
                <>
                  <FormControl component="fieldset" fullWidth>
                    <FormLabel className="mt-4 mb-2">
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

                  {(contactpermission === "no" || contactpermission === "self" || contactpermission === "other") &&
                    <FormControl component="fieldset" fullWidth>
                      <FormLabel className="mt-4 mb-2">
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
                  }

                </>
              }


              <Box className="pt-4">
                <Button type='submit' variant="contained" color="primary">
                  Save Interview Info
                </Button>
              </Box>
            </Box>
          </form>
        </Box>
      }

    </Box>
  );
};

export default PostJob;
