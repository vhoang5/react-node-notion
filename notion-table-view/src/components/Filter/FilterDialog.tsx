import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import AdvancedFilter from './AdvancedFilter';
import { Column } from '../../interface/types';
import styles from './FilterDialog.module.css';

interface FilterDialogProps {
  open: boolean;
  columns: Column[];
  onClose: () => void;
  onApply: (filters: any) => void;
}

const FilterDialog: React.FC<FilterDialogProps> = ({ open, columns, onClose, onApply }) => {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>Advanced Filter</DialogTitle>
      <DialogContent className={styles.filterDialogContent}>
        <AdvancedFilter columns={columns} onApply={onApply} maxDepth={4}/>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={onApply}>Apply</Button>
      </DialogActions>
    </Dialog>
  );
};

export default FilterDialog;
