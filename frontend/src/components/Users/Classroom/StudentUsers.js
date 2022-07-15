import "../TotalUsers.css";
import UserList from "../UserList";
import {CircularProgress} from "@mui/material";
import axios from "axios";
import { FaSearch } from "react-icons/fa";
import { toast } from 'react-toastify';
import Checkbox from "@mui/material/Checkbox";

const StudentUsers = ({hideEligible, showCheckbox,HandleSelectedUser,checkBoxValues,setCheckBoxValues,setUsers,setLoading,users,loading}) => {

  let showEligible = hideEligible?false:true;

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
      const result = await axios.post(`/users/student/search`,{query},{cancelToken:cancelToken});
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

  return (
    <div className="users-main">
      {<div className="users-Filter">
        <div className="users-searchBar flex">
          <FaSearch color="var(--light-grey)" size={20} />
          <input type="text " placeholder="Enter Reg No." onBlur={(e) => e.target.placeholder = "Enter Reg No."} onChange={handleSearch} />
          </div>
      </div>}

      <table className="users-table-wrapper">
        <thead className="thead">
          <tr className="classroom-student-select-header">
            {showCheckbox && <th> 
            <Checkbox onChange={(e)=>{
              setCheckBoxValues(prevState=>{
                const newState = [...prevState];
                const upState = newState.map(el=>e.target.checked)
                return upState;
              })
              HandleSelectedUser(e.target.checked,users);
              }}/>
            </th>}
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
              return <UserList 
              key={obj.regno} 
              data={obj} 
              type="student"
              showEligible={showEligible}
              showCheckbox={showCheckbox}
              checkBoxValue={checkBoxValues[i]}
              index={i}
              HandleSelectedUser={HandleSelectedUser}
              />
          })}
        </tbody>}
      </table>
      {loading&&<div style={{marginTop:60,marginBottom:60}} className="flex"><CircularProgress size={45}/></div>}
    </div>
  );
};

export default StudentUsers;