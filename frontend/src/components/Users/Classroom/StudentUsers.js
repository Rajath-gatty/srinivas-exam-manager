import "../TotalUsers.css";
import "./Classroom.css";
import {useState,useEffect} from 'react';
import { useLocation,Link } from "react-router-dom";
import UserList from "../UserList";
import {CircularProgress} from "@mui/material";
import axios from "axios";
import { FaSearch } from "react-icons/fa";
import { toast } from 'react-toastify';
import fileDownload from "js-file-download"
import Back from "../../UI/Back/Back";
import {VscFilePdf} from "react-icons/vsc";
import {IoSettingsOutline} from "react-icons/io5";

const StudentUsers = () => {
  const location = useLocation();
  const classInfo = location.state;
  const showEligible = true;

  var [loading, setLoading] = useState(false);
  var [users, setUsers] = useState([]);
  const [btnLoading,setBtnLoading] = useState(false);

  useEffect(() => {
      setLoading(true);
      const fetchUsers = async () => {
        var classId = classInfo.class_id;
        try {
          const result = await axios.post(`/users/student/`,{classId});
          setUsers(result.data);
          setLoading(false);
        } catch (error) {
          setLoading(false);
          console.log(error);
        }
      }
      fetchUsers();
  },[])

  const handleSearch = async(e) => {
    const query = e.target.value.toUpperCase();
    let cancelToken;
    if (typeof cancelToken != typeof undefined) {
      cancelToken.cancel("Operation canceled due to new request.");
    }
    const source = axios.CancelToken.source();
    cancelToken = source.token;
    try {
      setLoading(true);
      const result = await axios.post(`/users/student/search`,{query,classId:classInfo.class_id},{cancelToken:cancelToken});
      if(result.data.length>0) {
        setUsers(result.data);
      }
      setLoading(false);

      result.data.length===0 && toast.error("User Not Found!", {
        isLoading: false, 
        autoClose: 3000, 
        closeOnClick: true,
        draggable: true,
        toastId:'not-found'
      });
    } catch(err) {
      console.log('approve error',err);
      setLoading(false);
    }
  }

  const handleHallticket = async () =>{
    const {course_name:course,semester:sem,class_id} = location.state;
     try {
      setBtnLoading(true);
      const data = {
        courseName:course,
        semester:sem,
        classId:class_id
      }
      const result = await axios.post('staff/halltickets',data,{responseType:'blob'});
      setBtnLoading(false);
      if(result.status===201) {
         return toast.error('No timetable Found', {
          autoClose: 3000, 
        });
      }
      const blob = new Blob([result.data], { type: 'application/pdf' });
      const objectUrl = window.URL.createObjectURL(blob);
      const uid = (Math.random() + 1).toString(36).substring(2);
      fileDownload(result.data,`hallticket-${course}-SEM-${sem}-${uid}.pdf`);
      window.open(objectUrl);
      setBtnLoading(false);
    } catch(err) {
        console.log(err);
        setBtnLoading(false);
    }
  }

  const UpdateEligibility = async(index,value,regno) =>{
    const newState = [...users];
    console.log(index,value,regno);
    console.log(newState);
    newState[index].eligibility = value;
    setUsers([...newState]);
    try {
      const result = await axios.post('/staff/eligibility',{regno, eligibility:value});
      console.log(result.data);
  } catch(err) {
      console.log(err);
    }
  }

  return (
    <div className="users-main student-main">
      <Back top="-2em" left="0" />
      <div className="users-Filter flex">
        <div className="users-searchBar flex">
          <FaSearch color="var(--light-grey)" size={20} />
          <input type="text " placeholder="Enter Reg No." onBlur={(e) => e.target.placeholder = "Enter Reg No."} onChange={handleSearch} />
        </div>

        {showEligible &&<div className="users-HallticketBtn flex">
          {!btnLoading ? <div className="btn-outlined flex" onClick={handleHallticket}>
          <VscFilePdf color="currentColor" size={22}/>
            <span>Generate Hall Tickets</span>
          </div> 
          :
          <div className="users-btnLoader flex">
            <CircularProgress color="inherit" size={25}/>
          </div>}
        </div>}
          
        <div className="edit-container flex">
            <Link to="/classrooms/create" state={{edit:true,students:users.map(std=>std.regno),classInfo:classInfo}} className="classroom-edit-btn btn-outlined-green flex gap-sm">
            <span>Edit</span>
            <IoSettingsOutline size={20}/>
            </Link>
        </div>
      </div>

      <table className="users-table-wrapper">
        <thead className="thead">
          <tr className="classroom-student-select-header">
            <th>RegNo</th>
            <th>Name</th>
            <th>Course</th>
            <th>Batch</th>
            <th>Semester</th>
            {showEligible && <th>Details</th>}
            {showEligible && <th>Eligiblity</th>}
          </tr>
        </thead>
        {!loading&&<tbody>
          {users.map((obj,i) =>{ 
              return  <UserList 
              key={obj.regno}
              data={obj} 
              type="student"
              showEligible={showEligible}
              updateEligibility={UpdateEligibility}
              index={i}
              />
          })}
        </tbody>}
      </table>
      {loading&&<div style={{marginTop:60,marginBottom:60}} className="flex"><CircularProgress size={45}/></div>}
    </div>
  );
};

export default StudentUsers;