import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import "./TotalUsers.css";
import UserList from "./UserList";
import FilterSearch from "../UI/FilterSearch/FilterSearch";

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
      <FilterSearch />

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
          <UserList eligible />
          <UserList />
          <UserList />
          <UserList eligible />
          <UserList eligible />
          <UserList />
          <UserList eligible />
          <UserList />
          <UserList eligible />
          <UserList />
        </tbody>
      </table>
    </div>
  );
};

export default TotalUsers;
