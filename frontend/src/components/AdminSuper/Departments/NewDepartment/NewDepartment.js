import { useRef, useState } from "react";
import "./NewDepartment.css"
import Back from "../../../UI/Back/Back"
import Dob from "../../../UI/Dob";
import RadioInput from "../../../UI/RadioInput";
import { TextField } from "@mui/material";
import axios from "axios";
import dateFormat from "dateformat";

const NewDepartment = () => {
    const [gender,setGender] = useState('');
    const [passErr,setPassErr] = useState(false);
    const [errors,setErrors] = useState([]);

    const departmentNameRef = useRef();
    const firstNameRef = useRef();
    const lastNameRef = useRef();
    const dateRef = useRef();
    const monthRef = useRef();
    const yearRef = useRef();
    const dobRef = useRef({dateRef,monthRef,yearRef});
    const emailRef = useRef();
    const phoneRef = useRef();
    const addressRef = useRef();
    const passwordRef = useRef();
    const cPasswordRef = useRef();

  const handleFormSubmit = async(e) => {
    e.preventDefault();
    const dob = `${dateRef.current.value}-${monthRef.current.value}-${yearRef.current.value}`
    const dobErr = dob.length>=10;
    const adminData = {
      departmentName : departmentNameRef.current.value,
      firstName : firstNameRef.current.value,
      lastName : lastNameRef.current.value,
      dob : dobErr&&dateFormat(dob,"dd-mm-yyyy"),
      gender: gender,
      email : emailRef.current.value,
      phone : phoneRef.current.value,
      address : addressRef.current.value,
      password : passwordRef.current.value,
      cPasword : cPasswordRef.current.value,
    }

    if(adminData.password!==adminData.cPasword) {
      setPassErr(true);
    } else {
      try {
        const result = await axios.post('/admin/department/new-department',adminData)
        console.log(result);
        setErrors([]);
        setPassErr(false);
      } catch(err) {
        if(err?.response?.status===400) {
         setErrors(err.response.data.err);
        }
        console.log(err)
      }
    }
  }

  return (
    <div className="newdept-container">
        <Back left="0em"/>
        <h2 className="newdept-title">Create New Department</h2>
        <form onSubmit={handleFormSubmit}>
            <div className="newdept-deptName">
                <TextField
                    label="Department Name"
                    variant="outlined"
                    size="small"
                    fullWidth
                    inputRef={departmentNameRef}
                    error={errors.some(err=>err.param==='departmentName')}
                    helperText={errors.find(err=>err.param==='departmentName')?.msg}
                />

                <h3>Admin Details</h3>
            </div>

            <div className="newdept-adminForm">
              <TextField
                label="First Name"
                variant="outlined"
                size="small"
                fullWidth
                inputRef={firstNameRef}
                error={errors.some(err=>err.param==='firstName')}
                helperText={errors.find(err=>err.param==='firstName')?.msg}
              />
  
              <TextField
                label="Last Name"
                variant="outlined"
                size="small"
                fullWidth
                inputRef={lastNameRef}
              />
  
              <TextField
                label="Phone"
                variant="outlined"
                size="small"
                type="number"
                fullWidth
                inputRef={phoneRef}
                error={errors.some(err=>err.param==='phone')}
                helperText={errors.find(err=>err.param==='phone')?.msg}
              />
  
              <TextField
                label="Email"
                variant="outlined"
                size="small"
                type="email"
                fullWidth
                inputRef={emailRef}
                error={errors.some(err=>err.param==='email')}
                helperText={errors.find(err=>err.param==='email')?.msg}
              />
  
              <Dob 
              ref={dobRef}
              error={errors.some(err=>err.param==='dob')}
            helperText={errors.find(err=>err.param==='dob')?.msg}
              />
  
              <RadioInput 
              setGender={setGender}
              error={errors.some(err=>err.param==='gender')}
            helperText={errors.find(err=>err.param==='gender')?.msg}
            />

              <TextField
                multiline
                label="Address"
                rows={2}
                className="textarea"
                inputRef={addressRef}
                error={errors.some(err=>err.param==='address')}
                helperText={errors.find(err=>err.param==='address')?.msg}
              />

              <TextField
                label="Password"
                variant="outlined"
                type="password"
                size="small"
                fullWidth
                inputRef={passwordRef}
                error={errors.some(err=>err.param==='password')}
                helperText={errors.find(err=>err.param==='password')?.msg}
              />
  
              <TextField
                label="Confirm Password"
                variant="outlined"
                type="password"
                size="small"
                error={passErr}
                helperText={passErr&&'Passwords does not match'}
                fullWidth
                inputRef={cPasswordRef}
              />
            </div>
            <input className="newdept-createBtn" type="submit" value="Create"/>
          </form>
    </div>
  )
}

export default NewDepartment;