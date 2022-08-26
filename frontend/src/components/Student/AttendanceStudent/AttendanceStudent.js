import Filter from "../../UI/Filter/Filter";
import AttendanceStudentList from "./AttendanceStudentList";
import "./AttendanceStudent.css";
import axios from "axios";
import { useState } from "react";
import { CircularProgress } from "@mui/material";
import { useEffect } from "react";
import { useContextData } from "../../../hooks/useContextData";
import NoData from "../../UI/NoData/NoData";

const AttendanceStudent = () => {
const [MarkData,setMarkData] = useState([]);
const [loading,setLoading] = useState(true);
const [semFilter,setSemFilter] = useState([]);
const {user} = useContextData();
const [selectedSemester,setSelectedSemester] = useState(user.semester);

useEffect(() => {
  const fetchSemesters = async () => {
    try {
      const semData = new Array(user.semester).fill('');
      console.log(semData);
      setSemFilter(semData);
    } catch (error) {
        console.log(error);
    }
  }
  fetchSemesters();
  
  const fetchMarks = async() => {
    const data = {
      courseId:user.courseId,
      semester:selectedSemester,
      regno:user.id
    }
    try {
      const result = await axios.post('/student/internal/marks',data);
      setMarkData(result.data);
      setLoading(false);
    } catch(err) {
      console.log(err);
    }
  }
  fetchMarks();
},[selectedSemester, user])

const handleSemesterChange = (e) => {
  setSelectedSemester(e.target.value);
}

  return (
    <div className="attendance-filter">
      <Filter 
        data={semFilter} 
        label="Filter By Semester" 
        filter="semester" 
        handleSemesterChange={handleSemesterChange}
        />
      
      <div className="attendance-main-box">
        <div className="header">
          <h3>SEM {user.semester}</h3>
        </div>
        {!loading?<table className="marks-table">
          <thead className="thead">
            <tr>
              <th>Subject</th>
              <th>SubjectCode</th>
              <th>Marks</th>
              <th>Attendance</th>
            </tr>
          </thead>
          <tbody>
            {MarkData.map(item => {
              return <AttendanceStudentList
              key={item.id}
              item={item}
              />
            })}
          </tbody>
        </table>: <div style={{marginTop:50}} className="flex"><CircularProgress thickness={4}/></div>}

        {!loading && MarkData[0] === undefined ? <NoData text={"No Records Found"} /> : null}
      </div>
    </div>
  );
};

export default AttendanceStudent;
