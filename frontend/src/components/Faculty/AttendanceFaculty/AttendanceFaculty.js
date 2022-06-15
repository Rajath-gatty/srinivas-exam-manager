import "./AttendanceFaculty.css";
import AttendanceList from "./AttendanceList";
import FilterSearch from "../../UI/FilterSearch/FilterSearch";

const AttendanceFaculty = () => {
  return (
    <div className="faculty-attendance-main">
      <FilterSearch search/>

      <table className="faculty-attendance-table-wrapper">
        <thead className="thead">
          <tr>
            <th>Profile</th>
            <th>RegNo.</th>
            <th>Name</th>
            <th>Semester</th>
            <th>Java</th>
          </tr>
        </thead>
        <tbody>
          <AttendanceList />
          <AttendanceList />
          <AttendanceList />
          <AttendanceList />
          <AttendanceList />
          <AttendanceList />
          <AttendanceList />
          <AttendanceList />
          <AttendanceList />
          <AttendanceList />
        </tbody>
      </table>
    </div>
  );
};

export default AttendanceFaculty;
