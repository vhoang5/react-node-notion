// src/components/Filter/AdvancedFilter.tsx
import React, { useState } from 'react';
import FilterGroup from './FilterGroup';
import { v4 as uuidv4 } from 'uuid';

interface AdvancedFilterProps {
  onApply: (filters: any) => void;
}

const AdvancedFilter: React.FC<AdvancedFilterProps> = ({ onApply }) => {
  const [filterGroups, setFilterGroups] = useState<string[]>([]);

  const addFilterGroup = () => {
    setFilterGroups([...filterGroups, uuidv4()]);
  };

  const removeFilterGroup = (groupId: string) => {
    setFilterGroups(filterGroups.filter(id => id !== groupId));
  };

  const handleFilterChange = (id: string, field: string, value: string) => {
    // Handle filter state change and pass it up to the parent component
  };

  const applyFilters = () => {
    // Collect filter state and call onApply
  };

  return (
    <div className="advanced-filter">
      <button onClick={addFilterGroup}>Add Filter Group</button>
      {filterGroups.map(groupId => (
        <FilterGroup
          key={groupId}
          id={groupId}
          onRemove={removeFilterGroup}
          onChange={handleFilterChange}
        />
      ))}
      <button onClick={applyFilters}>Apply Filters</button>
    </div>
  );
};

export default AdvancedFilter;
