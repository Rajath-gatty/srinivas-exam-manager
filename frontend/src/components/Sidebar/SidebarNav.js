import {useState, useCallback} from "react";
import { NavLinks } from "../../util/NavLinks";
import Menu from "./Menu/Menu";

const SidebarNav = ({role}) => {
const [showMenu, setShowMenu] = useState([{text: 'Approval', state: false},{text: 'Users', state: false}]);

const setSubNavActive = (subNav) => {
    return subNav.isActive ? "navlink flex subActive active" : "navlink flex";
};

const setNavLinkActive = (navData) => {
    return navData.isActive ? "navlink flex active" : "navlink flex";
    };

const toggleDropdown = useCallback((evt) => {
    if(evt.target.textContent) {
        const itemIndex = showMenu.findIndex(txt => txt.text === evt.target.textContent);
        const anotherItemIndex  = showMenu.findIndex(txt => txt.text !== evt.target.textContent);
        setShowMenu(prevState => {
        const item = prevState.find(txt => txt.text === evt.target.textContent);
        const anotherItem = prevState.find(txt => txt.text !== evt.target.textContent);
        item.state = !item.state;
        if(anotherItem.state)
        anotherItem.state=!anotherItem.state;
        const newState = [...prevState];
        newState[itemIndex] = item;
        newState[anotherItemIndex] = anotherItem;
        return newState;
        });
    }
    },[showMenu]);
    console.log("Rendering SidebarNav....")
    return(
        <>
        {NavLinks.find((link) => link.role === role).links.map((link) => {
            return (
              <Menu 
              key={link.title} 
              link={link} 
              showMenu={showMenu}
              setSubNavActive={setSubNavActive}
              setNavLinkActive={setNavLinkActive}
              toggleDropdown={toggleDropdown}/>
            );
          })}
        </>
    )
}

export default SidebarNav;