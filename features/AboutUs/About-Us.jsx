import ChangePageTitle from "../../utils/ChangePageTitle";
import React, { Component, useRef, useEffect, useState } from "react";
import { NavLink, Link } from "react-router-dom";

import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';


const About = () => {

    return (
        <>
        <Header />
        <ChangePageTitle customPageTitle="About Us | ProfostSynergies" />
        {/* <!-- Header End --> */}
        <div className="container-fliud py-5 bg-dark page-header-about-us mb-5">
            <div className="container my-5 pt-5 pb-4">
                <h1 className="display-3 text-white mb-3 animated slideInDown">About Us</h1>
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb text-uppercase">
                        <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                        <li className="breadcrumb-item text-white active" aria-current="page">About Us</li>
                    </ol>
                </nav>
            </div>
        </div>
        {/* <!-- Header End --> */}

        <div className="container-xxl py-5">
            <div className="container">
                <div className="row g-5 align-items-center">
                    
                    <div className="col-lg-6 wow fadeIn" data-wow-delay="0.5s">
                        <h1 className="mb-4">We assist Job-Seeker in securing the finest employment opportunities and discovering exceptional talents.</h1>
                        <p className="mb-4">
                            We are a prominent HR solutions specialist in Toronto. Our team consists of dedicated and passionate individuals who are committed to assisting you in recruiting exceptional talent and discovering remarkable job opportunities.
                        </p>
                        <p className="mb-4">
                            Our team has a strong and profound connection to the local scene when it comes to discovering talented candidates;
                        </p>
                        <p>
                            <i className="fa fa-check text-primary me-3"></i>
                            We possess a deep understanding of both the people and the market.
                        </p>
                        <p><i className="fa fa-check text-primary me-3"></i>We possess experts and guidance to assist you in discovering the ideal job that is just right for you.</p>
                        <p><i className="fa fa-check text-primary me-3"></i>Our local teams possess a deep understanding of the Canadian job market and are actively engaged in facilitating connections between candidates and employment opportunities on a daily basis.</p>
                        <Link className="btn btn-primary py-3 px-5 mt-3" to="/Browse-Jobs">Browse Jobs</Link>
                    </div>
                    <div className="col-lg-6 wow fadeIn" data-wow-delay="0.1s">
                        <div className="row g-0 about-bg rounded overflow-hidden">
                            <div className="col-6 text-start">
                                <img className="img-fluid w-100" src="../assets/img/about-us/about-us-1.jpg" />
                            </div>
                            <div className="col-6 text-start">
                                <img className="img-fluid" src="../assets/img/about-us/about-us-2.jpg" style={{width:" 85%", marginTop: "15%"}} />
                            </div>
                            <div className="col-6 text-end">
                                <img className="img-fluid" src="../assets/img/about-us/about-us-3.jpg" style={{width: "85%"}} />
                            </div>
                            <div className="col-6 text-end">
                                <img className="img-fluid w-100" src="../assets/img/about-us/about-us-4.jpg" />
                            </div>
                        </div>
                        <p className="mb-4 mt-5">
                            Wondering how all of this can benefit you? Well, it's quite simple - we are here to assist you. Whether you aspire to pursue a finance role or are in search of a part-time job, we have got you covered. With our extensive network, industry expertise, and knack for enhancing your image, we can make things happen for you.
                        </p>
                    </div>
                </div>
            </div>
        </div>

        <Footer />
        </>
    );
}; 


export default About;