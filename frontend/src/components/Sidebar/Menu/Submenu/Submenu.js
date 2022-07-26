import { NavLink } from "react-router-dom";
import { useEffect, useRef} from "react";
import { IoIosArrowForward } from "react-icons/io";

const SubMenu = ({title,icon,subMenu,showMenu,toggleDropdown,setSubNavActive,onOpen,notify}) => {
  const notifyRef = useRef();

  useEffect(() => {
    let menuName = notifyRef.current.childNodes[1].textContent;
    
    if(notify.student || notify.faculty){
      if(menuName==="Approval") notifyRef.current.attributes["data-notify"].nodeValue = "active-drop";
    }

    if(notify.payment){
      if(menuName==="Payments") notifyRef.current.attributes["data-notify"].nodeValue = "active-drop";
    }
  }, [notify]);



  return (
    <div className="multiLink flex">
      <div
        className={
          showMenu.find((item) => item.text === title).state
            ? "dropdownLink flex active-arrow"
            : "dropdownLink flex"
        }
        ref={notifyRef}
        data-notify="inactive"
        onClick={(evt) => {
          toggleDropdown(evt); 
          notifyRef.current.attributes["data-notify"].nodeValue = "inactive";
          }}
      >
        <img src={icon} alt={title} width="20px" />
        <span>{title}</span>
        <IoIosArrowForward size={18} className="sidebar-arrow" />
      </div>
      {showMenu.find((item) => item.text === title).state && (
        <div className="dropdown">
          {subMenu.map((subLinks) => {
            return (
              <NavLink
                key={subLinks.path}
                to={subLinks.path}
                className={(subNav) => setSubNavActive(subNav)}
              >
                <span onClick={()=>onOpen(false)}>{subLinks.title}</span>
              </NavLink>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default SubMenu;
