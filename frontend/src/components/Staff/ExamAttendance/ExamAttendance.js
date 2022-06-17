import FilterSearch from "../../UI/FilterSearch/FilterSearch";
import "./ExamAttendance.css";
const AttendanceStatement = () => {


    return (
        <div className="admin-attendance-main">
            <FilterSearch />
            <div className="admin-main-box">
                <div className="main-box-header">
                    <span className="text">Attendance Statement</span>
                </div>
                <tr className="text-field">
                    <td>Subject Name</td>
                    <td className="input-row"><input type="text"></input></td>
                </tr>
                <tr className="text-field">
                    <td>Subject Code</td>
                    <td className="input-row"><input type="text"></input></td>
                </tr>
                <tr className="text-field">
                    <td>Total No students</td>
                    <td className="input-row"><input type="text"></input></td>
                </tr>
                <tr className="text-field">
                    <td>No of absenties</td>
                    <td className="input-row"><input type="text"></input></td>
                </tr>
                <div className="button">
                    <h3>Submit</h3>
                </div>
            </div>
        </div>

    )
}

export default AttendanceStatement;