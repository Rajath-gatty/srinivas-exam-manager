export const TextInput =(props) => {
    return (
      <div className="InputField TextInput">
        <label>{props.label} :</label>
        <input {...props} />
      </div>
    );
  }
   
  export const SelectInput = (props) => {
    var options = props.options;
    return (
      <div className="InputField SelectInput">
        <label>{props.label} :</label>
        <select>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    );
  }
  