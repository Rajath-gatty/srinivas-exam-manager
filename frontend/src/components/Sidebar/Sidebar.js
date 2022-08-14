import "./Sidebar.css";
import { SrinivasLogo, Avatar } from "../../Assets";
import { IoIosArrowForward } from "react-icons/io";
import { useContextData } from "../../hooks/useContextData";
import SidebarNav from "./SidebarNav";
import { Link, useLocation } from "react-router-dom";
import {motion} from "framer-motion";
import { useState, useEffect} from "react";
import { Drawer, List, SwipeableDrawer} from "@mui/material";
import { HiMenu } from "react-icons/hi";
import axios from "axios";

const profAvatar = {
  stop: {
    x:0,
    scale:1,
    transition:{type:'Inertia'}
  },
  start: {
    x: 90,
    scale: 1.3,
    transition:{duration:0.2}
  },
}

const textSlide = {
 start:{x:70,opacity:0,transition:{duration:0.2}},
 stop:{x:0,opacity:1,transition:{type:'Inertia'}}
}

const Sidebar = () => {
  const [profAnimation,setProfAnimation] = useState(false);
  const [open,setOpen] = useState(false);

  const { role, user,serverUrl } = useContextData();
  const location = useLocation();

  const [notify, setNotify] = useState([]);
  useEffect(() => {
    if(["admin","staff"].includes(role)) {
      const fetchNotify = async () => {
        try {
            const result = await axios.post("/sidebar/notify",{user:role});
            result.data.result.forEach(notify => {
              if(notify.count > 0){
                let newState = {};
                newState[notify.title] = true;
                setNotify(prevState => {
                  return {...prevState, ...newState}
                });
              }
            })
          } catch (error) {
            console.log(error);
          }
      }
      fetchNotify();
    }	  
  }, [role]);

  const handleprofileAnimation = () => {
    setProfAnimation(true);
    setOpen(false);
  }

  useEffect(() => {
    if(location.pathname!=="/profile") {
      setProfAnimation(false);
    }
  },[location.pathname])

  const drawer = (
    <>
    <div className="sidebar-header">
        <div className="logo flex">
          <img src={SrinivasLogo} width="25px" alt="logo" />
          <h1>Srinivas Exam Manager</h1>
        </div>

        <Link to="profile" className="user-profile flex" onClick={handleprofileAnimation}>
          {!user.imagePath?<motion.div className="user-avatar flex" variants={profAvatar} animate={profAnimation?"start":"stop"}>
            <motion.img src={Avatar} width="40px" alt="avatar" />
          </motion.div>:
          <motion.div className="user-avatar flex profile-pic-container" variants={profAvatar} animate={profAnimation?"start":"stop"}>
          <motion.img src={serverUrl+user.imagePath}  alt="avatar" className="profile-pic" />
          </motion.div>}
          <motion.div variants={textSlide} animate={profAnimation?"start":"stop"} className="user-name">
            <h2>{user.first_name+' '+user.last_name}</h2>
            <h3>{role.charAt(0).toUpperCase() + role.slice(1)}</h3>
          </motion.div>
          <motion.div variants={textSlide} animate={profAnimation?"start":"stop"}>
            <IoIosArrowForward size={25} color="var(--white)" />
          </motion.div>
        </Link>
      </div>
      <div className="sidebar-nav flex">
        <List>
          <SidebarNav role={role} onOpen={setOpen} notify={notify}/>
        </List>
      </div>
      </>
  );

  const styles = { 
    boxSizing: 'border-box',
    height:'100vh',
    overflowY:'auto',
    width:270,
    top:0,
    overflowX:'hidden',
    borderRight:'none',
    boxShadow:'1px 0px 10px rgba(0, 0, 0, 0.1)'}

  return (
    <div className="sidebar">
      <Drawer 
      open={open}
      anchor={"left"} 
      variant="permanent"
      className="sidebar-drawer" 
      onClose={() => setOpen(false)}
      sx={{
        display: { xs: 'none', sm: 'block' },
        '& .MuiDrawer-paper': styles
      }}
      >
      {drawer}
    </Drawer>

    {/* Ham Nav Icon */}
    {window.innerWidth<535 && <div className="ham-menu-icon">
      <HiMenu size={40} color="var(--text-color)" onClick={()=>setOpen(true)}/>
    </div>}

    <SwipeableDrawer 
      open={open} 
      onOpen={() => setOpen(true)} 
      anchor={"left"} 
      variant="temporary"
      className="sidebar-drawer" 
      onClose={() => setOpen(false)}
      sx={{
        display: { xs: 'block', sm: 'none' },
        '& .MuiDrawer-paper': styles
      }}
      >
      {drawer}
    </SwipeableDrawer>
    </div>
  );
};

export default Sidebar;
