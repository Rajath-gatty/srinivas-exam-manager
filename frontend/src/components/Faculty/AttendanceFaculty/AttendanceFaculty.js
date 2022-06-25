import "./AttendanceFaculty.css";
import AttendanceList from "./AttendanceList";
import FilterSearch from "../../UI/FilterSearch/FilterSearch";
import { toast } from "react-toastify";

const AttendanceFaculty = () => {

  const HandleAttendanceSubmit = () =>{
    //Temp Logic pending
    toast.success("Attendance Updated Successfully!", {
      isLoading: false, 
      autoClose: 3000, 
      closeOnClick: true,
      draggable: true
    });
  }

  return (
    <div className="faculty-attendance-main">
      <FilterSearch search />

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

        </tbody>
      </table>
      <button onClick={HandleAttendanceSubmit} className="submit">Submit</button>
    </div>
  );
};

export default AttendanceFaculty;
