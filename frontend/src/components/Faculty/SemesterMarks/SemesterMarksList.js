import { TextField } from "@mui/material";
const SemesterMarksList = () => {
    return (
        <tr className="semester-table-row">

            <td>3SU19820</td>
            <td>1293874</td>
            <td>V</td>
            <td><TextField
                variant="outlined"
                size="small"></TextField></td>
        </tr>

    );
};

export default SemesterMarksList;
