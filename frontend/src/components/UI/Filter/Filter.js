import { forwardRef } from "react";
import {FormControl,InputLabel,Select,MenuItem,FormHelperText} from "@mui/material";
import "./Filter.css";

const  Filter = forwardRef(({data=[], label, filter, value="", disabled=false, error=false, required=false, helperText='', handleCourseChange, handleSemesterChange,handleSubjectChange, handleDeptChange,width="12em"},ref) => {
  const filters = ['course','department','semester','subject'];
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
  } else if(selectedFilter==='subject'){
    name = 'subj_name'
    selectFunction = handleSubjectChange
  } else {
        // id = 'sem_id';
        name = '';
        selectFunction = handleSemesterChange;
        // if(data.length===0 && value==="") value = "Select Course First";
  }

  return (
    <div className="filter-comp selectbox">
    <FormControl style={{width}} className="filterSearch-SelectInput">
      <InputLabel>{label}</InputLabel>
      <Select
        label="Department"
        defaultValue={value}
        placeholder={label}
        size="small"
        onChange={selectFunction}
        error={error}
        inputRef={ref}
        fullWidth
        required={required}
        disabled={disabled}
      >
        {value?<MenuItem value={value}>{value}</MenuItem>
        :data.length>0&&data.map((opt,i) => {
        return <MenuItem key={Math.random()+Date.now()} value={selectedFilter==='semester'?i+1:opt[name]}>
            {selectedFilter==='semester'?i+1:opt[name]}
          </MenuItem>
        })}
      </Select>
      <FormHelperText error={error}>{helperText}</FormHelperText>
    </FormControl>
  </div>
  );
})

export default Filter;