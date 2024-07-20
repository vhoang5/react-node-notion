// src/components/Table/Table.tsx
import React from 'react';
import TableRow from './TableRow';

interface TableProps {
  data: any[];
}

const Table: React.FC<TableProps> = ({ data }) => {
  if (data.length === 0) {
    return <div>No data available</div>;
  }

  const headers = Object.keys(data[0]);

  return (
    <table>
      <thead>
        <tr>
          {headers.map((header, index) => (
            <th key={index}>{header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, index) => (
          <TableRow key={index} data={row} />
        ))}
      </tbody>
    </table>
  );
};

export default Table;
