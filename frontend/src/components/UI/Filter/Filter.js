import { forwardRef } from "react";
import {FormControl,InputLabel,Select,MenuItem,FormHelperText} from "@mui/material";
import "./Filter.css";

const  Filter = forwardRef(({data=[], label, filter,error=false, helperText, handleCourseChange, handleSemesterChange, handleDeptChange,width="12em"},ref) => {
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
    name = '';
    selectFunction = handleSemesterChange;
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
        fullWidth
      >
        {data.map((opt,i) => (
          <MenuItem key={Math.random()+Date.now()} value={selectedFilter==='semester'?i+1:opt[name]}>
            {selectedFilter==='semester'?i+1:opt[name]}
          </MenuItem>
        ))}
      </Select>
      <FormHelperText error={error}>{helperText}</FormHelperText>
    </FormControl>
  </div>
  );
})

export default Filter;