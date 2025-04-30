"use client";
import React, { useState } from "react";

function LoginSignup() {
  const [mobileNumber, setMobileNumber] = useState("");

  const handleInputChange = (e) => {
    setMobileNumber(e.target.value);
  };

  const handleSendOTP = () => {
    // Handle OTP sending logic here
    console.log("Sending OTP to:", mobileNumber);
  };

  const handleCreateAccount = () => {
    // Handle account creation navigation here
    console.log("Navigating to create account page");
  };

  return (
    <main className="flex relative justify-center items-center mx-auto w-screen max-w-none h-screen bg-indigo-200 max-md:max-w-[991px] max-sm:max-w-screen-sm">
      {/* Background SVG elements */}
      <div className="absolute size-full">
        <div aria-hidden="true">
          <svg
            width="822"
            height="114"
            viewBox="0 0 822 114"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="absolute bottom-0 left-0 w-full h-auto"
          >
            <path
              d="M821.5 114V0C519.261 66.0511 333.669 84.3771 0 114H821.5Z"
              fill="#DFE7FC"
            ></path>
          </svg>
        </div>
        <div aria-hidden="true">
          <svg
            width="171"
            height="338"
            viewBox="0 0 171 338"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="absolute top-0 right-0 w-auto h-full"
          >
            <path d="M171 115L115 0H0L171 338V115Z" fill="#DFE7FC"></path>
          </svg>
        </div>
      </div>

      {/* Main card container */}
      <section className="flex relative flex-col items-center px-0 py-20 bg-slate-50 h-[856px] rounded-[35px] w-[803px] max-md:px-0 max-md:py-16 max-md:w-[90%] max-sm:px-0 max-sm:py-10 max-sm:w-full">
        <div
          className="absolute bg-slate-50 rounded-[35px] size-full z-[-1]"
          aria-hidden="true"
        />

        {/* Header section */}
        <header className="flex items-center mb-12 max-md:mb-10 max-sm:mb-8">
          <h1 className="text-7xl font-bold text-black max-sm:text-5xl">
            Login
          </h1>
          <span
            className="mx-5 my-0 text-7xl font-bold text-black max-sm:text-5xl"
            aria-hidden="true"
          >
            /
          </span>
          <h1 className="text-7xl font-bold text-black max-sm:text-5xl">
            Sign UP
          </h1>
        </header>

        {/* Welcome message */}
        <h2 className="mb-5 text-5xl font-bold text-black max-md:mb-4 max-md:text-4xl max-sm:mb-2.5 max-sm:text-3xl">
          Welcome
        </h2>

        {/* Subtitle */}
        <p className="mb-12 text-4xl text-black max-md:mb-10 max-md:text-3xl max-sm:mb-8 max-sm:text-2xl">
          Sign in to find your next job.
        </p>

        {/* Mobile number input */}
        <label htmlFor="mobileNumber" className="sr-only">
          Enter your mobile number
        </label>
        <input
          id="mobileNumber"
          type="tel"
          placeholder="Enter your mobile number"
          value={mobileNumber}
          onChange={handleInputChange}
          className="mb-8 text-4xl rounded-2xl border border-indigo-200 border-solid h-[107px] text-slate-500 w-[637px] px-6 max-md:mb-5 max-md:text-3xl max-md:h-[90px] max-md:w-[90%] max-sm:mb-4 max-sm:h-20 max-sm:text-2xl max-sm:w-[95%]"
          aria-label="Mobile number"
        />

        {/* Send OTP button */}
        <button
          onClick={handleSendOTP}
          className="mb-12 text-4xl font-bold text-white bg-blue-500 rounded-3xl h-[109px] w-[639px] flex items-center justify-center cursor-pointer hover:bg-blue-600 transition-colors max-md:mb-10 max-md:text-3xl max-md:h-[90px] max-md:w-[90%] max-sm:mb-8 max-sm:h-20 max-sm:text-2xl max-sm:w-[95%]"
          aria-label="Send OTP"
        >
          Send OTP
        </button>

        {/* Divider */}
        <div
          className="mb-12 h-px bg-indigo-300 w-[639px] max-md:mb-10 max-md:w-[90%] max-sm:mb-8 max-sm:w-[95%]"
          aria-hidden="true"
        />

        {/* Create account section */}
        <div className="text-4xl text-black max-md:text-3xl max-sm:text-2xl">
          <span>New here? </span>
          <button
            onClick={handleCreateAccount}
            className="text-blue-500 font-normal hover:underline focus:outline-none focus:underline"
          >
            Create Account
          </button>
        </div>
      </section>

      {/* Font import */}
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap"
        rel="stylesheet"
      />
    </main>
  );
}

export default LoginSignup;