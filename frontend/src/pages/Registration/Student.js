import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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
  FormHelperText,
} from "@mui/material";
import Navbar from "../../components/Navbar/Navbar";
import Dob from "../../components/UI/Dob";
import RadioInput from "../../components/UI/RadioInput";
import { useFetchDepartment } from "../../hooks/useFetchDepartments";
import {toast} from "react-toastify";

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
  const [fileErr,setFileErr] = useState('');
  const [photo,setPhoto] = useState(false);
  const [fileUrl,setFileUrl] = useState('');
  const [passErr, setPassErr] = useState(false);
  const [errors, setErrors] = useState([]);

  const semester = ["1", "2", "3", "4", "5", "6"];
  const DegreeYear = [
     2015, 2016,
    2017, 2018, 2019, 2020, 2021,2022,2023,2024,2025,2026,2027,2028,2029
  ];

  const departments = useFetchDepartment();
  const navigate = useNavigate();

  const SwitchCourse = async(evt) => {
    const dept = evt.target.value;
    try {
      const result = await axios.post('/courses',{departmentName:dept});
      setCourse(result.data);
    } catch(err) {
      console.log(err);
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
  const semesterRef = useRef();
  const joiningYearRef = useRef();

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    
    const dob = `${dateRef.current.value}-${monthRef.current.value}-${yearRef.current.value}`;
    const dobErr = dob.length >=10;
    const studentData = {
      regno: regnoRef.current.value.toUpperCase(),
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
      semester: semesterRef.current.value,
      joiningYear: joiningYearRef.current.value
    };
    const formData = new FormData();
    
    formData.append('studentProfile',photo);
    for (const key in studentData) {
      formData.append(key,studentData[key]);
    }

    if (studentData.password !== studentData.cPasword) {
      return setPassErr(true);
    } else {
      try {
        const result = await axios.post("/registration/student",formData);
        console.log(result);
        setErrors([]);
        setPassErr(false);
        
        toast.success("User Registered Successfully!", {
          isLoading: false, 
          autoClose: 3000, 
          closeOnClick: true,
          draggable: true });
        
          //Sending Push Notification to Staff
        try{
          const pushData = {
            sendTo: "staff",
            body: "New Student Registered"
          }
          const res = await axios.post('/pushsendnotification', pushData); 
          console.log(res.data);
        } catch(err) {
          console.log(err);
        }
        
        navigate("/login");
      } catch (err) {
        console.log(err);
        if(err.response.status===400) {
          setErrors(err?.response?.data?.err);
        }

        toast.error("Fill all the required fields!", {
          isLoading: false, 
          autoClose: 3000, 
          closeOnClick: true,
          draggable: true });
      }
      setPassErr(false);
    }
  };

  const handleFile = (e) => {
    const file = e.target.files[0];
    setFileErr('');
    if(!(file.type==='image/jpg' || file.type==='image/jpeg' || file.type==='image/png')) {
      setFileUrl('');
      return setFileErr('Invalid Image type');
    }

    if(file.size/1024>4000) {
      setFileUrl('');
     return setFileErr('Image size must be less than 4mb');
    }

    setFileErr('');
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setFileUrl(reader.result);
    }
    setPhoto(file);
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
              fullWidth
              required
              error={errors?.some((err) => err.param === "firstName")}
              helperText={errors?.find((err) => err.param === "firstName")?.msg}
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
              type="number"
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

            <Dob
              required
              ref={dobRef}
              error={errors.some((err) => err.param === "dob")}
              helperText={errors.find((err) => err.param === "dob")?.msg}
            />

            <RadioInput
              required
              setGender={setGender}
              error={errors.some((err) => err.param === "gender")}
              helperText={errors.find((err) => err.param === "gender")?.msg}
            />

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
              type="number"
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
              type="number"
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
                fullWidth
                error={errors.some(
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
                fullWidth
                error={errors.some(
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
                type="number"
                inputRef={fatherPhoneRef}
                fullWidth
                error={errors.some(
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
                fullWidth
                error={errors.some(
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
                fullWidth
                error={errors.some(
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
                fullWidth
                error={errors.some(
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
                type="number"
                inputRef={motherPhoneRef}
                fullWidth
                error={errors.some(
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
                fullWidth
                error={errors.some(
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
                    fullWidth
                    error={errors.some(
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
                    fullWidth
                    error={errors.some(
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
                    type="number"
                    inputRef={gPhoneRef}
                    fullWidth
                    error={errors.some(
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
              <FormControl className="SelectInput" fullWidth>
                <InputLabel>Department</InputLabel>
                <Select
                  label="Department"
                  defaultValue=""
                  size="small"
                  onChange={SwitchCourse}
                  inputRef={departmentRef}
                  fullWidth
                  error={errors.some((err) => err.param === "department")}
                >
                  {departments.map((opt) => (
                    <MenuItem key={opt.dept_id} value={opt.dept_name}>
                      {opt.dept_name}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText error>{errors.find((err) => err.param === "department")?.msg}</FormHelperText>
              </FormControl>

              <FormControl className="SelectInput" fullWidth>
                <InputLabel>Course</InputLabel>
                <Select
                  label="Course"
                  placeholder="Course"
                  defaultValue=""
                  size="small"
                  inputRef={courseRef}
                  fullWidth
                  error={errors.some((err) => err.param === "course")}
                  // fullwidth="true"
                >
                  {course.map((opt) => (
                    <MenuItem key={opt.course_id} value={opt.course_name}>
                      {opt.course_name}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText error>{errors.find((err) => err.param === "course")?.msg}</FormHelperText>
              </FormControl>
              
              <FormControl className="SelectInput" fullWidth>
                <InputLabel>Semester</InputLabel>
                <Select
                  label="Semester"
                  placeholder="Semester"
                  defaultValue=""
                  size="small"
                  inputRef={semesterRef}
                  fullWidth
                  error={errors.some((err) => err.param === "semester")}
                  // fullwidth="true"
                >
                  {semester.map((opt) => (
                    <MenuItem key={opt} value={opt}>
                      {opt}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText error>{errors.find((err) => err.param === "semester")?.msg}</FormHelperText>
              </FormControl>

              <FormControl className="SelectInput" fullWidth>
                <InputLabel>Joining Academic Year</InputLabel>
                <Select
                  label="Joining Academic Year"
                  placeholder="Joining Academic Year"
                  defaultValue=""
                  size="small"
                  type="number"
                  inputRef={joiningYearRef}
                  fullWidth
                  error={errors.some(
                    (err) => err.param === "joiningYear"
                  )}
                  // fullwidth="true"
                >
                  {DegreeYear.map((opt) => (
                    <MenuItem key={opt} value={opt}>
                      {opt}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText error>{errors.find((err) => err.param === "joiningYear")?.msg}</FormHelperText>
              </FormControl>

              {/* <div className="img-upload-wrapper">
                <label htmlFor="student-profile">Upload Photo</label>
                    <input type="file" name="studentProfile" id="studentProfile" />
              </div> */}

            </div>
              <div className="upload-photo-wrapper" >
                <div>
              <p className="upload-label">Upload Photo</p>
              <TextField
                    size="small"
                    type="file"
                    hidden
                    name="file-upload"
                    className="upload-photo"
                    error={fileErr.length>0}
                    helperText={fileErr}
                    onChange={(e) => handleFile(e)}
                    required
                  />
                  <FormHelperText>max size 4MB supported types JPEG, JPG and PNG</FormHelperText>
                  </div>
                  <img src={fileUrl} alt="Upload Preview"/>
              </div>
          </div>
          <input className="register-btn btn mt-1" type="submit" value="Register" />

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
