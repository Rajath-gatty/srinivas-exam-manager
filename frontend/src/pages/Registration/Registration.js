import { Link } from "react-router-dom";

const Registration = () => {
  return (
    <>
      <h1>Registration</h1>
      <div className="to-login">
        <Link to="/registration/student">Go to Student Registration</Link>
      </div>
    </>
  );
};

export default Registration;
