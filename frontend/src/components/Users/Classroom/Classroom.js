import "./Classroom.css";
import { useEffect, useState } from "react";
import {Link} from "react-router-dom";
import { HiPlus } from "react-icons/hi";
import Filter from "../../UI/Filter/Filter";
import {useFetchCourses} from "../../../hooks/useFetchCourses";
import {useContextData} from "../../../hooks/useContextData";
import axios from "axios";

const Classroom = () => {
  const [classes, setClasses] = useState([]);
  const [semFilter,setSemFilter] = useState([]);
  const [sem,setSem] = useState("");
  const [course, setCourse] = useState("");
  const [loading,setLoading] = useState(false);
  const {user} = useContextData();
  const filterCourses = useFetchCourses(user.deptId);
  const count = [1,2,3,4,5,6,7,8];

  const fetchSemesters = async (courseName) => {
    try {
      const resp = await axios.post('/semesters',{courseName});
      const data = await resp?.data;
      const semData = new Array(data.course_sem).fill('');
      setSemFilter(semData);
    } catch (error) {
        console.log(error);
    }
  };

  const handleCourseChange = async(e) => {
    const courseValue = e.target.value;
    fetchSemesters(courseValue);
    setCourse(courseValue);
    try {
      setLoading(true);
      const result = await axios.post(`/users/student/`,{courseValue,semester:sem});
      setClasses(result.data);
      setLoading(false);
    } catch(err) {
      console.log('approve error',err);
      setLoading(false);
    }
  }

  const handleSemesterChange = async(e) =>{
    const semester = e.target.value;
    setSem(semester);
    try {
      setLoading(true);
      const result = await axios.post(`/users/student/semfilter`,{semester,courseName:course});
      setClasses(result.data);
      setLoading(false);
    } catch(err) {
      console.log('approve error',err);
      setLoading(false);
    }
  }

  return (
    <div className="Classroom-container">
      <div className="Classroom-header">
        <h1>Classrooms</h1>

        <div className="Classroom-filter flex">
          <Filter  
          data={filterCourses} 
          label="Filter By Course" 
          filter="course" 
          handleCourseChange={handleCourseChange}
          />
          
          <Filter 
          data={semFilter} 
          label="Filter By Semester" 
          filter="semester" 
          handleSemesterChange={handleSemesterChange}
          />

          <div className="btn-outlined">
              <HiPlus size={20} />
              <span>Create</span>
          </div>
        </div>
      </div>

      <div className="Classroom-cardList">
        {count.map(obj =>{
          return <Link to="./student" key={obj} className="Classroom-card">
            <div className="Card-Info flex">
              <div className="Card-Header">
                <h2>Class Name</h2>
                <h4 className="Card-Course">BCA</h4>
              </div>

              <p><span>Total Students: </span> 66</p>

              <div className="Card-Body">
                <p><span>Semester: </span> 3 SEM</p>
                <p><span>Batch: </span> 2019</p>
              </div>
            </div>
          </Link>
        })}
      </div>
    </div>
  )
}

export default Classroom