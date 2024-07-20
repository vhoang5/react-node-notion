// src/components/Filter/FilterGroup.tsx
import React, { useState } from 'react';
import FilterRule from './FilterRule';
import './FilterGroup.css';
import { v4 as uuidv4 } from 'uuid';

interface FilterGroupProps {
  id: string;
  onRemove: (id: string) => void;
  onChange: (id: string, field: string, value: string) => void;
}

const FilterGroup: React.FC<FilterGroupProps> = ({ id, onRemove, onChange }) => {
  const [filterRules, setFilterRules] = useState<string[]>([]);
  const [filterGroups, setFilterGroups] = useState<string[]>([]);

  const addFilterRule = () => {
    setFilterRules([...filterRules, uuidv4()]);
  };

  const removeFilterRule = (ruleId: string) => {
    setFilterRules(filterRules.filter(id => id !== ruleId));
  };

  const addFilterGroup = () => {
    setFilterGroups([...filterGroups, uuidv4()]);
  };

  const removeFilterGroup = (groupId: string) => {
    setFilterGroups(filterGroups.filter(id => id !== groupId));
  };

  const handleRuleChange = (ruleId: string, field: string, value: string) => {
    onChange(`${id}.${ruleId}`, field, value);
  };

  const handleGroupChange = (groupId: string, field: string, value: string) => {
    onChange(`${id}.${groupId}`, field, value);
  };

  return (
    <div className="filter-group">
      <div className="filter-group-header">
        <select>
          <option value="and">And</option>
          <option value="or">Or</option>
        </select>
        <button onClick={addFilterRule}>Add Filter Rule</button>
        <button onClick={addFilterGroup}>Add Filter Group</button>
        <button onClick={() => onRemove(id)}>Remove Group</button>
      </div>
      <div className="filter-group-body">
        {filterRules.map(ruleId => (
          <FilterRule
            key={ruleId}
            id={ruleId}
            onRemove={removeFilterRule}
            onChange={handleRuleChange}
          />
        ))}
        {filterGroups.map(groupId => (
          <FilterGroup
            key={groupId}
            id={groupId}
            onRemove={removeFilterGroup}
            onChange={handleGroupChange}
          />
        ))}
      </div>
    </div>
  );
};

export default FilterGroup;
