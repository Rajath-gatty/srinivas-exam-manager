import {useState, useEffect} from "react";
import { useNavigate, Link } from "react-router-dom";
import "./SemesterMarks.css";
import { HiPlus } from "react-icons/hi";
import {CircularProgress} from "@mui/material";
import {NoDataSvg} from "../../../Assets";

const SemesterList = () => {
  const [loading, setLoading] = useState(true);
  const [semList, setSemList] = useState([]);
  const navigate = useNavigate();

  return (
    <div className="semesterList-container">
      <div className="semesterList-header flex">
        <h1>Semester Marks</h1>
        <div className="semesterList-create btn flex gap-sm" onClick={()=>navigate("/semester")}>
          <HiPlus size={20} />
          <span>New</span>
        </div>
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
      
      {!loading && semList.length === 0 && <div className="flex">
      <img src={NoDataSvg} alt="No Data Found" />
        <h2>No Semester Marks Found</h2>
      </div>}
    </div>
  )
}

export default SemesterList