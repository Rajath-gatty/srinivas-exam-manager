import {FormControl,InputLabel,Select,MenuItem} from "@mui/material";
import "./TotalUsers.css";
import UserList from "./UserList";

const TotalUsers = () => {

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
   <div className="users-main">
       <div className="filter-wrapper">
           <form className="search-form">
               <input type="text" placeholder="Search" className="search-input"/>
           </form>
            <div className="filter-eligibility">
            <FormControl className="SelectInput">
                <InputLabel>Filter by Eligibility</InputLabel>
                <Select
                  label="Department"
                  defaultValue=""
                  placeholder="Filter by Course"
                  size="small"
                  className="select-filter"
                >
                  {departments.map((opt) => (
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
       <table className="users-table-wrapper">
           <thead className="thead">
            <tr>
                <th>Profile</th>
                <th>RegNo.</th>
                <th>Name</th>
                <th>Course</th>
                <th>Batch</th>
                <th>Semester</th>
                <th>Eligiblity</th>
            </tr>
           </thead>
           <tbody>
               <UserList eligible/>
               <UserList/>
               <UserList/>
               <UserList eligible/>
               <UserList eligible/>
               <UserList/>
               <UserList eligible/>
               <UserList/>
               <UserList eligible/>
               <UserList/>
           </tbody>
       </table>
   </div>
);
}

export default TotalUsers;