import "./Sidebar.css";
import { SrinivasLogo, Avatar } from "../../Assets";
import { BiLogOut } from "react-icons/bi";
import { IoIosArrowForward } from "react-icons/io";
import { useContextData } from "../../hooks/useContextData";
import SidebarNav from "./SidebarNav";
import { Link,useLocation } from "react-router-dom";
import {motion} from "framer-motion";
import { useState, useEffect } from "react";

const profAvatar = {
  stop: {
    x:0,
    scale:1,
    transition:{type:'Inertia'}
  },
  start: {
    x: 90,
    scale: 1.5,
    transition:{duration:0.2}
  },
}

const textSlide = {
 start:{x:70,opacity:0,transition:{duration:0.2}},
 stop:{x:0,opacity:1,transition:{type:'Inertia'}}
}

const Sidebar = () => {
  const [profAnimation,setProfAnimation] = useState(false);

  const { role } = useContextData();
  const location = useLocation();
  
  const handleprofileAnimation = () => {
    setProfAnimation(true);
  }

  useEffect(() => {
    if(location.pathname!=="/profile") {
      setProfAnimation(false);
    }
  },[location.pathname])

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <div className="logo flex">
          <img src={SrinivasLogo} width="25px" alt="logo" />
          <h1>Srinivas Exam Manager</h1>
        </div>

        <Link to="profile" className="user-profile flex" onClick={handleprofileAnimation}>
          <motion.div className="user-avatar flex" variants={profAvatar} animate={profAnimation?"start":"stop"}>
            <motion.img src={Avatar} width="40px" alt="avatar" />
          </motion.div>
          <motion.div variants={textSlide} animate={profAnimation?"start":"stop"} className="user-name">
            <h2>John Doe</h2>
            <h3>{role.charAt(0).toUpperCase() + role.slice(1)}</h3>
          </motion.div>
          <motion.div variants={textSlide} animate={profAnimation?"start":"stop"}>
            <IoIosArrowForward size={25} color="var(--white)" />
          </motion.div>
        </Link>
      </div>
      <div className="sidebar-nav flex">
        <ul>
          <SidebarNav role={role}/>
        </ul>
      </div>

      <div className="logout flex">
        <Link to="/" className="logout-btn flex">
          <BiLogOut size={20} />
          <span>Logout</span>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
