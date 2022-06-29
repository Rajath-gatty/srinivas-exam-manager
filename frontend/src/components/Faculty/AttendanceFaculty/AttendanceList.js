import { TextField } from "@mui/material";
import { FaUserCircle } from "react-icons/fa";

const AttendanceList = ({data,serverUrl,handleAttendanceChange,handleMarkChange,markAttendance,index}) => {
    return (
        <tr className="attendance-table-row">
            <td className="attendance-avatar-wrapper">
                {!data.image_path?<FaUserCircle color="var(--light-grey)" size={25} />:
                <img src={serverUrl+data.image_path} className="profile-img" width="100px" alt=""/>}
            </td>
            <td>{data.regno}</td>
            <td>{data.first_name+' '+data.last_name}</td>
            <td>{data.semester}</td>
            <td className="attendance-textfield"><TextField
                value={markAttendance[index]?.attendance}
                onChange={(e)=>{handleAttendanceChange(index,e.target.value,data.regno)}}
                variant="outlined"
                type="number"
                size="small"></TextField></td>
            <td className="attendance-textfield"><TextField
            value={markAttendance[index]?.mark}
            onChange={(e)=>{handleMarkChange(index,e.target.value,data.regno)}}
                variant="outlined"
                type="number"
                size="small"></TextField></td>

        </tr>

    )
}

export default AttendanceList;
