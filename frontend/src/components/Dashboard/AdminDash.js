import {useState, useEffect} from 'react';
import {useNavigate} from "react-router-dom";
import axios from "axios";
import { FaUserGraduate } from "react-icons/fa";
import { FaChalkboardTeacher } from "react-icons/fa";
import { FaUsers } from "react-icons/fa";
import CountUp from 'react-countup';

const AdminDash = () => {
  const [studentCount, setStudentCount] = useState(0);
  const [facultyCount, setFacultyCount] = useState(0);
  const [staffCount, setStaffCount] = useState(0);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const FetchUsersCount = async() => {
      try {
        const resStudent = await axios.post(`/users/student`)
        setStudentCount(resStudent.data.length);
        const resFaculty = await axios.post(`/users/faculty`)
        setFacultyCount(resFaculty.data.length); 
        const resStaff = await axios.post(`/users/staff`)
        setStaffCount(resStaff.data.length);

        setLoading(false);
      } catch(err) {
        console.log(err);
      }
    }
    FetchUsersCount();
  }, [])

  return (
    <div className="dashboard-stats">
      <div className="dashboard-statsItem" onClick={()=>navigate("/users/student")}>
        <FaUserGraduate size={50} />
        <div className="dashboard-statsInfo">
          <div className="dashboard-statsCount"><CountUp end={studentCount} /></div>
          <div className="dashboard-statsLabel">Students</div>
        </div>
      </div>

      <div className="dashboard-statsItem" onClick={()=>navigate("/users/faculty")}>
        <FaChalkboardTeacher size={50} />
        <div className="dashboard-statsInfo">
          <div className="dashboard-statsCount"><CountUp end={facultyCount} /></div>
          <div className="dashboard-statsLabel">Faculty</div>
        </div>
      </div>

      <div className="dashboard-statsItem" onClick={()=>navigate("/users/staff")}>
        <FaUsers size={50} />
        <div className="dashboard-statsInfo">
          <div className="dashboard-statsCount"><CountUp end={staffCount} /></div>
          <div className="dashboard-statsLabel">Staff</div>
        </div>
      </div>
    </div>
  )
}

export default AdminDash