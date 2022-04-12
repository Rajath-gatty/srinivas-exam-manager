import React, { useState } from "react";
import { NavLink } from "react-router-dom";

import "./Sidebar.css";
import { SrinivasLogo, Avatar, Arrow, Logout } from "../../Assets";
import { NavLinks } from "../../util/NavLinks";
import { useContextData } from "../../hooks/useContextData";

const Sidebar = () => {
  const [showMenu, setShowMenu] = useState([{text: 'Approval', state: false},{text: 'Users', state: false}]);
  
  const { role } = useContextData();

  const setNavLinkActive = (navData) => {
    return navData.isActive ? "navlink flex active" : "navlink flex";
  };

  const setSubNavActive = (subNav) => {
    return subNav.isActive ? "navlink flex subActive" : "navlink flex";
  };

  const toggleDropdown = (evt) => {
    if(evt.target.textContent) {
      const itemIndex = showMenu.findIndex(txt => txt.text === evt.target.textContent);
      const OtherActive = document.querySelector(".active");
      OtherActive && OtherActive.classList.remove("active");
      setShowMenu(prevState => {
      const item = prevState.find(txt => txt.text === evt.target.textContent);
      item.state = !item.state;
      const newState = [...prevState];
      newState[itemIndex] = item;
      return newState;
      });
    } 
    return;
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
            <img src={Avatar} width="40px" alt="avatar" />
          </div>

          <div className="user-name">
            <h2>John Doe</h2>
            <h3>{role.charAt(0).toUpperCase() + role.slice(1)}</h3>
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
                        showMenu.find(item => item.text === link.title).state
                          ? "dropdownLink flex aactive"
                          : "dropdownLink flex"
                      }
                      onClick={(evt) => toggleDropdown(evt)}
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
                    {showMenu.find(item => item.text === link.title).state && (
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
