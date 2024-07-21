import React from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import styles from './TableView.module.css';

const TableView = ({ columns, data, filters }) => {
  // Apply filters to the data (optional, depending on how you want to handle it)
  const filteredData = data; // Apply your filter logic here if necessary

  return (
    <div className={`ag-theme-alpine ${styles.tableContainer}`}>
      <AgGridReact
        columnDefs={columns}
        rowData={filteredData}
        defaultColDef={{
          sortable: true,
          resizable: true,
        }}
      />
    </div>
  );
};

export default TableView;
