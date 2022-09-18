import "./ForgotPassword.css"
import { useState } from "react";
// import SrinivasLogo from "../../../Assets/SrinivasLogo.svg";
import {useNavigate, useParams} from "react-router-dom";
// import {FiArrowLeft} from "react-icons/fi";
import axios from "axios";
import {toast} from "react-toastify";
import { CircularProgress } from "@mui/material";
import Navbar from "../../../components/Navbar/Navbar";

const ResetPassword = () => {
    const [newPassword,setNewPassword] = useState('');
    const [confirmPassword,setConfirmPassword] = useState('');
    const [loading,setLoading]= useState(false);
    const navigate = useNavigate();
    const {resetId} = useParams();

    const handleFormSubmit = async (e) =>{
        e.preventDefault();
        if(!newPassword) {
            toast.error("Enter a Valid Password !");
            return;
        } 
        
        setLoading(true);
        if(newPassword === confirmPassword){
            try {
                const result = await axios.post('/reset-password',{password:newPassword,token:resetId});
                console.log(result);
                setLoading(false);
                toast.success("Password changed successfully");
                navigate('/login');
            } catch(err) {
                setLoading(false);
                console.log(err);
                toast.error(err.response.data.error + "!");
            }
        }else{
            setLoading(false);
            toast.error("Passwords do not match!");
        }
    }

  return (
    <div className="forgotPassword-container flex">
        <Navbar />

        <form className="resetPassword-form flex" onSubmit={handleFormSubmit}>
            <span className="title">Create New Password</span>
            <div className="forgotPassword-input reset flex">
                <input type="text" placeholder="Enter New Password" onChange={(e) => {setNewPassword(e.target.value)}} />
                <input type="text" placeholder="Confirm New Password" onChange={(e) => {setConfirmPassword(e.target.value)}} />
                <button type="submit" className="btn-outlined">{loading?<CircularProgress color="inherit" size={20}/>:'Reset Password'}</button>
            </div>
        </form>
    </div>
  )
}

export default ResetPassword