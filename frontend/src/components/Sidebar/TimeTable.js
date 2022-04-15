import { useLocation } from "react-router-dom";

const TimeTable = () => {
  const location = useLocation();
  const { pathname } = location;
  return <h1 className="content">{pathname}</h1>;
};

export default TimeTable;
