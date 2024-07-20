import React, { useState, useEffect } from 'react';
import styles from './Home.module.css';
import TableView from '../components/TableView';
import { getData } from '../services/apiService';
import FilterDialog from '../components/Filter/FilterDialog';
import { ColumnDefinition } from '../interface/types';

const Home: React.FC = () => {
    const [data, setData] = useState<any[]>([]);
    const [isFilterDialogOpen, setFilterDialogOpen] = useState(false);
    const [filters, setFilters] = useState<any[]>([]);

    const columns: ColumnDefinition[] = [
        { Header: 'Name', accessor: 'name', type: 'text' },
        { Header: 'Company', accessor: 'company', type: 'text' },
        { Header: 'Status', accessor: 'status', type: 'status' },
        { Header: 'Priority', accessor: 'priority', type: 'select' },
        { Header: 'Estimated Value', accessor: 'estimatedValue', type: 'number' },
    ];

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

    const handleApplyFilter = (appliedFilters: any) => {
        console.log('Applied Filters:', appliedFilters);
        setFilters(appliedFilters);
        setFilterDialogOpen(false);
        // Apply filter logic here or make an API call with filters
    };

    const handleCloseFilter = () => {
      setFilterDialogOpen(false);
    };
  

    return (
        <div className={styles.home}>
            <button onClick={() => setFilterDialogOpen(true)}>Open Filters</button>
            <TableView columns={columns} data={data} />
            {isFilterDialogOpen && (
                <FilterDialog open={isFilterDialogOpen} columns={columns} onClose={handleCloseFilter} onApply={handleApplyFilter} />
            )}
        </div>
    );
};

export default Home;
