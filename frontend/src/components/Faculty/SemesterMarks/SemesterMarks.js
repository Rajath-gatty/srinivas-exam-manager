import "./SemesterMarks.css";
import SemesterMarksList from "./SemesterMarksList";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { toast } from "react-toastify";

const SemesterMarks = () => {
    const bundle = [
        "22SDA010",
        "22SDA020"
    ];

    const HandleSemMarks = () =>{
        toast.success("Semester Marks Updated!", {
        isLoading: false, 
        autoClose: 3000, 
        closeOnClick: true,
        draggable: true
        });
    }

    return (
        <div className="semester-main">
            <div className="flex">
                <FormControl className="filter-Search">
                    <InputLabel>Filter by BundleNo.</InputLabel>
                    <Select
                        label="bundle"
                        defaultValue=""
                        placeholder="Filter by bundle"
                        size="small"
                    >
                        {bundle.map((opt) => (
                            <MenuItem key={opt} value={opt}>
                                {opt}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

            </div>

            <table className="semester-table-wrapper">
                <thead className="thead">
                    <tr>
                        <th>Coding Sheet No</th>

                        <th>Java</th>

                    </tr>
                </thead>
                <tbody>
                    <SemesterMarksList></SemesterMarksList>
                    <SemesterMarksList></SemesterMarksList>
                    <SemesterMarksList></SemesterMarksList>
                    <SemesterMarksList></SemesterMarksList>
                    <SemesterMarksList></SemesterMarksList>
                </tbody>

            </table>
            <button onClick={HandleSemMarks} className="submit">Submit</button>
        </div>

    );
};

export default SemesterMarks;
