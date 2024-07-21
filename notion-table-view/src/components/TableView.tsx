import React, { useMemo } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import styles from './TableView.module.css';
import { Column, DataRecord } from '../interface/types';

interface TableProps {
  columns: Column[];
  data: DataRecord[];
}
const ROW_HEIGHT = 40;

const notionToAgGridTypeMap: { [key: string]: string } = {
  checkbox: 'boolean',
  date: 'date',
  multi_select: 'text',
  number: 'number',
  rich_text: 'text',
  select: 'text',
  timestamp: 'date',
  status: 'text'
};

const TableView: React.FC<TableProps> = ({ columns, data }) => {
  const defaultColDef = useMemo(() => ({
    sortable: true,
    resizable: true,
    filter: true,
  }), []);

  const columnTypes = useMemo(() => ({
    text: { 
      cellRenderer: (params: any) => params.value || '',
    },
    number: {
      valueFormatter: (params: any) => params.value ? params.value.toFixed(2) : '',
    },
    boolean: {
      cellRenderer: (params: any) => params.value ? '✔️' : '❌',
    },
    date: {
      valueFormatter: (params: any) => params.value ? new Date(params.value).toLocaleDateString() : '',
    }
  }), []);

  const rowData = data.map(record => {
    const row: { [key: string]: any } = {};
    Object.keys(record).forEach(key => {
      row[key] = record[key];
    });
    return row;
  });

  const agColumns = columns.map(col => ({
    headerName: col.headerName,
    field: col.field,
    sortable: true,
    filter: true,
    resizable: true,
    flex: 1, 
    type: notionToAgGridTypeMap[col.type] || 'text'
  }));

  const gridHeight = (data.length > 10 ? 10: data.length) * ROW_HEIGHT + 120; 

  return (
    <div className={`ag-theme-alpine ${styles.tableContainer}`} style={{ height: gridHeight, width: '100%' }}>
      <AgGridReact
        columnDefs={agColumns}
        rowData={rowData}
        defaultColDef={defaultColDef}
        pagination={true}
        paginationPageSize={10}
        columnTypes={columnTypes}
      />
    </div>
  );
};

export default TableView;
