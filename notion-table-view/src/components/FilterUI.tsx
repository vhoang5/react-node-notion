// src/components/FilterPopup.tsx
import React, { useState } from 'react';
import { Filter, FilterGroup } from '../interface/types';
import './FilterUI.css';

interface FilterUI {
  column: string;
  filters: (Filter | FilterGroup)[];
  setFilters: React.Dispatch<React.SetStateAction<(Filter | FilterGroup)[]>>;
  onClose: () => void;
}

const FilterPopup: React.FC<FilterUI> = ({ column, filters, setFilters, onClose }) => {
  const [filterValue, setFilterValue] = useState<string>('');

  const handleApplyFilter = () => {
    const newFilter: Filter = {
      field: column,
      operator: 'contains',
      value: filterValue,
      id: Math.random().toString(36).substr(2, 9),
    };
    setFilters([...filters, newFilter]);
    onClose();
  };

  return (
    <div className="filter-popup">
      <h3>Filter {column}</h3>
      <input
        type="text"
        value={filterValue}
        onChange={e => setFilterValue(e.target.value)}
      />
      <button onClick={handleApplyFilter}>Apply</button>
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default FilterPopup;
