import { Link,useNavigate} from "react-router-dom";
import { useState,useRef} from "react";
import { FiMail, FiLock } from "react-icons/fi";

import "./Login.css";
import { SrinivasLogo, LoginSvg } from "../../Assets";
import  Modal  from "../../components/UI/Modal/Modal";
import {useContextData} from "../../hooks/useContextData";

const Login = () => {
  const [emailfocus, setEmailFocus] = useState(false);
  const [passfocus, setPassFocus] = useState(false);

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
    navigate("/dashboard");
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
        <h1 className="login-hdng">LOGIN</h1>
        <form>
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
        </form>
      </div>
      {showModal &&<Modal width="40%" onClose={closeModal} >
        <form onSubmit={handleRoleSubmit}>
          <h3>Enter Role</h3>
          <select name="selectRole" id="selectRole" ref={setInputRole}>
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

export default Login;
