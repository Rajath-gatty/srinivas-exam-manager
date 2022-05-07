import "./Indent.css";
import IndentRegularList from "./IndentRegularList";
import FilterSearch from "../../UI/FilterSearch/FilterSearch";
const IndentRegular = () => {
<<<<<<< HEAD
    const departments = [
        "BCA",
        "BBA",
        "BCOM",
        "BHM",
        "BPT"
    ];
    const semeseter = [
        "sem1",
        "sem2",
        "sem3",
        "sem4",
    ]
    return (
        <div className="indent-main">
            <div className="filter-wrapper">

                <div className="filter-eligibility">
                    <FormControl className="SelectInput">
                        <InputLabel>Filter by Semeseter</InputLabel>
                        <Select
                            label="semester"
                            defaultValue=""
                            placeholder="Filter by semester"
                            size="small"
                            className="select-filter"
                        >
                            {semeseter.map((opt) => (
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
=======
    return (
        <div className="indent-main">
           <FilterSearch search/>
>>>>>>> 42a830b15a74020c4be13d2176678acb0aa85b2c
            <div className="main-box">
                <div className="main-header">
                    <h3>SEM1</h3>
                </div>
                <table className="indent-table-wrapper">
                    <thead className="thead">
                        <tr>
                            <th>Subject</th>
                            <th>SubjectCode</th>
                            <th>TotalStudents</th>
                            <th>Question Papers</th>
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