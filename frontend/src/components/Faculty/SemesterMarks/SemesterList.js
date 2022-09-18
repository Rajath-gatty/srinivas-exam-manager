import {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import "./SemesterMarks.css";
import { HiPlus } from "react-icons/hi";
import {CircularProgress} from "@mui/material";
import NoData from "../../UI/NoData/NoData";
import axios from "axios";

const SemesterList = () => {
  const [loading, setLoading] = useState(true);
  const [semList, setSemList] = useState([]);
  // const navigate = useNavigate();

  useEffect(()=>{
    const fetchData = async () => {
      try {
        const res = await axios.post("faculty/classroom/semestermarks");
        setSemList(res.data);
        setLoading(false);
      } catch(err) {
        console.log(err);
        setLoading(false);
      }
    }
    fetchData();
  },[])
  
  return (
    <div className="semesterList-container">
      <div className="semesterList-header flex">
        <h1>Semester Marks</h1>
        <Link to="./new" className="semesterList-create btn flex gap-sm">
          <HiPlus size={20} />
          <span>New</span>
        </Link>
      </div>

      {!loading ? <table className="semesterList-table">
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
              <tr key={obj.id} className="semesterList-rows">
                <td>{obj.course_name}</td>
                <td>{obj.semester}</td>
                <td>{obj.subj_name}</td>
                <td>{obj.created_at}</td>
                <td><Link to={`/semester/marks/${obj.id}`} state={{subj_name:obj.subj_name,subj_code:obj.subj_code}}>View</Link></td>
              </tr>
            )
          })}
        </tbody>
      </table>
      : <div style={{marginTop:140}} className="flex"><CircularProgress thickness={4}/></div>}

      {!loading && !semList.length > 0 && <NoData text="No Records Found!" />}
    </div>
  )
}

export default SemesterList;