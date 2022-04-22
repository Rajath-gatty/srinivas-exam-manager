import { FaUserCircle } from "react-icons/fa";
const AttendanceList = () => {
    return (
        <tr className="attendance-table-row">
            <td className="attendance-avatar-wrapper">
                <FaUserCircle color="var(--light-grey)" size={25} />
            </td>
            <td>3SU19SA010</td>
            <td>John</td>
            <td>V</td>
            <td className="attendance-input-row"><input type="text"></input></td>
            <td className="attendance-input-row"><input type="text"></input></td>
            <td className="attendance-input-row"><input type="text"></input></td>
        </tr>

    )
}

export default AttendanceList;
