import {useContextData} from '../hooks/useContextData';
import AttendanceStudent from '../components/Student/AttendanceStudent/AttendanceStudent';
import AttendanceFaculty from '../components/Faculty/AttendanceFaculty/AttendanceFaculty';

const Attendance = () => {
  const { role } = useContextData();

    return(
        <div className="attendance-container">
            {role === "student" ? <AttendanceStudent /> : <AttendanceFaculty />}
        </div>
    );
}

export default Attendance;