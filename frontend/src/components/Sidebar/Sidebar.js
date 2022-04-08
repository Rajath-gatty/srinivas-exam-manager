import React from 'react';
import {Link } from 'react-router-dom'; 
import "./Sidebar.css";
import Logo from "../../Assets/SrinivasLogo.svg";
import Avatar from "../../Assets/Avatar.svg";
import Arrow from "../../Assets/Arrow.svg";

const Sidebar = () => {
  return (
    <div className="sidebar flex">
        <div className="sidebar-header">
            <div className="logo flex">
                <img src={Logo} width="30px" alt="logo" />
                <h1>Srinivas Exam Manager</h1>
            </div>
            <div className="user-profile flex">
                <div className="user-avatar flex">
                    <img src={Avatar} width="45px" alt="avatar" />
                </div>
                
                <div className="user-name">
                    <h2>John Doe</h2>
                    <h3>Administrator</h3>
                </div>

                <img src={Arrow} width="25px" alt="arrow" />
            </div>
        </div>

        <div className="sidebar-nav">
            <ul>
                <li>
                    <Link to="/" className="btn-outlined">Dashboard</Link>
                </li>
            </ul>
        </div>
    </div>
  )
}

export default Sidebar