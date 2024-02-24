import $ from "jquery";
import React, { Suspense, lazy, Fragment, useContext, useState } from "react";
import {
  BrowserRouter as Router,
  HashRouter,
  Routes,
  Route,
  Link,
  Navigate,
} from "react-router-dom";

import { ToastContainer, toast } from "react-toastify";
import styled from "styled-components";

import  "./assets/css/bootstrap.min.css";
import "./assets/css/style.css";

import { AdminRoute } from "./routes/AdminRoute";
import { ApplicantRoute } from "./routes/ApplicantRoute";
import { EmployerRoute } from "./routes/EmployerRoute";

import PrivateRoute from "./routes/PrivateRoute";
import ProtectRoute from "./routes/PrivateRoute";

const Home = lazy(() => import("./features/Home/Home"));
const About = lazy(() => import("./features/AboutUs/About-Us"));
const OurMission = lazy(() => import("./features/AboutUs/OurMission/Our-Mission"));
const OurVision = lazy(() => import("./features/AboutUs/OurVision/Our-Vision"));

const Employers = lazy(() => import("./features/Employers/Employers"));

const Jobs = lazy(() => import("./features/Jobs/Jobs"));
const JobDetails = lazy(() => import("./features/Jobs/JobDetails"));
const ContactUs = lazy(() => import("./features/Contact/Contact-Us"));

const ResumeUpload = lazy(() => import("./features/ResumeUpload/Upload-Resume"));


const Login = lazy(() => import("./features/Account/Login/Login"));
const Register = lazy(() => import("./features/Account/Register/Register"));

const EmailVerification = lazy(() => import('./features/Account/EmailConfirmation/EmailVerification'));


// Admin Resources
const AdminDashboardHome = lazy(() => import('./admin/Home'));
const PostJob = lazy(() => import("./admin/Jobs/PostJob"));
const ManageJobs = lazy(() => import("./admin/Jobs/ManageJobs"));
const AppliedJobs = lazy(() => import("./admin/Jobs/AppliedJobs"));

const AddCountry = lazy(() => import("./admin/Countries/AddCountry"));
const ManageCountries = lazy(() => import("./admin/Countries/ManageCountries"));

const AddQualification = lazy(() => import("./admin/Qualifications/AddQualification"));
const ManageQualifications = lazy(() => import("./admin/Qualifications/ManageQualifications"));

const AddWorkExperience = lazy(() => import("./admin/WorkExperiences/AddWorkExperience"));
const ManageWorkExperiences = lazy(() => import("./admin/WorkExperiences/ManageWorkExperiences"));

const AddWorkMode = lazy(() => import("./admin/WorkModes/AddWorkMode"));
const ManageWorkModes = lazy(() => import("./admin/WorkModes/ManageWorkModes"));

const AddProvince = lazy(() => import("./admin/Provinces/AddProvince"));
const ManageProvinces = lazy(() => import("./admin/Provinces/ManageProvinces"));

const AddCity = lazy(() => import("./admin/Cities/AddCity"));
const ManageCities = lazy(() => import("./admin/Cities/ManageCities"));

const AddSector = lazy(() => import("./admin//Sectors/AddSector"));
const ManageSectors = lazy(() => import("./admin/Sectors/ManageSectors"));

const AddWorkAuthorization = lazy(() => import("./admin/WorkAuthorizations/AddWorkAuthorization"));
const ManageWorkAuthorizations = lazy(() => import("./admin/WorkAuthorizations/ManageWorkAuthorizations"));



// Applicant Private Resources
const ApplicantDashboardHome = lazy(() => import('./applicant/Home'));

// Employer Private Resources
const EmployerDashboardHome = lazy(() => import("./employer/Home"));
const EPostJob = lazy(() => import("./employer/Jobs/PostJob"));
const EManageJobs = lazy(() => import("./employer/Jobs/EManageJobs"));
const EAppliedJobs = lazy(() => import("./employer/Jobs/EAppliedJobs"));

const Loader = () => (
  <div className="container text-center">
    <div className="spinner-border" role="status">
      <span className="sr-only">Loading...</span>
    </div>
  </div>
);

function App() {

  const StyledContainer = styled(ToastContainer)`
        &&&.Toastify__toast-container {
        }
        .Toastify__toast {
        width: 550px !important;
        height: 200px;
        font-family: Trebuchet-ms;
        font-weight: bold;
        }
        .Toastify__toast-body {
        width: 550px !important;
        height: 200px
        font-family: Trebuchet-ms;
        }
        .Toastify__progress-bar {    
        }
  `;

  return (
    <div className="container-fluid bg-white p-0 App">
      
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/About-Us" element={<About />} />
          <Route path="/About-Us/Our-Mission" element={<OurMission />} />
          <Route path="/About-Us/Our-Vision" element={<OurVision />} />
          <Route path="/Employers" element={<Employers />} />
          <Route path="/Browse-Jobs" element={<Jobs />} />
          <Route path="/Job-Details/:slug" element={<JobDetails />} />
          

          <Route path="/Contact-Us" element={<ContactUs />} />

          <Route path="/Resume-Upload" element={<ResumeUpload />} />

          <Route path="/Login" element={<Login />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/:id/verify/:token" element={<EmailVerification />} />

          {/* <Route path="/Admin/Home" element={<AdminHome />} />
          */}
          {/* <Route path="/Admin/Dashboard" element={<AdminDashboardHome />} /> */}
          
          {/* <Route path="/Admin/Jobs/Manage-Jobs" element={<ManageJobs />} /> 
          <Route path="/Admin/Jobs/Applied-Jobs" element={<AppliedJobs />} /> 

          <Route path="/Admin/Countries/Add-Country" element={<AddCountry />} /> 
          <Route path="/Admin/Countries/Manage-Countries" element={<ManageCountries />} /> 

          <Route path="/Admin/Sectors/Add-Sector" element={<AddSector />} /> 
          <Route path="/Admin/Sectors/Manage-Sectors" element={<ManageSectors />} /> 

          <Route path="/Admin/WorkAuthorizations/Add-Work-Authorization" element={<AddWorkAuthorization />} />
          <Route path="/Admin/WorkAuthorizations/Manage-Work-Authorizations" element={<ManageWorkAuthorizations />} /> */}


          {/* Admin Routes */}
          <Route path="/" element={<AdminRoute />}>
            <Route path="/Admin/Dashboard" element={<AdminDashboardHome />} />
            <Route path="/Admin/Jobs/Post-Job" element={<PostJob />} /> 
            <Route path="/Admin/Jobs/Manage-Jobs" element={<ManageJobs />} /> 
            <Route path="/Admin/Jobs/Applied-Jobs" element={<AppliedJobs />} /> 

            <Route path="/Admin/Qualifications/Add-Qualification" element={<AddQualification />} />
            <Route path="/Admin/Qualifications/Manage-Qualifications" element={<ManageQualifications />} />

            <Route path="/Admin/WorkExperiences/Add-Work-Experience" element={<AddWorkExperience />} />
            <Route path="/Admin/WorkExperiences/Manage-Work-Experiences" element={<ManageWorkExperiences />} />

            <Route path="/Admin/WorkModes/Add-Work-Mode" element={<AddWorkMode />} />
            <Route path="/Admin/WorkModes/Manage-Work-Modes" element={<ManageWorkModes />} />

            <Route path="/Admin/Countries/Add-Country" element={<AddCountry />} /> 
            <Route path="/Admin/Countries/Manage-Countries" element={<ManageCountries />} /> 

            <Route path="/Admin/Provinces/Add-Province" element={<AddProvince />}  />
            <Route path="/Admin/Provinces/Manage-Provinces" element={<ManageProvinces />} />

            <Route path="/Admin/Cities/Add-City" element={<AddCity />} />
            <Route path="/Admin/Cities/Manage-Cities" element={<ManageCities />} />

            <Route path="/Admin/Sectors/Add-Sector" element={<AddSector />} /> 
            <Route path="/Admin/Sectors/Manage-Sectors" element={<ManageSectors />} /> 

            <Route path="/Admin/WorkAuthorizations/Add-Work-Authorization" element={<AddWorkAuthorization />} />
            <Route path="/Admin/WorkAuthorizations/Manage-Work-Authorizations" element={<ManageWorkAuthorizations />} />
          </Route>

          {/* Applicant Routes */}
          <Route path="/" element={<ApplicantRoute />}>
            <Route path="/Applicant/Dashboard" element={<ApplicantDashboardHome />} />
          </Route>


          {/* Employer Routes */}
          <Route path="/" element={<EmployerRoute />}>
            <Route path="/Employer/Dashboard" element={<EmployerDashboardHome />} />
            <Route path="/Employer/Jobs/Post-Job" element={<EPostJob />} /> 
            <Route path="/Employer/Jobs/Manage-Jobs" element={<EManageJobs />} /> 
            <Route path="/Employer/Jobs/Applied-Jobs" element={<EAppliedJobs />} /> 
          </Route>

        </Routes>
      </Suspense>
      <StyledContainer />
    </div>
  );
}

export default App;
