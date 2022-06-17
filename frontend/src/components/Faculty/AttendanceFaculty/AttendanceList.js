import { TextField } from "@mui/material";
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
            <td ><TextField
                variant="outlined"
                size="small"></TextField></td>

        </tr>

    )
}

export default AttendanceList;
