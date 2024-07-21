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

const TableView: React.FC<TableProps> = ({ columns, data }) => {
  const defaultColDef = useMemo(() => ({
    sortable: true,
    resizable: true,
    filter: true,
  }), []);

  // Map the data to the format expected by ag-grid
  const rowData = data.map(record => {
    const row: { [key: string]: any } = {};
    Object.keys(record).forEach(key => {
      row[key] = record[key];
    });
    return row;
  });

  // Define columns for ag-grid
  const agColumns = columns.map(col => ({
    headerName: col.headerName,
    field: col.field,
    sortable: true,
    filter: true,
    resizable: true,
  }));

  return (
    <div className={`ag-theme-alpine ${styles.tableContainer}`} style={{ height: 400, width: '100%' }}>
      <AgGridReact
        columnDefs={agColumns}
        rowData={rowData}
        defaultColDef={defaultColDef}
      />
    </div>
  );
};

export default TableView;
