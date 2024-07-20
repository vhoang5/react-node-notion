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
import { AdvancedFilterProps, FilterGroup } from '../../interface/types';

const AdvancedFilter: React.FC<AdvancedFilterProps> = ({ columns, onApply }) => {
  const [filterGroups, setFilterGroups] = useState<FilterGroup[]>([
    { condition: 'AND', rules: [{ column: '', operator: '', value: '' }] }
  ]);

  const handleAddRule = (groupIndex: number) => {
    const newGroups = [...filterGroups];
    newGroups[groupIndex].rules.push({ column: '', operator: '', value: '' });
    setFilterGroups(newGroups);
  };

  const handleAddGroup = () => {
    setFilterGroups([...filterGroups, { condition: 'AND', rules: [{ column: '', operator: '', value: '' }] }]);
  };

  const handleApply = () => {
    onApply(filterGroups);
  };

  const renderFilterInput = (column: string, value: any, onChange: (val: any) => void) => {
    const columnType = columns.find((col) => col.Header === column)?.type;

    switch (columnType) {
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
                value={rule.column}
                onChange={(e) => {
                  const newGroups = [...filterGroups];
                  newGroups[groupIndex].rules[ruleIndex].column = e.target.value;
                  setFilterGroups(newGroups);
                }}
              >
                <option value="">Select Column</option>
                {columns.map((column) => (
                  <option key={column.Header} value={column.Header}>
                    {column.Header}
                  </option>
                ))}
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
                {/* Add more operators based on column type */}
              </select>
              {renderFilterInput(
                rule.column,
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
    </div>
  );
};

export default AdvancedFilter;
