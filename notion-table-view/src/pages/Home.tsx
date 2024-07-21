import React, { useState, useEffect } from 'react';
import styles from './Home.module.css';
import { getData } from '../services/apiService';
import FilterDialog from '../components/Filter/FilterDialog';
import TableView from '../components/TableView';

const columns = [
  { headerName: 'Name', field: 'name', type: 'rich_text' },
  { headerName: 'Company', field: 'company', type: 'rich_text' },
  { headerName: 'Status', field: 'status', type: 'status' },
  { headerName: 'Priority', field: 'priority', type: 'select' },
  { headerName: 'Estimated Value', field: 'estimatedValue', type: 'number' },
];

const Home = () => {
  const [data, setData] = useState([]);
  const [filters, setFilters] = useState([]);
  const [showFilter, setShowFilter] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getData();
        setData(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
      }
    };

    fetchData();
  }, []);

  const applyFilters = (filters: any) => {
    setFilters(filters);
    // Apply API call with filters
  };

  return (
    <div className={styles.container}>
      <h1>Data Table</h1>
      <button onClick={() => setShowFilter(true)}>Show Filters</button>
      <TableView columns={columns} data={data} />
      {showFilter && (
        <FilterDialog
          open = {showFilter}
          columns={columns}
          onClose={() => setShowFilter(false)}
          onApply={applyFilters}
        />
      )}
    </div>
  );
};

export default Home;
