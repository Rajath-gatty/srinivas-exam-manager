import { useRef, useEffect} from "react";
import { NavLink } from "react-router-dom";
import { ListItem, ListItemButton } from "@mui/material";
import SubMenu from "./Submenu/Submenu";

const Menu = ({link, showMenu, setSubNavActive, setNavLinkActive, toggleDropdown,onOpen, notify}) => {
  const notifyRef = useRef();

  useEffect(() => {
    let menuName = notifyRef.current?.childNodes[1].textContent;
    if(notify.staff){ 
      if(menuName==="Staff Approval") notifyRef.current.attributes["data-notify"].nodeValue = "active";
    }
  }, [notify]);

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
          notify={notify}
          />
        ) 
        : 
        (
        <ListItem disablePadding onClick={()=>onOpen(false)}>
          <ListItemButton >
            <NavLink
              to={link.path}
              className={(navData) => setNavLinkActive(navData)}
              style={{width:'100%',paddingTop:'15px',paddingBottom:'15px'}}
              ref={notifyRef}
              data-notify="inactive"
              onClick={()=>{notifyRef.current.attributes["data-notify"].nodeValue = "inactive";}}
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