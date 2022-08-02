import "./Classroom.css";
import { useEffect, useState } from "react";
import {Link} from "react-router-dom";
import { HiPlus } from "react-icons/hi";
import Filter from "../../UI/Filter/Filter";
import {useFetchCourses} from "../../../hooks/useFetchCourses";
import {useContextData} from "../../../hooks/useContextData";
import axios from "axios";
import {CircularProgress} from "@mui/material";
import NoData from "../../UI/NoData/NoData";

const Classroom = () => {
  const [classes, setClasses] = useState([]);
  const [semFilter,setSemFilter] = useState([]);
  const [sem,setSem] = useState("");
  const [course, setCourse] = useState("");
  const [loading,setLoading] = useState(false);
  const {user} = useContextData();
  const filterCourses = useFetchCourses(user.deptId);

  useEffect(() => {
    setLoading(true);
    const fetchClasses = async () => {
      try {
        const result = await axios.post(`/classroom`,{});
        setClasses(result.data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    }
    fetchClasses();
  },[]);

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
  }

  const handleSemesterChange = async(e) =>{
    const semester = e.target.value;
    setSem(semester);
  }

  const filteredClass = 
  course&&sem?
  classes.filter(obj => obj.course_name===course&&obj.semester===sem)
  :course
  ?classes.filter(obj => obj.course_name===course)
  :classes;
  
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

          {["admin","staff"].includes(user.role) && 
            <Link to="./create" className="btn-outlined">
              <HiPlus size={20} />
              <span>Create</span>
          </Link>}
        </div>
      </div>

      {!loading ? <div className="Classroom-cardList">
        {filteredClass.map(obj =>{
        // {tempClasses.map(obj =>{
          return <Link to="./student" state={obj} key={obj.class_id} className="Classroom-card">
            <div className="Card-Info flex">
              <div className="Card-Header" style={{background:obj.color}}>
                <h2 className="classroom-main-header">{obj.name}</h2>
                <div className="sub-header">
                  <h4 className="Card-Course">{obj.course_name}</h4>
                  <h4 className="Card-Course-sem">{obj.semester} SEM</h4>
                </div>
              </div>

              <div className="Card-Body">
            <p ><span>Total Students: </span>   {obj.total_students}</p>
                <p><span>Batch: </span>   {obj.batch}</p>
              </div>

            </div>
          </Link>
        })}
      </div>
      : <div style={{marginTop:200}} className="flex"><CircularProgress size={45}/></div>}
    {!loading&&filteredClass.length<=0&&<NoData text="No classrooms Found!"/>}
    </div>
  )
}

export default Classroom;