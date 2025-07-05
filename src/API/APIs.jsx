export  const base_url = "https://backend.talentnestjob.store";

// export  const base_url = "http://192.168.1.10:5000"; 


// LoginAPIs
export const mobileApi=`${base_url}/api/v1/auth/signup`

export const resendOtp = `${base_url}`

export const otpApi = `${base_url}/api/v1/auth/verifysignin`

export const jobPostApi = `${base_url}/api/v1/employer-job`

export const createProfileApi = `${base_url}/api/v1/employer`

export const applicationApi = `${base_url}/api/v1/apply`

export const profilePicUploadApi = `${base_url}/api/v1/employer-uploads/profile`

export const logoUploadApi = `${base_url}/api/v1/employer-uploads/logo`

export const getCitiesApi = `${base_url}/api/v1/cities`

export const getEducationSuggestionsApi = `${base_url}/api/v1/suggest/edu`

export const getSkillsSuggestionsApi = `${base_url}/api/v1/suggest/skills`

export const getCategorySuggestionsApi = `${base_url}/api/v1/suggest/roles/categories`

export const getJobRolesSuggestionsApi = `${base_url}/api/v1/suggest/roles`

export const getPlansApi = `${base_url}/api/v1/subscription/plans`

export const  giveRazorpayApi = `${base_url}/api/v1/subscription/createorder`

export const verifyPaymentApi = `${base_url}/api/v1/subscription/verify_payment`

export const getBillApi = `${base_url}/api/v1/subscription/bill`

export const getFreeCreditsApi = `${base_url}/api/v1/subscription/free`

export const getCreditsApi = `${base_url}/api/v1/subscription/credits`

export const updateCompanyApi = `${base_url}/api/v1/employer/company`

export const RoleAiSuggestionsApi = `${base_url}/api/v1/suggest/roles/ai`

export const gstVerifyApi = `${base_url}/api/v1/services/gst`

export const suggestJobRolesApi = `${base_url}/api/v1/suggest/roles/search`

export const matchesDatabasesApi = `${base_url}/api/v1/database`