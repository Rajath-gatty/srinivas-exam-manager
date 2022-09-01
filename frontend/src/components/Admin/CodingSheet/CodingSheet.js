import "./CodingSheet.css";
import { toast } from "react-toastify";
import Filter from "../../UI/Filter/Filter";
import { useFetchCourses } from "../../../hooks/useFetchCourses";
import { useContextData } from "../../../hooks/useContextData";
import { useState } from "react";
import axios from 'axios';
import { CircularProgress,FormControl,InputLabel,MenuItem,Select } from "@mui/material";
import NoData from "../../UI/NoData/NoData";
import CodingSheetList from "./CodingSheetList";
import { FiCheck } from "react-icons/fi";

const SemesterMarks = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [classroomFilter, setClassroomFilter] = useState([]);
  const [course, setCourse] = useState(false);
  const [selectedClassroom, setSelectedClassroom] = useState(false);
  const [facultySubjects, setFacultySubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState(false);
  const [markAttendance, setMarkAttendance] = useState([]);

  const { user,serverUrl } = useContextData();
  const filterCourses = useFetchCourses(user.deptId);

  const fetchSubjects = async (className) => {
    const data = {
      courseName: course,
      className:className
    }
    try {
      const result = await toast.promise(
        axios.post("/admin/subjects", data),
        {
          pending: 'Loading Subject...',
        }
      );
      console.log(result.data);
      setFacultySubjects(result.data);
    } catch (err) {
      console.log(err);
    }
  }

  const handleCourseChange = async (e) => {
    const courseName = e.target.value;
    setClassroomFilter([]);
    setFacultySubjects([]);
    setCourse(courseName);
    try {
      const result = await toast.promise(
        axios.post("/classroom", { courseName }),
        {
          pending: 'Loading Classroom...',
        }
      );
      console.log(result);
      setClassroomFilter(result.data);
      setStudents([]);
    } catch (error) {
      console.log(error);
    }
  }

  const handleClassroomChange = async (e) => {
    setSelectedClassroom(e.target.value);
    fetchSubjects(e.target.value);
    setSelectedSubject([]);
    setStudents([]);
    setFacultySubjects([]);
}

  const handleSubjectChange = async (e) => {
    setSelectedSubject(e.target.value);
    setStudents([]);
    const data = {
      courseName: course,
      className: selectedClassroom,
      subjectName: e.target.value,
      getCodingSheet: true
    }

    try {
      setLoading(true);
      const result = await axios.post("/users/student/semfilter", data);
      console.log(result.data);
      setStudents(result.data);
      const updatedResult = result.data.map(item => {
        return {
          regno: item.regno,
          coding: ''
        }
      })
      setMarkAttendance(updatedResult);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  }

  const handleMarkChange = (index, value) => {
    setMarkAttendance(state => {
      const newState = [...state];
      newState[index].coding = value;
      return [...newState];
    })
  }

  const HandleAttendanceSubmit = async () => {
    let flag=0;
    markAttendance.forEach(sub => {
      if(sub.coding==='') {
        return flag=1;
      }
      return flag;
    })

    if(flag===1) {
      return toast.error('Fill all the Fields',{
        autoClose:true,
        toastId:'Internal-marks'
      })
    }
    try {
      const data = {
        courseName: course,
        classroomName: selectedClassroom,
        subjectName: selectedSubject,
        subjectCode: facultySubjects.map(obj => {
          if (obj.subj_name === selectedSubject) {
            console.log(obj.subj_code);
            return obj.subj_code;
          }
        }).filter(item => item !== undefined)[0],
        studentDetails: markAttendance
      }
      const result = await toast.promise(
        axios.post("/admin/codingsheet", data),
        {
          pending: 'Loading ...',
          success: 'Added Successfully!',
          error: 'Something went wrong!'
        }
      );
      setMarkAttendance([]);
      console.log(result);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="codingSheet-attendance-main flex">
      <div className="codingSheet-attendance-Header flex">
        <div className="codingSheet-attendance-SubjTitile" style={{ visibility: !selectedSubject.length > 0 ? 'hidden' : 'visible' }}>
          <h4>Code : <span>{facultySubjects.map(obj => {
            if (obj.subj_name === selectedSubject)
              return obj.subj_code;
          })}</span></h4>
          <h4>Subject : <span>{selectedSubject}</span></h4>
        </div>

        <div className="codingSheet-attendance-Filters flex">
          <Filter
            filter="course"
            label="Select Course"
            data={filterCourses}
            handleCourseChange={handleCourseChange}
          />
            <FormControl style={{width:"12em", top:"-0.1em"}} className="filterSearch-SelectInput">
              <InputLabel>Filter by Classroom</InputLabel>
              <Select
                label="Classroom"
                placeholder="Filter by Classroom" 
                defaultValue=""
                size="small"
                type="text"
                required
                fullWidth
                onChange={handleClassroomChange}
              >
                {classroomFilter.map((opt) => (
                  <MenuItem key={opt.name} value={opt.name}>
                    {opt.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          <Filter
            filter="subject"
            label="Select Subject"
            data={facultySubjects}
            handleSubjectChange={handleSubjectChange}
          />
        </div>
      </div>

      <table className="codingSheet-attendance-table-wrapper">
        <thead className="thead">
          <tr>
            <th>Profile</th>
            <th>RegNo.</th>
            <th>Name</th>
            <th>Semester</th>
            <th>Coding Sheet No.</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student, i) => {
            return <CodingSheetList
              key={student.regno}
              data={student}
              index={i}
              serverUrl={serverUrl}
              markAttendance={markAttendance}
              handleMarkChange={handleMarkChange}
              selectedSubject={selectedSubject}
            />
          })}
        </tbody>
      </table>
      {!students.length > 0 && <NoData text="No Students Found!" />}
      {loading && <div style={{ marginTop: 40, marginBottom: 40 }} className="flex"><CircularProgress thickness={4} /></div>}
      {selectedSubject.length > 0 && students.length > 0 &&
        <div className="codingSheet-attendance-submit">
          <div className="btn flex gap-sm" onClick={HandleAttendanceSubmit}>
            <FiCheck size={20} color="inherit" />
            <span>Submit</span>
          </div>
        </div>}
    </div>
  );
};

export default SemesterMarks;