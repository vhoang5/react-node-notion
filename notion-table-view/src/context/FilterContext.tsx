import React, { createContext, useContext, useState, ReactNode } from 'react';
import { FilterGroup } from '../interface/types';

interface FilterContextType {
  filterGroups: FilterGroup[];
  setFilterGroups: React.Dispatch<React.SetStateAction<FilterGroup[]>>;
}

const FilterContext = createContext<FilterContextType | undefined>(undefined);

export const FilterProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [filterGroups, setFilterGroups] = useState<FilterGroup[]>([
    { condition: 'AND', filterRules: [{ column: '', operator: 'contains', value: '' }], filterGroups: [] }
  ]);

  return (
    <FilterContext.Provider value={{ filterGroups, setFilterGroups }}>
      {children}
    </FilterContext.Provider>
  );
};

export const useFilterContext = (): FilterContextType => {
  const context = useContext(FilterContext);
  if (context === undefined) {
    throw new Error('useFilterContext must be used within a FilterProvider');
  }
  return context;
};
