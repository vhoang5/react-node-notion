import React from 'react';
import { TextField } from '@mui/material';

interface TimestampFilterProps {
  value: string;
  onChange: (value: string) => void;
}

const TimestampFilter: React.FC<TimestampFilterProps> = ({ value, onChange }) => {
  return (
    <TextField
      type="datetime-local"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      label="Timestamp"
      InputLabelProps={{ shrink: true }}
    />
  );
};

export default TimestampFilter;
