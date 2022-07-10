import "./Create.css";
import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {toast} from 'react-toastify';
import Back from '../../../UI/Back/Back';
import {
  TextField,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  FormHelperText,
  CircularProgress,
} from "@mui/material";

const Create = () => {
  const navigate = useNavigate();

  const HandleCreateClass = () =>{
    toast.success('Classroom created successfully');
    navigate('/classrooms');
  }

  return (
    <div className="CreateClass-container">
      <Back top="-1em" left="0"/>
      <div className="CreateClass-Header">
        <h1>Create Classroom</h1>
      </div>
        
      <form className="flex" onSubmit={HandleCreateClass}>

      </form>
    </div>
  )
}

export default Create