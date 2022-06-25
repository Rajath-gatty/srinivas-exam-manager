import { useState,useEffect } from "react";
import {
  Checkbox,
} from "@mui/material";
import { useContextData } from "../../../hooks/useContextData";
import axios from "axios";
import Filter from "../../UI/Filter/Filter";
import { useFetchCourses } from "../../../hooks/useFetchCourses";

const FacultySubjects = () => {
  const [selectedSemester, setSelectedSemester] = useState(1);
  const [loading,setLoading] = useState(true);
  const [subjects,setSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState([]);
  const [course,setCourse] = useState('');
  const [semFilter,setSemFilter] = useState([]);

  const {user} = useContextData();

  const deptId = user.deptId;
  const filterCourses = useFetchCourses(deptId);


  const AddSubject = (e,data) => {
    const CheckFlag = e.target.checked;
    if (CheckFlag) {
      if(selectedSubject.find(el=>el.sem_id===data.sem_id)) {
        return;
      }
      setSelectedSubject([...selectedSubject, data]);
    } else {
      setSelectedSubject(selectedSubject.filter((e) => e.sem_id !== data.sem_id));
    }
  };

  useEffect(() => {
    const fetchSubjects = async() => {
      try {
        const data = {
          courseName:course,
          semester:selectedSemester
        }
        const result = await axios.post('/staff/faculty/subjects',data);
        setSubjects(result.data);
        setLoading(false);
      } catch(err) {
        console.log(err);
        setLoading(false);
      }
    }
    fetchSubjects();
  },[selectedSemester])

  const handleCourseChange = async(e) => {
    const courseName = e.target.value;
    try {
      const result = await axios.post('/semesters',{courseName});
      const semData = new Array(result.data.course_sem).fill('');
      setSemFilter(semData);
    } catch (error) {
        console.log(error);
    }
  }

  const handleSemesterChange = async(e) => {
    setSelectedSemester(e.target.value);
    const data = {
      courseName:course,
      semester:e.target.value
    }
    try {
      const result = await axios.post('/student/application/subjects',data);
      console.log(result);
    } catch(err) {
      console.log(err);
    }
  }

//   const handleRepeaterSubmit = async(e) => {
//     return;
// }

  return (
    <div className="application-repeater flex">
      <div className="application-repeater-header">
      <div className="application-selector gap-2 flex">
        <Filter
            data={filterCourses} 
            filter="course" 
            label="Choose Course"
            handleCourseChange={handleCourseChange}
        />
        <Filter
            data={semFilter} 
            filter="semester" 
            label="Choose Semester"
            handleSemesterChange={handleSemesterChange}
        />
      </div>
      </div>
      <div className="application-semester">
        {/* {selectedSemester ? 'SEM '+selectedSemester : "Select Semester"} */}
      </div>

      <div className="application-form flex">
        <div className="application-row header">
          <span>Subject Name</span>
          <span>Subject Code</span>
        </div>
        {/* {subjects.map((sub => {
          return <div key={sub.subj_code} className="application-row">
          <div className="subject-checkbox">
            <Checkbox value={sub.sem_id} onChange={(e) =>{AddSubject(e,sub)}} /> <span>{sub.subj_name}</span>
          </div>
          <span>{sub.subj_code}</span>
        </div>
        }))} */}
      </div>

      {/* {selectedSubject.length !== 0 ? ( */}
        <div className="selected-subjects">
          {/* {selectedSubject.map((subject) => {
            return (
              <div key={subject.sem_id} className="selected-subject-list">
                <span>{subject.subj_name}</span>
              </div>
            );
          })} */}
           <button className="application-submit">Save</button>
        </div>
      {/* ) : null} */}
    </div>
  );
};

export default FacultySubjects;
