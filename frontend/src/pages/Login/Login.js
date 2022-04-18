import { Link } from "react-router-dom";
import { useState } from "react";
import { FiMail, FiLock } from "react-icons/fi";

import "./Login.css";
import { SrinivasLogo, LoginSvg } from "../../Assets";

const Login = () => {
  const [emailfocus, setEmailFocus] = useState(false);
  const [passfocus, setPassFocus] = useState(false);

  const onEmailActive = () => setEmailFocus(true);
  const onPassActive = () => setPassFocus(true);

  const onEmailBlur = () => setEmailFocus(false);
  const onPassBlur = () => setPassFocus(false);

  const emailAct = emailfocus ? "form-control active" : "form-control";
  const passAct = passfocus ? "form-control active" : "form-control";

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
    </div>
  );
};

export default Login;
