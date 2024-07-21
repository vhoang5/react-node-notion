import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import AdvancedFilter from './AdvancedFilter';
import { Column } from '../../interface/types';
import { useFilterContext } from '../../context/FilterContext';
import styles from './FilterDialog.module.css';

interface FilterDialogProps {
  open: boolean;
  columns: Column[];
  onClose: () => void;
  onApply: () => void; // No need to pass filters here, they are in context
}

const FilterDialog: React.FC<FilterDialogProps> = ({ open, columns, onClose, onApply }) => {
  const { filterGroups, setFilterGroups } = useFilterContext();

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>Advanced Filter</DialogTitle>
      <DialogContent className={styles.filterDialogContent}>
        <AdvancedFilter columns={columns} maxDepth={3} filterGroups={filterGroups} setFilterGroups={setFilterGroups} />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={onApply}>Apply</Button>
      </DialogActions>
    </Dialog>
  );
};

export default FilterDialog;
