import React from 'react';
import CheckboxFilter from './CheckboxFilter';
import DateFilter from './DateFilter';
import MultiSelectFilter from './MultiSelectFilter';
import NumberFilter from './NumberFilter';
import RichTextFilter from './RichTextFilter';
import SelectFilter from './SelectFilter';
import TimestampFilter from './TimestampFilter';
import StatusFilter from './StatusFilter';
import styles from './AdvancedFilter.module.css';
import { Column, FilterGroup } from '../../interface/types';

interface AdvancedFilterProps {
  columns: Column[];
  maxDepth: number;
  filterGroups: FilterGroup[];
  setFilterGroups: React.Dispatch<React.SetStateAction<FilterGroup[]>>;
}

const AdvancedFilter: React.FC<AdvancedFilterProps> = ({ columns, maxDepth, filterGroups, setFilterGroups }) => {
  const initializeGroupPath = (groupPath: number[], groups: FilterGroup[]): FilterGroup[] => {
    let currentGroup = groups;
    groupPath.forEach((index) => {
      if (!currentGroup[index]) {
        currentGroup[index] = { condition: 'AND', filterRules: [], filterGroups: [] };
      }
      currentGroup = currentGroup[index].filterGroups;
    });
    return currentGroup;
  };

  const handleAddRule = (groupIndex: number, groupPath: number[]) => {
    setFilterGroups((prevGroups: FilterGroup[]) => {
      const newGroups = JSON.parse(JSON.stringify(prevGroups));
      let currentGroup = initializeGroupPath(groupPath, newGroups);
      currentGroup[groupIndex].filterRules.push({ column: '', operator: 'contains', value: '' });
      return newGroups;
    });
  };

  const handleAddGroup = (groupIndex: number, groupPath: number[]) => {
    setFilterGroups((prevGroups: FilterGroup[]) => {
      const newGroups = JSON.parse(JSON.stringify(prevGroups));
      let currentGroup = initializeGroupPath(groupPath, newGroups);
      currentGroup[groupIndex].filterGroups.push({ condition: 'AND', filterRules: [{ column: '', operator: 'contains', value: '' }], filterGroups: [] });
      return newGroups;
    });
  };

  const handleRemoveRule = (groupIndex: number, ruleIndex: number, groupPath: number[]) => {
    setFilterGroups((prevGroups: FilterGroup[]) => {
      const newGroups = JSON.parse(JSON.stringify(prevGroups));
      let currentGroup = initializeGroupPath(groupPath, newGroups);
      currentGroup[groupIndex].filterRules.splice(ruleIndex, 1);
      return newGroups;
    });
  };

  const getOperators = (columnType: string) => {
    switch (columnType) {
      case 'checkbox':
        return ['is checked', 'is not checked'];
      case 'date':
      case 'timestamp':
        return ['is', 'is not', 'is before', 'is after', 'is on or before', 'is on or after', 'is empty', 'is not empty', 'is within the past', 'is within the next'];
      case 'multi_select':
      case 'select':
      case 'status':
        return ['contains', 'does not contain', 'is empty', 'is not empty'];
      case 'number':
        return ['equals', 'does not equal', 'is greater than', 'is less than', 'is greater than or equal to', 'is less than or equal to', 'is empty', 'is not empty'];
      case 'rich_text':
        return ['contains', 'does not contain', 'is empty', 'is not empty'];
      default:
        return ['contains', 'does not contain', 'is empty', 'is not empty'];
    }
  };

  // Todo: need to get list option from data
  const renderFilterInput = (columnType: string, value: any, onChange: (val: any) => void) => {
    switch (columnType) {
      case 'checkbox':
        return <CheckboxFilter value={value} onChange={onChange} />;
      case 'date':
        return <DateFilter value={value} onChange={onChange} />;
      case 'multi_select':
        return <MultiSelectFilter value={value} onChange={onChange} options={['option1', 'option2']} />;
      case 'number':
        return <NumberFilter value={value} onChange={onChange} />;
      case 'rich_text':
        return <RichTextFilter value={value} onChange={onChange} />;
      case 'select':
        return <SelectFilter value={value} onChange={onChange} options={['option1', 'option2']} />;
      case 'timestamp':
        return <TimestampFilter value={value} onChange={onChange} />;
      case 'status':
        return <StatusFilter value={value} onChange={onChange} options={['option1', 'option2']} />;
      default:
        return <input type="text" value={value} onChange={(e) => onChange(e.target.value)} />;
    }
  };

  const renderFilterGroups = (groups: FilterGroup[], depth: number, groupPath: number[] = []) => {
    return groups.map((group, groupIndex) => (
      <div key={groupIndex} className={styles.filterGroup}>
        <select
          value={group.condition}
          onChange={(e) => {
            setFilterGroups((prevGroups: FilterGroup[]) => {
              const newGroups = JSON.parse(JSON.stringify(prevGroups));
              let currentGroup = initializeGroupPath(groupPath, newGroups);
              currentGroup[groupIndex].condition = e.target.value;
              return newGroups;
            });
          }}
        >
          <option value="AND">AND</option>
          <option value="OR">OR</option>
        </select>
        {group.filterRules.map((rule, ruleIndex) => (
          <div key={ruleIndex} className={styles.filterRule}>
            <>
              <select
                value={rule.column}
                onChange={(e) => {
                  setFilterGroups((prevGroups: FilterGroup[]) => {
                    const newGroups = JSON.parse(JSON.stringify(prevGroups));
                    let currentGroup = initializeGroupPath(groupPath, newGroups);
                    currentGroup[groupIndex].filterRules[ruleIndex].column = e.target.value;
                    return newGroups;
                  });
                }}
              >
                <option value="">Select Column</option>
                {columns.map((column) => (
                  <option key={column.field} value={column.field}>
                    {column.headerName}
                  </option>
                ))}
              </select>
              <select
                value={rule.operator}
                onChange={(e) => {
                  setFilterGroups((prevGroups: FilterGroup[]) => {
                    const newGroups = JSON.parse(JSON.stringify(prevGroups));
                    let currentGroup = initializeGroupPath(groupPath, newGroups);
                    currentGroup[groupIndex].filterRules[ruleIndex].operator = e.target.value;
                    return newGroups;
                  });
                }}
              >
                {getOperators(rule.column).map((operator) => (
                  <option key={operator} value={operator}>
                    {operator}
                  </option>
                ))}
              </select>
              <div className={styles.filterInput}>
                {renderFilterInput(rule.column, rule.value, (val) => {
                  setFilterGroups((prevGroups: FilterGroup[]) => {
                    const newGroups = JSON.parse(JSON.stringify(prevGroups));
                    let currentGroup = initializeGroupPath(groupPath, newGroups);
                    currentGroup[groupIndex].filterRules[ruleIndex].value = val;
                    return newGroups;
                  });
                })}
              </div>
              <button
                type="button"
                className={styles.removeButton}
                onClick={() => handleRemoveRule(groupIndex, ruleIndex, groupPath)}
              >
                Remove
              </button>
            </>
          </div>
        ))}
        {group.filterGroups.length > 0 && (
          <div className={styles.filterGroups}>
            {renderFilterGroups(group.filterGroups, depth + 1, [...groupPath, groupIndex])}
          </div>
        )}
        <div className={styles.actions}>
          <button
            type="button"
            className={styles.addButton}
            onClick={() => handleAddRule(groupIndex, groupPath)}
          >
            Add Filter Rule
          </button>
          {depth < maxDepth && (
            <button
              type="button"
              className={styles.addButton}
              onClick={() => handleAddGroup(groupIndex, groupPath)}
            >
              Add Filter Group
            </button>
          )}
        </div>
      </div>
    ));
  };

  return (
    <div className={styles.advancedFilter}>
      {renderFilterGroups(filterGroups, 1)}
    </div>
  );
};

export default AdvancedFilter;
