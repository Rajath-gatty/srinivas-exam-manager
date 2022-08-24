import { Link } from "react-router-dom";
import StudentSvg from "../../Assets/Registration/student_reg.svg";
import FacultySvg from "../../Assets/Registration/faculty_reg.svg";
import StaffSvg from "../../Assets/Registration/staff_reg.svg";
import Navbar from "../../components/Navbar/Navbar";

const Registration = () => {
  return (
    <>
      <Navbar to="/login" />
      
      <div className="registration-container">
        <h1>User Registration</h1>
        <div className="registration-wrapper">
          <Link to="student">
            <div className="registration-card">
              <img src={StudentSvg} alt="Student Svg"/>
              <h3>Student</h3>
            </div>
          </Link>
          <Link to="faculty">
            <div className="registration-card">
              <img src={FacultySvg} alt="Faculty Svg" />
              <h3>Faculty</h3>
            </div>
          </Link>
          <Link to="staff">
            <div className="registration-card">
              <img src={StaffSvg} alt="Staff Svg" />
              <h3>Staff</h3>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Registration;
