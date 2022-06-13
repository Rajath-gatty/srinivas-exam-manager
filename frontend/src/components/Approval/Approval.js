import ApprovaList from './ApprovalList/ApprovalList';
import "./Approval.css";
import { useState,useEffect } from 'react';
import axios from 'axios';
import {FormControl,Select,InputLabel,MenuItem,CircularProgress} from "@mui/material";
import {useLocation} from "react-router-dom";

const Approval = ({type}) => {
  const [approveList,setApproveList] = useState([]);
  const [filterCourses,setFilterCourses] = useState([]);
  const [loading,setLoading] = useState(false);

  const location = useLocation();
  useEffect(() => {
   const fetchApproveList = async() => {
    try {
      setLoading(true);
      const result = await axios.post(`/staff/approvelist/${type}`,{deptId:11});
      setApproveList(result.data);
      setLoading(false);
    } catch(err) {
      console.log(err);
      setLoading(false);
    }
  }
  fetchApproveList();
  },[location.pathname,type])

  useEffect(() => {
    const fetchCourses = async() => {
      try {
        const result = await axios.post('/courses',{deptId:11})
        setFilterCourses(result.data);
      } catch(err) {
        console.log(err)
      }
    }
    fetchCourses();
  },[])

  const handleCourseChange = async(e) => {
    const courseName = e.target.value;
    try {
      setLoading(true);
      const result = await axios.post(`/staff/approvelist/${type}`,{courseName,deptId:11});
      setApproveList(result.data);
      setLoading(false);
    } catch(err) {
      console.log('approve error',err);
      setLoading(false);
    }
  }

  const handleApprove = async(id) => {
    try {
      setLoading(true);
      const result = await axios.post(`/staff/approve/${type}/${id}`);
      if(result.data.success) {
        setApproveList(state => {
          const newState = [...state];
          return newState.filter(item => {
            let userId=undefined;
            if(type==='student') {
               userId=item.regno;
            } else if(type==='faculty') {
               userId=item.faculty_id;
            } else {
               userId=item.staff_id;
            }
            return userId!==id
          })
        })
        setLoading(false);
      }
    } catch(err) {
      console.log('approve error',err);
      setLoading(false);
    }
  }

  const handleReject = async(id) => {
    try {
      setLoading(true);
      const result = await axios.post(`/staff/reject/${type}/${id}`);
      if(result.data.success) {
        setApproveList(state => {
          const newState = [...state];
          return newState.filter(item => {
            let userId=undefined;
            if(type==='student') {
               userId=item.regno;
            } else if(type==='faculty') {
               userId=item.faculty_id;
            } else {
               userId=item.staff_id;
            }
            return userId!==id
          })
        })
        setLoading(false);
      }
    } catch(err) {
      console.log('approve error',err);
      setLoading(false);
    }
  }

  return (
    <div className="approval-main content">
      <div className="approve-main-header">
      <h1 className="approve-list-header">{type.charAt(0).toUpperCase() + type.slice(1)} Approval</h1>
      {type==='student'&&<FormControl className="SelectInput">
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
              </FormControl>}
      </div>

      <table className="approve-list-wrapper">
        <thead className="thead">
        <tr>
          {type==='student'&&<th>Profile</th>}
          <th>Name</th>
          {type==='student'&&<th>RegNo</th>}
          <th>Course</th>
          {type==='student'&&<th>Batch</th>}
          <th>Details</th>
          <th>Approval</th>
        </tr>
        </thead>
        {!loading &&<tbody>
        {approveList.map(item => {
         return <ApprovaList 
         key={item.regno}
         courseName={item.course_name}
         name={item.first_name+' '+item.last_name}
         joiningYear={item.joining_year}
         regno={item.regno}
         type={type}
         facultyId={item.faculty_id}
         handleApprove={handleApprove}
         handleReject={handleReject}
         />
        }) }
        </tbody>}
      </table>
      {loading&&<td style={{marginTop:80}} className="flex"><CircularProgress size={45}/></td>}
    </div>
  )
}

export default Approval;
