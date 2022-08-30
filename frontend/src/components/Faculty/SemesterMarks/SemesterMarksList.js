import { TextField } from "@mui/material";
import { FaUserCircle } from "react-icons/fa";

const SemesterMarksList = ({data,handleMarkChange,markAttendance,index}) => {
    return (
        <tr className="attendance-table-row">
            <td>1</td>
            <td>{data.semester}</td>
            <td>46734536</td>
            <td className="attendance-textfield"><TextField
            value={markAttendance[index]?.mark?markAttendance[index].mark:""}
            onChange={(e)=>{handleMarkChange(index,e.target.value,data.regno)}}
                variant="outlined"
                type="number"
                size="small"></TextField></td>
        </tr>
    )
}

export default SemesterMarksList;
