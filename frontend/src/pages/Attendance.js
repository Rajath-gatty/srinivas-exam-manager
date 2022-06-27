import { useContextData } from "../hooks/useContextData";
import AttendanceStudent from "../components/Student/AttendanceStudent/AttendanceStudent";
import AttendanceFaculty from "../components/Faculty/AttendanceFaculty/AttendanceFaculty";

const Attendance = () => {
  const { role } = useContextData();

  return (
    <div
      className="attendance-container" style={{width: "100%", height: "100%"}}>
      {role === "student" ? <AttendanceStudent /> : <AttendanceFaculty />}
    </div> 
  );
};

export default Attendance;
