import {Link} from "react-router-dom";
import { useState } from "react";

import "./Login.css";
import "../../App.css";
import SrinivasLogo from "../../Assets/SrinivasLogo.svg";
import LoginSvg from "../../Assets/undraw_login.svg";
import LockIcon from "../../Assets/lock_icon.svg";
import UserIcon from "../../Assets/user_icon.svg";


const Login = () => {
  const [emailfocus, setEmailFocus] = useState(false);
  const [passfocus, setPassFocus] = useState(false);

  const onEmailActive = () => setEmailFocus(true);
  const onPassActive = () => setPassFocus(true);

  const onEmailBlur = () => setEmailFocus(false);
  const onPassBlur = () => setPassFocus(false);

  const emailAct = emailfocus ? 'form-control active': 'form-control';
  const passAct = passfocus ? 'form-control active': 'form-control';
  
  return (
    <div className="login-container">
    {/* Login Side Design */}
      <div className="login-art">
        <div className="login-logo">
          <img width="50px" src={SrinivasLogo} alt="Login SVG" />
          <h1>Srinivas Exam Manager</h1>
        </div>

        <img className="login-vector" width="400px" src={LoginSvg} alt="Login SVG" />
      </div>

      {/* Login Form */}
      <div className="login-form">
        <h1 className="login-hdng">LOGIN</h1>
        <form>
            <div className={emailAct} >
              <label className="login-label">Email</label>
              <div className="input-group">
                <input type="text" onFocus={onEmailActive} onBlur={onEmailBlur} placeholder="example@gmail.com" />
                <img src={UserIcon} alt="" className="login-svg" />
              </div>
            </div>
            <div className={passAct}>
              <label className="login-label label-pass">Password</label>
              <div className="input-group">
                <input type="text" onFocus={onPassActive}  onBlur={onPassBlur} placeholder="Password" />
                <img src={LockIcon} alt="" className="login-svg" />
              </div>
            </div>
            <div className="forgot-pass">
              <Link to="#">Forgot Password ?</Link>
            </div>
            <div className="form-controls">
              <input type="submit" value="Login" className="login-submit btn"/>
            </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
