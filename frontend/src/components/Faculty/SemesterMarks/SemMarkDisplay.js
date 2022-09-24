import "./SemesterMarks.css"
import {useState, useEffect} from "react";
import { useParams,useLocation } from "react-router-dom";
import {CircularProgress} from "@mui/material";
import NoData from "../../UI/NoData/NoData";
import axios from "axios";
import Back from "../../UI/Back/Back";

const SemMarkDisplay = () => {
    const [loading,setLoading] = useState(true);
    const [stdMarks,setStdMarks] = useState([]);

    const params = useParams();
    const location = useLocation();

    useEffect(()=> {
        const fetchData = async () => {
            try {
              const res = await axios.post("faculty/classroom/studentsemmarks",{classroomId:params.id});
              setStdMarks(res.data);
              setLoading(false);
            } catch(err) {
              console.log(err);
              setLoading(false);
            }
          }
          fetchData();
    },[params.id])

  return (
    <div className="semesterList-container">
    <Back top="0" left="0"/>

    <div className="semMarkDisplay-subjInfo flex">
        <h1>{location.state.subj_name}</h1>
        <h2>{location.state.subj_code}</h2>
    </div>

    {!loading ? <table className="semesterList-table">
        <thead>
          <tr>
            <th>Reg No</th>
            <th>Name</th>
            <th>Marks</th>
          </tr>
        </thead>
        <tbody>
          {stdMarks.map(obj =>{
            return(
              <tr key={obj.id} className="semesterList-rows">
                <td>{obj.regno}</td>
                <td>{obj.first_name+' '+obj.last_name}</td>
                <td>{obj.marks}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
      : <div style={{marginTop:140}} className="flex"><CircularProgress thickness={4}/></div>}
      {!loading&&!stdMarks.length > 0 && <NoData text="No Records Found!" />}
      </div>
  )
}

export default SemMarkDisplay