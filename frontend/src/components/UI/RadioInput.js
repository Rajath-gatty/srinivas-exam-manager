import {Radio,RadioGroup, FormControl, FormLabel,FormControlLabel} from "@mui/material";
const RadioInput = (props) => {
    return(
        <FormControl className="radio-container">
        <FormLabel id="radio-label">Gender</FormLabel>
        <RadioGroup
          row
          aria-labelledby="demo-row-radio-buttons-group-label"
          name="row-radio-buttons-group"
          className="radio-btns"
        >
          <FormControlLabel onChange={(e) => props.setGender(e.target.value)} value="male" control={<Radio/>} label="Male" />
          <FormControlLabel onChange={(e) => props.setGender(e.target.value)} value="other" control={<Radio />}label="Other"
          />
          <FormControlLabel onChange={(e) => props.setGender(e.target.value)} value="female" control={<Radio />} label="Female" />
        </RadioGroup>
      </FormControl>
    )
}

export default RadioInput;