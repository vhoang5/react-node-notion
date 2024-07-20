import React from 'react';
import { TextField } from '@mui/material';

interface DateFilterProps {
  value: string;
  onChange: (value: string) => void;
}

const DateFilter: React.FC<DateFilterProps> = ({ value, onChange }) => {
  return (
    <TextField
      type="date"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      label="Date"
      InputLabelProps={{ shrink: true }}
    />
  );
};

export default DateFilter;
