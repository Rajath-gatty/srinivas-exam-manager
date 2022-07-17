import { ListItem, ListItemButton, ListItemIcon } from "@mui/material";
import React from "react";
import { NavLink } from "react-router-dom";
import SubMenu from "./Submenu/Submenu";

const Menu = ({link, showMenu, setSubNavActive, setNavLinkActive, toggleDropdown,onOpen}) => {
return ( 
  <>
            {link?.subMenu ? (
                <SubMenu 
                title={link.title} 
                icon={link.icon} 
                subMenu={link.subMenu} 
                showMenu={showMenu}
                toggleDropdown={toggleDropdown}
                setSubNavActive={setSubNavActive}
                onOpen={onOpen}
                />
              ) : (
                <ListItem disablePadding onClick={()=>onOpen(false)}>
                <ListItemButton >
                <NavLink
                  to={link.path}
                  className={(navData) => setNavLinkActive(navData)}
                  style={{width:'100%',paddingTop:'15px',paddingBottom:'15px'}}
                  >
                  <img src={link.icon} alt={link.title} width="17px" />
                  <span>{link.title}</span>
                </NavLink>
            </ListItemButton>
            </ListItem>
            )}
            </>
)
}

export default Menu;