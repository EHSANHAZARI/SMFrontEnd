import React, { Component, useRef, useEffect, useState } from "react";
import { NavLink, Link } from "react-router-dom";


const Footer = () => {

    const currentDay = new Date();
    const currentYear = currentDay.getFullYear();
    return (
    <>
        <div
        className="container-fluid bg-dark text-white-50 footer pt-5 mt-5 wow fadeIn"
        data-wow-delay="0.1s"
      >
        <div className="container py-5">
          <div className="row g-5">
            <div className="col-lg-3 col-md-6">
              {/* <h5 className="text-white mb-4">Contact Us</h5>
              <p className="mb-2">
                <i className="fa fa-map-marker-alt me-3"></i>71 Fleming
                Crescent, Caledonia, ON, N3W 1V3
              </p>
              <p className="mb-2">
                <i className="fa fa-phone-alt me-3"></i>+1 647 408 1348
              </p>
              <p className="mb-2">
                <i className="fas fa-envelope me-3"></i>info@prosoftsynergies.com
              </p> */}
              <img src="../../assets/img/ProsoftSynergies.jpeg" alt="ProsoftSynergies-Logo" className="footerLogo me-5"/>
              <div className="d-flex pt-2">
                <Link className="btn btn-outline-light btn-social" to="/twitter.com">
                  <i className="fab fa-twitter"></i>
                </Link>
                <Link className="btn btn-outline-light btn-social" to="/Facebook.com">
                  <i className="fab fa-facebook-f"></i>
                </Link>
                <Link className="btn btn-outline-light btn-social" to="/Youtube.com">
                  <i className="fab fa-youtube"></i>
                </Link>
                <Link className="btn btn-outline-light btn-social" to="/linkedIn.com">
                  <i className="fab fa-linkedin-in"></i>
                </Link>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <h5 className="text-white mb-4">Quick Links</h5>
              <Link className="btn btn-link text-white-50" to="/About-Us">
                About Us
              </Link>
              <Link className="btn btn-link text-white-50" to="/Contact-Us">
                Contact Us
              </Link>
              <Link className="btn btn-link text-white-50" to="/Browse-Jobs">
                Browse Jobs
              </Link>
              <Link className="btn btn-link text-white-50" to="/Login">
                Login
              </Link>
            </div>
            <div className="col-lg-3 col-md-6">
              <h5 className="text-white mb-4">Quick Links</h5>
              <Link className="btn btn-link text-white-50" to="/Employers">
                Employers
              </Link>
              <Link className="btn btn-link text-white-50" to="/About-Us/Our-Mission">
                Our Mission
              </Link>
              <Link className="btn btn-link text-white-50" to="/About-Us/Our-Vision">
                Our Vision
              </Link>
              <Link className="btn btn-link text-white-50" to="/Register">
                Register
              </Link>
            </div>
            
            <div className="col-lg-3 col-md-6">
              <h5 className="text-white mb-4">Newsletter</h5>
              <p>
                Stay in the loop with our daily job postings by subscribing to
                our Newsletter
              </p>
              <div
                className="position-relative mx-auto"
                style={{ maxWidth: "400px" }}
              >
                <input
                  className="form-control bg-transparent w-100 py-3 ps-4 pe-5"
                  type="text"
                  placeholder="Your email"
                  style={{ color: "white" }}
                />
                <button
                  type="button"
                  className="btn btn-primary py-2 position-absolute top-0 end-0 mt-2 me-2"
                >
                  SignUp
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="copyright">
            <div className="row">
              <div className="col-md-6 text-center text-md-start mb-3 mb-md-0">
                &copy;{" "}  {currentYear} &nbsp;
                <Link className="" to="/">
                  ProsoftSynergies
                </Link>
                , All Right Reserved.
              </div>
            </div>
          </div>
        </div>
        <a href="#" className="btn btn-lg btn-primary btn-lg-square back-to-top">
        <i className="bi bi-arrow-up"></i>
      </a>
      </div>
    </>
    );
}

export default Footer;