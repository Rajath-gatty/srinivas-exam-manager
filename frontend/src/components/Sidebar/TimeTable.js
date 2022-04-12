import Sidebar from "./Sidebar";
import { useLocation } from "react-router-dom";

const TimeTable = () => {
  const location = useLocation();
  const { pathname } = location;
  return (
    <div className="section">
      <Sidebar />
      <h1>{pathname}</h1>
    </div>
  );
};

export default TimeTable;
