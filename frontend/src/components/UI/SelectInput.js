import { Select, MenuItem, FormControl, InputLabel,FormHelperText } from "@mui/material";

const SelectInput = (props) => {
  const options = props.options;

  return (
    <FormControl className="SelectInput" fullWidth>
      <InputLabel>{props.label}</InputLabel>
      <Select label={props.label} defaultValue="" size="small">
        {options.map((opt) => (
          <MenuItem key={opt} value={opt}>
            {opt}
          </MenuItem>
        ))}
      </Select>
      <FormHelperText error>{props.helperText}</FormHelperText>
    </FormControl>
  );
};

export default SelectInput;
