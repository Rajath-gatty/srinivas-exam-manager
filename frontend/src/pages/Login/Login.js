import { Link,useNavigate} from "react-router-dom";
import { useState,useEffect} from "react";
import { FiMail, FiLock, FiArrowLeft } from "react-icons/fi";

import "./Login.css";
import { SrinivasLogo, LoginSvg } from "../../Assets";
import StudentSvg from "../../Assets/Registration/student_reg.svg";
import FacultySvg from "../../Assets/Registration/faculty_reg.svg";
import StaffSvg from "../../Assets/Registration/staff_reg.svg";
import axios from "axios";
import {useContextData} from "../../hooks/useContextData";

const Login = () => {
  const [emailfocus, setEmailFocus] = useState(false);
  const [passfocus, setPassFocus] = useState(false);
  const [loginUser, setLoginUser] = useState("");
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');

  const onEmailActive = () => setEmailFocus(true);
  const onPassActive = () => setPassFocus(true);

  const onEmailBlur = () => setEmailFocus(false);
  const onPassBlur = () => setPassFocus(false);

  const emailAct = emailfocus ? "form-control active" : "form-control";
  const passAct = passfocus ? "form-control active" : "form-control";

  const {setRole,setUser,setToken,token} = useContextData();
  const navigate = useNavigate();

  // useEffect(() => {
  //   token && navigate('/');
  // },[token])
  
  // Temporary Code
  // const [showModal,setShowModal] = useState(true);
  // const navigate = useNavigate();

  // const closeModal = () => setShowModal(false);

  // const setInputRole = useRef();

  // const handleRoleSubmit = (e) => {
  //   e.preventDefault();
  //   const role = setInputRole.current.value;
  //   setRole(role.toLowerCase());
  //   navigate("/dashboard");
  // }
  // Temporary Code end

  const handleLogin = async(e) => {
    e.preventDefault();
    
    if(email===''||password==='') {
      return;
    }

    const data = {
      email,
      password,
      role:loginUser
    }

    try {
      const result = await axios.post('/login',data);
      console.log(result);
      setRole(result.data.user.role);
      setToken(result.data.token);
      setUser(result.data.user);

      let userData = {
        role: result.data.user.role,
        token:result.data.token,
        user:result.data.user
      }
      localStorage.setItem("user",JSON.stringify(userData))
      navigate('/');
    } catch(err) {
      console.log(err)
    }
  }
 
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

        {!loginUser ? <div className="login-userSelectContain flex">
          <div className="login-userSelect">
            <div className="login-userBox" onClick={()=>{setLoginUser("student")}}>
                <img src={StudentSvg} alt="Student Svg" width="100px"/>
                <h3>Student</h3>
            </div>

            <div className="login-userBox" onClick={()=>{setLoginUser("faculty")}}>
                <img src={FacultySvg} alt="Faculty Svg" width="100px"/>
                <h3>Faculty</h3>
            </div>

            <div className="login-userBox" onClick={()=>{setLoginUser("staff")}}>
                <img src={StaffSvg} alt="Staff Svg" width="100px"/>
                <h3>Staff</h3>
            </div>
          </div>

          <div className="to-register flex">
              <p>Dont have an account yet ?</p>
              <Link to="/registration">Register</Link>
          </div>
        </div>
        :
        <form onSubmit={handleLogin}>
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
                onChange={(e) => setEmail(e.target.value)}
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
                onChange={(e) => setPassword(e.target.value)}
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
        </form>}
      </div>
      {/* {showModal &&<Modal width="40%" onClose={closeModal} >
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
          <input type="submit" className="btn"  />
        </form>
      </Modal>} */}
    </div>
  );
};

export default Login;
