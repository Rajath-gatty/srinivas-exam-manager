import React from "react";
import { NavLink } from "react-router-dom";
import SubMenu from "./Submenu/Submenu";

const Menu = ({link, showMenu, setSubNavActive, setNavLinkActive, toggleDropdown}) => {
// console.log("rendering menu...");
return (
    <li>
            {link?.subMenu ? (
                <SubMenu 
                title={link.title} 
                icon={link.icon} 
                subMenu={link.subMenu} 
                showMenu={showMenu}
                toggleDropdown={toggleDropdown}
                setSubNavActive={setSubNavActive}
                />
              ) : (
                <NavLink
                  to={link.path}
                  className={(navData) => setNavLinkActive(navData)}>
                  <img src={link.icon} alt={link.title} width="20px" />
                  <span>{link.title}</span>
                </NavLink>
            )}
    </li>
)
}

export default Menu;