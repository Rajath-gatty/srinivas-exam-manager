import { IoIosArrowForward } from "react-icons/io";
import { NavLink } from "react-router-dom";

const SubMenu = ({
  title,
  icon,
  subMenu,
  showMenu,
  toggleDropdown,
  setSubNavActive,
}) => {

  //Notify when Approval Request is Pending
  let contextNotif = true;//should get data from contextData
  const NotifyEle = document.querySelectorAll("[data-notify]");
  NotifyEle.forEach(itm=>{
    var spanEle = itm.getElementsByTagName('span')[0].textContent;
    if(contextNotif){
      if(spanEle==="Approval")
        itm.setAttribute("data-notify","active")
      else
        itm.setAttribute("data-notify","inactive")
    }
  })

  return (
    <div className="multiLink flex">
      <div
        className={
          showMenu.find((item) => item.text === title).state
            ? "dropdownLink flex active-arrow"
            : "dropdownLink flex"
        }
        data-notify="inactive"
        onClick={(evt) => toggleDropdown(evt)}
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
                <span>{subLinks.title}</span>
              </NavLink>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default SubMenu;
