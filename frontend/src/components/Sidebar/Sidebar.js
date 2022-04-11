import React from "react";
import { NavLink } from "react-router-dom";

import "./Sidebar.css";
import {SrinivasLogo,Avatar,Arrow,Logout} from "../../Assets";
import {NavLinks} from "../../util/NavLinks";
import {useContextData} from "../../hooks/useContextData";


const Sidebar = () => {
  const {role} = useContextData();

   const setNavLinkActive = (navData) => {
       return navData.isActive? "navlink flex active":"navlink flex";
   }
//   const location = useLocation();
//   useEffect(() => {
//     const Dashboard = document.getElementById("dashboard");
//     const Registration = document.getElementById("register");
//     const Create = document.getElementById("create");
//     const Users = document.getElementById("users");

    //Remove Previous Active Nav
    // const links = document.querySelectorAll(".navlink");
    // console.log(path);
    // links.forEach((nav) => {
    //   if (nav.classList.contains("active")) {
    //     nav.classList.remove("active");
    //   }
    // });

    // var path = location.pathname; // get current url pathname

    //Change active nav acc to current pathname
//     switch (path) {
//       case "/dashboard": {
//         Dashboard.classList.add("active");
//         break;
//       }
//       case "/register": {
//         Registration.classList.add("active");
//         break;
//       }
//       case "/create": {
//         Create.classList.add("active");
//         break;
//       }
//       case "/users": {
//         Users.classList.add("active");
//         break;
//       }
//     }
//   }, [location]);

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <div className="logo flex">
          <img src={SrinivasLogo} width="30px" alt="logo" />
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
          {/* <li>
            <NavLink to="/dashboard" className={navData =>setNavLinkActive(navData)}>
              <img src={Dashboard} alt="Dash" width="20px" />
              <span>Dashboard</span>
            </NavLink>
          </li> */}
          {NavLinks.find(link => link.role===role).links.map(link => {
            return <li key={link.title}>
             <NavLink to={link.path} className={navData =>setNavLinkActive(navData)}>
               <img src={link.icon} alt={link.title} width="20px" />
               <span>{link.title}</span>
             </NavLink>
           </li>
          })}
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
