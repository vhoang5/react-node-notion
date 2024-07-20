
export interface Filter {
    id: string;
    field: string;
    operator: string;
    value: any;
  }

  export interface Data {
    name: string;
    company: string;
    status: string;
    priority: string;
    estimatedValue: number;
    accountOwner: string;
  }
  
  export interface ColumnDefinition {
    Header?: string;
    type?: 'checkbox' | 'date' | 'multi_select' | 'number' | 'rich_text' | 'select' | 'timestamp' | 'status' | 'text';
    accessor?: string;
  }
  
  export interface Record {
    [key: string]: {
      type: string;
      value: any;
    };
  }

  export interface FilterRule {
    column: string;
    operator: string;
    value: any;
  }
  
  export interface FilterGroup {
    condition: string;
    rules: FilterRule[];
  }
  
  export interface AdvancedFilterProps {
    columns: ColumnDefinition[];
    onApply: (filters: any) => void;
  }

  export interface FilterDialogProps {
    open: boolean;
    columns: ColumnDefinition[];
    onClose: () => void;
    onApply: (filters: any) => void;
  }