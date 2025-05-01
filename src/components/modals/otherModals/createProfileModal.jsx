import { Circle, FileQuestion, LogOut } from "lucide-react";
import React from "react";
import { Checkbox, FormControlLabel, Box, TextField, Paper, Typography } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
const companySizes = [
  "0-50",
  "51-100",
  "101-300",
  "301-500",
  "501-1000",
  "1000 above"
];


function UnigrowOnboardingForm() {


  const { register, control, setValue, watch, handleSubmit } = useForm({
    defaultValues: {
      fullName: "",
      companyName: "",
      isConsultancy: false,
      employeeNumber: null,

    }
  })

  const employeeNumber = watch("employeeNumber");

  const onsubmit = (data) => {
    console.log("data", data)

  }

  return (
    <>
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@latest/dist/tabler-icons.min.css"
      />
      <main className="flex flex-row mx-auto w-full max-w-none h-screen max-md:flex-col max-md:max-w-[991px] max-sm:max-w-screen-sm">
        {/* Sidebar Content */}
        <aside className="box-border p-5 text-white bg-gray-800 w-[471px] max-md:w-full max-md:h-auto max-sm:hidden" aria-label="Unigrow features">
          <header>
            <h1 className="mb-5 text-xl font-black text-center">
              Unigrow Talent
            </h1>
            <h2 className="mb-5 text-xl font-extrabold text-center">
              What does Unigrow offer 👉
            </h2>
          </header>

          <div className="flex gap-1.5 justify-center mb-5" role="navigation" aria-label="Feature navigation">
            <Circle /><Circle /><Circle /><Circle />
          </div>

          <section aria-labelledby="database-section">
            <h3 id="database-section" className="mb-2.5 text-xl font-bold text-center">Database</h3>
            <p className="mb-5 text-sm leading-5">
              Search from a pool of 5cr+ relevant candidates from our database
            </p>

            <ul className="list-none p-0">
              <li className="flex gap-2.5 items-center mb-2.5 text-sm leading-5">
                <span>Bulk excel download/Profile unlocks</span>
              </li>
              <li className="flex gap-2.5 items-center mb-2.5 text-sm leading-5">
                <span>Send Email Invites</span>
              </li>
            </ul>
          </section>
        </aside>

        {/* Registration Form */}
        <section className="box-border flex-1 p-5 max-md:p-2.5 max-sm:p-2.5">
          <div className="flex gap-2.5 justify-end mb-5 max-sm:justify-between">
            <button
              className="flex items-center"
              aria-label="Get help"
            >

              <FileQuestion />
              <span className="ml-2 text-[#5E6C84] text-sm hidden md:inline">Help</span>
            </button>
            <button
              className="flex items-center"
              aria-label="Logout"
            >
              <LogOut />
            </button>
          </div>

          <h2 className="mb-5 text-2xl">Let's get you started!</h2>

          <form onSubmit={handleSubmit(onsubmit)} className="mx-auto my-0 max-w-[500px] max-md:max-w-full max-sm:max-w-full">

            <div className="m-5">
              <TextField
                label="Your full name"
                type="text"
                size="small"
                {...register("fullName")}
                fullWidth
                variant="outlined"

              />
            </div>


            <div className="m-5">
              <TextField
                label="Enter the name of your company"
                type="text"
                size="small"
                className="mt-5"
                {...register("companyName")}
                fullWidth
                variant="outlined"
              />
            </div>

            <div className="m-5 flex justify-start">
              <Controller
                name="isConsultancy"
                control={control}
                defaultValue={false}
                render={({ field }) => (
                  <FormControlLabel
                    control={<Checkbox {...field} checked={field.value} />}
                    label="This is a consultancy (Hiring or staffing agency)"
                    
                  />
                )}
              />
            </div>

            <div className="m-5">
              <TextField
                label="Number of Employees"
                fullWidth
                variant="outlined"
                size="small"
                {...register("employeeNumber")}
                slotProps={{inputLabel: {
                  shrink: true,
                  }}}
              />
            </div>


            <Box mt={2} display="flex" flexWrap="wrap" gap={2} className="m-5">
              {companySizes.map((option, index) => (
                <Paper
                  key={index}
                  elevation={3}
                  onClick={() => setValue("employeeNumber", option)}
                  sx={{
                    paddingY: 1,
                    paddingX: 2,
                    cursor: "pointer",
                    backgroundColor:
                      employeeNumber === option ? "primary.main" : "grey.100",
                    color: employeeNumber === option ? "white" : "black",
                    borderRadius: 10,
                    transition: "0.2s",
                    '&:hover': {
                      backgroundColor:
                        employeeNumber === option ? "primary.dark" : "grey.300",
                    },
                  }}
                >
                  <Typography sx={{fontSize: "14px"}}>{option}</Typography>
                </Paper>
              ))}
            </Box>




            <div className="flex gap-2.5 items-center mb-5 text-sm font-semibold">
              <input
                type="checkbox"
                id="terms-checkbox"
                className="w-4 h-4 m-5"
                aria-describedby="terms-label"
                required
              />
              <label id="terms-label" htmlFor="terms-checkbox">
                I Agree to Unigrow's{' '}
                <a href="#" className="text-blue-500 hover:underline">Terms of Service</a>
                {' '}and{' '}
                <a href="#" className="text-blue-500 hover:underline">Privacy Policy</a>
              </label>
            </div>

            <button
              type="submit"
              className="p-2.5 w-full m-5 text-sm font-medium text-center text-white bg-blue-500 rounded-md cursor-pointer hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
              aria-label="Post a job"
              
            >
              Post a job
            </button>
          </form>
        </section>
      </main>
    </>
  );
}

export default UnigrowOnboardingForm;