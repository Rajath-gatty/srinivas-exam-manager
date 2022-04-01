import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  console.log(window.location.pathname);

  const ChangePath = () => {
    navigate("/dashboard");
  };

  return (
    <>
      <h1>Login Page</h1>
      <button onClick={ChangePath}>Dashboard</button>
    </>
  );
};

export default Login;
