// src/components/Filter/AdvancedFilter.tsx
import React, { useState } from 'react';
import CheckboxFilter from './CheckboxFilter';
import DateFilter from './DateFilter';
import MultiSelectFilter from './MultiSelectFilter';
import NumberFilter from './NumberFilter';
import RichTextFilter from './RichTextFilter';
import SelectFilter from './SelectFilter';
import TimestampFilter from './TimestampFilter';
import StatusFilter from './StatusFilter';
import styles from './AdvancedFilter.module.css';

interface FilterRule {
  property: string;
  operator: string;
  value: any;
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

  const renderFilterInput = (property: string, value: any, onChange: (val: any) => void) => {
    switch (property) {
      case 'checkbox':
        return <CheckboxFilter value={value} onChange={onChange} />;
      case 'date':
        return <DateFilter value={value} onChange={onChange} />;
      case 'multi_select':
        return <MultiSelectFilter value={value} onChange={onChange} options={['Option 1', 'Option 2']} />;
      case 'number':
        return <NumberFilter value={value} onChange={onChange} />;
      case 'rich_text':
        return <RichTextFilter value={value} onChange={onChange} />;
      case 'select':
        return <SelectFilter value={value} onChange={onChange} options={['Option 1', 'Option 2']} />;
      case 'timestamp':
        return <TimestampFilter value={value} onChange={onChange} />;
      case 'status':
        return <StatusFilter value={value} onChange={onChange} options={['Active', 'Inactive']} />;
      default:
        return <input type="text" value={value} onChange={(e) => onChange(e.target.value)} />;
    }
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
                <option value="checkbox">Checkbox</option>
                <option value="date">Date</option>
                <option value="multi_select">Multi Select</option>
                <option value="number">Number</option>
                <option value="rich_text">Rich Text</option>
                <option value="select">Select</option>
                <option value="timestamp">Timestamp</option>
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
              {renderFilterInput(
                rule.property,
                rule.value,
                (val) => {
                  const newGroups = [...filterGroups];
                  newGroups[groupIndex].rules[ruleIndex].value = val;
                  setFilterGroups(newGroups);
                }
              )}
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
