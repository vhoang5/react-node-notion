import React, { useState, useEffect } from 'react';
import styles from './Home.module.css';
import FilterDialog from '../components/Filter/FilterDialog';
import TableView from '../components/TableView';
import { useFilterContext } from '../context/FilterContext'; // Adjust import path as needed
import { searchData } from '../services/apiService';
import { DataRecord } from '../interface/types';

const columns = [
  { headerName: 'Name', field: 'name', type: 'rich_text' },
  { headerName: 'Company', field: 'company', type: 'rich_text' },
  { headerName: 'Status', field: 'status', type: 'status' },
  { headerName: 'Priority', field: 'priority', type: 'select' },
  { headerName: 'Estimated Value', field: 'estimatedValue', type: 'number' },
];

const Home: React.FC = () => {
  const [data, setData] = useState<DataRecord[]>([]);
  const [showFilter, setShowFilter] = useState(false);
  const { filterGroups } = useFilterContext();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await searchData(filterGroups);
        setData(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const applyFilters = async () => {
    setShowFilter(false); // Close the filter dialog
  
    try {
      const result = await searchData(filterGroups);
      setData(result);
    } catch (error) {
      console.error('Error applying filters:', error);
    }
  };
  

  return (
    <div className={styles.container}>
      <h1>Data Table</h1>
      <button onClick={() => setShowFilter(true)} className={styles.fillerButton}>Show Filters</button>
      <TableView columns={columns} data={data} />
      {showFilter && (
        <FilterDialog
          open={showFilter}
          columns={columns}
          onClose={() => setShowFilter(false)}
          onApply={applyFilters}
        />
      )}
    </div>
  );
};

export default Home;
