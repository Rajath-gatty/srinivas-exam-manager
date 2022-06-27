import "./AttendanceFaculty.css";
import AttendanceList from "./AttendanceList";
import { toast } from "react-toastify";
import Filter from "../../UI/Filter/Filter";
import { useFetchCourses } from "../../../hooks/useFetchCourses";
import { useContextData } from "../../../hooks/useContextData";
import { useState } from "react";
import axios from 'axios';
import { CircularProgress } from "@mui/material";
import NoData from "../../UI/NoData/NoData";

const AttendanceFaculty = () => {
  const [students,setStudents] = useState([]);
  const [loading,setLoading] = useState(false);
  const [semFilter,setSemFilter] = useState([]);
  const [course,setCourse] = useState(false);
  const [selectedSemester,setSelectedSemester] = useState(false);
  const [facultySubjects,setFacultySubjects] = useState([]);
  const [selectedSubject,setSelectedSubject] = useState(false);
  const [attendance,setAttendance] = useState([]);
  const [marks,setMarks] = useState([]);

  const {user,serverUrl} = useContextData();
  const filterCourses = useFetchCourses(user.deptId);

  const fetchFacultySubjects = async(sem) => {
      const data = {
        facultyId:user.id,
        courseName:course,
        semester:sem
      }
      try {
        const result = await toast.promise(
          axios.post("/faculty/teaching/subjects",data),
          {
            pending: 'Loading Subject...',
          }
      );
        console.log(result.data);
        setFacultySubjects(result.data);
      } catch(err) {
        console.log(err);
      }
    }

  const handleCourseChange = async(e) => {
    const courseName = e.target.value;
    setSemFilter([]);
    setFacultySubjects([]);
    setCourse(courseName);
    try {
      const result = await toast.promise(
        axios.post("/semesters",{courseName}),
        {
          pending: 'Loading Semesters...',
        }
    );
    console.log(result);
      // const result = await axios.post('',{courseName});
      const semData = new Array(result.data.course_sem).fill('');
      setSemFilter(semData);
    } catch (error) {
        console.log(error);
    }
  }

  const handleSemesterChange = async(e) => {
    setSelectedSemester(e.target.value);
    fetchFacultySubjects(e.target.value);
    setSelectedSubject([]);
  }

  const handleSubjectChange = async (e) => {
    setSelectedSubject(e.target.value);
    const data = {
      courseName:course,
      semester:selectedSemester
    }
    try {
      setLoading(true);
      const result = await axios.post("/users/student/semfilter",data);
      console.log(result.data);
      setStudents(result.data);
      setLoading(false);
    } catch(err) {
      console.log(err);
      setLoading(false);
    }
  }

 const handleAttendanceChange = (index,value) => {
    setAttendance(state => {
      const newState = {...state};
      if(state[index]) {
       return newState[index].attendance=value;
      } else {
        // return [...newState,]
      }
    })
  }

 const handleMarkChange = (index,value) => {

  }

  const HandleAttendanceSubmit = () =>{
    //Temp Logic pending
    toast.success("Attendance Updated Successfully!", {
      isLoading: false, 
      autoClose: 3000, 
      closeOnClick: true,
      draggable: true
    });
  }

  console.log("YOO",selectedSubject);
  return (
    <div className="faculty-attendance-main flex">
      <div className="faculty-attendance-Header flex">
        <div className="faculty-attendance-SubjTitile" style={{visibility:!selectedSubject.length>0?'hidden':'visible'}}>
          <h4>Code : <span>{facultySubjects.map(obj=>{
            if(obj.subj_name === selectedSubject)
              return obj.subj_code;
          })}</span></h4>
          <h4>Subject : <span>{selectedSubject}</span></h4>
        </div>

        <div className="faculty-attendance-Filters flex">
          <Filter
          filter="course"
          label="Select Course"
          data={filterCourses}
          handleCourseChange={handleCourseChange}
          />
          <Filter
          filter="semester"
          label="Select Semester"
          data={semFilter}
          handleSemesterChange={handleSemesterChange}
          />
          <Filter
          filter="subject"
          label="Select Subject"
          data={facultySubjects}
          handleSubjectChange={handleSubjectChange}
          />
        </div>
      </div>

      <table className="faculty-attendance-table-wrapper">
        <thead className="thead">
          <tr>
            <th>Profile</th>
            <th>RegNo.</th>
            <th>Name</th>
            <th>Semester</th>
            <th>Attendance</th>
            <th>Internal Marks</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student,i)=> {
            return <AttendanceList 
            key={student.regno} 
            data={student} 
            index={i}
            serverUrl={serverUrl}
            handleAttendanceChange={handleAttendanceChange}
            handleMarkChange={handleMarkChange}
            />
          })}
        </tbody>
      </table>
      {!students.length>0&&<NoData text="No Students Found!"/>}
        {loading&&<div style={{marginTop:40,marginBottom:40}} className="flex"><CircularProgress thickness={4}/></div>}
      {selectedSubject.length>0&&students.length>0&&
        <div className="faculty-attendance-submit">
          <button onClick={HandleAttendanceSubmit}>Submit</button>
        </div>}
    </div>
  );
};

export default AttendanceFaculty;
