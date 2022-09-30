import { Link } from "react-router-dom";
import { StudentReg, FacultyReg, StaffReg } from "../../Assets";
import Navbar from "../../components/Navbar/Navbar";

const Registration = () => {
  return (
    <>
      <Navbar to="/login" />
      
      <div className="registration-container">
        <h1>User Registration</h1>
        <div className="registration-wrapper">
          <Link to="student">
            <div className="registration-card flex">
              <img src={StudentReg} alt="Student Svg"/>
              <h2>Student</h2>
            </div>
          </Link>
          <Link to="faculty">
            <div className="registration-card flex">
              <img src={FacultyReg} alt="Faculty Svg" />
              <h2>Faculty</h2>
            </div>
          </Link>
          <Link to="staff">
            <div className="registration-card flex">
              <img src={StaffReg} alt="Staff Svg" />
              <h2>Staff</h2>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Registration;
