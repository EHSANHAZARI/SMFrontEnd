import React, { Component, useRef, useEffect, useState } from "react";
import { NavLink, Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useAuth } from "../../Context/AuthContext";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Header.css";

const Navbar = () => {
  const [auth, setAuth] = useAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const notifyErr = (msg) =>
    toast.error(msg, {
      position: "top-center",
      autoClose: 20000,
      closeOnClick: true,
      pauseOnHover: true,
      theme: "light",
    });
  const notifySucc = (msg) =>
    toast.success(msg, {
      position: "top-center",
      autoClose: 20000,
      closeOnClick: true,
      pauseOnHover: true,
      theme: "light",
    });

  const handleLogout = () => {
    setAuth({ ...auth, user: null, token: "" });
    localStorage.removeItem("userAuthDetails");
    notifySucc("You have Logged Out Successfully!!!");
    navigate(location.state || "/Login");
  };

  //assigning location variable
  const location = useLocation();
  //destructuring pathname from location
  const { pathname } = location;

  // splitting method to get the name of the path in array
  const splitLocation = pathname.split("/");

  const [activeLink, setActiveLink] = useState("/");

  const handleSetActiveLink = (link) => {
    setActiveLink(link);
  };

  useEffect(() => {
    // Apply the active class when the component mounts , it stores the current path when the page mounts
    const initialActiveLink = window.location.pathname;
    setActiveLink(initialActiveLink);
  }, []); // Empty dependency array means this effect runs only once after the component mounts

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-white navbar-light shadow sticky-top p-0">
        <NavLink
          className="navbar-brand d-flex align-items-center text-center py-0 px-4 px-lg-5"
          to="/"
        >
          <img
            src="../../assets/img/ProsoftSynergies.jpeg"
            className="logo"
            alt="ProsoftSynergies Logo"
          />
        </NavLink>
        <button
          type="button"
          className="navbar-toggler me-4"
          data-bs-toggle="collapse"
          data-bs-target="#navbarCollapse"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarCollapse">
          <div className="navbar-nav ms-auto p-4 p-lg-0">
            <Link
              to="/"
              className={`nav-item nav-link ${
                activeLink === "/" ? "active" : ""
              }`}
              onClick={() => handleSetActiveLink("/")}
            >
              Home
            </Link>
            <div className="nav-item dropdown aboutus">
              <Link
                to="/About-Us"
                className={`nav-item nav-link ${activeLink === "/About-Us" ? "active" : ""}`}
                data-bs-toggle=""
                onClick={() => handleSetActiveLink("/About-Us")}
              >
                <span>About Us</span>
                <span className="chevron-dropdown"></span>
              </Link>
              <div className="dropdown-menu rounded-0 m-0 " id="a">
                <Link to="/About-Us/Our-Mission" className="dropdown-item">
                  Our Mission
                </Link>
                <Link to="/About-Us/Our-Vision" className="dropdown-item">
                  Our Vision
                </Link>
              </div>
            </div>
            <Link
              to="/Employers"
              className={`nav-item nav-link ${activeLink === "/Employers" ? "active" : ""}`}
              onClick={() => handleSetActiveLink("/Employers")}
            >
              Employers
            </Link>
            <Link
              to="/Browse-Jobs"
              className={`nav-item nav-link ${activeLink === "/Browse-Jobs" ? "active" : ""}`}
              onClick={() => handleSetActiveLink("/Browse-Jobs")}
            >
              Browse Jobs
            </Link>
            {(() => {
              switch (auth.user?.role) {
                case 1:
                  return (
                    <Link
                      to="/Admin/Jobs/Post-Job"
                      className="nav-item nav-link"
                    >
                      Post Job
                    </Link>
                  );
                case 2:
                  return (
                    <Link
                      to="/Employer/Jobs/Post-Job"
                      className="nav-item nav-link"
                    >
                      Post Job
                    </Link>
                  );
                default:
                  return (
                    <Link to="/Login" className="nav-item nav-link">
                      Post Job
                    </Link>
                  );
              }
            })()}
            {/* {!auth.user ? (
              <Link to="/Login" className="nav-item nav-link">Post Job</Link>
            ) : (
              auth.user?.role === 1 ? (
                <Link to="/Admin/Jobs/Post-Job" className="nav-item nav-link">Post Job</Link>
              ) : (
                <Link to="/Employer/Jobs/Post-Job" className="nav-item nav-link">Post Job</Link>
              )
            )} */}
            <Link
              to="/Contact-Us"
              className={`nav-item nav-link ${activeLink === "/Contact-Us" ? "active" : ""}`}
              onClick={() => handleSetActiveLink("/Contact-Us")}
            >
              Contact Us
            </Link>
            <Link
              to="/Resume-Upload"
              className={`nav-item nav-link ${activeLink === "/Resume-Upload" ? "active" : ""}`}
              onClick={() => handleSetActiveLink("/Resume-Upload")}
            >
              Resume Upload
            </Link>
          </div>
          {!auth.user ? (
            <>
              <Link
                to="/Login"
                className="btn btn-primary rounded-0 py-4 px-lg-5 d-none d-lg-block"
              >
                Login
                <i className="fa fa-lock ms-3" />
              </Link>
            </>
          ) : (
            <>
              {auth.user?.role === 1 ? (
                <>
                  <div
                    className="nav-item dropdown"
                    style={{ marginRight: "20px" }}
                  >
                    <Link
                      to="/Admin/Dashboard"
                      className="nav-link"
                      data-bs-toggle=""
                    >
                      <div>
                        <span
                          className="chevron-dropdown-img"
                          id="chevron"
                        ></span>
                        <img
                          src={auth?.user?.photo}
                          alt={auth?.user?.firstname}
                          style={{
                            width: "70px",
                            height: "70px",
                            borderRadius: "50%",
                          }}
                        />
                      </div>
                    </Link>
                    <div className="dropdown-menu rounded-0 m-l " id="a">
                      <li>
                        <Link className="dropdown-item" to="/Admin/Dashboard">
                          Account
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item" to="/Admin/Dashboard">
                          Dashboard
                        </Link>
                      </li>
                      <li>
                        <hr className="dropdown-divider" />
                      </li>
                      <li>
                        <Link
                          className="dropdown-item"
                          to="/Admin/Jobs/Manage-Jobs"
                        >
                          Manage Job
                        </Link>
                      </li>
                      <li>
                        <Link
                          className="dropdown-item"
                          to="/Admin/Jobs/Post-Job"
                        >
                          Post Job
                        </Link>
                      </li>
                      <li>
                        <Link
                          className="dropdown-item"
                          to="/Admin/Jobs/Applied-Jobs"
                        >
                          Applied Jobs
                        </Link>
                      </li>
                      <li>
                        <hr className="dropdown-divider" />
                      </li>
                      <li>
                        <Link
                          className="dropdown-item"
                          to="/Admin/Countries/Manage-Countries"
                        >
                          Manage Countries
                        </Link>
                      </li>
                      <li>
                        <Link
                          className="dropdown-item"
                          to="/Admin/Countries/Add-Country"
                        >
                          Add Country
                        </Link>
                      </li>
                      <li>
                        <hr className="dropdown-divider" />
                      </li>
                      <li>
                        <Link
                          className="dropdown-item"
                          to="/Admin/Sectors/Manage-Sectors"
                        >
                          Manage Sectors
                        </Link>
                      </li>
                      <li>
                        <Link
                          className="dropdown-item"
                          to="/Admin/Sectors/Add-Sector"
                        >
                          Add Sector
                        </Link>
                      </li>
                      <li>
                        <hr className="dropdown-divider" />
                      </li>
                      <li>
                        <Link
                          className="dropdown-item"
                          to="/Admin/WorkAuthorizations/Manage-Work-Authorizations"
                        >
                          Manage Work Authorizations
                        </Link>
                      </li>
                      <li>
                        <Link
                          className="dropdown-item"
                          to="/Admin/WorkAuthorizations/Add-Work-Authorization"
                        >
                          Add Work Authorization
                        </Link>
                      </li>
                      <li>
                        <hr className="dropdown-divider" />
                      </li>
                      <li>
                        <Link
                          className="dropdown-item"
                          to="/Login"
                          onClick={handleLogout}
                        >
                          Logout
                        </Link>
                      </li>
                    </div>
                  </div>
                </>
              ) : (
                <></>
              )}
              {auth.user?.role === 2 ? (
                <>
                  <div
                    className="nav-item dropdown"
                    style={{ marginRight: "20px" }}
                  >
                    <Link
                      to="/Employer/Dashboard"
                      className="nav-link dropdown-toggle"
                      data-bs-toggle=""
                    >
                      <img
                        src={auth?.user?.photo}
                        alt={auth?.user?.firstname}
                        style={{
                          width: "70px",
                          height: "70px",
                          borderRadius: "50%",
                        }}
                      />
                    </Link>
                    <div className="dropdown-menu rounded-0 m-0">
                      <Link to="/Employer/Dashboard" className="dropdown-item">
                        Profile
                      </Link>
                      <Link
                        to="/Login"
                        className="dropdown-item"
                        onClick={handleLogout}
                      >
                        Logout
                      </Link>
                    </div>
                  </div>
                </>
              ) : (
                <></>
              )}
              {auth.user?.role === 0 ? (
                <>
                  <div
                    className="nav-item dropdown"
                    style={{ marginRight: "20px" }}
                  >
                    <Link
                      to="/Applicant/Dashboard"
                      className="nav-link dropdown-toggle"
                      data-bs-toggle=""
                    >
                      <img
                        src={auth?.user?.photo}
                        alt={auth?.user?.firstname}
                        style={{
                          width: "70px",
                          height: "70px",
                          borderRadius: "50%",
                        }}
                      />
                    </Link>
                    <div className="dropdown-menu rounded-0 m-0">
                      <Link to="/Applicant/Dashboard" className="dropdown-item">
                        Profile2
                      </Link>
                      <Link
                        to="/Login"
                        className="dropdown-item"
                        onClick={handleLogout}
                        // onClick={updateMenu}
                      >
                        Logout
                      </Link>
                    </div>
                  </div>
                </>
              ) : (
                <></>
              )}
            </>
          )}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
