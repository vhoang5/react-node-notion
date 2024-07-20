import React from 'react';
import { TextField } from '@mui/material';

interface RichTextFilterProps {
  value: string;
  onChange: (value: string) => void;
}

const RichTextFilter: React.FC<RichTextFilterProps> = ({ value, onChange }) => {
  return (
    <TextField
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      label="Rich Text"
    />
  );
};

export default RichTextFilter;
