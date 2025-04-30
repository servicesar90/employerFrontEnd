import React, { useState } from "react";
import CandidateLoginModal from "../components/modals/loginModals/CandidateLoginModal";
import OtpModal from "../components/modals/loginModals/OtpModal";


function LoginPageWithPopup() {

      const [showLoginModal, setShowLoginModal] = useState(false);
      const [mobile, setMobile]= useState("");
      const [showOtp, setShowOtp] = useState(false);


  return (
    <div className="flex overflow-hidden flex-col items-center bg-gray-100">
      <div className="flex relative flex-col self-stretch w-full min-h-[763px] max-md:max-w-full">
        <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/b4d32f131c94d7dc2fc239c8508a38bcd83dfc2a?placeholderIfAbsent=true&apiKey=ce5f928b21f342e9b3bb55b57f707984" className="object-cover absolute inset-0 size-full" />
        <div className="flex relative flex-wrap gap-5 justify-between px-20 pb-2.5 w-full text-xs bg-white max-md:px-5 max-md:max-w-full">
          <div className="flex gap-10 items-start p-2 text-white whitespace-nowrap bg-stone-950">
            <div className="flex shrink-0 self-start bg-zinc-300 h-[35px] w-[30px]" />
            <div className="my-auto">Name</div>
          </div>
          <div className="flex gap-10 my-auto text-black max-md:max-w-full">
            <div>Home</div>
            <div>Services </div>
            <div>Blogs</div>
            <div>Contact Us</div>
            <div>About Us</div>
          </div>
          <div className="flex items-center flex-row gap-4 pl-4">
            <button
              onClick={()=>setShowLoginModal(true)}
              className="text-[#36A85C] bg-white px-4 py-1 rounded text-sm font-semibold"
            >
              Employer Login
            </button>

            <button
              onClick={() => setShowLoginModal(true)}
              className="bg-[#36A85C] text-white px-4 py-1 rounded text-sm font-semibold"
            >
              Candidate Login
            </button>
          </div>
        </div>
        <div className="relative z-10 self-center mt-14 mb-0 w-full max-w-[1157px] max-md:mt-10 max-md:mb-2.5 max-md:max-w-full">
          <div className="flex gap-5 max-md:flex-col max-md:">
            <div className="w-3/12 max-md:ml-0 max-md:w-full">
              <div className="flex relative flex-col mt-20 mr-0 font-bold text-black max-md:mt-10 max-md:max-w-full">
                <div className="text-5xl max-md:max-w-full max-md:text-4xl">
                  to Get Your New Job
                </div>
                <div className="mt-7 mr-7 text-lg leading-7 max-md:mr-2.5">
                  <span style={{ lineHeight: "31px" }}>
                    Each month, more than 3 million job seekers tu
                  </span>
                  <span
                    style={{ lineHeight: "31px", letterSpacing: "-3.74px" }}
                  >
                    r
                  </span>
                  <span style={{ lineHeight: "31px" }}>n to</span>
                  <br />
                  <span
                    style={{ lineHeight: "31px", letterSpacing: "-0.17px" }}
                  >
                    website in their search for work, making over 140,000
                  </span>
                  <br />
                  <span
                    style={{ lineHeight: "28px", letterSpacing: "-0.17px" }}
                  >
                    applications every single day
                  </span>
                </div>
                <div className="self-start mt-11 text-sm leading-7 text-gray-600 max-md:mt-10">
                  Popular Searches :
                </div>
              </div>
              <div className="flex flex-col pt-20 pl-5 w-full bg-indigo-200 max-md:pl-5 max-md:max-w-full">
                <div className="max-w-full w-[892px]">
                  <div className="flex gap-5 max-md:flex-col max-md:">
                    <div className="w-[31%] max-md:ml-0 max-md:w-full">
                      <div className="mt-32 mr-0 text-xs tracking-wide leading-7 text-gray-600 max-md:mt-10">
                        <span style={{ textDecoration: "underline" }}>
                          Content Writer
                        </span>{" "}
                        ,{" "}
                        <span style={{ textDecoration: "underline" }}>
                          Finance
                        </span>{" "}
                        ,{" "}
                        <span style={{ textDecoration: "underline" }}>
                          Human Resource
                        </span>{" "}
                        ,{" "}
                        <span style={{ textDecoration: "underline" }}>
                          Management
                        </span>
                      </div>
                    </div>
                    <div className="ml-5 w-[69%] max-md:ml-0 max-md:w-full">
                      <div className="flex flex-col px-7 pt-32 pb-11 mx-auto w-full bg-slate-50 rounded-[35px] max-md:px-5 max-md:pt-24 max-md:max-w-full">
                        <div className="flex gap-5 self-end mr-32 text-7xl font-bold leading-none text-center text-black max-md:mr-2.5 max-md:text-4xl">
                          <div className="max-md:text-4xl">/</div>
                          <div className="flex-auto max-md:text-4xl">
                            Sign UP
                          </div>
                        </div>
                        <div className="self-center mt-24 text-5xl font-bold tracking-wider leading-none text-center text-black max-md:mt-10">
                          Welcome Back!
                        </div>
                        <div className="self-center mt-14 text-4xl leading-none text-center text-black max-md:mt-10 max-md:max-w-full">
                          Sign in to find your next job.
                        </div>
                        <div className="self-center px-8 py-12 mt-16 max-w-full text-4xl leading-none text-center rounded-2xl border border-indigo-200 border-solid text-slate-500 w-[637px] max-md:px-5 max-md:mt-10 max-md:max-w-full">
                          Enter your mobile number
                        </div>
                        <div className="z-10 self-center px-16 py-12 mt-11 max-w-full text-4xl font-bold leading-none text-center text-white bg-blue-500 rounded-3xl border border-black border-solid w-[639px] max-md:px-5 max-md:mt-10">
                          <span style={{ letterSpacing: "1.4px" }}>Send</span>{" "}
                          OTP
                        </div>
                        <div className="flex flex-wrap gap-4">
                          <div className="flex shrink-0 rounded-xl bg-zinc-300 h-[93px] w-[239px]" />
                          <div className="flex shrink-0 rounded-xl bg-zinc-300 h-[93px] w-[239px]" />
                          <div className="flex shrink-0 rounded-xl bg-zinc-300 h-[93px] w-[239px]" />
                        </div>
                        <div className="flex flex-wrap gap-4 mt-2.5 text-4xl tracking-widest leading-none text-center text-black max-md:max-w-full">
                          <div className="flex shrink-0 rounded-xl bg-zinc-300 h-[93px] w-[239px]" />
                          <div className="pt-5 pr-0 pb-16 rounded-xl bg-zinc-300 max-md:max-w-full">
                            New here?{" "}
                            <span style={{ color: "rgba(49,116,253,1)" }}>
                              Create Account
                            </span>
                          </div>
                          <div className="flex shrink-0 rounded-xl bg-zinc-300 h-[93px] w-[239px]" />
                        </div>
                        <img
                          src="https://cdn.builder.io/api/v1/image/assets/TEMP/2ba00e19c46e3ed122795acc47e25998fdca74d1?placeholderIfAbsent=true&apiKey=ce5f928b21f342e9b3bb55b57f707984"
                          className="object-contain self-end mr-40 w-3 aspect-[2] max-md:mr-2.5"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <img
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/536a5f995b94e58e6c7674924f98904ba423bdb9?placeholderIfAbsent=true&apiKey=ce5f928b21f342e9b3bb55b57f707984"
                  className="object-contain self-end max-w-full aspect-[7.19] w-[822px]"
                />
              </div>
            </div>
            <div className="ml-5 w-[57%] max-md:ml-0 max-md:w-full">
              <div className="flex relative flex-col grow max-md:max-w-full">
                <div className="flex shrink-0 self-end mr-24 max-w-full shadow-sm bg-zinc-300 h-[306px] rounded-[50px_45px_41px_var(--sds-size-stroke-focus-ring)] w-[347px] max-md:mr-2.5" />
                <div className="overflow-hidden bg-white max-md:max-w-full" />
              </div>
            </div>
            <div className="ml-5 w-[19%] max-md:ml-0 max-md:w-full">
              <div className="flex relative shrink-0 mx-auto mt-60 max-w-full bg-rose-800 shadow-sm h-[211px] rounded-[46px_47px_49px_var(--sds-size-stroke-focus-ring)] w-[337px] max-md:mt-10" />
            </div>
          </div>
        </div>
      </div>
      <div className="flex gap-10 mt-32 w-full max-w-[1258px] max-md:mt-10 max-md:max-w-full">
        <div className="flex-1">
          <div className="flex shrink-0 rounded-xl bg-zinc-300 h-[93px]" />
          <div className="flex shrink-0 mt-2.5 rounded-xl bg-zinc-300 h-[93px]" />
        </div>
        <div className="flex-1">
          <div className="flex shrink-0 rounded-xl bg-zinc-300 h-[93px]" />
          <div className="flex shrink-0 mt-2.5 rounded-xl bg-zinc-300 h-[93px]" />
        </div>
      </div>
      <div className="flex relative flex-col items-end px-16 pt-20 pb-10 mt-40 max-w-full text-sm font-bold leading-none text-white whitespace-nowrap min-h-[174px] w-[1124px] max-md:px-5 max-md:mt-10">
        <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/ca626e725c8ba97c8cb216d811f276f173e2119f?placeholderIfAbsent=true&apiKey=ce5f928b21f342e9b3bb55b57f707984" className="object-cover absolute inset-0 size-full" />
        <div className="flex relative gap-3.5 py-3.5 pr-6 pl-2.5 bg-blue-600 rounded-md max-md:pr-5">
          <div className="flex shrink-0 self-start rounded-full border border-white border-solid h-[22px] w-[22px]" />
          <div>
            <div>Apply</div>
            <div className="max-md:mr-1">Now</div>
          </div>
        </div>
      </div>
      <div className="flex flex-col py-16 mt-44 w-full bg-white max-w-[1320px] max-md:mt-10 max-md:max-w-full">
        <div className="self-center text-4xl font-medium leading-tight text-zinc-900 max-md:max-w-full">
          Most Popular Vacancies
        </div>
        <div className="flex flex-wrap gap-6 items-start mt-12 max-md:mt-10">
          <div className="min-w-60 w-[312px]">
            <div className="text-lg font-medium leading-loose text-zinc-900">
              Financial Manager
            </div>
            <div className="mt-2 text-sm leading-none text-gray-500">
              61,391 Open Positions
            </div>
          </div>
          <div className="min-w-60 w-[312px]">
            <div className="text-lg font-medium leading-loose text-zinc-900">
              Management Analysis
            </div>
            <div className="mt-2 text-sm leading-none text-gray-500">
              93,046 Open Positions
            </div>
          </div>
          <div className="min-w-60 w-[312px]">
            <div className="text-lg font-medium leading-loose text-zinc-900">
              IT Manager
            </div>
            <div className="mt-2 text-sm leading-none text-gray-500">
              50,963 Open Positions
            </div>
          </div>
          <div className="min-w-60 w-[312px]">
            <div className="text-lg font-medium leading-loose text-zinc-900">
              Operations Research Analysis
            </div>
            <div className="mt-2 text-sm leading-none text-gray-500">
              16,627 Open Positions
            </div>
          </div>
        </div>
        <div className="flex flex-wrap gap-6 mt-8">
          <div className="flex-1">
            <div className="text-lg font-medium leading-loose text-zinc-900">
              Anesthesiologists
            </div>
            <div className="mt-2 text-sm leading-none text-gray-500">
              45,904 Open Positions
            </div>
          </div>
          <div className="flex-1">
            <div className="text-lg font-medium leading-loose text-zinc-900">
              Surgeons
            </div>
            <div className="mt-2 text-sm leading-none text-gray-500">
              50,364 Open Positions
            </div>
          </div>
          <div className="flex-1">
            <div className="text-lg font-medium leading-loose text-zinc-900">
              Obstetricians-Gynecologists
            </div>
            <div className="mt-2 text-sm leading-none text-gray-500">
              4,339 Open Positions
            </div>
          </div>
          <div className="flex-1">
            <div className="text-lg font-medium leading-loose text-zinc-900">
              Orthodontists
            </div>
            <div className="mt-2 text-sm leading-none text-gray-500">
              20,079 Open Positions
            </div>
          </div>
        </div>
        <div className="flex flex-wrap gap-6 items-start mt-8">
          <div className="min-w-60 w-[312px]">
            <div className="text-lg font-medium leading-loose text-zinc-900">
              Maxillofacial Surgeons
            </div>
            <div className="mt-2 text-sm leading-none text-gray-500">
              74,875 Open Positions
            </div>
          </div>
          <div className="min-w-60 w-[312px]">
            <div className="text-lg font-medium leading-loose text-zinc-900">
              Software Developer
            </div>
            <div className="mt-2 text-sm leading-none text-gray-500">
              43359 Open Positions
            </div>
          </div>
          <div className="min-w-60 w-[312px]">
            <div className="text-lg font-medium leading-loose text-zinc-900">
              Psychiatrists
            </div>
            <div className="mt-2 text-sm leading-none text-gray-500">
              18,599 Open Positions
            </div>
          </div>
          <div className="min-w-60 w-[312px]">
            <div className="text-lg font-medium leading-loose text-blue-700 underline underline decoration-auto decoration-solid underline-offset-auto">
              Data Scientist
            </div>
            <div className="mt-2 text-sm leading-none text-gray-500">
              28,200 Open Positions
            </div>
          </div>
        </div>
      </div>
      <div className="overflow-hidden px-20 pt-16 mt-16 w-full fill-indigo-600 max-w-[1282px] max-md:px-5 max-md:mt-10 max-md:max-w-full">
        <div className="flex gap-5 max-md:flex-col max-md:">
          <div className="w-[39%] max-md:ml-0 max-md:w-full">
            <div className="flex flex-col self-stretch my-auto w-full text-base leading-relaxed text-white max-md:mt-10">
              <div className="text-5xl font-semibold leading-[53px] max-md:text-4xl max-md:leading-[49px]">
                Start posting jobs today
              </div>
              <div className="mt-6 font-medium">
                Start posting jobs for only ₹1000.
              </div>
              <div className="gap-2.5 self-start px-6 py-3 mt-6 font-bold text-center text-indigo-600 bg-white max-md:px-5">
                Sign Up For Free
              </div>
            </div>
          </div>
          <div className="ml-5 w-[61%] max-md:ml-0 max-md:w-full">
            <div className="flex overflow-hidden flex-wrap grow items-start w-full bg-white h-[346px] max-md:mt-10 max-md:max-w-full">
              <div className="overflow-hidden pt-3.5 shadow-sm bg-slate-50 min-h-[509px] w-[107px]">
                <div className="flex flex-col w-full max-w-[107px]">
                  <div className="flex gap-1 items-center self-center pr-6 text-xs font-bold tracking-normal text-gray-800 whitespace-nowrap max-md:pr-5">
                    <img
                      src="https://cdn.builder.io/api/v1/image/assets/TEMP/1151a259e4205d189bb3f1013402f0d2cc01cb21?placeholderIfAbsent=true&apiKey=ce5f928b21f342e9b3bb55b57f707984"
                      className="object-contain shrink-0 self-stretch my-auto w-3 aspect-[0.92]"
                    />
                    <div className="self-stretch my-auto">JobHuntly</div>
                  </div>
                  <div className="flex flex-col justify-center mt-3.5 w-full">
                    <div className="w-full leading-relaxed">
                      <div className="flex gap-1.5 justify-center items-center text-xs font-medium text-indigo-600 whitespace-nowrap">
                        <div className="flex shrink-0 self-stretch my-auto w-0.5 bg-indigo-600 fill-indigo-600 h-[13px]" />
                        <div className="flex gap-1.5 items-start self-stretch py-1.5 pl-1.5 my-auto bg-violet-100 w-[94px]">
                          <img
                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/28de84f0dd5d331f9693a13ba9a9bf4746458cd5?placeholderIfAbsent=true&apiKey=ce5f928b21f342e9b3bb55b57f707984"
                            className="object-contain shrink-0 aspect-square w-[9px]"
                          />
                          <div className="flex-1 shrink basis-0">Dashboard</div>
                        </div>
                      </div>
                      <div className="flex gap-1.5 items-center px-3.5 py-1.5 w-full whitespace-nowrap">
                        <div className="flex gap-1.5 items-start self-stretch my-auto text-xs font-medium text-slate-500">
                          <img
                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/15802398a47ce4cdc871024a4717607457952880?placeholderIfAbsent=true&apiKey=ce5f928b21f342e9b3bb55b57f707984"
                            className="object-contain shrink-0 aspect-square w-[9px]"
                          />
                          <div className="w-[50px]">Messages</div>
                        </div>
                        <div className="self-stretch my-auto text-xs font-semibold text-white w-[9px]">
                          <div className="px-px bg-indigo-600 rounded-full fill-indigo-600 h-[9px] w-[9px]">
                            1
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-1.5 items-center py-1.5 pr-1.5 pl-3.5 w-full text-xs font-medium text-slate-500">
                        <img
                          src="https://cdn.builder.io/api/v1/image/assets/TEMP/f15ac6b6a231e849b75a5c6e6141c8722c5fc9dd?placeholderIfAbsent=true&apiKey=ce5f928b21f342e9b3bb55b57f707984"
                          className="object-contain shrink-0 self-stretch my-auto aspect-[0.9] w-[9px]"
                        />
                        <div className="flex-1 shrink self-stretch my-auto basis-0">
                          Company Profile
                        </div>
                      </div>
                      <div className="flex gap-1.5 items-center py-1.5 pr-1.5 pl-3.5 w-full text-xs font-medium text-slate-500">
                        <img
                          src="https://cdn.builder.io/api/v1/image/assets/TEMP/65f3dd69bd4c71c803b584b891b91da7d6955dd1?placeholderIfAbsent=true&apiKey=ce5f928b21f342e9b3bb55b57f707984"
                          className="object-contain shrink-0 self-stretch my-auto aspect-[0.9] w-[9px]"
                        />
                        <div className="flex-1 shrink self-stretch my-auto basis-0">
                          All Applicants
                        </div>
                      </div>
                      <div className="flex gap-1.5 items-center py-1.5 pr-1.5 pl-3.5 w-full text-xs font-medium text-slate-500">
                        <img
                          src="https://cdn.builder.io/api/v1/image/assets/TEMP/4b3baaee11b83feb8d51f75e45f391478973c35e?placeholderIfAbsent=true&apiKey=ce5f928b21f342e9b3bb55b57f707984"
                          className="object-contain shrink-0 self-stretch my-auto aspect-square w-[9px]"
                        />
                        <div className="flex-1 shrink self-stretch my-auto basis-0">
                          Job Listing
                        </div>
                      </div>
                      <div className="flex gap-1.5 items-center py-1.5 pr-1.5 pl-3.5 w-full text-xs font-medium text-slate-500">
                        <img
                          src="https://cdn.builder.io/api/v1/image/assets/TEMP/acc6b4e29b24917808bc03c4601dd63b55e3175b?placeholderIfAbsent=true&apiKey=ce5f928b21f342e9b3bb55b57f707984"
                          className="object-contain shrink-0 self-stretch my-auto aspect-square w-[9px]"
                        />
                        <div className="flex-1 shrink self-stretch my-auto basis-0">
                          My Schedule
                        </div>
                      </div>
                    </div>
                    <div className="flex mt-3.5 w-full bg-indigo-200 min-h-px" />
                    <div className="flex flex-col mt-3.5 w-full">
                      <div className="flex gap-1 items-start self-start pl-3.5 text-xs font-semibold tracking-wide leading-loose text-gray-800 whitespace-nowrap">
                        <div className="opacity-50">SETTINGS</div>
                      </div>
                      <div className="mt-2.5 w-full text-xs font-medium leading-relaxed text-slate-500">
                        <div className="flex gap-1.5 items-center py-1.5 pr-1.5 pl-3.5 w-full whitespace-nowrap">
                          <img
                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/4c0233872dd99836a09e1f20974dccd94a22784d?placeholderIfAbsent=true&apiKey=ce5f928b21f342e9b3bb55b57f707984"
                            className="object-contain shrink-0 self-stretch my-auto aspect-[0.9] w-[9px]"
                          />
                          <div className="flex-1 shrink self-stretch my-auto basis-0">
                            Settings
                          </div>
                        </div>
                        <div className="flex gap-1.5 items-center py-1.5 pr-1.5 pl-3.5 w-full">
                          <img
                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/c76ea20fea8c3900e9deb6fc7f1bd9bcb4ea7a75?placeholderIfAbsent=true&apiKey=ce5f928b21f342e9b3bb55b57f707984"
                            className="object-contain shrink-0 self-stretch my-auto aspect-[0.9] w-[9px]"
                          />
                          <div className="flex-1 shrink self-stretch my-auto basis-0">
                            Help Center
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <img
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/9079f8b2006fa116a547b2df383d2f329e5d03af?placeholderIfAbsent=true&apiKey=ce5f928b21f342e9b3bb55b57f707984"
                  className="object-contain mt-14 max-w-full aspect-[1.88] w-[107px] max-md:mt-10"
                />
              </div>
              <div className="flex flex-col items-center pb-2.5 min-w-60 w-[457px] max-md:max-w-full">
                <div className="flex overflow-hidden gap-10 justify-between items-center py-1.5 pr-3.5 pl-3 w-full bg-white shadow-sm max-w-[457px] max-md:max-w-full">
                  <div className="flex gap-1.5 items-center self-stretch my-auto whitespace-nowrap">
                    <img
                      src="https://cdn.builder.io/api/v1/image/assets/TEMP/fa2c2be189ffd137db69ea800e6a7092314e4f8f?placeholderIfAbsent=true&apiKey=ce5f928b21f342e9b3bb55b57f707984"
                      className="object-contain shrink-0 self-stretch my-auto aspect-[1.06] w-[19px]"
                    />
                    <div className="self-stretch my-auto">
                      <div className="text-base leading-relaxed text-slate-600">
                        Company
                      </div>
                      <div className="flex gap-1 items-start text-xl font-semibold leading-tight text-slate-800">
                        <div>Nomad</div>
                        <div className="flex shrink-0 h-2.5 w-[9px]" />
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-3.5 justify-center items-center self-stretch my-auto text-base font-bold leading-relaxed text-center text-white">
                    <img
                      src="https://cdn.builder.io/api/v1/image/assets/TEMP/623239abaecafe4999bb426b8fa3254e4cade647?placeholderIfAbsent=true&apiKey=ce5f928b21f342e9b3bb55b57f707984"
                      className="object-contain shrink-0 self-stretch my-auto w-4 aspect-square"
                    />
                    <div className="flex gap-1 justify-center items-center self-stretch px-2.5 py-1.5 my-auto bg-indigo-600">
                      <img
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/6b6df537aec9a08a49c829991eca78a67afc9702?placeholderIfAbsent=true&apiKey=ce5f928b21f342e9b3bb55b57f707984"
                        className="object-contain shrink-0 self-stretch my-auto aspect-[0.9] w-[9px]"
                      />
                      <div className="self-stretch my-auto">Post a job</div>
                    </div>
                  </div>
                </div>
                <div className="flex gap-10 justify-between items-center px-3 py-3.5 w-full max-w-[457px] max-md:max-w-full">
                  <div className="self-stretch my-auto">
                    <div className="text-xs font-semibold leading-tight text-slate-800">
                      Good morning, Maria
                    </div>
                    <div className="text-xs font-medium leading-relaxed text-slate-500">
                      Here is your job listings statistic report from July 19 -
                      July 25.
                    </div>
                  </div>
                  <div className="flex gap-2.5 justify-between items-center self-stretch px-1.5 py-1.5 my-auto text-base leading-relaxed bg-white text-slate-800 w-[71px]">
                    <div className="self-stretch my-auto">Jul 19 - Jul 25</div>
                    <img
                      src="https://cdn.builder.io/api/v1/image/assets/TEMP/788fb898d7028260ed2303479ba056156509c50f?placeholderIfAbsent=true&apiKey=ce5f928b21f342e9b3bb55b57f707984"
                      className="object-contain shrink-0 self-stretch my-auto w-2 aspect-[1.14]"
                    />
                  </div>
                </div>
                <div className="max-md:max-w-full">
                  <div className="flex gap-2.5 items-start text-white max-md:max-w-full">
                    <div className="flex gap-1.5 items-center p-2.5 bg-indigo-600">
                      <div className="self-stretch my-auto text-xl font-semibold leading-none">
                        76
                      </div>
                      <div className="self-stretch my-auto text-xs font-medium leading-3 w-[78px]">
                        New candidates to review
                      </div>
                      <img
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/158023facd69b258b6aaa67eeabfaebc11585ad7?placeholderIfAbsent=true&apiKey=ce5f928b21f342e9b3bb55b57f707984"
                        className="object-contain shrink-0 self-stretch my-auto aspect-square w-[9px]"
                      />
                    </div>
                    <div className="flex gap-3.5 justify-between items-center px-2.5 py-3 bg-emerald-300 min-h-[42px] w-[137px]">
                      <div className="flex gap-1.5 items-center self-stretch my-auto">
                        <div className="self-stretch my-auto text-xl font-semibold leading-none">
                          3
                        </div>
                        <div className="self-stretch my-auto text-xs font-medium leading-relaxed w-[78px]">
                          Schedule for today
                        </div>
                      </div>
                      <img
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/2080374fde4f5d00e06dbc5b7d6cf2cd2dd43949?placeholderIfAbsent=true&apiKey=ce5f928b21f342e9b3bb55b57f707984"
                        className="object-contain shrink-0 self-stretch my-auto aspect-[0.9] w-[9px]"
                      />
                    </div>
                    <div className="flex gap-1 justify-between items-center px-2.5 py-3 bg-sky-400 min-h-[42px] w-[137px]">
                      <div className="flex gap-1.5 items-center self-stretch my-auto">
                        <div className="self-stretch my-auto text-xl font-semibold leading-none">
                          24
                        </div>
                        <div className="self-stretch my-auto text-xs font-medium leading-relaxed w-[78px]">
                          Messages received
                        </div>
                      </div>
                      <img
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/a5507d6bc4b27900393897028b7b688acda3e2e9?placeholderIfAbsent=true&apiKey=ce5f928b21f342e9b3bb55b57f707984"
                        className="object-contain shrink-0 self-stretch my-auto w-2.5 aspect-square"
                      />
                    </div>
                  </div>
                  <div className="flex gap-2.5 items-start mt-2.5 max-md:max-w-full">
                    <div className="overflow-hidden pb-2.5 bg-white min-w-60 w-[285px]">
                      <div className="flex flex-col items-center pt-2.5 w-full">
                        <div className="flex gap-10 items-center">
                          <div className="self-stretch my-auto">
                            <div className="text-xs font-semibold leading-tight text-slate-800">
                              Job statistics
                            </div>
                            <div className="text-xs leading-relaxed text-slate-500">
                              Showing Jobstatistic Jul 19-25
                            </div>
                          </div>
                          <div className="flex items-start self-stretch px-px py-0.5 my-auto text-base font-semibold leading-relaxed text-indigo-600 whitespace-nowrap bg-violet-100">
                            <div className="gap-1 self-stretch px-1.5 py-1 bg-white">
                              Week
                            </div>
                            <div className="gap-1 self-stretch py-1 pr-1 pl-1.5 bg-violet-100">
                              Month
                            </div>
                            <div className="gap-1 self-stretch px-1.5 py-1 bg-violet-100">
                              Year
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-4 items-start pl-2.5 mt-1.5 max-w-full text-xs font-semibold leading-relaxed bg-white shadow-sm text-slate-500 w-[285px]">
                          <div className="flex flex-col whitespace-nowrap text-slate-800 w-[29px]">
                            <div className="self-center">Overview</div>
                            <div className="flex w-full bg-indigo-600 rounded-none fill-indigo-600 min-h-0.5" />
                          </div>
                          <div>Jobs View</div>
                          <div>Jobs Applied</div>
                        </div>
                      </div>
                      <div className="flex gap-2.5 mt-5 max-md:mx-2.5">
                        <div>
                          <div className="flex flex-col items-start p-1 ml-11 w-8 text-xs font-medium leading-relaxed text-center text-white whitespace-nowrap bg-slate-800 max-md:ml-2.5">
                            <div className="gap-1 self-stretch">122</div>
                            <div className="gap-1 self-stretch">34</div>
                          </div>
                          <div className="flex flex-col w-full">
                            <div className="flex gap-1.5 items-end max-w-full w-[168px]">
                              <div className="flex flex-col flex-1 shrink basis-0">
                                <div className="flex flex-col justify-center w-full h-[91px]">
                                  <div className="flex flex-1 w-full bg-amber-400 min-h-[45px]" />
                                  <div className="flex flex-1 w-full bg-violet-500 min-h-[45px]" />
                                </div>
                                <div className="self-start text-xs leading-relaxed text-center text-slate-500">
                                  Mon
                                </div>
                              </div>
                              <div className="flex flex-col flex-1 shrink basis-0">
                                <div className="flex flex-col justify-center w-full h-[63px]">
                                  <div className="flex flex-1 w-full bg-amber-400 min-h-2.5" />
                                  <div className="flex w-full bg-violet-500 min-h-[52px]" />
                                </div>
                                <div className="self-start text-xs leading-relaxed text-center text-slate-500">
                                  Tue
                                </div>
                              </div>
                              <div className="flex flex-col flex-1 shrink basis-0">
                                <div className="flex flex-col justify-center w-full min-h-[63px]">
                                  <div className="flex flex-1 w-full bg-amber-400 min-h-[43px]" />
                                  <div className="flex w-full bg-violet-500 min-h-[19px]" />
                                </div>
                                <div className="self-start text-xs leading-relaxed text-center text-slate-500">
                                  Wed
                                </div>
                              </div>
                              <div className="flex flex-col flex-1 shrink basis-0">
                                <div className="flex flex-col justify-center w-full h-[88px]">
                                  <div className="flex flex-1 w-full bg-amber-400 min-h-[21px]" />
                                  <div className="flex w-full bg-violet-500 min-h-[66px]" />
                                </div>
                                <div className="self-start text-xs leading-relaxed text-center text-slate-500">
                                  Thu
                                </div>
                              </div>
                              <div className="flex flex-col flex-1 shrink basis-0">
                                <div className="flex flex-col justify-center w-full h-[78px]">
                                  <div className="flex w-full bg-amber-400 min-h-[52px]" />
                                  <div className="flex flex-1 w-full bg-violet-500 min-h-[25px]" />
                                </div>
                                <div className="self-start text-xs leading-relaxed text-center text-slate-500">
                                  Fri
                                </div>
                              </div>
                              <div className="flex flex-col flex-1 shrink basis-0">
                                <div className="flex flex-col justify-center w-full min-h-[34px]">
                                  <div className="flex flex-1 w-full bg-amber-400 min-h-4" />
                                  <div className="flex flex-1 w-full bg-violet-500 min-h-[17px]" />
                                </div>
                                <div className="self-start text-xs leading-relaxed text-center text-slate-500">
                                  Sat
                                </div>
                              </div>
                              <div className="flex flex-col flex-1 shrink basis-0">
                                <div className="flex flex-col justify-center w-full h-[43px]">
                                  <div className="flex w-full bg-amber-400 min-h-1" />
                                  <div className="flex flex-1 w-full bg-violet-500 min-h-[38px]" />
                                </div>
                                <div className="self-start text-xs leading-relaxed text-center text-slate-500">
                                  Sun
                                </div>
                              </div>
                            </div>
                            <div className="flex gap-3 items-start self-start text-xs font-medium leading-relaxed text-center text-slate-500">
                              <div className="gap-1 self-stretch">Job View</div>
                              <div className="gap-1 self-stretch">
                                Job Applied
                              </div>
                            </div>
                          </div>
                        </div>
                        <div>
                          <div className="flex overflow-hidden flex-col px-1.5 py-2 w-full bg-white max-w-[89px] min-h-[57px]">
                            <div className="flex gap-7 justify-between items-center w-full">
                              <div className="self-stretch my-auto text-xs font-semibold leading-relaxed text-slate-800">
                                Job Views
                              </div>
                              <div className="flex gap-1 items-start self-stretch p-0.5 my-auto bg-amber-400 rounded-xl w-[13px]">
                                <img
                                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/afbead74b66d7a789017d12957e09f622fcd5fea?placeholderIfAbsent=true&apiKey=ce5f928b21f342e9b3bb55b57f707984"
                                  className="object-contain w-2 aspect-square"
                                />
                              </div>
                            </div>
                            <div className="flex flex-col self-start mt-1.5 text-center">
                              <div className="self-start text-sm font-semibold leading-none text-slate-800">
                                2,342
                              </div>
                              <div className="flex gap-1 items-start text-xs font-medium leading-relaxed">
                                <div className="text-slate-500">This Week </div>
                                <div className="flex items-center text-violet-500 whitespace-nowrap">
                                  <div className="self-stretch my-auto">
                                    6.4%
                                  </div>
                                  <img
                                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/1e97fb80b570cda3ee4e100458772961a8cb6489?placeholderIfAbsent=true&apiKey=ce5f928b21f342e9b3bb55b57f707984"
                                    className="object-contain shrink-0 self-stretch my-auto aspect-[0.87] w-[7px]"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="flex overflow-hidden flex-col px-1.5 py-2 mt-1.5 w-full bg-white max-w-[89px] min-h-[57px]">
                            <div className="flex gap-6 justify-between items-center w-full">
                              <div className="self-stretch my-auto text-xs font-semibold leading-relaxed text-slate-800">
                                Job Applied
                              </div>
                              <div className="flex gap-1 items-start self-stretch p-0.5 my-auto bg-violet-500 rounded-xl w-[13px]">
                                <img
                                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/6d8129b0aae2615b6c5925b2fe7bea58cff0206e?placeholderIfAbsent=true&apiKey=ce5f928b21f342e9b3bb55b57f707984"
                                  className="object-contain w-2 aspect-square"
                                />
                              </div>
                            </div>
                            <div className="flex flex-col self-start mt-1.5 text-center">
                              <div className="self-start text-sm font-semibold leading-none text-slate-800">
                                654
                              </div>
                              <div className="flex gap-1 items-start text-xs font-medium leading-relaxed">
                                <div className="text-slate-500">This Week </div>
                                <div className="flex items-center text-red-400 whitespace-nowrap">
                                  <div className="self-stretch my-auto">
                                    0.5%
                                  </div>
                                  <img
                                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/b390d11e9382cd5669b17adc937cdd613457be3f?placeholderIfAbsent=true&apiKey=ce5f928b21f342e9b3bb55b57f707984"
                                    className="object-contain shrink-0 self-stretch my-auto aspect-[0.87] w-[7px]"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="w-[138px]">
                      <div className="flex flex-col pb-2.5 w-full bg-white max-w-[138px]">
                        <div className="gap-1 self-center px-2.5 pt-2.5 pb-1.5 w-full text-xs font-semibold leading-tight text-center text-slate-800">
                          Job Open
                        </div>
                        <div className="flex gap-0.5 px-2.5 py-1 w-full">
                          <div className="text-3xl font-semibold leading-none text-slate-800">
                            12
                          </div>
                          <div className="self-start mt-3.5 text-xs leading-relaxed text-slate-500">
                            Jobs Opened
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col pb-2.5 mt-2.5 w-full bg-white max-w-[138px]">
                        <div className="gap-1 self-center px-2.5 pt-2.5 pb-1.5 w-full text-xs font-semibold leading-tight text-center text-slate-800">
                          Applicants Summary
                        </div>
                        <div className="flex gap-1 items-end py-1 pl-2.5 w-full whitespace-nowrap">
                          <div className="text-3xl font-semibold leading-none text-slate-800">
                            67
                          </div>
                          <div className="text-xs leading-3 text-slate-500 w-[41px]">
                            Applicants
                          </div>
                        </div>
                        <div className="flex justify-center items-center px-2.5 w-full">
                          <div className="flex shrink-0 self-stretch my-auto h-1.5 bg-violet-500 w-[59px]" />
                          <div className="flex shrink-0 self-stretch my-auto h-1.5 bg-emerald-300 w-[30px]" />
                          <div className="flex shrink-0 self-stretch my-auto w-4 h-1.5 bg-sky-400" />
                          <div className="flex shrink-0 self-stretch my-auto h-1.5 bg-amber-400 w-[11px]" />
                        </div>
                        <div className="flex gap-3.5 items-start pr-2 pl-2.5 w-full text-xs leading-relaxed text-slate-500">
                          <div className="flex flex-col pt-2.5">
                            <div className="flex gap-1 items-center">
                              <div className="flex shrink-0 self-stretch my-auto w-2 h-2 bg-violet-500 rounded-sm" />
                              <div className="self-stretch my-auto">
                                Full Time :{" "}
                                <span
                                  style={{
                                    fontWeight: 500,
                                    color: "rgba(37,50,75,1)",
                                  }}
                                >
                                  45
                                </span>
                              </div>
                            </div>
                            <div className="flex gap-1 items-center">
                              <div className="flex shrink-0 self-stretch my-auto w-2 h-2 bg-emerald-300 rounded-sm" />
                              <div className="self-stretch my-auto">
                                Part-Time :{" "}
                                <span
                                  style={{
                                    fontWeight: 500,
                                    color: "rgba(37,50,75,1)",
                                  }}
                                >
                                  24
                                </span>
                              </div>
                            </div>
                            <div className="flex gap-1 items-center self-start">
                              <div className="flex shrink-0 self-stretch my-auto w-2 bg-sky-400 rounded-sm h-[7px]" />
                              <div className="self-stretch my-auto">
                                Remote :{" "}
                                <span
                                  style={{
                                    fontWeight: 500,
                                    color: "rgba(37,50,75,1)",
                                  }}
                                >
                                  22
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="pt-2.5">
                            <div className="flex gap-1 items-center">
                              <div className="flex shrink-0 self-stretch my-auto w-2 h-2 bg-amber-400 rounded-sm" />
                              <div className="self-stretch my-auto">
                                Internship :{" "}
                                <span
                                  style={{
                                    fontWeight: 500,
                                    color: "rgba(37,50,75,1)",
                                  }}
                                >
                                  32
                                </span>
                              </div>
                            </div>
                            <div className="flex gap-1 items-center">
                              <div className="flex shrink-0 self-stretch my-auto w-2 h-2 bg-red-400 rounded-sm" />
                              <div className="self-stretch my-auto">
                                Contract :{" "}
                                <span
                                  style={{
                                    fontWeight: 500,
                                    color: "rgba(37,50,75,1)",
                                  }}
                                >
                                  30
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-2.5 w-full max-w-[433px] max-md:max-w-full">
                    <div className="flex py-2.5 w-full bg-white shadow-sm min-h-1.5 max-md:max-w-full" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <img
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/3064706d284257fc7c11c9901e9368d66b4e05ef?placeholderIfAbsent=true&apiKey=ce5f928b21f342e9b3bb55b57f707984"
        className="object-contain self-stretch mt-40 w-full aspect-[1.37] max-md:mt-10 max-md:max-w-full"
      />
      <div className="mt-2 w-full max-w-[1053px] max-md:max-w-full">
        <div className="flex gap-5 max-md:flex-col max-md:">
          <div className="w-3/12 max-md:ml-0 max-md:w-full">
            <div className="flex flex-col grow max-md:mt-10">
              <div className="self-center text-5xl font-bold leading-none text-blue-600 max-md:text-4xl">
                25 K+
              </div>
              <div className="mt-10 text-xs leading-5 text-center text-black max-md:mt-10">
                We always provide people acomplete solution upon focused of any
                business
              </div>
            </div>
          </div>
          <div className="ml-5 w-3/12 max-md:ml-0 max-md:w-full">
            <div className="flex flex-col grow items-center mt-3.5 text-center text-black max-md:mt-10">
              <div className="text-5xl font-bold leading-none text-blue-600 max-md:text-4xl">
                17 +
              </div>
              <div className="mt-7 text-base font-semibold tracking-wider leading-none">
                Our Office
              </div>
              <div className="self-stretch mt-2 text-sm leading-5">
                We always provide people a complete solution upon focused of any
                business
              </div>
            </div>
          </div>
          <div className="ml-5 w-3/12 max-md:ml-0 max-md:w-full">
            <div className="flex flex-col grow items-center mt-3.5 text-center text-black max-md:mt-10">
              <div className="text-5xl font-bold leading-none text-blue-600 max-md:text-4xl">
                86 +
              </div>
              <div className="mt-7 text-base font-semibold tracking-wider leading-none">
                Skilled People
              </div>
              <div className="self-stretch mt-2 text-sm leading-5">
                We always provide people a complete solution upon focused of any
                business
              </div>
            </div>
          </div>
          <div className="ml-5 w-3/12 max-md:ml-0 max-md:w-full">
            <div className="flex flex-col grow items-center mt-3.5 text-center text-black max-md:mt-10">
              <div className="text-5xl font-bold leading-none text-blue-600 max-md:text-4xl">
                28 +
              </div>
              <div className="mt-7 text-base font-semibold tracking-wider leading-none">
                Happy Clients
              </div>
              <div className="self-stretch mt-2 text-sm leading-5">
                We always provide people a complete solution upon focused of any
                business
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-24 text-xs leading-10 text-black max-md:mt-10">
        Find your favourite jobs and ger and get the benefits of yourself
      </div>
      <div className="mt-12 ml-3 w-full max-w-[1209px] max-md:mt-10 max-md:max-w-full">
        <div className="flex gap-5 max-md:flex-col max-md:">
          <div className="w-[24%] max-md:ml-0 max-md:w-full">
            <div className="px-2.5 pt-2.5 mx-auto w-full leading-10 bg-white rounded-xl border border-gray-200 border-solid max-md:mt-10">
              <img
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/64b7f968913ee1bcff736901ba7fa62dc5d424bb?placeholderIfAbsent=true&apiKey=ce5f928b21f342e9b3bb55b57f707984"
                className="object-contain w-full rounded-lg aspect-[1.11]"
              />
              <div className="flex z-10 gap-5 justify-between items-start max-md:mr-1.5">
                <div className="self-start text-base font-medium text-black">
                  Delhi NCR
                </div>
                <div className="self-end mt-9 text-xs text-gray-600">
                  2 Companies
                </div>
              </div>
            </div>
          </div>
          <div className="ml-5 w-[33%] max-md:ml-0 max-md:w-full">
            <div className="px-2.5 pt-2 mx-auto w-full leading-10 bg-white rounded-lg border border-gray-200 border-solid max-md:mt-10">
              <img
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/f1cf59128644fa99aaecb7b056b5736907fcbaf0?placeholderIfAbsent=true&apiKey=ce5f928b21f342e9b3bb55b57f707984"
                className="object-contain z-10 w-full rounded-xl aspect-[1.53]"
              />
              <div className="flex z-10 gap-10 -mt-1">
                <div className="flex flex-col flex-1 font-medium">
                  <div className="self-start text-base text-black">Noida</div>
                  <div className="text-xs text-gray-600">3 Vacancies</div>
                </div>
                <div className="self-end mt-9 text-xs text-gray-600">
                  2 Companies
                </div>
              </div>
            </div>
          </div>
          <div className="ml-5 w-[42%] max-md:ml-0 max-md:w-full">
            <div className="px-2.5 pt-2 mx-auto w-full leading-10 bg-white rounded-lg border border-gray-200 border-solid max-md:mt-10 max-md:max-w-full">
              <img
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/2b43f155d742e6598a4e459e07f7abdea5d7ba39?placeholderIfAbsent=true&apiKey=ce5f928b21f342e9b3bb55b57f707984"
                className="object-contain w-full rounded-lg aspect-[1.98] max-md:max-w-full"
              />
              <div className="flex z-10 gap-10 -mt-2 max-md:max-w-full">
                <div className="flex flex-col flex-1 font-medium">
                  <div className="text-base text-black">Gurugram</div>
                  <div className="z-10 self-start -mt-2 text-xs text-gray-600">
                    3 Vacancies
                  </div>
                </div>
                <div className="self-end mt-10 text-xs text-gray-600">
                  2 Companies
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center self-stretch px-16 py-24 mt-14 w-full bg-gray-100 blur-[4.5px] max-md:px-5 max-md:mt-10 max-md:max-w-full">
        <div className="text-4xl font-medium leading-tight text-center text-zinc-900">
          How JobPortal work
        </div>
        <div className="mt-12 max-w-full rounded-none w-[1320px] max-md:mt-10">
          <div className="flex gap-5 max-md:flex-col max-md:">
            <div className="w-3/12 max-md:ml-0 max-md:w-full">
              <div className="flex flex-col items-center p-6 w-full rounded-xl max-md:px-5 max-md:mt-6">
                <div className="flex gap-2.5 items-center p-5 bg-white h-[72px] rounded-[80px] w-[72px]">
                  <img
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/adb3ee9284a0ae70981c074f64f60d4b697246c1?placeholderIfAbsent=true&apiKey=ce5f928b21f342e9b3bb55b57f707984"
                    className="object-contain w-8 aspect-square"
                  />
                </div>
                <div className="flex flex-col items-start mt-6 max-w-full text-center w-[264px]">
                  <div className="text-lg font-medium leading-loose text-zinc-900">
                    Create account
                  </div>
                  <div className="mt-3 text-sm leading-5 text-gray-500">
                    Aliquam facilisis egestas sapien, nec tempor leo tristique
                    at.
                  </div>
                </div>
              </div>
            </div>
            <div className="ml-5 w-3/12 max-md:ml-0 max-md:w-full">
              <div className="flex flex-col items-center p-6 mx-auto w-full bg-white rounded-xl max-md:px-5 max-md:mt-6">
                <div className="flex gap-2.5 items-center p-5 bg-blue-700 h-[72px] rounded-[80px] w-[72px]">
                  <img
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/2fb316459c107e0a484ecb681dd7ae6929161419?placeholderIfAbsent=true&apiKey=ce5f928b21f342e9b3bb55b57f707984"
                    className="object-contain w-8 aspect-square"
                  />
                </div>
                <div className="flex flex-col items-start mt-6 max-w-full text-center w-[264px]">
                  <div className="text-lg font-medium leading-loose text-zinc-900">
                    Upload CV/Resume
                  </div>
                  <div className="mt-3 text-sm leading-5 text-gray-500">
                    Curabitur sit amet maximus ligula. Nam a nulla ante. Nam
                    sodales
                  </div>
                </div>
              </div>
            </div>
            <div className="ml-5 w-3/12 max-md:ml-0 max-md:w-full">
              <div className="flex flex-col items-center p-6 w-full rounded-xl max-md:px-5 max-md:mt-6">
                <div className="flex gap-2.5 items-center p-5 bg-white h-[72px] rounded-[80px] w-[72px]">
                  <img
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/be5084378014c8f2fe92e60c8ed289b794211812?placeholderIfAbsent=true&apiKey=ce5f928b21f342e9b3bb55b57f707984"
                    className="object-contain w-8 aspect-square"
                  />
                </div>
                <div className="flex flex-col items-start mt-6 max-w-full text-center w-[264px]">
                  <div className="text-lg font-medium leading-loose text-zinc-900">
                    Find suitable job
                  </div>
                  <div className="mt-3 text-sm leading-5 text-gray-500">
                    Phasellus quis eleifend ex. Morbi nec fringilla nibh.
                  </div>
                </div>
              </div>
            </div>
            <div className="ml-5 w-3/12 max-md:ml-0 max-md:w-full">
              <div className="flex flex-col justify-center items-center p-6 w-full rounded-xl max-md:px-5 max-md:mt-6">
                <div className="flex gap-2.5 items-center p-5 bg-white h-[72px] rounded-[80px] w-[72px]">
                  <img
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/637c4797d8220e7cc9c299d1ec8cc0045e661073?placeholderIfAbsent=true&apiKey=ce5f928b21f342e9b3bb55b57f707984"
                    className="object-contain w-8 aspect-square"
                  />
                </div>
                <div className="flex flex-col items-start mt-6 max-w-full text-center w-[264px]">
                  <div className="text-lg font-medium leading-loose text-zinc-900">
                    Apply job
                  </div>
                  <div className="mt-3 text-sm leading-5 text-gray-500">
                    Curabitur sit amet maximus ligula. Nam a nulla ante, Nam
                    sodales purus.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <img
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/aca3c23bedb177ee84d0cd77e809040018b7ce4b?placeholderIfAbsent=true&apiKey=ce5f928b21f342e9b3bb55b57f707984"
        className="object-contain mt-8 w-full aspect-[3.94] max-w-[1300px] rounded-[36px] max-md:max-w-full"
      />
      <div className="flex z-10 flex-wrap gap-5 justify-between items-start mt-20 w-full max-w-[1289px] max-md:mt-10 max-md:max-w-full">
        <div className="text-xs">
          <div className="flex flex-col px-2 w-full">
            <div className="flex gap-10 items-start self-start p-2 text-white whitespace-nowrap bg-stone-950">
              <div className="flex shrink-0 self-start bg-zinc-300 h-[35px] w-[31px]" />
              <div className="my-auto">Name</div>
            </div>
            <div className="mt-2 ml-3 text-zinc-400 max-md:ml-2.5">
              Unlock deeper insights into how well your
              <br />
              skills align with job requirements with our
              <br />
              job portal
            </div>
          </div>
          <div className="mt-20 leading-10 text-center text-black max-md:mt-10">
            Copyright © 2025. Job Portal all right reserved
          </div>
        </div>
        <div className="flex flex-col mt-6 text-xs text-black">
          <div className="font-semibold">Resources</div>
          <div className="self-start mt-5">About us</div>
          <div className="mt-2 max-md:mr-0.5">Contact us</div>
          <div className="self-start mt-1.5">Services</div>
        </div>
        <div className="flex flex-col items-start mt-6 text-xs text-black whitespace-nowrap">
          <div className="self-stretch font-semibold">Community</div>
          <div className="mt-5">Feature</div>
          <div className="mt-2">Pricing</div>
          <div className="mt-2">Credit</div>
          <div className="mt-2">FAQ</div>
        </div>
        <div className="flex flex-col items-start mt-5 text-xs text-black">
          <div className="self-stretch font-semibold">Quick links</div>
          <div className="mt-4 text-sm">ios</div>
          <div className="mt-2">Android</div>
          <div className="mt-1.5">Microsoft</div>
          <div className="mt-2">Desktop</div>
        </div>
        <div className="flex flex-col items-center self-end mt-6 text-xs text-black">
          <div className="font-semibold">More</div>
          <div className="mt-5">Privacy</div>
          <div className="mt-1.5">Helps</div>
          <div className="mt-1.5">Terms</div>
          <div className="mt-2.5">FAQ</div>
          <div className="self-stretch mt-11 leading-10 text-center max-md:mt-10">
            <span style={{ color: "rgba(0,0,0,1)" }}>Privacy Policy</span>
          </div>
        </div>
        <div className="self-end mt-6 text-black">
          <div className="flex flex-col items-start pl-9 w-full max-md:pl-5">
            <div className="text-xs font-semibold">Download App</div>
            <div className="mt-5 text-xs">
              Download our Apps and get extra 15%
              <br />
              Discount on your first Order
            </div>
            <div className="flex gap-1.5 mt-5 text-white">
              <div className="flex gap-1.5 px-1.5 py-1 text-xs text-center bg-blue-600 rounded-md">
                <img
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/31ae1a90b93c1905e4a887eacbaa6487da3c71b4?placeholderIfAbsent=true&apiKey=ce5f928b21f342e9b3bb55b57f707984"
                  className="object-contain shrink-0 self-start w-4 aspect-[0.94]"
                />
                <div>
                  <span style={{ fontSize: "6px" }}>Download on the</span>{" "}
                  <br />
                  <span style={{ fontSize: "9px" }}>App Store</span>
                </div>
              </div>
              <div className="flex gap-2 px-1.5 py-0.5 text-xs bg-blue-600 rounded-md">
                <img
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/47e95dd0dfec7299e8b17d4a24cec24f6b2e4b66?placeholderIfAbsent=true&apiKey=ce5f928b21f342e9b3bb55b57f707984"
                  className="object-contain shrink-0 self-start mt-1 aspect-square w-[18px]"
                />
                <div>
                  <span style={{ fontSize: "5px" }}>Get it on</span>Google Play
                </div>
              </div>
            </div>
          </div>
          <div className="flex gap-5 justify-between mt-14 max-w-full text-xs leading-10 text-center w-[232px] max-md:mt-10">
            <div>Terms & Conditions</div>
            <div>
              <span style={{ color: "rgba(0,0,0,1)" }}>Security</span>
            </div>
          </div>
        </div>
      </div>

       {showLoginModal && <CandidateLoginModal
              mobile= {mobile}
              setMobile={setMobile}
              onClose={() => {
                setShowLoginModal(false)
                setShowOtp(true)
              }
              }
            />}
      
            {showOtp && <OtpModal mobile={mobile} onClose={()=>setShowOtp(false)}/>}
      
      
    </div>
  );
}

export default LoginPageWithPopup;
