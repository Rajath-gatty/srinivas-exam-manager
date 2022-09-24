import { Link,useNavigate} from "react-router-dom";
import { useState, useEffect, useRef} from "react";
import { FiLock, FiArrowLeft, FiEye, FiEyeOff } from "react-icons/fi";
import {MdAlternateEmail} from "react-icons/md";
import {RiShieldUserLine} from "react-icons/ri";

import "./Login.css";
import { SrinivasLogo, LoginSvg } from "../../Assets";
import StudentSvg from "../../Assets/Registration/student_reg.svg";
import FacultySvg from "../../Assets/Registration/faculty_reg.svg";
import StaffSvg from "../../Assets/Registration/staff_reg.svg";
import axios from "axios";
import {useContextData} from "../../hooks/useContextData";
import { CircularProgress } from "@mui/material";
import {toast} from "react-toastify";
import SubToPush from "./SubToPush";

const Login = ({from}) => {
  const [emailfocus, setEmailFocus] = useState(false);
  const [passfocus, setPassFocus] = useState(false);
  
  const [loginUser, setLoginUser] = useState("");
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [showPass,setShowPass] = useState(false);

  const [loading,setLoading] = useState(false);
  const [errors,setErrors] = useState('');
  const onEmailActive = () => setEmailFocus(true);
  const onPassActive = () => setPassFocus(true);

  const onEmailBlur = () => setEmailFocus(false);
  const onPassBlur = () => setPassFocus(false);

  const emailAct = emailfocus ? "form-control active" : "form-control";
  const passAct = passfocus ? "form-control active" : "form-control";

  const {setRole,setUser,setToken} = useContextData();
  const navigate = useNavigate();

  const passRef = useRef();
  useEffect(() => {
    if(passRef.current)
    showPass ? passRef.current.type = "text" : passRef.current.type = "password";
  },[showPass]);

  const notify = (type, msg) =>{
    type==="warn" && toast.warn(msg);
  }

  const handleLogin = async(e) => {
    e.preventDefault();
    
    if(email===''||password==='') {
      notify("warn", "Enter Email & Password !")
      return;
    }

    const data = {
      email,
      password,
      role:loginUser
    }

    try {
      setLoading(true);
      const result = await axios.post('/login',data);
      setRole(result.data.user.role);
      setToken(result.data.token);
      setUser(result.data.user);

      let userData = {
        role: result.data.user.role,
        token:result.data.token,
        user:result.data.user
      }
      localStorage.setItem("user",JSON.stringify(userData));

      await SubToPush({email:email, role:loginUser}); //subscribing to push notification

      //If navigated to Login from another page 
      // redirect to that page after login
      if(from)
        navigate(from);
      else
        navigate('/');

      setLoading(false);
    } catch(err) {
      setErrors(err.response.data.error);
      console.log(err);
      setLoading(false);
  }
}
  return (
    <div className="login-container">
      {/* Login Side Design */}
      <div className="login-art">
        <div className="login-logo">
          <img width="50px" height="58px" src={SrinivasLogo} alt="Login SVG" />
          <h1>Srinivas Exam Manager</h1>
        </div>

        <img
          className="login-vector"
          width="400px"
          height="240px"
          src={LoginSvg}
          alt="Login SVG"
        />
      </div>

      {/* Login Form */}
      <div className="login-form">
        <div className="login-mlogo" style={{display:"none"}}>
          <img width="40px" height="46px" src={SrinivasLogo} alt="Login SVG" />
          <h1>Srinivas Exam Manager</h1>
        </div>

        {!loginUser && <Link to="/special" className="login-admin flex" title="Admin Login">
          <RiShieldUserLine size={25}/>
          <span>Admin</span>
        </Link>}

        <h1 className="login-hdng">{loginUser ? "Login as "+loginUser.charAt(0).toUpperCase() + loginUser.slice(1) : "Select Login User"}</h1>

        {!loginUser ? <div className="login-userSelectContain flex">
          <div className="login-userSelect">
            <div className="login-userBox" onClick={()=>{setLoginUser("student")}}>
                <img src={StudentSvg} alt="Student Svg" width="100px" height="100px"/>
                <h3>Student</h3>
            </div>

            <div className="login-userBox" onClick={()=>{setLoginUser("faculty")}}>
                <img src={FacultySvg} alt="Faculty Svg" width="100px" height="100px"/>
                <h3>Faculty</h3>
            </div>

            <div className="login-userBox" onClick={()=>{setLoginUser("staff")}}>
                <img src={StaffSvg} alt="Staff Svg" width="100px" height="100px"/>
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
              <MdAlternateEmail size={25} color="var(--light-grey)" />
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
                ref={passRef}
              />
              {!password ? <FiLock size={25} color="var(--light-grey)" />
              : !showPass ? <FiEyeOff size={25} color="var(--text-color)" style={{cursor:'pointer'}} onClick={()=>setShowPass(!showPass)}/> 
              : <FiEye size={25} color="var(--text-color)" style={{cursor:'pointer'}} onClick={()=>setShowPass(!showPass)}/>}
            </div>
          </div>
          {errors&&<div style={{color:'red',fontSize:'0.8em'}}>{errors}</div>}
          <div className="forgot-pass">
            <Link to="/forgotpassword" state={{user:loginUser}}>Forgot Password ?</Link>
          </div>
          <div className="form-controls">
            <button type="submit" className="login-submit btn">{loading?<CircularProgress color="inherit" size={20}/>:'Login'}</button>
          </div>
        </form>}
      </div>
    </div>
  );
};

export default Login;
