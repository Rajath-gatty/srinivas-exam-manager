import "./ForgotPassword.css"
import { useState } from "react";
// import SrinivasLogo from "../../../Assets/SrinivasLogo.svg";
import {ForgotPassword as ForgotPasswordSvg} from "../../../Assets";
import {useLocation} from "react-router-dom";
// import {FiArrowLeft} from "react-icons/fi";
import axios from "axios";
import {toast} from "react-toastify";
import { CircularProgress } from "@mui/material";
import Navbar from "../../../components/Navbar/Navbar";

const ForgotPassword = () => {
    const [enteredEmail,setEnteredEmail] = useState('');
    const [isReset,setIsReset] = useState(false);
    const [loading,setLoading]= useState(false);
    // const navigate = useNavigate();
    const location = useLocation();
    const {user} = location.state;

    const handleFormSubmit = async(e) => {
        e.preventDefault();
        
        if(enteredEmail){
            setLoading(true);
            try {
                const result = await axios.post('/forgot-password',{role:user,email:enteredEmail});
                console.log(result);
                setIsReset(true);
                setLoading(false);
            } catch(err) {
                setLoading(false);
                console.log(err);
                toast.error(err.response.data.error + "!");
            }
        }else{
            toast.error("Enter a Valid Email !")
        }
    }

  return (
    <div className="forgotPassword-container">
        <Navbar />

        <div className="forgotPassword-Img flex">
            <img src={ForgotPasswordSvg} alt="Page NotFound" width="350px" height="350px" />
            {!isReset ? <form className="forgotPassword-form" onSubmit={handleFormSubmit}>
                <label htmlFor="resetEmail">Enter your Email ID</label>
                <div className="forgotPassword-input flex">
                    <input type="email" id="resetEmail" placeholder="username@email.com" onChange={(e) => {setEnteredEmail(e.target.value)}} />
                    <button type="submit" className="btn-outlined">{loading?<CircularProgress color="inherit" size={20}/>:'Reset Password'}</button>
                </div>
            </form>
            :
            <div className="forgotPassword-success flex">
                <h1>Password Reset Link Sent !</h1>
                <p>Please check your email to reset your password</p>
            </div>}
        </div>
    </div>
  )
}

export default ForgotPassword