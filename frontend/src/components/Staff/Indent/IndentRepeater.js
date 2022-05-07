import "./IndentRepeater.css";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import IndentRepeaterList from "./IndentRepeaterList";
const IndentRepeater = () => {
     const departments = [
          "BCA",
          "BBA",
          "BCOM",
          "BHM",
          "BPT"
     ];
     const semeseter = [
          "sem1",
          "sem2",
          "sem3",
          "sem4",
     ]
     return (
          <div className="indent-main">
               <div className="filter-wrapper">

                    <div className="filter-eligibility">
                         <FormControl className="SelectInput">
                              <InputLabel>Filter by Semeseter</InputLabel>
                              <Select
                                   label="semester"
                                   defaultValue=""
                                   placeholder="Filter by semester"
                                   size="small"
                                   className="select-filter"
                              >
                                   {semeseter.map((opt) => (
                                        <MenuItem key={opt} value={opt}>
                                             {opt}
                                        </MenuItem>
                                   ))}
                              </Select>
                         </FormControl>
                    </div>
                    <div className="filter-by-course">
                         <FormControl className="SelectInput">
                              <InputLabel>Filter by Department</InputLabel>
                              <Select
                                   className="select-filter"
                                   label="Department"
                                   defaultValue=""
                                   placeholder="Filter by Course"
                                   size="small"
                              >
                                   {departments.map((opt) => (
                                        <MenuItem key={opt} value={opt}>
                                             {opt}
                                        </MenuItem>
                                   ))}
                              </Select>
                         </FormControl>

                    </div>
               </div>
               <div className="main-box">
                    <div className="main-header">
                         <h2>SEM1</h2>
                    </div>
                    <table className="indent-table-wrapper">
                         <thead className="thead">
                              <tr>
                                   <th>Subject</th>
                                   <th>SubjectCode</th>
                                   <th>TotalStudents</th>

                              </tr>
                         </thead>
                         <tbody>
                              <IndentRepeaterList></IndentRepeaterList>
                              <IndentRepeaterList></IndentRepeaterList>
                              <IndentRepeaterList></IndentRepeaterList>
                              <IndentRepeaterList></IndentRepeaterList>
                              <IndentRepeaterList></IndentRepeaterList>



                         </tbody>
                    </table>
               </div>

          </div>


     );
};

export default IndentRepeater;