import {useState, useEffect} from 'react';
import {useNavigate} from "react-router-dom";
import axios from "axios";
import { FaUserGraduate } from "react-icons/fa";
import { FaChalkboardTeacher } from "react-icons/fa";
import { FaUsers } from "react-icons/fa";
import CountUp from 'react-countup';
import { toast } from 'react-toastify';
import {useContextData} from '../../hooks/useContextData';

const AdminDash = () => {
  const [count,setCount] = useState(0);
  const { setRole, setToken, setUser } = useContextData();
  const navigate = useNavigate();

  useEffect(() => {
    const FetchUsersCount = async() => {
      try {
        const res = await axios.get(`/dashboard/users/count`);
        const result = res.data.reduce((acc,cur) => {
          return Object.assign(acc,acc[cur.user]=cur.count);
        },{})
        setCount(result);
      } catch(err) {
        //Unauthorized Access Error 401
        if(err?.response?.status === 401){
          toast.error("Session Expired!");
          localStorage.removeItem("user");
          setToken('');
          setRole('');
          setUser({});
          navigate('/login');
        }else {
          console.log(err);
        }
      }
    }
    FetchUsersCount();
  },[]) 

  return (
    <div className="dashboard-stats">
      <div className="dashboard-statsItem" onClick={()=>navigate("/classrooms")}>
        <FaUserGraduate size={50} />
        <div className="dashboard-statsInfo">
          <div className="dashboard-statsCount"><CountUp end={count.student} /></div>
          <div className="dashboard-statsLabel">Students</div>
        </div>
      </div>

      <div className="dashboard-statsItem" onClick={()=>navigate("/users/faculty")}>
        <FaChalkboardTeacher size={50} />
        <div className="dashboard-statsInfo">
          <div className="dashboard-statsCount"><CountUp end={count.faculty} /></div>
          <div className="dashboard-statsLabel">Faculty</div>
        </div>
      </div>

      <div className="dashboard-statsItem" onClick={()=>navigate("/users/staff")}>
        <FaUsers size={50} />
        <div className="dashboard-statsInfo">
          <div className="dashboard-statsCount"><CountUp end={count.staff} /></div>
          <div className="dashboard-statsLabel">Staff</div>
        </div>
      </div>
    </div>
  )
}

export default AdminDash;