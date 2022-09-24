import {useRef,useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import dateFormat from "dateformat";
import {
  TextField,
  Select,
  InputLabel,
  MenuItem,
  FormControl,
  FormHelperText
} from "@mui/material";
import Navbar from "../../components/Navbar/Navbar";
import Dob from "../../components/UI/Dob";
import RadioInput from "../../components/UI/RadioInput";
import { useFetchDepartment } from "../../hooks/useFetchDepartments";
import {toast} from "react-toastify";

const Staff = () => {
  const [gender,setGender] = useState('');
  const [passErr,setPassErr] = useState(false);
  const [errors,setErrors] = useState([]);

  const departments = useFetchDepartment();
  const navigate = useNavigate();

  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const dateRef = useRef();
  const monthRef = useRef();
  const yearRef = useRef();
  const dobRef = useRef({dateRef,monthRef,yearRef});
  const emailRef = useRef();
  const phoneRef = useRef();
  const addressRef = useRef();
  const bloodGroupRef = useRef();
  const casteRef = useRef();
  const aadharNoRef = useRef();
  const religionRef = useRef();
  const birthPlaceRef = useRef();
  const birthDistrictRef = useRef();
  const countryRef = useRef();
  const identityMarkRef = useRef();
  const pincodeRef = useRef();
  const passwordRef = useRef();
  const cPasswordRef = useRef();
  const fatherNameRef = useRef();
  const fatherOccupationRef = useRef();
  const fatherPhoneRef = useRef();
  const fatherEmailRef = useRef();
  const departmentRef = useRef();
  const joiningYearRef = useRef();

  const handleFormSubmit = async(e) => {
    e.preventDefault();
    const loader = toast.info("Creating User...");
    toast.dismiss();

    const dob = `${dateRef.current.value}-${monthRef.current.value}-${yearRef.current.value}`
    const dobErr = dob.length>=10;
    const staffData = {
      firstName : firstNameRef.current.value,
      lastName : lastNameRef.current.value,
      dob : dobErr&&dateFormat(dob,"dd-mm-yyyy"),
      gender: gender,
      email : emailRef.current.value,
      phone : phoneRef.current.value,
      address : addressRef.current.value,
      bloodGroup : bloodGroupRef.current.value,
      caste : casteRef.current.value,
      aadharNo : aadharNoRef.current.value,
      religion : religionRef.current.value,
      birthPlace : birthPlaceRef.current.value,
      birthDistrict : birthDistrictRef.current.value,
      country : countryRef.current.value,
      identityMark : identityMarkRef.current.value,
      pincode : pincodeRef.current.value,
      password : passwordRef.current.value,
      cPasword : cPasswordRef.current.value,
      fatherName : fatherNameRef.current.value,
      fatherOccupation : fatherOccupationRef.current.value,
      fatherPhone:  fatherPhoneRef.current.value,
      fatherEmail : fatherEmailRef.current.value,
      department : departmentRef.current.value,
      joiningYear : joiningYearRef.current.value
    }

    if(staffData.password!==staffData.cPasword) {
      setPassErr(true);
    } else {
      try {
        const result = await axios.post('/registration/staff',staffData)
        console.log(result);
        setErrors([]);
        setPassErr(false);

        toast.update(loader, { 
          render: "User Registered Successfully!", 
          type: "success", 
          isLoading: false, 
          autoClose: 3000, 
          closeOnClick: true,
          draggable: true });

        //Sending Push Notification to Staff
        try{
          const pushData = {
            sendTo: "staff",
            body: "New Staff Registered"
          }
          const res = await axios.post('/pushsendnotification', pushData); 
          console.log(res.data);
        } catch(err) {
            console.log(err);
        }
        
        navigate("/login");
      } catch(err) {
        setErrors(err.response.data.err);
        console.log(err.response.data.err);
        
        toast.update(loader, { 
          render: "Fill all the required fields!", 
          type: "error", 
          isLoading: false, 
          autoClose: 3000, 
          closeOnClick: true,
          draggable: true });
      }
    }
  }

    return(
        <div>
        <Navbar />
        <div className="form-wrapper">
          <h2>Staff Registration</h2>
          <form onSubmit={handleFormSubmit}>
            <div className="staff-form">
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
                type="text"
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
                label="Blood Group"
                variant="outlined"
                size="small"
                fullWidth
                inputRef={bloodGroupRef}
                error={errors.some(err=>err.param==='bloodGroup')}
              helperText={errors.find(err=>err.param==='bloodGroup')?.msg}
              />
  
              <TextField
                label="Aadhar Card Number"
                variant="outlined"
                size="small"
                type="number"
                fullWidth
                inputRef={aadharNoRef}
                error={errors.some(err=>err.param==='aadharNo')}
                helperText={errors.find(err=>err.param==='aadharNo')?.msg}
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
                label="Religion"
                variant="outlined"
                size="small"
                fullWidth
                inputRef={religionRef}
                error={errors.some(err=>err.param==='religion')}
              helperText={errors.find(err=>err.param==='religion')?.msg}
              />
  
              <TextField
                label="Caste"
                variant="outlined"
                size="small"
                fullWidth
                inputRef={casteRef}
                error={errors.some(err=>err.param==='caste')}
                helperText={errors.find(err=>err.param==='caste')?.msg}
              />

              <TextField
                label="Place of Birth"
                variant="outlined"
                size="small"
                fullWidth
                inputRef={birthPlaceRef}
                error={errors.some(err=>err.param==='birthPlace')}
              helperText={errors.find(err=>err.param==='birthPlace')?.msg}
              />
  
              <TextField
                label="District of Birth"
                variant="outlined"
                size="small"
                fullWidth
                inputRef={birthDistrictRef}
                error={errors.some(err=>err.param==='birthDistrict')}
                helperText={errors.find(err=>err.param==='birthDistrict')?.msg}
              />
  
              <TextField
                label="Country of Birth"
                variant="outlined"
                size="small"
                fullWidth
                inputRef={countryRef}
                error={errors.some(err=>err.param==='country')}
              helperText={errors.find(err=>err.param==='country')?.msg}
              />
  
              <TextField
                label="Identity Mark"
                variant="outlined"
                size="small"
                fullWidth
                inputRef={identityMarkRef}
              />
  
              <TextField
                label="Joining Year"
                variant="outlined"
                size="small"
                type="number"
                fullWidth
                inputRef={joiningYearRef}
                error={errors.some(err=>err.param==='joiningYear')}
              helperText={errors.find(err=>err.param==='joiningYear')?.msg}
              />
  
              <TextField
                label="Pincode"
                variant="outlined"
                size="small"
                type="number"
                fullWidth
                inputRef={pincodeRef}
                error={errors.some(err=>err.param==='pincode')}
              helperText={errors.find(err=>err.param==='pincode')?.msg}
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
  
                <FormControl className="SelectInput" fullWidth>
                  <InputLabel>Department</InputLabel>
                  <Select
                    label="Department"
                    defaultValue=""
                    size="small"
                    inputRef={departmentRef}
                    error={errors.some(err=>err.param==='department')}
                  >
                    {departments.map((opt) => (
                      <MenuItem key={opt.dept_id} value={opt.dept_name}>
                        {opt.dept_name}
                      </MenuItem>
                    ))}
                  </Select>
                  <FormHelperText error>{errors.find(err=>err.param==='department')?.msg}</FormHelperText>
                </FormControl>
            </div>
  
            <div className="sub-wrapper">
              <h3 className="sub-hdng">Father/Spouse Details</h3>
              <div className="sub-details student-form">
                <TextField
                  label="Name"
                  variant="outlined"
                  size="small"
                  fullWidth
                  inputRef={fatherNameRef}
                  error={errors.some(err=>err.param==='fatherName')}
              helperText={errors.find(err=>err.param==='fatherName')?.msg}
                />
  
                <TextField
                  label="Occupation"
                  variant="outlined"
                  size="small"
                  fullWidth
                  inputRef={fatherOccupationRef}
                  error={errors.some(err=>err.param==='fatherOccupation')}
                  helperText={errors.find(err=>err.param==='fatherOccupation')?.msg}
                />
  
                <TextField
                  label="Mobile Number"
                  variant="outlined"
                  size="small"
                  type="number"
                  fullWidth
                  inputRef={fatherPhoneRef}
                  error={errors.some(err=>err.param==='fatherPhone')}
                  helperText={errors.find(err=>err.param==='fatherPhone')?.msg}
                />
  
                <TextField
                  label="Email ID"
                  variant="outlined"
                  size="small"
                  type="email"
                  fullWidth
                  inputRef={fatherEmailRef}
                  error={errors.some(err=>err.param==='fatherEmail')}
                  helperText={errors.find(err=>err.param==='fatherEmail')?.msg}
                />
              </div>
            </div>
  
            <input className="btn mt-2" type="submit" value="Register"/>

            <div className="to-login mt-1">
              <p>Already have an account ?</p>
              <Link to="/" className="btn-outlined">Login</Link>
            </div>
          </form>
        </div>
      </div>
    )
}

export default Staff;