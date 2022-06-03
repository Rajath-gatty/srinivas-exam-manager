import {useRef,useState} from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import dateFormat from "dateformat";
import {
  TextField,
  Select,
  InputLabel,
  MenuItem,
  FormControl
} from "@mui/material";
import Navbar from "../../components/Navbar/Navbar";
import Dob from "../../components/UI/Dob";
import RadioInput from "../../components/UI/RadioInput";

const Staff = () => {
  const [gender,setGender] = useState('');
  const [passErr,setPassErr] = useState(false);

    const departments = [
        "Computer Science & Information Science",
        "Management & Commerce",
        "Engineering & Technology",
        "Social Sciences & Humanities",
        "Aviation Studies",
        "Physiotherapy",
        "Hotel Management & Tourism",
        "Education",
        "Allied Health Sciences",
        "Nursing Science",
      ];

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
    const staffData = {
      firstName : firstNameRef.current.value,
      lastName : lastNameRef.current.value,
      dob : dateFormat(`${dateRef.current.value}-${monthRef.current.value}-${yearRef.current.value}`,"dd-mm-yyyy"),
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
        const result = await axios.post('http://localhost:8080/registration/staff',staffData)
        console.log(result);
       setPassErr(false);
      } catch(err) {
        console.log(err.response.data.err);
      }
    }
  }

    return(
        <div>
        <Navbar />
        <div className="form-wrapper">
          <h2>Staff Registration</h2>
          <form onSubmit={handleFormSubmit}>
            <div className="student-form">
              <TextField
                label="First Name"
                variant="outlined"
                size="small"
                fullWidth
                inputRef={firstNameRef}
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
                fullWidth
                inputRef={phoneRef}
              />
  
              <TextField
                label="Email"
                variant="outlined"
                size="small"
                type="email"
                fullWidth
                inputRef={emailRef}
              />
  
              <Dob ref={dobRef}/>
  
              <RadioInput setGender={setGender}/>
  
              <TextField
                label="Blood Group"
                variant="outlined"
                size="small"
                fullWidth
                inputRef={bloodGroupRef}
              />
  
              <TextField
                label="Aadhar Card Number"
                variant="outlined"
                size="small"
                fullWidth
                inputRef={aadharNoRef}
              />
  
              <TextField
                multiline
                label="Address"
                rows={2}
                className="textarea"
                inputRef={addressRef}
              />
  
              <TextField
                label="Religion"
                variant="outlined"
                size="small"
                fullWidth
                inputRef={religionRef}
              />
  
              <TextField
                label="Caste"
                variant="outlined"
                size="small"
                fullWidth
                inputRef={casteRef}
              />
  
              <TextField
                label="Place of Birth"
                variant="outlined"
                size="small"
                fullWidth
                inputRef={birthPlaceRef}
              />
  
              <TextField
                label="District of Birth"
                variant="outlined"
                size="small"
                fullWidth
                inputRef={birthDistrictRef}
              />
  
              <TextField
                label="Country of Birth"
                variant="outlined"
                size="small"
                fullWidth
                inputRef={countryRef}
              />
  
              <TextField
                label="Identity Mark"
                variant="outlined"
                size="small"
                fullWidth
                inputRef={identityMarkRef}
              />
  
              <TextField
                label="Date of Join"
                variant="outlined"
                size="small"
                fullWidth
                inputRef={joiningYearRef}
              />
  
              <TextField
                label="Pincode"
                variant="outlined"
                size="small"
                fullWidth
                inputRef={pincodeRef}
              />

                
              <TextField
                label="Password"
                variant="outlined"
                type="password"
                size="small"
                fullWidth
                inputRef={passwordRef}
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
  
                <FormControl className="SelectInput">
                  <InputLabel>Department</InputLabel>
                  <Select
                    label="Department"
                    defaultValue=""
                    size="small"
                    inputRef={departmentRef}
                  >
                    {departments.map((opt) => (
                      <MenuItem key={opt} value={opt}>
                        {opt}
                      </MenuItem>
                    ))}
                  </Select>
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
                />
  
                <TextField
                  label="Occupation"
                  variant="outlined"
                  size="small"
                  fullWidth
                  inputRef={fatherOccupationRef}
                />
  
                <TextField
                  label="Mobile Number"
                  variant="outlined"
                  size="small"
                  type="tel"
                  fullWidth
                  inputRef={fatherPhoneRef}
                />
  
                <TextField
                  label="Email ID"
                  variant="outlined"
                  size="small"
                  type="email"
                  fullWidth
                  inputRef={fatherEmailRef}
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