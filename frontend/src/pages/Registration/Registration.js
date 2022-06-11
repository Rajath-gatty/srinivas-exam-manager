import { Link } from "react-router-dom";
<<<<<<< HEAD
=======
import EvaluatorSvg from "../../Assets/Registration/examcord_reg.svg";
>>>>>>> f7dd37d73d9ff0d4278fa4e4dd01b63620025918
import StudentSvg from "../../Assets/Registration/student_reg.svg";
import FacultySvg from "../../Assets/Registration/faculty_reg.svg";
import StaffSvg from "../../Assets/Registration/staff_reg.svg";
import Navbar from "../../components/Navbar/Navbar";

const Registration = () => {
  return (
    <>
      <Navbar />
      <div className="registration-container">
        <h1>Register</h1>
        <div className="registration-wrapper">
<<<<<<< HEAD
=======
          <Link to="evaluator">
            <div className="registration-card">
              <img src={EvaluatorSvg} alt="Evaluator Svg" />
              <h3>Exam Coordinator</h3>
            </div>
          </Link>
>>>>>>> f7dd37d73d9ff0d4278fa4e4dd01b63620025918
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
          <Link className="staff" to="staff">
            <div className="registration-card staff">
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
