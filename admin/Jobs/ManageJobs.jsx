import ChangePageTitle from "../../utils/ChangePageTitle";
import React, { useRef, useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import Modal from 'react-modal';
import { NavLink, Link, useNavigate } from "react-router-dom";
import download from 'downloadjs';
import API from "../../helpers/API";
import { sanitize } from "dompurify";
import { useAuth } from "../../Context/AuthContext";

import AddJobForm from "../components/Forms/AddJobForm";

import { EditOutlined, DeleteOutlined, DownloadOutlined, EyeOutlined  } from '@ant-design/icons';
import { Form, Input, Button } from "antd";

import HeaderSidebar from "../components/HeadeSidebar";
import Footer from "../components/Footer";

import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

let jobId;


const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      width:'80%',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      boxShadow: '1px 2px #888888',
    },
  };

const ManageJobs = ({ userId }) => {

    const [auth, setAuth] = useAuth();

    const [jobs, setJobs] = useState([]);
    const [job, setJob] = useState({});
    const [visible, setVisible] = useState(false);
    const [selected, setSelected] = useState(null);
    const [updatedName, setUpdatedName] = useState("");

    const [numJobsInDB, setNumJobsInDB] = useState(0);
    const [totalJobs, setTotalJobs] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [jobsPerPage, setJobsPerPage] = useState(5);
    const [loading, setLoading] = useState(false);
    const [selectedJob, setSelectedJob] = useState(null);

    const [sectors, setSectors] = useState([]);
    const [countries, setCountries] = useState([]);
    

    
    const [title, setTitle] = useState("");
    const [filePath, setFilePath] = useState(null);
    const filePathInputRef = useRef(null);

    const [modalIsOpen, setIsOpen] = React.useState(false);

    const openModal = () => {

        setIsOpen(true);
    };

    const closeModal = () => {

        setIsOpen(false);
    };


    const navigate = useNavigate();

    const notifyErr = (msg) => toast.error(msg, 
        {position: "top-center", autoClose: 20000, closeOnClick: true, pauseOnHover: true, theme: "light" });
    const notifySucc = (msg) => toast.success(msg, 
        {position: "top-center", autoClose: 20000, closeOnClick: true, pauseOnHover: true, theme: "light" });
        
   useEffect(() => {
        fetchAlJobs();
        window.scrollTo({ top: 0 });
        if (window.history.pushState) {
            window.history.pushState(null, null, `/Admin/Jobs/Manage-Jobs?page=${currentPage}`);
        }
    }, [currentPage, jobsPerPage]);
        
    const fetchAlJobs = async () => {

        try
        {
            setLoading(true);
            const response = await API.get(`/api/v1/job/fetchJobsByRecruiter/${userId}/?page=${currentPage}`);
            setJobs(response.data.result);
            setTotalJobs(response.data.totalJobs);
            setNumJobsInDB(response.data.numJobsInDB);
            localStorage.setItem("refresh", response.data.result);
            setLoading(false);
            setSelectedJob(null);
        }
        catch (error)
        {
            console.log(error);
            setLoading(false);
            notifyErr(error.response.data.message);
        }

    };

    useEffect(() => {
        fetchSectors();
    }, []);

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

    const downloadFile = async (slug) => {

        try {
            const res = await API.get(`/api/v1/job/download/${slug}`, { responseType: "blob"  } );
            const blob = new Blob([res.data], { type: res.data.type });
            const link = document.createElement('a');
            link.href = window.URL.createObjectURL(blob);
            link.download = job.filePath;
            link.click();
            notifySucc('File Downloaded Successfully!!!');
          } 
          catch (error) 
          {
            console.error(error);
            notifyErr('Matrix File Download Failed!!!', error);
          }
    };

    const handleAddJobSubmit = async (e) => {

        e.preventDefault();
        try
        {
            const formData = new FormData();
            formData.append('title', title);
            formData.append("filePath", filePathInputRef.current.files[0]);

            const response = await API.post('/api/v1/job/addJob', formData,  {
                headers: {
                  "Content-Type": "multipart/form-data",
                  "Access-Control-Allow-Origin": "*",
                  "Access-Control-Max-Age": 86400,
                }});
            notifySucc(response.data);
            navigate("/Admin/Dashboard");
        }
        catch (error)
        {
            console.error('Something Went Wrong, Failed to Add New Job', error);
            notifyErr("Opps!!! FAILED.. Something went wrong, New Job Failed to be added.");
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
            <HeaderSidebar />
            <ChangePageTitle customPageTitle=" Admin Manage Jobs| Prosoft Synergies " />             
            <div className="app-wrapper">
                <div className="app-content pt-3 p-md-3 p-lg-4">
                    <div className="container-xl">
                        <div className="position-relative mb-3">
                            <div className="row g-3 justify-content-between">
                                <div className="col-auto">
                                    <h1 className="app-page-title mb-0">Manage Jobs</h1>
                                    (<strong><span>Page {currentPage} of {" "} {numJobsInDB} Jobs Found</span></strong>)
                                    <p>
                                    (<strong><span>You Have  {numJobsInDB} Active Jobs:  </span></strong>)
                                    </p>
                                </div>
                            </div>
                        </div>
                        <nav id="countries-table-tab" className="countries-table-tab app-nav-tabs nav shadow-sm flex-column flex-sm-row mb-4">
                            <Link className="flex-sm-fill text-sm-center nav-link active" id="countries-all-tab" data-bs-toggle="tab" to="#countries-all" role="tab" aria-controls="countries-all" aria-selected="true">
                                Manage Jobs
                            </Link>
                            <Link className="flex-sm-fill text-sm-center nav-link"  id="add-new-country-tab" data-bs-toggle="tab" to="#add-new-country" role="tab" aria-controls="add-new-country" aria-selected="false">
                                Post New Job
                            </Link>
                        </nav>
                        <div className="tab-content" id="countries-table-tab-content">
                            <div className="tab-pane fade show active" id="countries-all" role="tabpanel" aria-labelledby="countries-all-tab">
                                <div className="app-card app-card-countries-table shadow-sm mb-5">
                                    <div className="app-card-body">
                                        <div className="table-responsive">
                                            <table className="table app-table-hover mb-0 text-left">
                                                <thead>
                                                    <tr>
                                                        
                                                    {/* <th class="cell">Id</th> */}
                                                    <th className="cell">Job Title</th>
                                                    <th className="cell">Job Qualification</th>
                                                    <th className="cell">Job Experience</th>
                                                    <th className="cell">Job Country</th>
                                                    <th className="cell">Work Mode</th>
                                                    <th className="cell">Job File</th>
                                                    <th className="cell">Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {jobs.length > 0 ? (
                                                        jobs.map((j) => {
                                                            return (
                                                                <tr key={j._id}>
                                                                    <td className="cell">
                                                                        <span className="truncate">{j.title}</span>
                                                                    </td>
                                                                    <td className="cell">{j?.qualification?.qualificationName}</td>
                                                                    <td className="cell">{j?.workExperience?.workExperienceName}</td>
                                                                    <td className="cell">{j?.country?.countryName}</td>
                                                                    <td className="cell">{j?.workMode?.workModeName}</td>
                                                                    <td className="cell">
                                                                        <button  onClick={() => downloadFile(j?.filePath)} className="btn btn-outline btn-sm rounded-0">
                                                                            <DownloadOutlined />
                                                                        </button>
                                                                    </td>
                                                                    <td className="cell">
                                                                    <button className="btn-sm app-btn-secondary rounded-0 me-3">
                                                                            <EyeOutlined />
                                                                        </button>
                                                                        <button 
                                                                            className="btn-sm app-btn-secondary rounded-0 me-3 bg-white px-4 py-3 rounded-0 border-2 shadow-md shadow-red-600 hover:bg-gray-200"
                                                                            onClick={openModal}
                                                                        >
                                                                            <EditOutlined />
                                                                        </button>
                                                                        <Modal
                                                                            isOpen={modalIsOpen}
                                                                            onRequestClose={closeModal}
                                                                            style={customStyles}
                                                                            contentLabel="Example Modal"
                                                                        >
                                                                            <div >
                                                                            <button onClick={closeModal} className="relative right-0 float-right text-red-600 font-bolder text-2xl">X</button>
                                                                            <h2  className="text-center text-xl">Modal Header</h2>
                                                                            <div className="">some text goes here...</div>
                                                                            </div>
                                                                        </Modal>
                                                                        <Button                                
                                                                            className="btn-sm app-btn-secondary rounded-0"
                                                                            type="danger"
                                                                            icon={<DeleteOutlined />}
                                                                            >        
                                                                        </Button>
                                                                    </td>
                                                                </tr>
                                                            )
                                                        })
                                                    ) : (
                                                        <tr>
                                                            <td colSpan={3} style={{ fontWeight: '300' }}>
                                                                No Job Found.
                                                            </td>
                                                        </tr>
                                                    )}
                                                </tbody>
                                            </table>
                                        </div>
                                       
                                    </div>
                                </div>
                                <nav className="app-pagination">
                                    <ul className="pagination justify-content-center">
                                        <li className="page-item">
                                                <button className="page-link" onClick={prevPage}
                                                disabled={currentPage === 1}>Previous</button>
                                            </li>
                                            {pageNumbers.map((number) => (
                                                <li key={number} className={currentPage === number ? "page-item active disabled" : ""}>
                                                    <Link
                                                    onClick={() => pagination(number)}
                                                    disabled={
                                                        currentPage ===
                                                        Math.ceil(totalJobs / 5)
                                                    }
                                                    to="#"
                                                    className="page-link"
                                                    >
                                                    {number}
                                                    </Link>
                                                </li>
                                            ))}
                                            <li className="page-item">
                                                <button className="page-link" onClick={nextPage} disabled={ currentPage === Math.ceil(totalJobs / 5)}>Next</button>
                                            </li>
                                    </ul>
                                </nav>
                            </div>
                            <div className="tab-pane fade" id="add-new-country" role="tabpanel" aria-labelledby="add-new-country-tab">
                                <div className="app-card app-card-countries-table mb-5">
                                    <div className="app-card-body mt-5">
                                        <div className="row mt-5">
                                            <div className="col-md-9 mx-auto mt-5">
                                                <form onSubmit={handleAddJobSubmit} encType="multipart/form-data">                                               
                                                    <div className="col-md-8 ma-auto">
                                                        <div className="md-form mb-4">
                                                            <label for="title" className="mb-3">Job Title</label>
                                                            <input 
                                                                type="text" 
                                                                id="title" 
                                                                className="form-control rounded-0" 
                                                                name="title"
                                                                value={title}
                                                                onChange={(e) => setTitle(e.target.value)}
                                                                />                                                    
                                                        </div>   
                                                        <div className="md-form mb-4">
                                                            <label for="file" className="mb-3">Job File</label> 
                                                            {filePath ? filePath.name : "Upload File Attachment"}
                                                            <input 
                                                                type="file" 
                                                                id="file"
                                                                name="filePath"
                                                                ref={filePathInputRef}
                                                                className="form-control rounded-0" />   

                                                            <div>
                                                                {filePath && (
                                                                <div>
                                                                    <file
                                                                    src={URL.createObjectURL(filePath)}
                                                                    alt="Uploaded File Attachment"
                                                                    height={"400px"}
                                                                    />
                                                                </div>
                                                                )}
                                                            </div>                                            
                                                        </div> 
                                                        <div className="text-xs-left">
                                                            <button type="submit" className="btn btn-primary rounded-0">Add New Job</button>
                                                        </div>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        </>
    );

};

export default ManageJobs;