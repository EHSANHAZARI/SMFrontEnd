import ChangePageTitle from "../../utils/ChangePageTitle";
import React, { Component, useRef, useEffect, useState } from "react";
import { NavLink, Link } from "react-router-dom";

import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';


const ContactUs = () => {

    return (
        <>
            <Header />
            <ChangePageTitle customPageTitle="Contact ProfostSynergies | ProfostSynergies Today" />

            {/* <!-- Header End --> */}
            <div className="container-fliud py-5 bg-dark page-header-contactus mb-5">
                <div className="container my-5 pt-5 pb-4">
                    <h1 className="display-3 text-white mb-3 animated slideInDown">Contact Us</h1>
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb text-uppercase">
                            <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                            <li className="breadcrumb-item text-white active" aria-current="page">Get in touch</li>
                        </ol>
                    </nav>
                </div>
            </div>
            {/* <!-- Header End --> */}

            {/* Contact Us Starts Here Starts */}
            <div className="container-xxl py-5">
                <div className="container">
                    <h1 className="text-center mb-5 wow fadeInUp" data-wow-delay="0.1s">
                        Surpass your goals. Exceed expectations. Outrival your competitors. You have the ability to achieve it all.
                    </h1>
                    <div className="row g-4">
                       <div className="col-12">
                            <div className="row gy-4">
                                <div className="col-md-4 wow fadeIn" data-wow-delay="0.1s">
                                    <div className="d-flex align-items-center bg-light rounded p-4">
                                        <div className="bg-white border rounded d-flex flex-shrink-0 align-items-center justify-content-center me-3" style={{ width: "45px", height: "45px"}}>
                                            <i className="fa fa-map-marker-alt text-primary"></i>
                                        </div>
                                        <span><small>Canada: 71 Fleming Crescent, Caledonia, ON, N3W 1V3 </small></span>
                                    </div>
                                </div>
                                <div className="col-md-4 wow fadeIn" data-wow-delay="0.1s">
                                    <div className="d-flex align-items-center bg-light rounded p-4">
                                        <div className="bg-white border rounded d-flex flex-shrink-0 align-items-center justify-content-center me-3" style={{ width: "45px", height: "45px"}}>
                                            <i className="fa fa-map-marker-alt text-primary"></i>
                                        </div>
                                        <span><small>US: 943 Bensch Street, Lansing, MI, 48912 </small></span>
                                    </div>
                                </div>
                                <div className="col-md-4 wow fadeIn" data-wow-delay="0.1s">
                                    <div className="d-flex align-items-center bg-light rounded p-4">
                                        <div className="bg-white border rounded d-flex flex-shrink-0 align-items-center justify-content-center me-3" style={{ width: "45px", height: "45px"}}>
                                            <i className="fa fa-map-marker-alt text-primary"></i>
                                        </div>
                                        <span><small>India: 528, Sector 82, Mohali, Punjab </small></span>
                                    </div>
                                </div>
                            </div>
                       </div>
                       <div className="col-md-6 wow fadeInUp" data-wow-delay="0.1s">
                            <div style={{maxWidth: "100%", listStyle: "none", transition: "none", overflow: "hidden", width: "500px",height: "500px"}}>
                                <div id="embed-ded-map-canvas" style={{height: "100%", width: "100%", maxWidth: "100%"}}>
                                    <iframe style={{height: "100%", width: "100%",border: 0}} frameborder="0" src="https://www.google.com/maps/embed/v1/place?q=71+Fleming+Crescent,+Caledonia,+ON+N3W+1V3,+Canada&key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8"></iframe>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="wow fadeInUp" data-wow-delay="0.5s">
                                 <p className="mb-4">
                                    In addition to an employment agency, what you truly require is the most exceptional talent network in the world. Harness the potential of our highly skilled candidates.
                                 </p>
                                 <p className="mb-4">
                                    If you are an employer seeking temporary or permanent staff, kindly complete the form provided below. Our team of consultants will promptly reach out to you to explore how our solutions can add value to your company.
                                 </p>
                                 <form>
                                    <div className="row g-3">
                                        <div className="col-md-6">
                                            <div className="form-floating">
                                                <input type="text" className="form-control" id="name" placeholder="Your Name" />
                                                <label for="name">First Name</label>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-floating">
                                                <input type="email" className="form-control" id="email" placeholder="Your Email" />
                                                <label for="email">Last Email</label>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-floating">
                                                <input type="text" className="form-control" id="name" placeholder="Your Name" />
                                                <label for="name">Email</label>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-floating">
                                                <input type="email" className="form-control" id="email" placeholder="Your Email" />
                                                <label for="email">Phone Number</label>
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <div className="form-floating">
                                                <input type="text" className="form-control" id="subject" placeholder="Subject" />
                                                <label for="subject">Subject</label>
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <div className="form-floating">
                                                <textarea className="form-control" placeholder="Leave a message here" id="message" style={{height: "150px"}}></textarea>
                                                <label for="message">Message</label>
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <button className="btn btn-primary w-100 py-3" type="submit">Send Message</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Contact Us Starts Here Ends */}

            <Footer />
        </>
    );
}; 


export default ContactUs;