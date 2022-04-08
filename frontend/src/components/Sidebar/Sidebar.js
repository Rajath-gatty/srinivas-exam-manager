import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Sidebar.css";
import Logo from "../../Assets/SrinivasLogo.svg";
import Avatar from "../../Assets/NavIcons/Avatar.svg";
import Arrow from "../../Assets/NavIcons/Arrow.svg";
import Dashboard from "../../Assets/NavIcons/Dashboard.svg";
import Register from "../../Assets/NavIcons/Register.svg";
import Courses from "../../Assets/NavIcons/Courses.svg";
import Users from "../../Assets/NavIcons/Users.svg";
import Logout from "../../Assets/NavIcons/Logout.svg";

const Sidebar = () => {
  const location = useLocation();
  useEffect(() => {
    const Dashboard = document.getElementById("dashboard");
    const Registration = document.getElementById("register");
    const Create = document.getElementById("create");
    const Users = document.getElementById("users");

    //Remove Previous Active Nav
    // const links = document.querySelectorAll(".navlink");
    // console.log(path);
    // links.forEach((nav) => {
    //   if (nav.classList.contains("active")) {
    //     nav.classList.remove("active");
    //   }
    // });

    var path = location.pathname; // get current url pathname

    //Change active nav acc to current pathname
    switch (path) {
      case "/dashboard": {
        Dashboard.classList.add("active");
        break;
      }
      case "/register": {
        Registration.classList.add("active");
        break;
      }
      case "/create": {
        Create.classList.add("active");
        break;
      }
      case "/users": {
        Users.classList.add("active");
        break;
      }
    }
  }, [location]);

  return (
    <div className="sidebar">
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

          <img className="user-arrow" src={Arrow} width="25px" alt="arrow" />
        </div>
      </div>

      <div className="sidebar-nav flex">
        <ul>
          <li>
            <Link id="dashboard" to="/dashboard" className="navlink flex">
              <img src={Dashboard} alt="Dash" width="20px" />
              <span>Dashboard</span>
            </Link>
          </li>
          <li>
            <Link id="register" to="/register" className="navlink flex">
              <img src={Register} alt="Dash" width="20px" />
              <span>Registration</span>
            </Link>
          </li>
          <li>
            <Link id="create" to="/create" className="navlink flex">
              <img src={Courses} alt="Dash" width="20px" />
              <span>Courses</span>
            </Link>
          </li>
          <li>
            <Link id="users" to="/users" className="navlink flex">
              <img src={Users} alt="Dash" width="20px" />
              <span>Users</span>
            </Link>
          </li>
        </ul>
      </div>

      <div className="logout flex">
        <img src={Logout} alt="Dash" width="20px" />
        <span>Logout</span>
      </div>
    </div>
  );
};

export default Sidebar;
