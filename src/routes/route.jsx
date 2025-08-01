import { Route, Routes, Outlet } from "react-router-dom";
import EmployerHome from "../views/employerHome";
import ProfileUpdate from "../components/modals/otherModals/profileUpdateModal";
import Jobs from "../components/pages/jobs";
import PostJob from "../components/modals/otherModals/createJobModal";
import CandidateManagementPage from "../components/pages/jobDetail";
import SearchCandidatesForm from "../components/pages/searchCandidateModal.jsx";
import UnlockedCandidates from "../components/pages/unlockCandidate";
import ApplicationsReportCard from "../components/ui/cards/ReportCard";
import DownloadApplicationsCard from "../components/modals/otherModals/reportDownloadModal";
import {
  ProtectedRoute,
  RedirectedRoute,
  RedirectedRouteForHome,
  RedirectedRouteForLogin,
} from "./routeProtection";
import CompanyProfile from "../components/pages/companyDetail";
import UnigrowOnboardingForm from "../components/modals/otherModals/createProfileModal";
import SimplePaper from "../components/ui/cards/NewCard";
import SelectPlan from "../components/pages/SelectPlan";
import Checkout from "../components/pages/Checkout";
import LandingPage from "../views/landingPage";
import BillingPage from "../components/pages/BILLING.jsx";
import CreditsUsage from "../components/pages/credits";
import Features from "../components/pages/features.jsx";
import Index from "../components/pages/aboutUS.jsx";
import ContactUs from "../components/pages/contactUs.jsx";
import Navbar from "../components/ui/navbar.jsx";
import  SavedSearch  from "../components/pages/savedSearch.jsx";
import { Call } from "@mui/icons-material";
import {motion} from "framer-motion"
import { Box } from "@mui/material";

function Layout() {
  return (
    <div className="max-w-[100vw]">
      
      <Navbar />
      <Outlet />

        <Box
        sx={{
          position: "fixed",
          right: "5vw",
          bottom: "10vh",
          zIndex: 1000,
        }}
         onClick={()=> window.location.href = `tel:${9211336926}`}
      >
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          style={{
            background: "linear-gradient(90deg, #003B70, #0784C9)", // replace with your theme color
            padding: "12px",
            borderRadius: "50%",
            display: "inline-block",
          }}
        >
          <Call sx={{color: "white"}} />
        </motion.div>
      </Box>
    </div>
  );
}

export default function Routess() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route
          index
          element={
            <RedirectedRouteForLogin>
              <LandingPage />
            </RedirectedRouteForLogin>
          }
        />
        
        <Route
          path="/createProfile"
          element={
            <RedirectedRoute>
              <UnigrowOnboardingForm />
            </RedirectedRoute>
          }
        />
        <Route path="Features" element={<Features />} />
        <Route path="About-us" element={<Index />} />
        <Route path="contact-us" element={<ContactUs />} />
      </Route>

      <Route
        path="/employerHome"
        element={
         
            <RedirectedRouteForHome>
              <EmployerHome />
            </RedirectedRouteForHome>
         
        }
      >
        <Route index element={<Jobs />} />
        <Route path="jobs" element={<Jobs />} />
        <Route path="jobsDetail/:id" element={<CandidateManagementPage />} />
        <Route path="SearchCandidates" element={<SearchCandidatesForm />} />
        <Route path ="SavedSearch" element={<SavedSearch/>}/>
        <Route path="UnlockedCandidates" element={<UnlockedCandidates />} />
        <Route path="Reports" element={<ApplicationsReportCard />} />
        <Route path="downloadReport" element={<DownloadApplicationsCard />} />
        <Route path="profile" element={<ProfileUpdate />} />
        <Route path="company" element={<CompanyProfile />} />
        <Route path="billings" element={<BillingPage />} />
        <Route path="credits" element={<CreditsUsage />} />
        <Route path="checkout" element={<Checkout />} />
        <Route path="selectPlan" element={<SelectPlan />} />
      </Route>

      <Route
        path="/jobsModal/:id/:action"
        element={
          <ProtectedRoute>
            <PostJob />
          </ProtectedRoute>
        }
      />
      <Route path="/card" element={<SimplePaper />} />
    </Routes>
  );
}
