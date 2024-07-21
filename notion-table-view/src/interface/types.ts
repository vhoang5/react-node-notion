export interface Column {
  headerName: string;
  field: string;
  type: string;
  options?: string[];
}

export interface DataRecord {
  [key: string]: {
    type: string;
    value: string | number | boolean;
  };
}

export interface Filter {
  id: string;
  field: string;
  operator: string;
  value: any;
}

export interface FilterRule {
  id?: string;
  column: string;
  operator: string;
  value: any;
}

export interface FilterGroup {
  condition: string;
  filterRules: FilterRule[];
  filterGroups: FilterGroup[];
}
