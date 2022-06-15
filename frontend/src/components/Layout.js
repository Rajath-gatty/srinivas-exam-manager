import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar/Sidebar";
import { useContextData } from "../hooks/useContextData";
const Layout = () => {
    const {token} = useContextData();
   return <div className="section">
        {token && <Sidebar/>}
        <Outlet/>
    </div>
}

export default Layout;