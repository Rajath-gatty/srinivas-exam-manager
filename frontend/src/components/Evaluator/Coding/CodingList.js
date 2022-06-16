import { TextField } from "@mui/material";
const CodingList = () => {
    return (
        <tr className="coding-table-row">
            <td>John</td>
            <td>3SU19SA060</td>
            <td><TextField
                size="small"
                id="outlined-basic"
                variant="outlined"
            /></td>
            <td><TextField
                size="small"
                id="outlined-basic"
                variant="outlined"
            /></td>
        </tr>

    )
}

export default CodingList;
