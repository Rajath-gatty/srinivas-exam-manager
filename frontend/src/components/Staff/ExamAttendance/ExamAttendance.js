import "./ExamAttendance.css";
import ExamAttendanceList from "./ExamAttendanceList";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { HiDownload } from "react-icons/hi";
import { TextField } from "@mui/material";
import FilterSearch from "../../UI/FilterSearch/FilterSearch";

const ExamAttendance = () => {

    const subject = ["HTML", "Java", "Software Engineering", "C++"];

    //   const semeseter = ["sem1", "sem2", "sem3", "sem4"];
    return (


        <div className="indent-main">

            <div className="flex">
                <FormControl className="filter-search">
                    <InputLabel>Filter by Subject</InputLabel>
                    <Select
                        label="Subject"
                        defaultValue=""
                        placeholder="Filter by Subject"
                        size="small"
                    >
                        {subject.map((opt) => (
                            <MenuItem key={opt} value={opt}>
                                {opt}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <FilterSearch />
            </div>
            <div className="main-box">
                <div className="main-header">
                    <h3>SEM1</h3>
                </div>
                <table className="indent-table-wrapper">
                    <thead className="thead">
                        <tr>
                            <th>Sl No.</th>
                            <th>Reg No</th>
                            <th>Booklet No.</th>
                            <th>Signature</th>
                            <th>Add. Sheet</th>
                            <th>Total</th>

                        </tr>

                    </thead>
                    <tbody>
                        <ExamAttendanceList></ExamAttendanceList>
                        <ExamAttendanceList></ExamAttendanceList>
                        <ExamAttendanceList></ExamAttendanceList>

                        <tr>
                            <td>Reg Nos (absenties)</td>
                            <td><TextField
                                variant="outlined"
                                size="small"></TextField></td>
                            <td>Reg Nos (malpractice)</td>
                            <td><TextField
                                variant="outlined"
                                size="small"></TextField></td>
                        </tr>

                    </tbody>
                </table>
                <table className="indent-box">
                    <tr>
                        <th></th>
                        <th align>Examiner 1</th>
                        <th>Examiner 2</th>
                        <th>cheif Superintendent</th>
                    </tr>
                    <tr>
                        <td>Signature</td>
                        <td><TextField
                            variant="outlined"
                            size="small"></TextField></td>
                        <td><TextField
                            variant="outlined"
                            size="small"></TextField></td>
                        <td><TextField
                            variant="outlined"
                            size="small"></TextField></td>
                    </tr>
                    <tr>
                        <td>Name</td>
                        <td><TextField
                            variant="outlined"
                            size="small"></TextField></td>
                        <td><TextField
                            variant="outlined"
                            size="small"></TextField></td>
                        <td><TextField
                            variant="outlined"
                            size="small"></TextField></td>
                    </tr>
                    <tr>
                        <td>Afflication</td>
                        <td><TextField
                            variant="outlined"
                            size="small"></TextField></td>
                    </tr>
                </table>
                <div className="submit-btn">
                    <button className="submit">Submit</button>
                    <button className="button-outlined flex "><HiDownload size={25} />Download</button>
                </div>
            </div>
        </div >
    );
};

export default ExamAttendance;
