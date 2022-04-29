import "./IndentRegular.css";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import IndentRegularList from "./IndentRegularList";
const IndentRegular = () => {
    const departments = [
        "Computer Science & Information Science",
        "Management & Commerce",
        "Engineering & Technology",
        "Social Sciences & Humanities",
        "Aviation Studies",
        "Physiotherapy",
        "Hotel Management & Tourism",
        "Education",
        "Allied Health Sciences",
        "Nursing Science",
    ];
    return (
        <div className="indent-main">
            <div className="filter-wrapper">
                <div className="filter-eligibility">
                    <FormControl className="SelectInput">
                        <InputLabel>Filter by Eligibility</InputLabel>
                        <Select
                            label="Department"
                            defaultValue=""
                            placeholder="Filter by Course"
                            size="small"
                            className="select-filter"
                        >
                            {departments.map((opt) => (
                                <MenuItem key={opt} value={opt}>
                                    {opt}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </div>
                <div className="filter-by-course">
                    <FormControl className="SelectInput">
                        <InputLabel>Filter by Department</InputLabel>
                        <Select
                            className="select-filter"
                            label="Department"
                            defaultValue=""
                            placeholder="Filter by Course"
                            size="small"
                        >
                            {departments.map((opt) => (
                                <MenuItem key={opt} value={opt}>
                                    {opt}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                </div>
            </div>
            <div className="main-box">
                <div className="main-header">
                    <h2>SEM1</h2>
                </div>
                <table className="indent-table-wrapper">
                    <thead className="thead">
                        <tr>
                            <th>Subject</th>
                            <th>SubjectCode</th>
                            <th>TotalStudents</th>

                        </tr>
                    </thead>
                    <tbody>
                        <IndentRegularList></IndentRegularList>
                        <IndentRegularList></IndentRegularList>
                        <IndentRegularList></IndentRegularList>
                        <IndentRegularList></IndentRegularList>
                        <IndentRegularList></IndentRegularList>
                        <IndentRegularList></IndentRegularList>

                    </tbody>
                </table>
            </div>

        </div>


    );
};

export default IndentRegular;