import {useState, useEffect} from "react";
import { useNavigate, Link } from "react-router-dom";
import "./SemesterMarks.css";
import { HiPlus } from "react-icons/hi";
import {CircularProgress} from "@mui/material";
import NoData from "../../UI/NoData/NoData";

const SemesterList = () => {
  const [loading, setLoading] = useState(true);
  const [semList, setSemList] = useState([]);
  const navigate = useNavigate();

  return (
    <div className="semesterList-container">
      <div className="semesterList-header flex">
        <h1>Semester Marks</h1>
        <Link to="./new" className="semesterList-create btn flex gap-sm">
          <HiPlus size={20} />
          <span>New</span>
        </Link>
      </div>

      {loading ? <table className="semesterList-table">
        <thead>
          <tr>
            <th>Course</th>
            <th>Semester</th>
            <th>Subject</th>
            <th>Created</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {semList.map(obj =>{
            return(
              <tr key={obj.id}>
                <td>{obj.course}</td>
                <td>{obj.semester}</td>
                <td>{obj.subject}</td>
                <td>{obj.created}</td>
                <td><Link to="#">View</Link></td>
              </tr>
            )
          })}
        </tbody>
      </table>
      : <div style={{marginTop:140}} className="flex"><CircularProgress thickness={4}/></div>}

      {!semList.length > 0 && <NoData text="No Records Found!" />}
    </div>
  )
}

export default SemesterList