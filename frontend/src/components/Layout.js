import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "./Sidebar/Sidebar";
import { useContextData } from "../hooks/useContextData";
import Login from "../pages/Login/Login";

const Layout = () => {
    const location = useLocation().pathname;
    const {token} = useContextData();

   return token?<div className="section">
        <Sidebar/>
        <Outlet/>
    </div>:<Login from={location}/>
}

export default Layout;