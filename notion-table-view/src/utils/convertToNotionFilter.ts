import { FilterGroup } from '../interface/types';

const convertToNotionFilter = (filterGroups: FilterGroup[]): any => {
  const mapOperator = (operator: string, value: any): any => {
    switch (operator) {
      case "contains":
        return { text: { contains: value } };
      case "does not contain":
        return { text: { does_not_contain: value } };
      case "is":
        return { text: { equals: value } };
      case "is empty":
        return { is_empty: true };
      case "is not empty":
        return { is_empty: false };
      case "is before":
        return { date: { before: value } };
      case "is after":
        return { date: { after: value } };
      default:
        return {};
    }
  };

  const mapFilterGroup = (group: FilterGroup): any => {
    const filters = group.filterRules
      .filter(rule => rule.column && rule.operator && rule.value !== undefined)
      .map(rule => {
        const notionFilter = mapOperator(rule.operator, rule.value);
        if (Object.keys(notionFilter).length === 0) {
          console.warn(`Invalid filter rule:`, rule);
          return null;
        }
        return {
          property: rule.column,
          ...notionFilter,
        };
      })
      .filter(filter => filter !== null);

    const groupFilters = group.filterGroups
      .filter(subGroup => subGroup.filterRules.length > 0 || subGroup.filterGroups.length > 0)
      .map(mapFilterGroup);

    if (filters.length === 0 && groupFilters.length === 0) {
      return null;
    }

    const combinedFilters = [...filters, ...groupFilters];
    
    if (group.condition === 'AND') {
      return combinedFilters.length > 0 ? { and: combinedFilters } : null;
    } else if (group.condition === 'OR') {
      return combinedFilters.length > 0 ? { or: combinedFilters } : null;
    }

    console.warn(`Invalid filter group condition: ${group.condition}`);
    return null;
  };

  const result = filterGroups.length > 0 ? mapFilterGroup(filterGroups[0]) : null;

  return result || {};
};

export default convertToNotionFilter;
