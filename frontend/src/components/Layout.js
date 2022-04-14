import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar/Sidebar";

const Layout = () => {
   return <div className="section">
        <Sidebar/>
        <Outlet/>
    </div>
}

export default Layout;