
export interface Filter {
    id: string;
    field: string;
    operator: string;
    value: any;
  }
  
  export interface FilterGroup {
    id: string;
    type: 'and' | 'or';
    filters: (Filter | FilterGroup)[];
    level: number; // add level property to track nesting level
  }

  export interface Data {
    name: string;
    company: string;
    status: string;
    priority: string;
    estimatedValue: number;
    accountOwner: string;
  }
  