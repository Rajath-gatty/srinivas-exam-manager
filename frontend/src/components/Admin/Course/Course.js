import "./Course.css";
import { useEffect,useState } from "react";
import { Link } from "react-router-dom";
import { HiPlus } from "react-icons/hi";
import CourseList from "./CourseList";
import axios from "axios";
import { CircularProgress } from "@mui/material";

const Course = () => {
  const [courses,setCourses] = useState([]);
  const [loading,setLoading] = useState(true);

  useEffect(() => {
      const fetchCourses = async() => {
          try {
              setLoading(true);
              const result = await axios.get('/admin/courses');
              setLoading(false);
              setCourses(result.data);
          } catch(err) {
            setLoading(false);
              console.log(err);
          }
      }
      fetchCourses();
  },[])
  return (
    <div className="course-main">
      <div className="course-search-wrapper">
        <form>
          <input
            type="text"
            placeholder="Search course"
            className="course-search-input"
          />
        </form>
        <Link to="/courses/new-course">
          <button className="course-create-btn btn flex">
            <HiPlus size={20} />
            <span>Create</span>
          </button>
        </Link>
      </div>
      {!loading?<table className="course-list-table">
        <thead>
          <tr>
            <th>Course</th>
            <th>Duration</th>
            <th>Semesters</th>
            <th>Details</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {courses.map(course => {
            return <CourseList 
            key={Math.random()+Date.now()}
            name={course.course_name} 
            duration={course.course_duration} 
            totalSem={course.course_sem} 
            courseId={course.course_id}
            />
          })}
        </tbody>
      </table>: <div style={{marginTop:70}} className="flex"><CircularProgress thickness={4}/></div>}
    </div>
  );
};
export default Course;
/* <div style={{marginTop:150}} className="flex"><CircularProgress/></div> */