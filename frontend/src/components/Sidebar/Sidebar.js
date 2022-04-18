import "./Sidebar.css";
import { SrinivasLogo, Avatar } from "../../Assets";
import {BiLogOut} from "react-icons/bi";
import {IoIosArrowForward} from "react-icons/io";
import { useContextData } from "../../hooks/useContextData";
import SidebarNav from "./SidebarNav";

const Sidebar = () => {
  const { role } = useContextData();
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
          <IoIosArrowForward size={25} color="var(--white)"/>
        </div>
      </div>

      <div className="sidebar-nav flex">
        <ul>
          <SidebarNav role={role} />
        </ul>
      </div>

      <div className="logout flex">
        <div className="logout-btn flex">
        <BiLogOut size={20}/>
          <span>Logout</span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
