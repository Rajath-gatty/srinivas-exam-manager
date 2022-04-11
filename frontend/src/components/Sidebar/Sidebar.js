import React from "react";
import { NavLink } from "react-router-dom";

import "./Sidebar.css";
import { SrinivasLogo, Avatar, Arrow, Logout } from "../../Assets";
import { NavLinks } from "../../util/NavLinks";
import { useContextData } from "../../hooks/useContextData";

const Sidebar = () => {
  const { role } = useContextData();

  const setNavLinkActive = (navData) => {
    return navData.isActive ? "navlink flex active" : "navlink flex";
  };

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <div className="logo flex">
          <img src={SrinivasLogo} width="25px" alt="logo" />
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
          {NavLinks.find((link) => link.role === role).links.map((link) => {
            return (
              <li key={link.title}>
                <NavLink
                  to={link.path}
                  className={(navData) => setNavLinkActive(navData)}
                >
                  <img src={link.icon} alt={link.title} width="20px" />
                  <span>{link.title}</span>
                </NavLink>
              </li>
            );
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
