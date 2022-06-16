import "./TotalUsers.css";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import UserList from "./UserList";
import {CircularProgress} from "@mui/material";
import axios from "axios";
import {useContextData} from "../../hooks/useContextData";
import Filter from "../UI/Filter/Filter";

const TotalUsers = ({type}) => {
  const [users, setUsers] = useState([]);
  const [filterCourses,setFilterCourses] = useState([]);
  const [loading,setLoading] = useState(false);
  const {user} = useContextData();
  const location = useLocation();

  useEffect(() => {
    const fetchCourses = async() => {
      try {
        const result = await axios.post('/courses',{deptId:user.deptId})
        setFilterCourses(result.data);
      } catch(err) {
        console.log(err)
      }
    }
    fetchCourses();
  },[user.deptId])

  useEffect(() => {
    setLoading(true);
    setUsers([]);

    const fetchUsers = async() => {
      try {
        const result = await axios.post(`/users/${type}`)
        setUsers(result.data);
        setLoading(false);
      } catch(err) {
        console.log(err);
      }
    }
    fetchUsers();
  },[location.pathname])

  const handleCourseChange = async(e) => {
    const courseName = e.target.value;
    try {
      setLoading(true);
      const result = await axios.post(`/users/${type}/`,{courseName});
        console.log("Course Chng : ",result.data)
        setUsers(result.data);
      setLoading(false);
    } catch(err) {
      console.log('approve error',err);
      setLoading(false);
    }
  }

  let showDOJ = true;
  if(type!=="student" || type !=="exam_coord") showDOJ = false;

  return (
    <div className="users-main">
      <div className="users-Filter">
        {/* <Filter 
        data={filterCourses} 
        label="Filter By Course" 
        filter="course" 
        handleCourseChange={handleCourseChange}/> */}
      </div>

      <table className="users-table-wrapper">
        <thead className="thead">
          <tr>
            <th>{type==="student" ? "RegNo" : type==="faculty" ? "Faculty ID" : type==="staff" ? "Staff ID" : "Coord ID"}</th>
            <th>Name</th>
            {type!=="student" && <th>Email</th>}
            {showDOJ && <th>DOJ</th>}
            {type==="student" && <th>Course</th>}
            {type==="student" && <th>Batch</th>}
            {type==="student" && <th>Semester</th>}
            <th>Details</th>
            <th>Eligiblity</th>
          </tr>
        </thead>
        {!loading&&<tbody>
          {users.map(obj =>{
              return <UserList key={Math.random()+Date.now()} data={obj} type={type}/>
          })}
        </tbody>}
      </table>
      {loading&&<div style={{marginTop:80}} className="flex"><CircularProgress size={45}/></div>}
    </div>
  );
};

export default TotalUsers;
