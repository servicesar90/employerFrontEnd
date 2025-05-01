import React from 'react';
import { Route, Routes, Outlet } from 'react-router-dom';
import Home from '../views/home';
import Header from '../components/ui/navbar'
import Footer from '../components/ui/footer'
import EmployerHome from '../views/employerHome';
import ProfileUpdate from '../components/modals/otherModals/profileUpdateModal';
import Jobs from '../components/pages/jobs';
import PostJob from '../components/modals/otherModals/createJobModal';
import CandidateManagementPage from '../components/pages/jobDetail';
import SearchCandidatesForm from '../components/modals/otherModals/searchCandidateModal';
import UnlockedCandidates from '../components/pages/unlockCandidate';
import ApplicationsReportCard from '../components/ui/cards/ReportCard';
import DownloadApplicationsCard from '../components/modals/otherModals/reportDownloadModal';
import LoginPageWithPopup from '../views/landingPage';
import ProtectedRoute from './routeProtection';
import CompanyProfile from '../components/pages/companyDetail';
import UnigrowOnboardingForm from '../components/modals/otherModals/createProfileModal';


function Layout() {
    return (
      <>
       
        <Outlet />
        
      </>
    )
  }
  


export default function Routess() {
    return (
        <Routes>
            <Route path='/' element={<Layout />}>
                <Route index element={<LoginPageWithPopup />} />
                <Route path="/createProfile" element={<UnigrowOnboardingForm />} />
                <Route path='/employerHome' element={<ProtectedRoute><EmployerHome /></ProtectedRoute>}>
                    
                    <Route path='Jobs' element={<Jobs />} />
                    <Route path="jobsDetail/:id" element={<CandidateManagementPage />} />
                    <Route path='SearchCandidates' element={<SearchCandidatesForm />} />
                    <Route path='UnlockedCandidates' element={<UnlockedCandidates />} />
                    <Route path='Reports' element={<ApplicationsReportCard />} />
                    <Route path="downloadReport" element={<DownloadApplicationsCard />} />
                    <Route path='profile' element={<ProfileUpdate />} />
                    <Route path='company' element={<CompanyProfile />} />
                </Route>

                <Route path='/jobsModal' element={<ProtectedRoute><PostJob /></ProtectedRoute>} />
               
                
            </Route>
        </Routes>
    )
}
