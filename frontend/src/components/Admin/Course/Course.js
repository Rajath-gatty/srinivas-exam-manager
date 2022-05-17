import "./Course.css";
import { Link } from "react-router-dom";
import { HiPlus } from "react-icons/hi";
import CourseList from "./CourseList";
import {motion} from "framer-motion";

const Course = () => {
  return (
    <motion.div 
    initial={{opacity:0,scale:0.9,transition:{duration: 2}}} 
    animate={{opacity:1,scale:1}}
    className="course-main">
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
      <table className="course-list-table">
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
          <CourseList />
          <CourseList />
          <CourseList />
          <CourseList />
          <CourseList />
          <CourseList />
          <CourseList />
          <CourseList />
        </tbody>
      </table>
    </motion.div>
  );
};

export default Course;
