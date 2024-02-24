import ChangePageTitle from "../../../utils/ChangePageTitle";
import RegisterForm from "../../../components/auth/RegisterForm";
import React, { Component, useRef, useEffect, useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import API from "../../../helpers/API";
import Select from "react-select";
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Typography, Paper } from "@mui/material";

import Header from '../../../components/Header/Header';
import Footer from '../../../components/Footer/Footer';

import '../auth.css';

const Register = () => {


    const navigate = useNavigate();
    const [visible, setVisible] = useState(false);

    const [country, setCountry] = useState("");
    const [countries, setCountries] = useState([]);
    const [countryName, setCountryName] = useState("");

    const [sector, setSector] = useState("");
    const [sectors, setSectors] = useState([]);
    const [sectorName, setSectorName] = useState("");

    const [workAuthorization, setWorkAuthorization] = useState("");
    const [workAuthorizations, setWorkAuthorizations] = useState([]);

    const [firstname, setFirstName] = useState("");
    const [lastname, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [phone, setPhone] = useState("");


    const emailRegex = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/;
    function isEmailValid(email) { return /\S+@\S+\.\S+/.test(email); }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\\$%\\^&\\*])(?=.{8,})/;
    const confirmPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\\$%\\^&\\*])(?=.{8,})/;
    const phoneRegex = /^\s*(?:\+?(\d{1,3}))?[- (]*(\d{3})[- )]*(\d{3})[- ]*(\d{4})(?: *[x/#]{1}(\d+))?\s*$/;


    const notifyErr = (msg) => toast.error(msg, 
        {position: "top-center", autoClose: 20000, closeOnClick: true, pauseOnHover: true, theme: "light" });
    const notifySucc = (msg) => toast.success(msg, 
        {position: "top-center", autoClose: 20000, closeOnClick: true, pauseOnHover: true, theme: "light" });


    useEffect(() => {
        fetchCountries();
    }, []);

    useEffect(() => {
        fetchSectors();
    }, []);

    useEffect(() => {
        fetchWorkAuthorizations();
    }, []);
   
    const fetchCountries = async () => {
            try
            {
                const { data } = await API.get("/api/v1/country/fetchCountries");
                if (data?.success) {
                    setCountries(data?.country);
                }
            }
            catch (error)
            {
                console.log(error);
                notifyErr("Oppss!!, FAILED, Something went Wrong Retrieving all Countries");
            }
    };

    const fetchSectors = async () => {
            try
            {
                const { data } = await API.get("/api/v1/sector/fetchSectors");
                if (data?.success) {
                    setSectors(data?.sector);
                }
            }
            catch (error)
            {
                console.log(error);
                notifyErr("Oppss!!, FAILED, Something went Wrong Retrieving all Sectors");
            }
    };

    const fetchWorkAuthorizations = async () => {
            try
            {
                const { data } = await API.get("/api/v1/workAuthorization/fetchWorkAuthorizations");
                if (data?.success) {
                    setWorkAuthorizations(data?.workAuthorization);
                }
            }
            catch (error)
            {
                console.log(error);
                notifyErr("Oppss!!, FAILED, Something went Wrong Retrieving all Work Authorizations");
            }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
      
        const fields = [
          { name: "firstname", message: "First Name Field Cannot be Empty" },
          { name: "lastname", message: "Last Name Field Cannot be Empty" },
          { name: "email", message: "Email Field Cannot be Empty" },
          { name: "password", message: "Password Field Cannot be Empty" },
          { name: "confirmPassword", message: "Confirm Password Field Cannot be Empty" },
          { name: "phone", message: "Phone Field Cannot be Empty" },
          { name: "email", message: "Invalid Email Address", regex: emailRegex },
          { name: "password", message: "Password must contain at least 8 characters, including at least 1 number and 1 includes both lower and uppercase letters and special characters for example #,?,!", regex: passwordRegex },
          { name: "confirmPassword", message: "Confirm Password must contain at least 8 characters, including at least 1 number and 1 includes both lower and uppercase letters and special characters for example #,?,!", regex: confirmPasswordRegex },
          { name: "phone", message: "Phone Number Cannot be more than 10 Digits", regex: phoneRegex },
          { name: "password", message: "Password & Confirm password does Not Matched!!", condition: password !== confirmPassword },
          { name: "country", message: "Please Select Country Field, It Cannot be Empty" },
          { name: "workAuthorization", message: "Please Select Work Authorization Field, It Cannot be Empty" },
        ];
      
        for (const field of fields) {
          const { name, message, regex, condition } = field;
          const value = eval(name);
      
          if (!value || (regex && !regex.test(value)) || (condition && condition)) {
            notifyErr(message);
            return;
          }
        }
      
        try {
          const config = { headers: { "Content-Type": "application/json" } };
          const data = { firstname, lastname, email, password, confirmPassword, phone, country, workAuthorization };
      
          const res = await API.post(`/api/v1/auth/register`, data, config);
      
          if (res.data.success) {
            resetRegisterUserForm();
            notifySucc(res.data.message);
            navigate("/Login");
          } else {
            notifyErr(res.data.message);
          }
        } catch (error) {
          console.log(error);
          notifyErr("Opps.. Failed!!. Something Went Wrong.. Try Again Later");
        }
      };
      
      const resetRegisterUserForm = () => {
        setFirstName('');
        setLastName('');
        setEmail('');
        setPhone('');
        setPassword('');
        setConfirmPassword('');
        setCountry('');
        setWorkAuthorization('');
      };

    return (
        <>
            <Header />
            <ChangePageTitle customPageTitle="Register | ProfostSynergies" />
            {/* <div className="container-fliud py-5 bg-dark page-header-register mb-5">
                <div className="container my-5 pt-5 pb-4">
                    <h1 className="display-3 text-white mb-3 animated slideInDown">Register</h1>
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb text-uppercase">
                            <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                            <li className="breadcrumb-item text-white active" aria-current="page">Sign Up</li>
                        </ol>
                    </nav>
                </div>
            </div> */}
            {/* <!-- Header End --> */}
            <div className="container-xxl py-5">
                <div className="container">
                    <div className="row">
                        <div className="col-md-10 mx-auto">
                            <div className="wrapper">
                                <div className="inner">
                                    <form onSubmit={handleSubmit} className="authform">
                                        <h3>Register</h3>
                                        <div className="form-wrapper">
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <label for="">First Name:</label>
                                                    <input 
                                                        type="text" 
                                                        className="authInputFields form-control"
                                                        name="firstname"
                                                        value={firstname}
                                                        onChange={(e) => setFirstName(e.target.value)} />
                                                </div>
                                                <div className="col-md-6">
                                                    <label for="">Last Name:</label>
                                                    <input 
                                                        type="text" 
                                                        className="authInputFields form-control"
                                                        name="lastname"
                                                        value={lastname}
                                                        onChange={(e) => setLastName(e.target.value)} />
                                                </div>
                                            </div>
                                        </div> 
                                        <div className="form-wrapper">
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <label for="">Email:</label>
                                                    <input 
                                                        type="email" 
                                                        className="authInputFields form-control"
                                                        name="email" 
                                                        value={email}
                                                        onChange={(e) => setEmail(e.target.value)}/>
                                                </div>
                                                <div className="col-md-6">
                                                    <label for="">Phone:</label>
                                                    <input 
                                                        type="text" 
                                                        className="authInputFields form-control"
                                                        name="phone"
                                                        value={phone}
                                                        onChange={(e) => setPhone(e.target.value)} />
                                                </div>                                                
                                            </div>
                                        </div> 
                                        <div className="form-wrapper">
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <label for="">Password:</label>
                                                    <input 
                                                        type={visible ? "text" : "password"} 
                                                        className="authInputFields form-control" 
                                                        name="password"
                                                        value={password}
                                                        onChange={(e) => setPassword(e.target.value)}
                                                    />
                                                    {visible ? (
                                                    <AiOutlineEye
                                                        className="absolute right-2 top-2 cursor-pointer"
                                                        size={25}
                                                        onClick={() => setVisible(false)}
                                                    />
                                                    ) : (
                                                    <AiOutlineEyeInvisible
                                                        className="absolute right-2 top-2 cursor-pointer"
                                                        size={25}
                                                        onClick={() => setVisible(true)}
                                                    />
                                                    )}
                                                </div>
                                                <div className="col-md-6">
                                                    <label for="">Confirm Password:</label>
                                                    <input 
                                                        type={visible ? "text" : "password"} 
                                                        name="confirmPassword"
                                                        className="authInputFields form-control" 
                                                        value={confirmPassword}
                                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                                    />
                                                    {visible ? (
                                                    <AiOutlineEye
                                                        className="absolute right-2 top-2 cursor-pointer"
                                                        size={25}
                                                        onClick={() => setVisible(false)}
                                                    />
                                                    ) : (
                                                    <AiOutlineEyeInvisible
                                                        className="absolute right-2 top-2 cursor-pointer"
                                                        size={25}
                                                        onClick={() => setVisible(true)}
                                                    />
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="form-wrapper">
                                            <div className="row">
                                               <div className="col-md-6">
                                                    <label for="" className="mb-2">Country:</label>
                                                    <div className="form-wrapper">
                                                        <select 
                                                            class="form-control countries" 
                                                            name="country" 
                                                            value={country}
                                                            onChange={(e) => setCountry(e.target.value)}
                                                        >
                                                            <option>Select Country</option>
                                                            {countries.map((c) => {
                                                                return (
                                                                    <option key={c._id} value={c._id}>
                                                                        {c.countryName}
                                                                    </option>
                                                                );
                                                            })}
                                                        </select>                                            
                                                    </div>
                                               </div>
                                               {/* <div className="col-md-6">
                                                    <label className="mb-2">Interested Job Sectors: <span style={{ fontSize: "12px", fontStyle: "italic", color: "#6c757d", fontWeight: "700"}}>(Choose Max 3 Sectors)</span></label>
                                                    <div className="form-wrapper mb-5">
                                                        <select class="jsectors form-control" name="sectors">
                                                            <option>Select Job Sectors</option>
                                                            {sectors.map((sector) => {
                                                                return(
                                                                    <option value={sector.sectorName}>
                                                                        {sector.sectorName}
                                                                    </option>
                                                                );
                                                            })}
                                                        </select>                                     
                                                    </div>
                                                </div> */}
                                                <div className="col-md-6">
                                                    <label className="mb-2">Work Authorization Type:</label>
                                                    <div className="form-wrapper mb-5">
                                                        <select 
                                                            class="jsectors form-control" 
                                                            name="workAuthorization"
                                                            value={workAuthorization}
                                                            onChange={(e) => setWorkAuthorization(e.target.value)}
                                                        >
                                                            <option>Select Work Authorization</option>
                                                            {workAuthorizations.map((wa) => {
                                                                return(
                                                                    <option key={wa._id} value={wa._id}>
                                                                        {wa.workAuthorizationName}
                                                                    </option>
                                                                );
                                                            })}
                                                        </select>                                     
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {/* <div className="form-wrapper">
                                            <div className="row">
                                               <div className="col-md-6">
                                                <label for="" className="mb-2">Work Authorization Type:</label>
                                                    <div className="form-wrapper">
                                                        <select class="form-control workauthorizationtype" name="workauthorizationtype">
                                                            <option></option>
                                                            <option value="Permanent Resident">Permanent Resident</option>
                                                            <option value="Canadian Citizen">Canadian Citizen</option>
                                                            <option value="US Citizen">US Citizen</option>
                                                            <option value="Work Permit CD">Work Permit CA</option>
                                                            <option value="Work Permit US">Work Permit US</option>
                                                            <option value="Indian Citizen">Indian Citizen</option>
                                                        </select>                                            
                                                    </div>
                                               </div>
                                               <div className="col-md-6">
                                                    <label className="mb-2">Gender:</label>
                                                    <div className="form-wrapper mb-5">
                                                        <select class="form-control gender" name="gender" multiple>
                                                            <option></option>
                                                            <option value="Male">Male</option>
                                                            <option value="Female">Female</option>
                                                            <option value="N/A">Not Listed</option>
                                                        </select>                                           
                                                    </div>
                                                </div>
                                            </div>
                                        </div> */}
                                        <button className="authbtn mb-5" type="submit">Register</button>
                                        <div className="mb-5">
                                            <label>
                                                <span className="">Have an Account Already?</span> &nbsp;
                                                <Link to="/Login">Login</Link>
                                            </label>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}; 


export default Register;