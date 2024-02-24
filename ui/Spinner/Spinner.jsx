import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

import "./Spinner.css";

const Spinner = ({ path = "*" }) => {

    const [count, setCount] = useState(1);
    const navigate = useNavigate();
    const location = useLocation();
    const notifyErr = (msg) => toast.error(msg, 
        {position: "top-center", autoClose: 20000, closeOnClick: true, pauseOnHover: true, theme: "light",});
    const notifySucc = (msg) => toast.success(msg, 
        {position: "top-center", autoClose: 20000, closeOnClick: true, pauseOnHover: true, theme: "light",}); 
    

    useEffect(() => {
        const interval = setInterval(() => {
            if (interval)
            {                
                setCount((prevValue) => --prevValue);
            }
        }, 2000);
        count === 0 && 
            navigate(`/${path}`, {
                state: location.pathname
            }, notifyErr("ACCESS DENIED. You do not have the Authorization to View this Page!"));            
        return () => clearInterval(interval);
    }, [count, navigate, location, path]);

    return (
        <div>
            <section id="general-content-120" className="" style={{ background: "#ffffff", paddingTop: "50px", paddingBottom: "200px" }}>
                <div className="container-fluid  d-flex align-items-center justify-content-between  flex-column flex-md-row values-wrapper">
                    <header className="d-flex flex-column  w-100 align-items-center justify-content-between pb-4">
                        <div className="wrap-header  w-100">
                            <article className="title w-100">
                            </article>
                            <article className="body w-100">
                                <p align="justify">
                                <div className="loader">Loading...</div>
                                <h1 className="text-center">Redirecting You in {count} second!</h1>
                                </p>
                            </article>
                        </div>
                    </header>
                </div>
            </section>
        </div>
    );
};

export default Spinner;