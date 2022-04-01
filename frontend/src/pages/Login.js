import { useNavigate } from "react-router-dom";
const  Login = () => {
    console.log(window.location.pathname)
    const navigate = useNavigate();

    var user = true;
    if(user)
    navigate("/dashboard");

    return(
       <>
            <h1>Login Page</h1>
       </>
    )
     
}

export default Login;