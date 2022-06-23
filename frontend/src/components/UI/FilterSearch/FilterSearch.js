import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { FaSearch } from "react-icons/fa";
import "./FilterSearch.css";

const FilterSearch = ({ className = '', search }) => {
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

  const semesters = [
    "I",
    "II",
    "III",
    "IV",
    "V"
  ];


  const showSearch = search ? "visible" : "hidden";

  return (
    <div className={[className, "filterSearch-container"].join(' ')}>
      <form style={{ visibility: showSearch }} className="filterSearch-form flex">
        <FaSearch color="var(--light-grey)" size={20} />
        <input type="text" placeholder="Search" />
      </form>
      <div className="filterSearch-eligibility selectbox">
        <FormControl className="filterSearch-SelectInput">
          <InputLabel>Filter by Semester</InputLabel>
          <Select
            label="Department"
            defaultValue=""
            placeholder="Filter by Course"
            size="small"
          >
            {semesters.map((opt) => (
              <MenuItem key={opt} value={opt}>
                {opt}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      <div className="filterSearch-course selectbox">
        <FormControl className="filterSearch-SelectInput">
          <InputLabel>Filter by Department</InputLabel>
          <Select
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
  );
};

export default FilterSearch;
