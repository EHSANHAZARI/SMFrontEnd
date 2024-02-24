import ChangePageTitle from "../../utils/ChangePageTitle";
import React, { Component, useRef, useEffect, useState } from "react";
import { NavLink, Link } from "react-router-dom";

import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';



const ResumeUpload = () => {

    return (
        <>
            <Header />
            <ChangePageTitle customPageTitle="Upload Your Resume | ProfostSynergies" />
            <div className="container-fliud py-5 bg-dark page-header-resume-uploads mb-5">
                <div className="container my-5 pt-5 pb-4">
                    <h1 className="display-3 text-white mb-3 animated slideInDown">Resume / CV Upload</h1>
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb text-uppercase">
                            <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                            <li className="breadcrumb-item text-white active" aria-current="page">For Job-Seekers Only</li>
                        </ol>
                    </nav>
                </div>
            </div>
            {/* <!-- Header End --> */}
            <div className="container-xxl py-5">
                <div className="container">
                    <h1>Coming Soon...</h1>
                </div>
            </div>
            <Footer />
        </>
    );
}; 


export default ResumeUpload;