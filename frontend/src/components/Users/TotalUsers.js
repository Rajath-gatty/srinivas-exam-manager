import "./TotalUsers.css";
import { useEffect, useState } from "react";
import UserList from "./UserList";
import {FormControl,Select,InputLabel,MenuItem,CircularProgress} from "@mui/material";
import axios from "axios";
import {useContextData} from "../../hooks/useContextData";

const TotalUsers = ({type}) => {
  const [users, setUsers] = useState([]);
  const [filterCourses,setFilterCourses] = useState([]);
  const [loading,setLoading] = useState(false);
  const {user} = useContextData();

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
    const fetchUsers = async() => {
      try {
        const result = await axios.post(`/users/${type}`)
        setUsers(result.data);
        console.log("Data : ",result.data)
        !result && console.log("ERROR")
      } catch(err) {
        console.log(err);
      }
    }
    fetchUsers();
  },[])

  const handleCourseChange = async() => {
    try {
      setLoading(true);
      const result = await axios.post(`/users/${type}/course`,{deptId:user.deptId});
        console.log("Course Chng : ",result.data)
        setUsers(result.data);
      setLoading(false);
    } catch(err) {
      console.log('approve error',err);
      setLoading(false);
    }
  }

  return (
    <div className="users-main">
      <div className="users-Filter">
        <FormControl className="SelectInput">
          <InputLabel>Filter by Course</InputLabel>
          <Select
            label="Course"
            defaultValue=""
            size="small"
            onChange={handleCourseChange}
            fullWidth
          >
            {filterCourses.map((opt) => (
              <MenuItem key={opt.course_id} value={opt.course_name}>
                {opt.course_name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>

      <table className="users-table-wrapper">
        <thead className="thead">
          <tr>
            <th>Profile</th>
            <th>RegNo.</th>
            <th>Name</th>
            <th>Course</th>
            <th>Batch</th>
            <th>Semester</th>
            <th>Eligiblity</th>
          </tr>
        </thead>
        {!loading&&<tbody>
          {users.map(obj =>{
              return <UserList key={obj.regno} data={obj}/>
          })}
        </tbody>}
      </table>
      {loading&&<div style={{marginTop:80}} className="flex"><CircularProgress size={45}/></div>}
    </div>
  );
};

export default TotalUsers;
