import { useState,useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import "./FacultySubjects.css";
import {
  Checkbox, CircularProgress,
} from "@mui/material";
import { useContextData } from "../../../hooks/useContextData";
import axios from "axios";
import Filter from "../../UI/Filter/Filter";
import { useFetchCourses } from "../../../hooks/useFetchCourses";
import { toast } from "react-toastify";
import Back from "../../UI/Back/Back";

const FacultySubjects = () => {
  const [selectedSemester, setSelectedSemester] = useState(false);
  const [loading,setLoading] = useState(false);
  const [postLoading,setPostLoading] = useState(false);
  const [subjectLoading,setSubjectLoading] = useState(true);
  const [subjects,setSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState([]);
  const [course,setCourse] = useState(false);
  const [semFilter,setSemFilter] = useState([]);

  const {user} = useContextData();

  const deptId = user.deptId;
  const filterCourses = useFetchCourses(deptId);
  const location=useLocation();
  const navigate=useNavigate();
  const {facultyId} = useParams();

  const AddSubject = async(e,data) => {
    const CheckFlag = e.target.checked;

    if (CheckFlag) {
      if(selectedSubject.find(el=>el.subj_code===data.subj_code)) {
        return;
      }
      setSelectedSubject([...selectedSubject, data]);
    } else {
      try {
        const result = await axios.post(`/faculty/subjects/delete`,{data,facultyId});
        result.status === 200 &&
        toast.success(`${data.subj_name} Removed`, {
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          });
      } catch(err) {
        console.log(err);
        setLoading(false);
      }
      setSelectedSubject(selectedSubject.filter((e) => e.subj_code !== data.subj_code));
    }
  };

  useEffect(() => {
    const fetchSubjects = async() => {
      try {
        const data = {
          courseName:course,
          semester:selectedSemester
        }
        const result = await axios.get(`/faculty/current-subjects/${facultyId}`,data);
        setSelectedSubject(result.data);
        setSubjectLoading(false);
      } catch(err) {
        console.log(err);
        setSubjectLoading(false);
      }
    }
    fetchSubjects();
  },[course, selectedSemester, facultyId])

  const handleCourseChange = async(e) => {
    const courseName = e.target.value;
    setCourse(courseName);
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
      setLoading(true);
      const result = await axios.post('/faculty/subjects',data);
      setSubjects(result.data);
      setLoading(false);
    } catch(err) {
      console.log(err);
      setLoading(false);
    }
  }

  const handlePostSubject = async() => {
    const data = {
      facultyId:facultyId,
      subjects:selectedSubject
    }
    try {
      setPostLoading(true);
      await axios.post('/faculty/add-subjects',data);
      toast.success('Changes Saved!', {
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        });
      setPostLoading(false);
      navigate(-1);
    } catch(err) {
      console.log(err);
    }
}

  return (
    <div className="faculty-sub application-repeater flex">
    <Back top="0" left={"0em"}/>
      <div className="application-repeater-header">
          <h1 style={{color:'#333'}}>{location.state.name}</h1>
      </div>
      {!subjectLoading&&selectedSubject.length<=0&& <h3 className="subject-not-found">No teaching Subjects Found</h3>}
      {!subjectLoading ? (
        <div className="selected-subjects faculty-selected-Subjects">
                {!selectedSubject.length<=0&&<div className="faculty-current-sub-hdng">
                <h3>Current Teaching Subjects</h3>
      </div>}
          {selectedSubject.map((subject,i) => {
            return (
              <div key={i} className="faculty-selected-subject-list selected-subject-list">
                <span>{subject.subj_name}</span>
                <span>{subject.subj_code}</span>
              </div>
            );
          })}
          {!selectedSubject.length<=0&&<button onClick={handlePostSubject}className="faculty-application-submit">{!postLoading?'Save':<div className="flex"><CircularProgress size={20} color='inherit' thickness={4}/></div>}</button>}
        </div>
      ) : <div style={{marginTop:40,marginBottom:40}} className="flex"><CircularProgress thickness={4}/></div>}
            <div className="application-selector gap-2 flex add-subjects-container">
        <h2 style={{fontSize:'1.2em'}}>Add Subjects</h2>
        <div className="flex gap-2">
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

      <div className="application-form flex">
      {selectedSemester&&<><div className="application-semester">
        {selectedSemester ? 'SEM '+selectedSemester : "Select Semester"}
      </div>
        <div className="application-row header">
          <span>Subject Name</span>
          <span>Subject Code</span>
        </div></>}
        {!loading?subjects.map((sub => {
          const updatedSub = Object.assign(sub,{course_name:course,semester:selectedSemester});
          return ( 
          <div key={sub.subj_code} className="application-row">
          <div className="subject-checkbox">
            <Checkbox
            value={sub.sem_id}  
            defaultChecked={selectedSubject.find(item=>item.subj_code===sub.subj_code)&&true} onChange={(e) =>{AddSubject(e,updatedSub)}} 
            /> 
            <span>{sub.subj_name}</span>
          </div>
          <span>{sub.subj_code}</span>
        </div>
        )})):<div style={{marginTop:40,marginBottom:40}} className="flex"><CircularProgress thickness={4}/></div>}
      </div>
    </div>
  );
};

export default FacultySubjects;
