import {useState} from "react";
import { NavLink } from "react-router-dom";
import SubMenu from "./Submenu/Submenu";

const Menu = ({link}) => {
    const [showMenu, setShowMenu] = useState([{text: 'Approval', state: false},{text: 'Users', state: false}]);

    const setNavLinkActive = (navData) => {
        return navData.isActive ? "navlink flex active" : "navlink flex";
      };

    const toggleDropdown = (evt) => {
      if(evt.target.textContent) {
        const itemIndex = showMenu.findIndex(txt => txt.text === evt.target.textContent);
        const anotherItemIndex  = showMenu.findIndex(txt => txt.text !== evt.target.textContent);
        setShowMenu(prevState => {
        const item = prevState.find(txt => txt.text === evt.target.textContent);
        const anotherItem = prevState.find(txt => txt.text !== evt.target.textContent);
        console.log(anotherItem);
        item.state = !item.state;
        if(anotherItem.state)
        anotherItem.state=!anotherItem.state;
        const newState = [...prevState];
        newState[itemIndex] = item;
        newState[anotherItemIndex] = anotherItem;
        return newState;
        });
      }
    };

return (
    <li>
            {link?.subMenu ? (
                <SubMenu 
                title={link.title} 
                icon={link.icon} 
                subMenu={link.subMenu} 
                showMenu={showMenu}
                toggleDropdown={toggleDropdown}
                />
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
)
}

export default Menu;