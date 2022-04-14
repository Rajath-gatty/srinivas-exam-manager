import { Arrow } from "../../../../Assets";
import { NavLink } from "react-router-dom";

const SubMenu = ({title, icon, subMenu, showMenu, toggleDropdown, setSubNavActive}) => {
  console.log("rendering Submenu...");
    return(
                <div className="multiLink flex">
                    <div
                      className={
                        showMenu.find(item => item.text === title).state
                          ? "dropdownLink flex active-arrow"
                          : "dropdownLink flex"
                      }
                      onClick={(evt) => toggleDropdown(evt)}
                    >
                      <img src={icon} alt={title} width="20px" />
                      <span>{title}</span>
                      <img
                        className="dropdownArrow"
                        src={Arrow}
                        width="20px"
                        alt="arrow"
                      />                          
                    </div>
                    {showMenu.find(item => item.text === title).state && (
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
}

export default SubMenu;