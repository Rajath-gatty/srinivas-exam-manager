import React from "react";
import { Link } from "react-router-dom";
import {
  TextField,
  Button,
  Select,
  InputLabel,
  MenuItem,
  FormControl
} from "@mui/material";
import Navbar from "../../components/Navbar/Navbar";
import Dob from "../../components/UI/Dob";
import RadioInput from "../../components/UI/RadioInput";

const Staff = () => {
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
    return(
        <div>
        <Navbar />
        <div className="form-wrapper">
          <h2>Staff Registration</h2>
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
                label="Date of Join"
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
  
            <div className="sub-wrapper">
              <h3 className="sub-hdng">Father/Spouse Details</h3>
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
  
            <input className="btn" type="submit" value="Register" disabled/>

            <div className="to-login">
              <p>Already have an account ?</p>
              <Link to="/" className="btn-outlined">Login</Link>
            </div>
          </form>
        </div>
      </div>
    )
}

export default Staff;