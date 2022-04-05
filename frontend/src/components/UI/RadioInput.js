import {Radio,RadioGroup, FormControl, FormLabel,FormControlLabel} from "@mui/material";
const RadioInput = () => {
    return(
        <FormControl className="radio-container">
        <FormLabel id="radio-label">Gender</FormLabel>
        <RadioGroup
          row
          aria-labelledby="demo-row-radio-buttons-group-label"
          name="row-radio-buttons-group"
          className="radio-btns"
        >
          <FormControlLabel value="male" control={<Radio />} label="Male" />
          <FormControlLabel value="female" control={<Radio />} label="Female" />
          <FormControlLabel value="other" control={<Radio />} label="Other" />
        </RadioGroup>
      </FormControl>
    )
}

export default RadioInput;