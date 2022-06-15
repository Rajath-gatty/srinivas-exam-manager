import { Link,useNavigate} from "react-router-dom";
import { useState,useRef} from "react";
import { FiMail, FiLock, FiArrowLeft } from "react-icons/fi";

import "./Login.css";
import { SrinivasLogo, LoginSvg } from "../../Assets";
import StaffSvg from "../../Assets/Registration/staff_reg.svg";

import  Modal  from "../../components/UI/Modal/Modal";
import {useContextData} from "../../hooks/useContextData";

const SpecialLogin = () => {
  const [emailfocus, setEmailFocus] = useState(false);
  const [passfocus, setPassFocus] = useState(false);
  const [loginUser, setLoginUser] = useState("");

  const onEmailActive = () => setEmailFocus(true);
  const onPassActive = () => setPassFocus(true);

  const onEmailBlur = () => setEmailFocus(false);
  const onPassBlur = () => setPassFocus(false);

  const emailAct = emailfocus ? "form-control active" : "form-control";
  const passAct = passfocus ? "form-control active" : "form-control";

  // Temporary Code
  const [showModal,setShowModal] = useState(true);
  const {setRole} = useContextData();
  const navigate = useNavigate();

  const closeModal = () => setShowModal(false);

  const setInputRole = useRef();

  const handleRoleSubmit = (e) => {
    e.preventDefault();
    const role = setInputRole.current.value;
    setRole(role.toLowerCase());
    navigate("/");
  }
  // Temporary Code end

  return (
    <div className="login-container">
      {/* Login Side Design */}
      <div className="login-art">
        <div className="login-logo">
          <img width="50px" src={SrinivasLogo} alt="Login SVG" />
          <h1>Srinivas Exam Manager</h1>
        </div>

        <img
          className="login-vector"
          width="400px"
          src={LoginSvg}
          alt="Login SVG"
        />
      </div>

      {/* Login Form */}
      <div className="login-form">
        <h1 className="login-hdng">{loginUser ? "Login as "+loginUser : "Select Login User"}</h1>

        {!loginUser ? <div className="login-userSelect">
          <div className="login-userBox" onClick={()=>{setLoginUser("SuperAdmin")}}>
              <img src={StaffSvg} alt="Staff Svg" width="100px"/>
              <h3>Super Admin</h3>
          </div>
          
          <div className="login-userBox" onClick={()=>{setLoginUser("Admin")}}>
              <img src={StaffSvg} alt="Staff Svg" width="100px"/>
              <h3>Admin</h3>
          </div>

          <div className="login-userBox" onClick={()=>{setLoginUser("ExamCoord")}}>
              <img src={StaffSvg} alt="Staff Svg" width="100px"/>
              <h3>Exam Coord</h3>
          </div>
        </div>
        :
        <form>
          <div className="login-backBtn flex" onClick={()=>{setLoginUser("")}}>
            <FiArrowLeft color="var(--text-color)" size={25}/>
            <span>Back</span>
          </div>

          <div className={emailAct}>
            <label className="login-label">Email</label>
            <div className="input-group">
              <input
                type="text"
                onFocus={onEmailActive}
                onBlur={onEmailBlur}
                placeholder="example@gmail.com"
              />
              <FiMail size={30} color="var(--light-grey)" />
            </div>
          </div>
          <div className={passAct}>
            <label className="login-label label-pass">Password</label>
            <div className="input-group">
              <input
                type="password"
                onFocus={onPassActive}
                onBlur={onPassBlur}
                placeholder="Password"
              />
              <FiLock size={30} color="var(--light-grey)" />
            </div>
          </div>
          <div className="forgot-pass">
            <Link to="#">Forgot Password ?</Link>
          </div>
          <div className="form-controls">
            <input type="submit" value="Login" className="login-submit btn" />
          </div>

          <div className="to-register">
            <p>Dont have an account yet ?</p>
            <Link to="/registration">Register</Link>
          </div>
        </form>}
      </div>
      {showModal &&<Modal width="40%" onClose={closeModal} >
        <form onSubmit={handleRoleSubmit}>
          <h3>Enter Role</h3>
          <select name="selectRole" id="selectRole" ref={setInputRole}>
            <option value="superadmin">Super Admin</option>
            <option value="admin">Admin</option>
            <option value="student">Student</option>
            <option value="faculty">Faculty</option>
            <option value="staff">Staff</option>
            <option value="evaluator">Evaluator</option>
          </select>
          {/* <input type="text" ref={setInputRole} /> */}
          <input type="submit" className="btn"  />
        </form>
      </Modal>}
    </div>
  );
};

export default SpecialLogin;
