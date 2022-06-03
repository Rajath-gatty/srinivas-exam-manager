import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  TextField,
  Radio,
  RadioGroup,
  FormLabel,
  FormControlLabel,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import Navbar from "../../components/Navbar/Navbar";
import Dob from "../../components/UI/Dob";
import RadioInput from "../../components/UI/RadioInput";

const Student = () => {
  const [gender,setGender] = useState('');
  //Toggle Guardian Details Show/Hide
  const [showGuardian, setShowGuardian] = useState("");
  const GuardianToggle = (e) => {
    if (e.target.value === "yes") setShowGuardian(true);
    if (e.target.value === "no") setShowGuardian(false);
  };

  //Switch Courses Acc to Selected Department
  const [course, setCourse] = useState([]);
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

  const DegreeYear = [
    2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016,
    2017, 2018, 2019, 2020, 2021, 2022,
  ];

  const SwitchCourse = (evt) => {
    const dept = evt.target.value;

    switch (dept) {
      case "Computer Science & Information Science": {
        const Degree = ["BCA", "MCA"];
        setCourse(Degree);
        break;
      }
      case "Management & Commerce": {
        const Degree = ["BBA", "B.Com", "B.Com (IT)", "B.Com (CSE)"];
        setCourse(Degree);
        break;
      }
      case "Engineering & Technology": {
        const Degree = ["B.Tech", "B.Tech (IT)", "B.Tech (CSE)"];
        setCourse(Degree);
        break;
      }
      case "Social Sciences & Humanities": {
        const Degree = ["B.A", "B.A (Hons)"];
        setCourse(Degree);
        break;
      }
      case "Aviation Studies": {
        const Degree = ["B.Sc", "B.Sc (Hons)"];
        setCourse(Degree);
        break;
      }
      case "Physiotherapy": {
        const Degree = ["B.Sc", "B.Sc (Hons)"];
        setCourse(Degree);
        break;
      }
      case "Hotel Management & Tourism": {
        const Degree = ["B.Sc", "B.Sc (Hons)"];
        setCourse(Degree);
        break;
      }
      case "Education": {
        const Degree = ["B.Sc", "B.Sc (Hons)"];
        setCourse(Degree);
        break;
      }
      case "Allied Health Sciences": {
        const Degree = ["B.Sc", "B.Sc (Hons)"];
        setCourse(Degree);
        break;
      }
      case "Nursing Science": {
        const Degree = ["B.Sc", "B.Sc (Hons)"];
        setCourse(Degree);
        break;
      }

      default:
        return "Invalid";
    }
  };

  const regnoRef = useRef();
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
  const motherNameRef = useRef();
  const motherOccupationRef = useRef();
  const motherPhoneRef = useRef();
  const motherEmailRef = useRef();
  const gNameRef = useRef();
  const gOccupationRef = useRef();
  const gPhoneRef = useRef();
  const gEmailRef = useRef();
  const departmentRef = useRef();
  const courseRef = useRef();
  const joiningYearRef = useRef();

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const studentData = {
      regno : regnoRef.current.value,
      firstName : firstNameRef.current.value,
      lastName : lastNameRef.current.value,
      dob : `${dateRef.current.value}-${monthRef.current.value}-${yearRef.current.value}`,
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
      motherName : motherNameRef.current.value,
      motherOccupation : motherOccupationRef.current.value,
      motherPhone : motherPhoneRef.current.value,
      motherEmail : motherEmailRef.current.value,
      gName : gNameRef.current?.value||'',
      gOccupation: gOccupationRef.current?.value||'',
      gPhone: gPhoneRef.current?.value||'',
      gEmail: gEmailRef.current?.value||'',
      department : departmentRef.current.value,
      course : courseRef.current.value,
      joiningYear : joiningYearRef.current.value
    }

    if(studentData.password!==studentData.cPasword) {
      setPassErr(true);
    } else {
      // Sending POST Request
      console.log(studentData);
      setPassErr(false);
    }
  }

  return (
    <div>
      <Navbar />
      <div className="form-wrapper">
        <h2>Student Registration</h2>
        <form onSubmit={handleFormSubmit}>
          <div className="student-form">
            <TextField
              label="First Name"
              variant="outlined"
              size="small"
              inputRef={firstNameRef}
              required
              fullWidth
            />

            <TextField
              label="Last Name"
              variant="outlined"
              size="small"
              inputRef={lastNameRef}
              fullWidth
            />

            <TextField
              label="Phone"
              variant="outlined"
              size="small"
              inputRef={phoneRef}
              required
              fullWidth
            />

            <TextField
              label="Email"
              variant="outlined"
              size="small"
              type="email"
              inputRef={emailRef}
              required
              fullWidth
            />

            <Dob required  ref={dobRef}/>

            <RadioInput required setGender={setGender}/>

            <TextField
              label="Blood Group"
              variant="outlined"
              size="small"
              inputRef={bloodGroupRef}
              fullWidth
            />

            <TextField
              label="Aadhar Card Number"
              variant="outlined"
              size="small"
              inputRef={aadharNoRef}
              fullWidth
            />

            <TextField
              multiline
              label="Address"
              rows={2}
              inputRef={addressRef}
              className="textarea"
            />

            <TextField
              label="Religion"
              variant="outlined"
              size="small"
              inputRef={religionRef}
              fullWidth
            />

            <TextField
              label="Caste"
              variant="outlined"
              size="small"
              inputRef={casteRef}
              fullWidth
            />

            <TextField
              label="Place of Birth"
              variant="outlined"
              size="small"
              inputRef={birthPlaceRef}
              fullWidth
            />

            <TextField
              label="District of Birth"
              variant="outlined"
              size="small"
              inputRef={birthDistrictRef}
              fullWidth
            />

            <TextField
              label="Country of Birth"
              variant="outlined"
              size="small"
              inputRef={countryRef}
              fullWidth
            />

            <TextField
              label="Identity Mark"
              variant="outlined"
              size="small"
              inputRef={identityMarkRef}
              fullWidth
            />

            <TextField
              label="Registration No."
              variant="outlined"
              size="small"
              inputRef={regnoRef}
              fullWidth
            />

            <TextField
              label="Pincode"
              variant="outlined"
              size="small"
              inputRef={pincodeRef}
              fullWidth
            />

            <TextField
              label="Password"
              variant="outlined"
              type="password"
              size="small"
              inputRef={passwordRef}
              fullWidth
            />

            <TextField
              label="Confirm Password"
              variant="outlined"
              type="password"
              size="small"
              error={passErr}
              helperText={passErr&&'Passwords Does not match'}
              inputRef={cPasswordRef}
              fullWidth
            />
          </div>

          <div className="sub-wrapper">
            <h3 className="sub-hdng">Father's Details</h3>
            <div className="sub-details student-form">
              <TextField
                label="Name"
                variant="outlined"
                size="small"
                inputRef={fatherNameRef}
                fullWidth
              />

              <TextField
                label="Occupation"
                variant="outlined"
                size="small"
                inputRef={fatherOccupationRef}
                fullWidth
              />

              <TextField
                label="Mobile Number"
                variant="outlined"
                size="small"
                type="tel"
                inputRef={fatherPhoneRef}
                fullWidth
              />

              <TextField
                label="Email ID"
                variant="outlined"
                size="small"
                type="email"
                inputRef={fatherEmailRef}
                fullWidth
              />
            </div>
          </div>

          <div className="sub-wrapper">
            <h3 className="sub-hdng">Mother's Details</h3>
            <div className="sub-details student-form">
              <TextField
                label="Name"
                variant="outlined"
                size="small"
                inputRef={motherNameRef}
                fullWidth
              />

              <TextField
                label="Occupation"
                variant="outlined"
                size="small"
                inputRef={motherOccupationRef}
                fullWidth
              />

              <TextField
                label="Mobile Number"
                variant="outlined"
                size="small"
                type="tel"
                inputRef={motherPhoneRef}
                fullWidth
              />

              <TextField
                label="Email ID"
                variant="outlined"
                size="small"
                type="email"
                inputRef={motherEmailRef}
                fullWidth
              />
            </div>
          </div>

          <div className="sub-wrapper">
            <div className="guardian-radio">
              <FormLabel id="radio-label">Guardian Details ?</FormLabel>
              <RadioGroup row className="radio-btns" onChange={GuardianToggle}>
                <FormControlLabel
                  value="yes"
                  control={<Radio id="guardian-yes" />}
                  label="Yes"
                />
                <FormControlLabel
                  value="no"
                  control={<Radio id="guardian-no" />}
                  label="No"
                />
              </RadioGroup>
            </div>

            {showGuardian && (
              <div className="show-guardian">
                <h3 className="sub-hdng">Guardian's Details</h3>
                <div className="sub-details student-form">
                  <TextField
                    label="Name"
                    variant="outlined"
                    size="small"
                    inputRef={gNameRef}
                    fullWidth
                  />

                  <TextField
                    label="Occupation"
                    variant="outlined"
                    size="small"
                    inputRef={gOccupationRef}
                    fullWidth
                  />

                  <TextField
                    label="Mobile Number"
                    variant="outlined"
                    size="small"
                    type="tel"
                    inputRef={gPhoneRef}
                    fullWidth
                  />

                  <TextField
                    label="Email ID"
                    variant="outlined"
                    size="small"
                    type="email"
                    inputRef={gEmailRef}
                    fullWidth
                  />
                </div>
              </div>
            )}
          </div>

          <div className="sub-wrapper">
            <h3 className="sub-hdng">Admission Details</h3>
            <div className="sub-details student-form">
              {/* Raw Component used to trigger SwitchCourse */}
              <FormControl className="SelectInput">
                <InputLabel>Department</InputLabel>
                <Select
                  label="Department"
                  defaultValue=""
                  size="small"
                  onChange={SwitchCourse}
                  inputRef={departmentRef}
                >
                  {departments.map((opt) => (
                    <MenuItem key={opt} value={opt}>
                      {opt}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl className="SelectInput" fullWidth>
              <InputLabel>Course</InputLabel>
              <Select
                label="Course"
                placeholder="Course"
                defaultValue=""
                size="small"
                inputRef={courseRef}
                // fullwidth="true"
              >
              {course.map((opt) => (
                <MenuItem key={opt} value={opt}>
                  {opt}
                </MenuItem>
              ))}
            </Select>
          </FormControl>



          <FormControl className="SelectInput" fullWidth>
              <InputLabel>Joining Academic Year</InputLabel>
              <Select
                label="Joining Academic Year"
                placeholder="Joining Academic Year"
                defaultValue=""
                size="small"
                inputRef={joiningYearRef}
                // fullwidth="true"
              >
              {DegreeYear.map((opt) => (
                <MenuItem key={opt} value={opt}>
                  {opt}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

            </div>
          </div>

          <input className="btn mt-2" type="submit" value="Register" />

          <div className="to-login mb-1">
            <p>Already have an account ?</p>
            <Link to="/" className="btn-outlined">
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Student;
