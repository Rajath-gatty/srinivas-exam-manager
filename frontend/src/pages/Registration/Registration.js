import { Link } from "react-router-dom";

const Registration = () => {
  return (
    <>
      <h1>Registration</h1>
      <div className="to-login">
        <Link to="/registration/student">Go to Student Registration</Link>
        <Link to="/registration/faculty">Go to Faculty Registration</Link>
      </div>
    </>
  );
};

export default Registration;
