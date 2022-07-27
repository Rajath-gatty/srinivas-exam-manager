import {Radio,RadioGroup, FormControl, FormLabel,FormControlLabel, FormHelperText} from "@mui/material";
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
          <FormControlLabel onChange={(e) => props.setGender(e.target.value)} value="female" control={<Radio />} label="Female" />
          <FormControlLabel onChange={(e) => props.setGender(e.target.value)} value="other" control={<Radio />} label="Other"/>
        </RadioGroup>
        <FormHelperText error>{props.helperText}</FormHelperText>
      </FormControl>
    )
}

export default RadioInput;