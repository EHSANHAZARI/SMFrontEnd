import ChangePageTitle from "../../utils/ChangePageTitle";
import React, { Component, useRef, useEffect, useState } from "react";
import { NavLink, Link } from "react-router-dom";

import API from "../../helpers/API";
import { useAuth } from "../../Context/AuthContext";

import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

import { EditOutlined, DeleteOutlined, DownloadOutlined, EyeOutlined, RollbackOutlined, SwapRightOutlined, SwapLeftOutlined  } from '@ant-design/icons';

import moment from "moment";

import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";


const Jobs = () => {

    const [jobs, setJobs] = useState([]);
    const [visible, setVisible] = useState(false);
    const [selected, setSelected] = useState(null);
    const [updatedName, setUpdatedName] = useState("");
    const [numJobsInDB, setNumJobsInDB] = useState(0);
    const [totalJobs, setTotalJobs] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [jobsPerPage, setJobsPerPage] = useState(5);
    const [loading, setLoading] = useState(false);
    const [selectedJob, setSelectedJob] = useState(null);

    const notifyErr = (msg) => toast.error(msg, 
        {position: "top-center", autoClose: 20000, closeOnClick: true, pauseOnHover: true, theme: "light" });
    const notifySucc = (msg) => toast.success(msg, 
        {position: "top-center", autoClose: 20000, closeOnClick: true, pauseOnHover: true, theme: "light" }); 


    useEffect(() => {
      fetchAlJobs();
      window.scrollTo({ top: 0 });
      if (window.history.pushState) {
          window.history.pushState(null, null, `/Browse-Jobs?page=${currentPage}`);
      }
    }, [currentPage, jobsPerPage]);
      
  const fetchAlJobs = async () => {

    try
    {
        setLoading(true);
        const response = await API.get(`/api/v1/job/fetchAllJobs?page=${currentPage}`);
        setJobs(response.data.result);
        setTotalJobs(response.data.totalJobs);
        setNumJobsInDB(response.data.numJobsInDB);
        localStorage.setItem("refresh", response.data.result);
        setLoading(false);
        setSelectedJob(null);
    }
    catch (error)
    {
        console.error(error);
        console.log(error);
        setLoading(false);
        notifyErr(error.response.data.message);
    }

  };

    const nextPage = () => {
        setCurrentPage(currentPage + 1);
    };

    const prevPage = () => {
        setCurrentPage(currentPage - 1);
    };

    const pagination = (pageNumber) => setCurrentPage(pageNumber);

    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalJobs / jobsPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <>
            <Header />
            <ChangePageTitle customPageTitle="Browse Jobs | ProfostSynergies" />
            <div className="container-fliud py-5 bg-dark page-header-jobs mb-5">
                <div className="container my-5 pt-5 pb-4">
                    <h1 className="display-3 text-white mb-3 animated slideInDown">Browse Jobs</h1>
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb text-uppercase">
                            <li className="breadcrumb-item"><Link to="/Jobs">Jobs</Link></li>
                            <li className="breadcrumb-item text-white active" aria-current="page">
                                
                            </li>
                        </ol>
                    </nav>
                </div>
            </div>
            <section className="trending_jobs pt-75 pb-80 gray-bg">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-md-7">
                            <div className="section_title pb-25">
                                <h3 className="main_title">Featured Jobs</h3>
                                (<strong><span>Page {currentPage} of {" "} {totalJobs} Active Jobs Found</span></strong>)
                            </div>
                        </div>
                    </div>
                    <div className="tab-content" id="myTabContent">
                        <div className="tab-pane fade show active" id="trending" role="tabpanel" aria-labelledby="trending-tab">
                            <div className="row">
                                {jobs?.length > 0 ? (
                                jobs.map((j) => {
                                    return (

                                    <div className="col-lg-4 col-sm-6 mb-4">
                                        <div className="single_jobs text-center mt-30">
                                            <div className="jobs_image">
                                                <img src="../../assets/img/ProsoftSynergies.jpeg" alt="Company-Logo" />
                                            </div>
                                            <div className="jobs_content">
                                                <h4 className="jobs_title">
                                                    <Link to={`/Job-Details/${j.slug}`}>{j.title}</Link>
                                                </h4>
                                                <p className="sub_title">
                                                    {/* <span style={{ color: "#000"}}>Recruiter</span>: {j?.jobPostedById?.firstname} */}
                                                </p>
                                            </div>
                                            <div className="jobs_meta d-flex justify-content-between">
                                                <p className="location"><i className="fa fa-map-marker"></i>{j?.country?.countryName}, {" "} <small>{j?.province?.provinceName}</small></p>
                                                <p className="time"><i className="fas fa-briefcase"></i> {j?.workMode?.workModeName}</p>
                                            </div>
                                            <p className="text-mute">
                                                <small className="me-5" style={{ fontSize: "12px", color: "#aaa" }}>
                                                <i className="fa fa-clock"></i> {" "} 
                                                    Posted{" "}
                                                    {moment
                                                    .utc(new Date(j.jobPostDate))
                                                    .local()
                                                    .startOf("second")
                                                    .fromNow(true)
                                                    }{" "} ago
                                                </small>
                                                <small style={{ fontSize: "12px", color: "#aaa" }}>
                                                <i className="fas fa-business-time"></i>{" "}  
                                                    Apply Before: {" "}                                            
                                                    <span>{moment(j.deadlineDate).format("ll")}</span>
                                                </small>
                                            </p>
                                            <div className="jobs_btn">
                                                <Link to="#/" className="main-btn main-btn-2 me-3 rounded-0">
                                                    Apply Now
                                                </Link>

                                                <Link to={`/Job-Details/${j.slug}`} className="main-btn main-btn-2 rounded-0">Read More</Link>
                                            </div>
                                        </div>
                                    </div>
                                    )
                                })
                                ) : 
                                (
                                <span style={{ fontWeight: '600' }}>
                                    No Job Found..
                                </span>
                                )}
                                <nav className="jobspaginate mt-5" aria-label="Page navigation">
                                    <ul className="jobspagination">
                                         <li className="page-item me-3">
                                            <button className="page-link" onClick={prevPage}
                                            disabled={currentPage === 1}>
                                                <span aria-hidden="true">
                                                    {/* <i className="fas fa-angles-left"></i> */}
                                                    <SwapLeftOutlined style={{ marginRight: "2px", fontSize: "30px", position: "relative", top: "-3px" }}/> 
                                                </span>
                                            </button>
                                        </li>
                                        {pageNumbers.map((number) => (
                                             <li key={number} className={currentPage === number ? "page-item active disabled" : ""}>
                                                <Link
                                                onClick={() => pagination(number)}
                                                disabled={
                                                    currentPage ===
                                                    Math.ceil(totalJobs / 6)
                                                }
                                                to="#"
                                                className="page-link"
                                                >
                                                {number}
                                                </Link>
                                             </li>
                                        ))}
                                        <li className="page-item ms-2">
                                            <button className="page-link" onClick={nextPage} disabled={ currentPage === Math.ceil(totalJobs / 6)}>
                                            <span aria-hidden="true">
                                                    {/* <i className="fas fa-angles-right"></i> */}
                                                    <SwapRightOutlined style={{ marginRight: "2px", fontSize: "30px", position: "relative", top: "-3px" }}/> 
                                                </span>
                                            </button>
                                        </li>
                                    </ul>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    );
}; 


export default Jobs;