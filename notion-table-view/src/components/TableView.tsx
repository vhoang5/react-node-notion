// src/components/TableView.tsx
import React from 'react';
import { useTable, useSortBy } from 'react-table';

interface TableViewProps {
  data: any[];
}

const TableView: React.FC<TableViewProps> = ({ data }) => {
  const columns = React.useMemo(
    () => [
      {
        Header: 'Name',
        accessor: 'name'
      },
      {
        Header: 'Company',
        accessor: 'company'
      },
      {
        Header: 'Status',
        accessor: 'status'
      },
      {
        Header: 'Priority',
        accessor: 'priority'
      },
      {
        Header: 'Estimated Value',
        accessor: 'estimatedValue'
      },
      {
        Header: 'Account Owner',
        accessor: 'accountOwner'
      }
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable(
    {
      columns,
      data
    },
    useSortBy
  );

  return (
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column: any) => (
              <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                {column.render('Header')}
                <span>
                  {column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : ''}
                </span>
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map(row => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map(cell => (
                <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default TableView;
