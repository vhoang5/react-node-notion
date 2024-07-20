// src/components/Filter/AdvancedFilter.tsx
import React, { useState } from 'react';
import styles from './AdvancedFilter.module.css';

interface FilterRule {
  property: string;
  operator: string;
  value: string;
}

interface FilterGroup {
  condition: string;
  rules: FilterRule[];
}

interface AdvancedFilterProps {
  onApply: (filters: any) => void;
}

const AdvancedFilter: React.FC<AdvancedFilterProps> = ({ onApply }) => {
  const [filterGroups, setFilterGroups] = useState<FilterGroup[]>([
    { condition: 'AND', rules: [{ property: '', operator: '', value: '' }] }
  ]);

  const handleAddRule = (groupIndex: number) => {
    const newGroups = [...filterGroups];
    newGroups[groupIndex].rules.push({ property: '', operator: '', value: '' });
    setFilterGroups(newGroups);
  };

  const handleAddGroup = () => {
    setFilterGroups([...filterGroups, { condition: 'AND', rules: [{ property: '', operator: '', value: '' }] }]);
  };

  const handleApply = () => {
    onApply(filterGroups);
  };

  return (
    <div className={styles.container}>
      {filterGroups.map((group, groupIndex) => (
        <div key={groupIndex} className={styles.filterGroup}>
          <select
            value={group.condition}
            onChange={(e) => {
              const newGroups = [...filterGroups];
              newGroups[groupIndex].condition = e.target.value;
              setFilterGroups(newGroups);
            }}
          >
            <option value="AND">AND</option>
            <option value="OR">OR</option>
          </select>
          {group.rules.map((rule, ruleIndex) => (
            <div key={ruleIndex} className={styles.filterRule}>
              <select
                value={rule.property}
                onChange={(e) => {
                  const newGroups = [...filterGroups];
                  newGroups[groupIndex].rules[ruleIndex].property = e.target.value;
                  setFilterGroups(newGroups);
                }}
              >
                <option value="">Select Property</option>
                <option value="name">Name</option>
                <option value="status">Status</option>
              </select>
              <select
                value={rule.operator}
                onChange={(e) => {
                  const newGroups = [...filterGroups];
                  newGroups[groupIndex].rules[ruleIndex].operator = e.target.value;
                  setFilterGroups(newGroups);
                }}
              >
                <option value="">Select Operator</option>
                <option value="contains">Contains</option>
                <option value="equals">Equals</option>
              </select>
              <input
                type="text"
                value={rule.value}
                onChange={(e) => {
                  const newGroups = [...filterGroups];
                  newGroups[groupIndex].rules[ruleIndex].value = e.target.value;
                  setFilterGroups(newGroups);
                }}
              />
            </div>
          ))}
          <button
            type="button"
            className={styles.addButton}
            onClick={() => handleAddRule(groupIndex)}
          >
            Add Filter Rule
          </button>
        </div>
      ))}
      <button type="button" className={styles.addButton} onClick={handleAddGroup}>
        Add Filter Group
      </button>
      <button type="button" className={styles.addButton} onClick={handleApply}>
        Apply Filters
      </button>
    </div>
  );
};

export default AdvancedFilter;
