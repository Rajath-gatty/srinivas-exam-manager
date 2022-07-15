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
} from "@mui/material";
import StudentUsers from "../StudentUsers";

const Create = () => {
  const navigate = useNavigate();
  const DegreeYear = [2018, 2019, 2020, 2021,2022,2023,2024,2025,2026,2027];
 const Courses = ["BCA", "MCA"];
 const Semesters = [1,2,3,4,5,6];

  const HandleCreateClass = () =>{
    toast.success('Classroom created successfully');
    navigate('/classrooms');
  }

  return (
    <div className="CreateClass-container">
      <Back top="-1em" left="0"/>
      <div className="CreateClass-Main">
        <div className="CreateClass-Header">
          <h1>Create Classroom</h1>
        </div>
        <div className="CreateClass-form-container">
        <form className="CreateClass-form flex" onSubmit={HandleCreateClass}>
          <div className="CreateClass-formRow">
            <TextField
              className="TextInput"
              label="Classroom Name"
              variant="outlined"
              size="small"
              fullWidth
              required
            />
            
            <FormControl className="SelectMenu Mr">
              <InputLabel>Class Batch</InputLabel>
              <Select
                label="Class Batch"
                placeholder="Class Batch" 
                defaultValue=""
                value=""
                size="small"
                type="number"
                required
              >
                {DegreeYear.map((opt) => (
                  <MenuItem key={opt} value={opt}>
                    {opt}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>

          <div className="CreateClass-formRow">
            <FormControl className="SelectMenu">
                <InputLabel>Course</InputLabel>
                <Select
                  label="Course"
                  placeholder="Course" 
                  defaultValue=""
                  value=""
                  size="small"
                  type="number"
                  required
                  fullWidth
                >
                  {Courses.map((opt) => (
                    <MenuItem key={opt} value={opt}>
                      {opt}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            
            <FormControl className="SelectMenu">
                <InputLabel>Semester</InputLabel>
                <Select
                  label="Semester"
                  placeholder="Semester" 
                  defaultValue=""
                  value=""
                  size="small"
                  type="number"
                  required
                >
                  {Semesters.map((opt) => (
                    <MenuItem key={opt} value={opt}>
                      {opt}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
          </div>
        </form>
        </div>
        </div>

        <div className="CreateClass-SelectUsers">
          <h2>Add Students</h2>
          <StudentUsers showCheckbox hideEligible/>
        </div>
    </div>
  )
}

export default Create