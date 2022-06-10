import React from "react";
import { Link } from "react-router-dom";
import {
  TextField,
  Select,
  InputLabel,
  MenuItem,
  FormControl
} from "@mui/material";
import Navbar from "../../components/Navbar/Navbar";

import RadioInput from "../../components/UI/RadioInput";

const Evaluator = () => {
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
  return (
    <div>
      <Navbar />
      <div className="form-wrapper">
        <h2>Exam Coordinator Registration</h2>
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



            <RadioInput />



            <FormControl className="SelectInput">
              <InputLabel>Department</InputLabel>
              <Select
                label="Department"
                defaultValue=""
                size="small"
              >
                {departments.map((opt) => (
                  <MenuItem key={opt} value={opt}>
                    {opt}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

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




          <input className="btn" type="submit" value="Register" disabled />

          <div className="to-login">
            <p>Already have an account ?</p>
            <Link to="/" className="btn-outlined">Login</Link>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Evaluator;