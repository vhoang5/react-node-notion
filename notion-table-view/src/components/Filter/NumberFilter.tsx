import React from 'react';
import { TextField } from '@mui/material';

interface NumberFilterProps {
  value: number;
  onChange: (value: number) => void;
}

const NumberFilter: React.FC<NumberFilterProps> = ({ value, onChange }) => {
  return (
    <TextField
      type="number"
      value={value}
      onChange={(e) => onChange(parseFloat(e.target.value))}
      label="Number"
    />
  );
};

export default NumberFilter;
