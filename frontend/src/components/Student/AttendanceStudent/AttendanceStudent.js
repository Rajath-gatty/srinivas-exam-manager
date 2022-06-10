import FilterSearch from "../../UI/FilterSearch/FilterSearch";
import AttendanceStudentList from "./AttendanceStudentList";
import "./AttendanceStudent.css";
const AttendanceStudent = () => {

  return (
    <div className="attendance-filter">
      <FilterSearch />
      <div className="attendance-main-box">
        <div className="header">
          <h3>SEM1</h3>
        </div>
        <table className="marks-table">
          <thead className="thead">
            <tr>
              <th>Subject</th>
              <th>SubjectCode</th>
              <th>Marks</th>
              <th>Attendance</th>
            </tr>
          </thead>
          <tbody>
            <AttendanceStudentList></AttendanceStudentList>
            <AttendanceStudentList></AttendanceStudentList>
            <AttendanceStudentList></AttendanceStudentList>
            <AttendanceStudentList></AttendanceStudentList>
            <AttendanceStudentList></AttendanceStudentList>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AttendanceStudent;
