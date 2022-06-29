import "./Departments.css";
import { GoSettings } from "react-icons/go";
import { FaSearch } from "react-icons/fa";
import { HiPlus } from "react-icons/hi";
import { Link } from "react-router-dom";
import {useState,useEffect} from "react";
import axios from "axios";
import { CircularProgress } from "@mui/material";
// import Skeleton from "../../UI/Skeleton/Skeleton";

const Departments = () => {
  const [departments,setDepartments] = useState([]);
  const [loading,setLoading] = useState(false);

  useEffect(() => {
   const fetchDepartments = async() => {
      try {
        setLoading(true);
        const result = await axios.get('/admin/departments');
        setDepartments(result.data);
        setLoading(false);
      } catch(err) {
        console.log(err);
        setLoading(false);
      }
   }
   fetchDepartments();
  },[])
  return (
    <div className="departments-container">
      <div className="departments-header">
        <form className="departments-form flex">
          <FaSearch color="var(--light-grey)" size={20} />
          <input type="text" placeholder="Search" />
        </form>

       <Link to="/departments/create">
        <button className="create-department flex">
            <HiPlus size={20} color="var(--primary-color) :hover{color:var(--white)}" />
            <span>Create Department</span>
        </button>
       </Link>
      </div>

      {!loading?<table className="departments-list">
        <thead>
          <tr>
            <th>Department ID</th>
            <th>Department</th>
            <th>Admin</th>
            {/* <th>Registration Date</th> */}
            <th></th>
          </tr>
        </thead>
        <tbody>
          {departments.map(item =>{
            return(
              <tr key={item.dept_id}>
                <td>{item.dept_id}</td>
                <td>{item.dept_name}</td>
                <td>{item.first_name}</td>
                {/* <td>{item.dptReg}</td> */}
                <td>
                  <div className="manage-dpt flex" style={{visibility:'hidden'}}>
                    <GoSettings color="var(--primary-color)" size={20} />
                    <span>Manage</span>
                  </div>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>:<div style={{marginTop:50}} className="flex"><CircularProgress thickness={4}/></div>}
    </div>
  )
}

export default Departments;