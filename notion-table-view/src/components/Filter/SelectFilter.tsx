import React from 'react';
import { Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';

interface SelectFilterProps {
  value: string;
  onChange: (value: string) => void;
  options: string[];
}

const SelectFilter: React.FC<SelectFilterProps> = ({ value, onChange, options }) => {
  const handleChange = (event: SelectChangeEvent) => {
    onChange(event.target.value);
  };

  return (
    <FormControl fullWidth>
      <InputLabel>Select</InputLabel>
      <Select value={value} onChange={handleChange}>
        {options.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default SelectFilter;
