import "./TotalUsers.css";
import { useEffect, useState } from "react";
import UserList from "./UserList";
import FilterSearch from "../UI/FilterSearch/FilterSearch";
import axios from "axios";

const TotalUsers = ({type}) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async() => {
      try {
        const result = await axios.get(`/users/${type}`)
      } catch(err) {
        console.log(err);
      }
    }
  },[])
  return (
    <div className="users-main">
      <FilterSearch search />

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
