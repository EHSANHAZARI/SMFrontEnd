import ChangePageTitle from "../../utils/ChangePageTitle";
import React, { Component, useRef, useEffect, useState } from "react";
import { NavLink, Link, useParams,useNavigate } from "react-router-dom";
import { EditOutlined, DeleteOutlined, DownloadOutlined, EyeOutlined, RollbackOutlined, SwapRightOutlined  } from '@ant-design/icons';

import API from "../../helpers/API";

import { useAuth } from "../../Context/AuthContext";

import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

import moment from "moment";

import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";


const JobDetails = () => {

    const [auth, setAuth] = useAuth();
    const params = useParams();
    const navigate = useNavigate();
    const [job, setJob] = useState({});

    const fetchJob = async () => {
        try 
        {
          const { data } = await API.get(`/api/v1/job/job-details/${params.slug}`);
          setJob(data.job);
        } catch (error) {
          console.log(error);
        }
      };
    
      // initial Job Details
      useEffect(() => {
        if (params?.slug) fetchJob();
      }, [params?.slug]);

    return (
        <>
            <Header />
            {/* <ChangePageTitle customPageTitle="Job Details | ProfostSynergies" /> */}
            <ChangePageTitle customPageTitle={job.title} />
            <div className="container-fliud py-5 bg-dark page-header-jobs mb-5">
                <div className="container my-5 pt-5 pb-4">
                    <h1 className="display-3 text-white mb-3 animated slideInDown">{job.title}</h1>
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb text-uppercase">
                            <li className="breadcrumb-item"><Link to="/Jobs">Jobs</Link></li>
                            <li className="breadcrumb-item text-white active" aria-current="page">
                                {job.title}
                            </li>
                        </ol>
                    </nav>
                </div>
            </div>
            {/* Job Detail Start */}
            <div className="container-xxl py-5 wow fadeInUp" data-wow-delay="0.1s">
                <div className="container">
                    <div className="row gy-5 gx-4">
                        <div className="col-lg-8">
                            <div className="d-flex align-items-center mb-5">
                                <img className="flex-shrink-0 img-fluid border rounded" src="../../assets/img/ProsoftSynergies.jpeg" alt="Company-Logo" style={{width: "90px", height: "50px"}} />
                                <div className="text-start ps-4">
                                    <h3 className="mb-3">{job.title}</h3>
                                    <span className="text-truncate me-3"><i className="fa fa-map-marker-alt text-primary me-2"></i>{job?.province?.provinceName}, {job?.country?.countryName}</span>
                                    <span className="text-truncate me-3"><i className="far fa-clock text-primary me-2"></i>{job?.workMode?.workModeName}</span>
                                    <span className="text-truncate me-0"><i className="fas fa-briefcase text-primary me-2"></i>{job?.sector?.sectorName}</span>
                                </div>
                            </div>

                            <div className="mb-5 mt-5 jobDetails">
                                <h4 className="mb-4 mt-5">Job description</h4>
                                {/* <p>
                                    {job.description}
                                </p> */}
                                
                                <div dangerouslySetInnerHTML={{ __html: job.description }}></div>
                               
                                <h4 className="mb-4 mt-4">Qualifications</h4>
                                <p>
                                    {job?.qualification?.qualificationName}
                                </p>

                                <h4 className="mb-4 mt-4">Experience</h4>
                                <p>
                                    {job?.workExperience?.workExperienceName}
                                </p>
                                <h4 className="mb-4 mt-4">Job Sector</h4>
                                <p>
                                    {job?.sector?.sectorName}
                                </p>
                            </div>
            
                            <div className="jobDetails">
                                <h4 className="mb-4">Apply For The Job Now</h4>
                                <form>
                                    <div className="row g-3">
                                        <div className="col-12 col-sm-6">
                                            <input type="text" className="form-control" placeholder={auth?.user?.firstname + " " + auth?.user?.lastname} />
                                        </div>
                                        <div className="col-12 col-sm-6">
                                            <input type="email" className="form-control" placeholder={auth?.user?.email} />
                                        </div>
                                        <div className="col-12 col-sm-6">
                                            <input type="text" class="form-control" placeholder="Portfolio Website" />
                                        </div>
                                        <div className="col-12 col-sm-6">
                                            <input type="file" className="form-control bg-white" />
                                        </div>
                                        <div className="col-12 col-sm-6">
                                            <select className="form-control">
                                                <option>Salary Expectation</option>
                                                <option>Annual</option>
                                                <option>Monthly</option>
                                                <option>Hourly</option>
                                            </select>
                                        </div>
                                        <div className="col-12 col-sm-6">
                                            <input type="text" class="form-control" placeholder="₹" />
                                        </div>
                                        <div className="col-12 col-sm-6">
                                            <input type="text" class="form-control" placeholder="LinkedIn" />
                                        </div>
                                        <div className="col-12 col-sm-6">
                                            <input type="text" class="form-control" placeholder="GitHub" />
                                        </div>
                                        <div className="col-12">
                                            <textarea className="form-control" rows="5" placeholder="Message to Recruiter"></textarea>
                                        </div>
                                        <div className="col-3 mx-auto">
                                            <button className="btn btn-lg btn-primary rounded-0 w-100" type="submit">
                                                Apply Now
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
            
                        <div class="col-lg-4">
                            <div class="bg-light rounded p-5 mb-4 wow slideInUp" data-wow-delay="0.1s">
                                <h4 class="mb-4">Job Overview</h4>
                                <p>
                                    <SwapRightOutlined style={{ marginRight: "2px", fontSize: "30px", position: "relative", top: "-3px" }}/> 
                                    {/* <i class="fa-solid fa-circle me-3" style={{ fontSize: "12px"}}></i> */}
                                    Job Posted: {" "}
                                    {moment
                                    .utc(new Date(job.jobPostDate))
                                    .local()
                                    .startOf("second")
                                    .fromNow(true)
                                    }{" "} ago</p>
                                <p>
                                    <SwapRightOutlined style={{ marginRight: "2px", fontSize: "30px", position: "relative", top: "-3px" }}/> 
                                    {/* <i class="fa-solid fa-circle me-3" style={{ fontSize: "12px"}}></i> */}
                                    Job Nature: {job?.workMode?.workModeName}
                                </p>
                                <p>
                                    <SwapRightOutlined style={{ marginRight: "2px", fontSize: "30px", position: "relative", top: "-3px" }}/> 
                                    {/* <i class="fa-solid fa-circle me-3" style={{ fontSize: "12px"}}></i> */}
                                    Location: {job?.province?.provinceName}, {job?.country?.countryName}
                                </p>
                                <p class="m-0">
                                    <SwapRightOutlined style={{ marginRight: "2px", fontSize: "30px", position: "relative", top: "-3px" }}/> 
                                    {/* <i class="fa-solid fa-circle me-3" style={{ fontSize: "12px"}}></i> */}
                                    Deadline Date: {moment(job.deadlineDate).format("ll")}
                                </p>
                            </div>
                            <div class="bg-light rounded p-5 wow slideInUp" data-wow-delay="0.1s">
                                <h4 class="mb-4">Company Detail</h4>
                                <p class="m-0">
                                    Company Deatails Will be Here...
                                </p>
                            </div>
                            <Link to="/Browse-Jobs" className="btn btn-outline-success btn-lg rounded 0 mt-5 jobDetails">
                                <RollbackOutlined style={{ position: "relative", top: "-5px"}}/> Back To Jobs
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            {/* Job Detail End */}
            <Footer />
        </>
    );

};

export default JobDetails;