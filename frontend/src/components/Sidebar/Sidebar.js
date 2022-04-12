import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

import "./Sidebar.css";
import { SrinivasLogo, Avatar, Arrow, Logout } from "../../Assets";
import { NavLinks } from "../../util/NavLinks";
import { useContextData } from "../../hooks/useContextData";

const Sidebar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const { role } = useContextData();

  const setNavLinkActive = (navData) => {
    return navData.isActive ? "navlink flex active" : "navlink flex";
  };

  const setSubNavActive = (subNav) => {
    return subNav.isActive ? "navlink flex subActive" : "navlink flex";
  };

  // const toggleDropdown = () => setShowMenu(prevState => !prevState);
  const toggleDropdown = () => {
    const OtherActive = document.querySelector(".active");
    OtherActive && OtherActive.classList.remove("active");

    setShowMenu(!showMenu);
  };

  console.log(showMenu);
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
                {link?.subMenu ? (
                  <div className="multiLink flex">
                    <div
                      className={
                        showMenu
                          ? "dropdownLink flex aactive"
                          : "dropdownLink flex"
                      }
                      onClick={toggleDropdown}
                    >
                      <img src={link.icon} alt={link.title} width="20px" />
                      <span>{link.title}</span>
                      <img
                        className="dropdownArrow"
                        src={Arrow}
                        width="20px"
                        alt="arrow"
                      />
                    </div>
                    {showMenu && (
                      <div className="dropdown">
                        {link.subMenu.map((subLinks) => {
                          return (
                            <NavLink
                              key={subLinks.path}
                              to={subLinks.path}
                              className={(subNav) => setSubNavActive(subNav)}
                            >
                              <span>{subLinks.title}</span>
                            </NavLink>
                          );
                        })}
                      </div>
                    )}
                  </div>
                ) : (
                  <NavLink
                    to={link.path}
                    className={(navData) => setNavLinkActive(navData)}
                  >
                    <img src={link.icon} alt={link.title} width="20px" />
                    <span>{link.title}</span>
                  </NavLink>
                )}
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
