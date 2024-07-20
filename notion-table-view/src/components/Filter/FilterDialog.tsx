// src/components/Filter/FilterDialog.tsx
import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import AdvancedFilter from './AdvancedFilter';
import styles from './FilterDialog.module.css';

interface FilterDialogProps {
  open: boolean;
  onClose: () => void;
  onApply: (filters: any) => void;
}

const FilterDialog: React.FC<FilterDialogProps> = ({ open, onClose, onApply }) => {
  const handleApply = (filters: any) => {
    onApply(filters);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>Advanced Filter</DialogTitle>
      <DialogContent className={styles.dialogContent}>
        <AdvancedFilter onApply={handleApply} />
      </DialogContent>
      <DialogActions className={styles.dialogActions}>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleApply}>Apply</Button>
      </DialogActions>
    </Dialog>
  );
};

export default FilterDialog;
