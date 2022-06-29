import { Select, MenuItem, FormControl, InputLabel, FormHelperText } from "@mui/material";
import {forwardRef} from 'react';
const date = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22,
  23, 24, 25, 26, 27, 28, 29, 30, 31,
];
date.toString();
const month = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "July",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
let year = [];

const currDate = new Date();
const fYear = currDate.getFullYear();
const startYear = currDate.getFullYear() - 60 ;
for (var i = startYear; i <= fYear; i++) {
  year.push(i);
}

const Dob = forwardRef((props,ref) => {
  const {dateRef,monthRef,yearRef} = ref.current;
  return (
    <div className="dob-wrapper">
      <InputLabel id="date" className="dob-label" required={props.required}>
       {props.label?props.label:'Date of Birth'}
      </InputLabel>
      <div className="dob-container">
        <FormControl sx={{ minWidth: 100 }} >
          <InputLabel id="date">Date</InputLabel>
          <Select
            labelId="date"
            id="date"
            label="Date"
            size="small"
            inputRef={dateRef}
            defaultValue=""
            error={props.error}
          >
            {date.map((d) => (
              <MenuItem key={d} value={d}>
                {d}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl sx={{ minWidth: 100 }}>
          <InputLabel id="month">Month</InputLabel>
          <Select
            labelId="month"
            id="month"
            label="Month"
            size="small"
            inputRef={monthRef}
            defaultValue=""
            error={props.error}
          >
            {month.map((m,i) => (
              <MenuItem key={m} value={m}>
                {m}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl sx={{ minWidth: 100 }}>
          <InputLabel id="year">Year</InputLabel>
          <Select
            labelId="year"
            id="year"
            label="Year"
            size="small"
            inputRef={yearRef}
            defaultValue=""
            error={props.error}
          >
            {year.map((y) => (
              <MenuItem key={y} value={y}>
                {y}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      <FormHelperText error>{props.helperText}</FormHelperText>
    </div>
  );
});

export default Dob;
