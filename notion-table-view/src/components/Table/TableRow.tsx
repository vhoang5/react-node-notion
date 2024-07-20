// src/components/Table/TableRow.tsx
import React from 'react';

interface TableRowProps {
  data: any;
}

const TableRow: React.FC<TableRowProps> = ({ data }) => {
  return (
    <tr>
      {Object.values(data).map((value: any, index) => (
        <td key={index}>{value}</td>
      ))}
    </tr>
  );
};

export default TableRow;
