import React, { useState } from "react";
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
  Button,
} from "@mui/material";
import Navbar from "../../components/Navbar/Navbar";
import Dob from "../../components/UI/Dob";
import RadioInput from "../../components/UI/RadioInput";
import SelectInput from "../../components/UI/SelectInput";

const Student = () => {
  //Toggle Guardian Details Show/Hide
  const GuardianToggle = () => {
    if (document.getElementById("guardian-yes").checked)
      document.querySelector(".show-guardian").style.display = "block";
    else if (document.getElementById("guardian-no").checked)
      document.querySelector(".show-guardian").style.display = "none";
  };

  //Switch Courses Acc to Selected Department
  const [course, setCourse] = useState([]);

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
    }
  };

  return (
    <div>
      <Navbar />
      <div className="form-wrapper">
        <h2>Student Registration</h2>
        <form>
          <div className="student-form">
            <TextField
              label="First Name"
              variant="outlined"
              size="small"
              fullWidth
            />

            <TextField
              label="Last Name"
              variant="outlined"
              size="small"
              fullWidth
            />

            <TextField
              label="Phone"
              variant="outlined"
              size="small"
              fullWidth
            />

            <TextField
              label="Email"
              variant="outlined"
              size="small"
              type="email"
              fullWidth
            />

            <Dob />

            <RadioInput />

            <TextField
              label="Blood Group"
              variant="outlined"
              size="small"
              fullWidth
            />

            <TextField
              label="Aadhar Card Number"
              variant="outlined"
              size="small"
              fullWidth
            />

            <TextField
              multiline
              label="Address"
              rows={2}
              className="textarea"
            />

            <TextField
              label="Religion"
              variant="outlined"
              size="small"
              fullWidth
            />

            <TextField
              label="Caste"
              variant="outlined"
              size="small"
              fullWidth
            />

            <TextField
              label="Place of Birth"
              variant="outlined"
              size="small"
              fullWidth
            />

            <TextField
              label="District of Birth"
              variant="outlined"
              size="small"
              fullWidth
            />

            <TextField
              label="Country of Birth"
              variant="outlined"
              size="small"
              fullWidth
            />

            <TextField
              label="Identity Mark"
              variant="outlined"
              size="small"
              fullWidth
            />

            <TextField
              label="Registration No."
              variant="outlined"
              size="small"
              fullWidth
            />

            <TextField
              label="Pincode"
              variant="outlined"
              size="small"
              fullWidth
            />

            <TextField
              label="Password"
              variant="outlined"
              type="password"
              size="small"
              fullWidth
            />

            <TextField
              label="Confirm Password"
              variant="outlined"
              type="password"
              size="small"
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
                fullWidth
              />

              <TextField
                label="Occupation"
                variant="outlined"
                size="small"
                fullWidth
              />

              <TextField
                label="Mobile Number"
                variant="outlined"
                size="small"
                type="tel"
                fullWidth
              />

              <TextField
                label="Email ID"
                variant="outlined"
                size="small"
                type="email"
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
                fullWidth
              />

              <TextField
                label="Occupation"
                variant="outlined"
                size="small"
                fullWidth
              />

              <TextField
                label="Mobile Number"
                variant="outlined"
                size="small"
                type="tel"
                fullWidth
              />

              <TextField
                label="Email ID"
                variant="outlined"
                size="small"
                type="email"
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

            <div className="show-guardian" style={{ display: "none" }}>
              <h3 className="sub-hdng">Guardian's Details</h3>
              <div className="sub-details student-form">
                <TextField
                  label="Name"
                  variant="outlined"
                  size="small"
                  fullWidth
                />

                <TextField
                  label="Occupation"
                  variant="outlined"
                  size="small"
                  fullWidth
                />

                <TextField
                  label="Mobile Number"
                  variant="outlined"
                  size="small"
                  type="tel"
                  fullWidth
                />

                <TextField
                  label="Email ID"
                  variant="outlined"
                  size="small"
                  type="email"
                  fullWidth
                />
              </div>
            </div>
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
                >
                  {departments.map((opt) => (
                    <MenuItem key={opt} value={opt}>
                      {opt}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <SelectInput label="Course" options={course} />

              <SelectInput
                label="Joining Academic Year"
                options={DegreeYear}
                fullWidth
              />

              <SelectInput label="Degree Year" options={DegreeYear} fullWidth />

              <TextField
                label="Degree Batch"
                variant="outlined"
                size="small"
                fullWidth
              />
            </div>
          </div>

          <Button className="register-btn" variant="contained">
            Register
          </Button>

          <div className="to-login">
            <p>Already have an account ?</p>
            <Link to="/">Login</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Student;
