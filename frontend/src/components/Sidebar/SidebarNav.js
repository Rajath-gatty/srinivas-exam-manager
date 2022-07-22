import {useState, useCallback} from "react";
import { NavLinks } from "../../util/NavLinks";
import { useContextData } from "../../hooks/useContextData";
import Menu from "./Menu/Menu";

const SidebarNav = ({role,onOpen, notify}) => {
    const [showMenu, setShowMenu] = useState([{text: 'Approval', state: false},{text: 'Users', state: false},{text: 'Payments', state: false},{text: 'Indent', state: false},{text: 'Application', state: false},{text: 'Evaluation', state: false}]);
    const {token} = useContextData();

    const setSubNavActive = (subNav) => {
        return subNav.isActive ? "navlink flex subActive" : "navlink flex";
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

                if(anotherItem.state) anotherItem.state=!anotherItem.state;

                const newState = [...prevState];
                newState[itemIndex] = item;
                newState[anotherItemIndex] = anotherItem;
                return newState;
            });
        }
    },[showMenu]);

    return(
        <>
        {token && NavLinks.find((link) => link.role === role).links.map((link) => {
            return (
              <Menu 
              key={link.title} 
              link={link} 
              showMenu={showMenu}
              setSubNavActive={setSubNavActive}
              setNavLinkActive={setNavLinkActive}
              onOpen={onOpen}
              notify={notify}
              toggleDropdown={toggleDropdown}/>
            );
          })}
        </>
    )
}

export default SidebarNav;