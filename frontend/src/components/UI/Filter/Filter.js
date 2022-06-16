import { forwardRef } from "react";
import {FormControl,InputLabel,Select,MenuItem,FormHelperText} from "@mui/material";
import "./Filter.css";

const  Filter = forwardRef(({data=[], label, filter,error=false, helperText, handleCourseChange, handleSemChange, handleDeptChange,width="30%"},ref) => {
  const filters = ['course','department','semester'];
  const selectedFilter = filters.find(item => item===filter);
  let name;
  // let id;
  let selectFunction;
  if(selectedFilter==='department') {
    // id = 'dept_id';
    name = 'dept_name';
    selectFunction = handleDeptChange;
  } else if(selectedFilter==='course') {
    // id = 'course_id';
    name = 'course_name';
    selectFunction = handleCourseChange;
  } else {
    // id = 'sem_id';
    name = 'sem_name';
    selectFunction = handleSemChange;
  }

  return (
    <div className="filter-comp selectbox">
    <FormControl style={{width}} className="filterSearch-SelectInput">
      <InputLabel>{label}</InputLabel>
      <Select
        label="Department"
        defaultValue=""
        placeholder={label}
        size="small"
        onChange={selectFunction}
        error={error}
        inputRef={ref}
      >
        {data.map((opt) => (
          <MenuItem key={Math.random()+Date.now()} value={opt[name]}>
            {opt[name]}
          </MenuItem>
        ))}
      </Select>
      <FormHelperText error={error}>{helperText}</FormHelperText>
    </FormControl>
  </div>
  );
})

export default Filter;