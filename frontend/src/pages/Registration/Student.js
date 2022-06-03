import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import dateFormat from "dateformat";
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
  const [gender, setGender] = useState("");
  //Toggle Guardian Details Show/Hide
  const [showGuardian, setShowGuardian] = useState("");
  const GuardianToggle = (e) => {
    if (e.target.value === "yes") setShowGuardian(true);
    if (e.target.value === "no") setShowGuardian(false);
  };

  //Switch Courses Acc to Selected Department
  const [course, setCourse] = useState([]);
  const [passErr, setPassErr] = useState(false);
  const [errors, setErrors] = useState([]);

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
  const dobRef = useRef({ dateRef, monthRef, yearRef });
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

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const dob = `${dateRef.current.value}-${monthRef.current.value}-${yearRef.current.value}`;
    const dobErr = dob.length > 4;
    const studentData = {
      regno: regnoRef.current.value,
      firstName: firstNameRef.current.value,
      lastName: lastNameRef.current.value,
      dob: dobErr && dateFormat(dob, "dd-mm-yyyy"),
      gender: gender,
      email: emailRef.current.value,
      phone: phoneRef.current.value,
      address: addressRef.current.value,
      bloodGroup: bloodGroupRef.current.value,
      caste: casteRef.current.value,
      aadharNo: aadharNoRef.current.value,
      religion: religionRef.current.value,
      birthPlace: birthPlaceRef.current.value,
      birthDistrict: birthDistrictRef.current.value,
      country: countryRef.current.value,
      identityMark: identityMarkRef.current.value,
      pincode: pincodeRef.current.value,
      password: passwordRef.current.value,
      cPasword: cPasswordRef.current.value,
      fatherName: fatherNameRef.current.value,
      fatherOccupation: fatherOccupationRef.current.value,
      fatherPhone: fatherPhoneRef.current.value,
      fatherEmail: fatherEmailRef.current.value,
      motherName: motherNameRef.current.value,
      motherOccupation: motherOccupationRef.current.value,
      motherPhone: motherPhoneRef.current.value,
      motherEmail: motherEmailRef.current.value,
      gName: gNameRef.current?.value || "",
      gOccupation: gOccupationRef.current?.value || "",
      gPhone: gPhoneRef.current?.value || "",
      gEmail: gEmailRef.current?.value || "",
      department: departmentRef.current.value,
      course: courseRef.current.value,
      joiningYear: joiningYearRef.current.value,
    };

    if (studentData.password !== studentData.cPasword) {
      setPassErr(true);
    } else {
      try {
        const result = await axios.post(
          "http://localhost:8080/registration/student",
          studentData
        );
        console.log(result);
        setErrors([]);
        setPassErr(false);
      } catch (err) {
        setErrors(err.response.data.err);
        console.log(err.response.data.err);
      }
      setPassErr(false);
    }
  };

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
              fullWidth
              required
              error={errors.some((err) => err.param === "firstName")}
              helperText={errors.find((err) => err.param === "firstName")?.msg}
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
              error={errors.some((err) => err.param === "phone")}
              helperText={errors.find((err) => err.param === "phone")?.msg}
            />

            <TextField
              label="Email"
              variant="outlined"
              size="small"
              type="email"
              inputRef={emailRef}
              required
              fullWidth
              error={errors.some((err) => err.param === "email")}
              helperText={errors.find((err) => err.param === "email")?.msg}
            />

            <Dob required ref={dobRef} />

            <RadioInput required setGender={setGender} />

            <TextField
              label="Blood Group"
              variant="outlined"
              size="small"
              inputRef={bloodGroupRef}
              fullWidth
              error={errors.some((err) => err.param === "bloodGroup")}
              helperText={errors.find((err) => err.param === "bloodGroup")?.msg}
            />

            <TextField
              label="Aadhar Card Number"
              variant="outlined"
              size="small"
              inputRef={aadharNoRef}
              fullWidth
              error={errors.some((err) => err.param === "aadharNo")}
              helperText={errors.find((err) => err.param === "aadharNo")?.msg}
            />

            <TextField
              multiline
              label="Address"
              rows={2}
              inputRef={addressRef}
              className="textarea"
              error={errors.some((err) => err.param === "address")}
              helperText={errors.find((err) => err.param === "address")?.msg}
            />

            <TextField
              label="Religion"
              variant="outlined"
              size="small"
              inputRef={religionRef}
              fullWidth
              error={errors.some((err) => err.param === "religion")}
              helperText={errors.find((err) => err.param === "religion")?.msg}
            />

            <TextField
              label="Caste"
              variant="outlined"
              size="small"
              inputRef={casteRef}
              fullWidth
              error={errors.some((err) => err.param === "caste")}
              helperText={errors.find((err) => err.param === "caste")?.msg}
            />

            <TextField
              label="Place of Birth"
              variant="outlined"
              size="small"
              inputRef={birthPlaceRef}
              fullWidth
              error={errors.some((err) => err.param === "birthPlace")}
              helperText={errors.find((err) => err.param === "birthPlace")?.msg}
            />

            <TextField
              label="District of Birth"
              variant="outlined"
              size="small"
              inputRef={birthDistrictRef}
              fullWidth
              error={errors.some((err) => err.param === "birthDistrict")}
              helperText={
                errors.find((err) => err.param === "birthDistrict")?.msg
              }
            />

            <TextField
              label="Country of Birth"
              variant="outlined"
              size="small"
              inputRef={countryRef}
              fullWidth
              error={errors.some((err) => err.param === "country")}
              helperText={errors.find((err) => err.param === "country")?.msg}
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
              error={errors.some((err) => err.param === "regno")}
              helperText={errors.find((err) => err.param === "regno")?.msg}
            />

            <TextField
              label="Pincode"
              variant="outlined"
              size="small"
              inputRef={pincodeRef}
              fullWidth
              error={errors.some((err) => err.param === "pincode")}
              helperText={errors.find((err) => err.param === "pincode")?.msg}
            />

            <TextField
              label="Password"
              variant="outlined"
              type="password"
              size="small"
              inputRef={passwordRef}
              fullWidth
              error={errors.some((err) => err.param === "password")}
              helperText={errors.find((err) => err.param === "password")?.msg}
            />

            <TextField
              label="Confirm Password"
              variant="outlined"
              type="password"
              size="small"
              error={passErr}
              helperText={passErr && "Passwords Does not match"}
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
                fullWidtherror={errors.some(
                  (err) => err.param === "fatherName"
                )}
                helperText={
                  errors.find((err) => err.param === "fatherName")?.msg
                }
              />

              <TextField
                label="Occupation"
                variant="outlined"
                size="small"
                inputRef={fatherOccupationRef}
                fullWidtherror={errors.some(
                  (err) => err.param === "fatherOccupation"
                )}
                helperText={
                  errors.find((err) => err.param === "fatherOccupation")?.msg
                }
              />

              <TextField
                label="Mobile Number"
                variant="outlined"
                size="small"
                type="tel"
                inputRef={fatherPhoneRef}
                fullWidtherror={errors.some(
                  (err) => err.param === "fatherPhone"
                )}
                helperText={
                  errors.find((err) => err.param === "fatherPhone")?.msg
                }
              />

              <TextField
                label="Email ID"
                variant="outlined"
                size="small"
                type="email"
                inputRef={fatherEmailRef}
                fullWidtherror={errors.some(
                  (err) => err.param === "fatherEmail"
                )}
                helperText={
                  errors.find((err) => err.param === "fatherEmail")?.msg
                }
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
                fullWidtherror={errors.some(
                  (err) => err.param === "motherName"
                )}
                helperText={
                  errors.find((err) => err.param === "motherName")?.msg
                }
              />

              <TextField
                label="Occupation"
                variant="outlined"
                size="small"
                inputRef={motherOccupationRef}
                fullWidtherror={errors.some(
                  (err) => err.param === "motherOccupation"
                )}
                helperText={
                  errors.find((err) => err.param === "motherOccupation")?.msg
                }
              />

              <TextField
                label="Mobile Number"
                variant="outlined"
                size="small"
                type="tel"
                inputRef={motherPhoneRef}
                fullWidtherror={errors.some(
                  (err) => err.param === "motherPhone"
                )}
                helperText={
                  errors.find((err) => err.param === "motherPhone")?.msg
                }
              />

              <TextField
                label="Email ID"
                variant="outlined"
                size="small"
                type="email"
                inputRef={motherEmailRef}
                fullWidtherror={errors.some(
                  (err) => err.param === "motherEmail"
                )}
                helperText={
                  errors.find((err) => err.param === "motherEmail")?.msg
                }
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
                    fullWidtherror={errors.some(
                      (err) => err.param === "religion"
                    )}
                    helperText={
                      errors.find((err) => err.param === "religion")?.msg
                    }
                  />

                  <TextField
                    label="Occupation"
                    variant="outlined"
                    size="small"
                    inputRef={gOccupationRef}
                    fullWidtherror={errors.some(
                      (err) => err.param === "religion"
                    )}
                    helperText={
                      errors.find((err) => err.param === "religion")?.msg
                    }
                  />

                  <TextField
                    label="Mobile Number"
                    variant="outlined"
                    size="small"
                    type="tel"
                    inputRef={gPhoneRef}
                    fullWidtherror={errors.some(
                      (err) => err.param === "religion"
                    )}
                    helperText={
                      errors.find((err) => err.param === "religion")?.msg
                    }
                  />

                  <TextField
                    label="Email ID"
                    variant="outlined"
                    size="small"
                    type="email"
                    inputRef={gEmailRef}
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
                  fullWidth
                  error={errors.some((err) => err.param === "department")}
                  helperText={
                    errors.find((err) => err.param === "department")?.msg
                  }
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
                  fullWidtherror={errors.some((err) => err.param === "course")}
                  helperText={errors.find((err) => err.param === "course")?.msg}
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
                  fullWidtherror={errors.some(
                    (err) => err.param === "joiningYear"
                  )}
                  helperText={
                    errors.find((err) => err.param === "joiningYear")?.msg
                  }
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
