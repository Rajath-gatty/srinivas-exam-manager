import "./InternalMarks.css";
import "./InternalList";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import InternalList from "./InternalList";


const InternalMarks = () => {
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
        <div className="internal-main">
            <div className="filter-wrapper">
                <form className="search-form">
                    <input type="text" placeholder="Search" className="search-input" />
                </form>
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

            <table className="internal-table-wrapper">
                <thead className="thead">
                    <tr>
                        <th>Profile</th>
                        <th>RegNo.</th>
                        <th>Name</th>
                        <th>Semester</th>
                        <th>Java</th>
                        <th>C++</th>
                        <th>PHP</th>
                    </tr>
                </thead>
                <tbody>
                    <InternalList></InternalList>
                    <InternalList></InternalList>
                    <InternalList></InternalList>
                    <InternalList></InternalList>
                    <InternalList></InternalList>
                    <InternalList></InternalList>
                    <InternalList></InternalList>
                    <InternalList></InternalList>
                    <InternalList></InternalList>
                    <InternalList></InternalList>

                </tbody>
            </table>

        </div>
    );
};

export default InternalMarks;