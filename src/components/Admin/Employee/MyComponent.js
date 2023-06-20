import { useState, useEffect } from 'react';
import { FormControl, InputLabel, Select, MenuItem, TextField } from '@material-ui/core';

const MyComponent = () => {

  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState('');
  const [selectedOptionLabel, setSelectedOptionLabel] = useState('');
  const [selectedOptionCode, setSelectedOptionCode] = useState('');


  useEffect(() => {
    fetch('https://localhost:44367/api/TypeCoge/GetTypeCoge')
      .then(response => response.json())
      .then(data => setOptions(data));
  }, []);

  const handleChange = event => {
    const selectedOptionValue = event.target.value;
    setSelectedOption(selectedOptionValue);

    const selectedOption = options.find(option => option.libelle === selectedOptionValue);
    setSelectedOptionLabel(selectedOption.type);


    setSelectedOptionCode(selectedOption.code);
  };

  return (
    <>
      <FormControl>
        <InputLabel id="my-select-label">Select an option</InputLabel>
        <Select
          labelId="my-select-label"
          id="my-select"
          value={selectedOption}
          onChange={handleChange}
          style={{ width: "300px" }}
        >
          {options.map(option => (
            <MenuItem key={option.code} value={option.libelle}>
              {option.libelle}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <TextField
        disabled
        label="Type"
        value={selectedOptionLabel}
        InputProps={{ readOnly: true }}
      />

<TextField
        disabled
        label="Code"
        value={selectedOptionCode}
        InputProps={{ readOnly: true }}
      />
    </>
  );
}
export default MyComponent;