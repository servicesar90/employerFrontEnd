  const base_url = "https://backend.talentnestjob.store";


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