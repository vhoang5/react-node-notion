import React from 'react';
import { Select, MenuItem, FormControl, InputLabel, Chip } from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';

interface MultiSelectFilterProps {
  value: string[];
  onChange: (value: string[]) => void;
  options: string[];
}

const MultiSelectFilter: React.FC<MultiSelectFilterProps> = ({ value, onChange, options }) => {
  const handleChange = (event: SelectChangeEvent<string[]>) => {
    onChange(event.target.value as string[]);
  };

  return (
    <FormControl fullWidth>
      <InputLabel>Multi Select</InputLabel>
      <Select
        multiple
        value={value}
        onChange={handleChange}
        renderValue={(selected) => (
          <div>
            {selected.map((val) => (
              <Chip key={val} label={val} />
            ))}
          </div>
        )}
      >
        {options.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default MultiSelectFilter;
