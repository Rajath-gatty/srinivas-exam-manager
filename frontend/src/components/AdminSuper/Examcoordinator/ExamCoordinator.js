import "./ExamCoordinator.css";
import { GoSettings } from "react-icons/go";
// import { FaSearch } from "react-icons/fa";
import { HiPlus } from "react-icons/hi";
import { Link } from "react-router-dom";
import { useState,useEffect } from "react";
import axios from "axios";
import {CircularProgress} from "@mui/material";
// import Skeleton from "../../UI/Skeleton/Skeleton";

const Examcoordinator = () => {
  const [coordinators,setCoordinators] = useState([]);
  const [loading,setLoading] = useState(false);

  useEffect(() => {
    const fetchCoordinator = async() => {
      try {
        setLoading(true);
        const result = await axios.get('admin/examcoordinators');
        setCoordinators(result.data);
        setLoading(false);
        console.log(result.data);
      } catch(err) {
        setLoading(false);
        console.log(err);
      }
    }
    fetchCoordinator();
  },[])
  return (
    <div className="departments-container">
      <div className="departments-header">
        <h1>Exam Coordinators</h1>

       <Link to="/examcoordinator/create">
        <button className="create-department flex">
            <HiPlus size={20} color="var(--primary-color) :hover{color:var(--white)}" />
            <span>Add Coordinator</span>
        </button>
       </Link>
      </div>

      {!loading?<table className="departments-list">
        <thead>
          <tr>
            <th>Coordinator Name</th>
            {/* <th>Coordinator ID</th> */}
            <th>Department</th>
            {/* <th>Department ID</th> */}
            <th></th>
          </tr>
        </thead>
        <tbody>
          {coordinators.map(item =>{
            return(
              <tr key={item.coord_id}>
                <td>{item.first_name}</td>
                {/* <td>{item.coordId}</td> */}
                <td>{item.dept_name}</td>
                {/* <td>{item.dptId}</td> */}
                <td>
                  <div className="manage-dpt flex">
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

export default Examcoordinator;