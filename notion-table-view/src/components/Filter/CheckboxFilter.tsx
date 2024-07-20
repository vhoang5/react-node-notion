import React from 'react';
import { Checkbox, FormControlLabel } from '@mui/material';

interface CheckboxFilterProps {
  value: boolean;
  onChange: (value: boolean) => void;
}

const CheckboxFilter: React.FC<CheckboxFilterProps> = ({ value, onChange }) => {
  return (
    <FormControlLabel
      control={
        <Checkbox
          checked={value}
          onChange={(e) => onChange(e.target.checked)}
        />
      }
      label="Checkbox"
    />
  );
};

export default CheckboxFilter;
