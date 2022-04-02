import "./Login.css";
import SrinivasLogo from "../../Assets/SrinivasLogo.svg";
import LoginSvg from "../../Assets/undraw_login.svg";
import LockIcon from "../../Assets/lock_icon.svg";
import UserIcon from "../../Assets/user_icon.svg";


const Login = () => {
console.log("login page")
  
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
            <div className="form-controls">
              <img src={UserIcon} alt="" className="login-svg" />
              <div className="input-group">
                <label className="login-label">Email</label>
                <input type="text" />
              </div>
            </div>
            <div className="form-controls">
              <img src={LockIcon} alt="" className="login-svg"/>
              <div className="input-group">
              <label className="login-label">Password</label>
              <input type="password"/>
              </div>
            </div>
            <div className="form-controls">
              <input type="submit" value="submit" className="login-submit btn"/>
            </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
