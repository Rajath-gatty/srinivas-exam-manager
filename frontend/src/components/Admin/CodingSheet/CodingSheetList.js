import { TextField } from "@mui/material";
import { FaUserCircle } from "react-icons/fa";

const CodingSheetList = ({data,serverUrl,handleMarkChange,selectedSubject,markAttendance,index}) => {
    return (
        <tr className="attendance-table-row">
            <td className="attendance-avatar-wrapper">
                {!data.image_path?<FaUserCircle color="var(--light-grey)" size={25} />:
                <img src={serverUrl+data.image_path} className="profile-img" width="100px" alt=""/>}
            </td>
            <td>{data.regno}</td>
            <td>{data.first_name+' '+data.last_name}</td>
            <td>{data.semester}</td>
            <td className="attendance-textfield">
                <TextField
                className="codingSheet-input"
                disabled={selectedSubject===data.subj_name}
                defaultValue={selectedSubject===data.subj_name?data.coding_sheet:""}
                onChange={(e)=>{handleMarkChange(index,e.target.value,data.regno)}}
                variant="outlined"
                type="number"
                size="small" />
            </td>
        </tr>

    )
}

export default CodingSheetList;