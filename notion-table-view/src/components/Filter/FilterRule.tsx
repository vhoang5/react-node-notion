// src/components/Filter/FilterRule.tsx
import React from 'react';
import './FilterRule.css';

interface FilterRuleProps {
  id: string;
  onRemove: (id: string) => void;
  onChange: (id: string, field: string, value: string) => void;
}

const FilterRule: React.FC<FilterRuleProps> = ({ id, onRemove, onChange }) => {
  const handleFieldChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(id, 'field', e.target.value);
  };

  const handleOperatorChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(id, 'operator', e.target.value);
  };

  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(id, 'value', e.target.value);
  };

  return (
    <div className="filter-rule">
      <select onChange={handleFieldChange}>
        <option value="name">Name</option>
        <option value="status">Status</option>
        <option value="priority">Priority</option>
        <option value="estimatedValue">Estimated Value</option>
      </select>
      <select onChange={handleOperatorChange}>
        <option value="contains">Contains</option>
        <option value="equals">Equals</option>
        <option value="startsWith">Starts With</option>
      </select>
      <input type="text" onChange={handleValueChange} />
      <button onClick={() => onRemove(id)}>Remove</button>
    </div>
  );
};

export default FilterRule;
