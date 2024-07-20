// src/pages/Home.tsx
import React, { useEffect, useState } from 'react';
import FilterDialog from '../components/Filter/FilterDialog';
import Table from '../components/Table/Table';
import Button from '@mui/material/Button';
import axios from 'axios';
import './Home.css';
import { getData } from '../services/apiService';

const Home: React.FC = () => {
  const [data, setData] = useState<any[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);

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

  const fetchFilteredData = (filters: any) => {
    // Convert filters to API request format and fetch data
    axios.post('/api/data', filters)
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  };

  const handleOpenDialog = () => {
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  return (
    <div className="home">
      <h1>Advanced Filter Example</h1>
      <Button variant="contained" color="primary" onClick={handleOpenDialog}>
        Open Filter
      </Button>
      <FilterDialog
        open={dialogOpen}
        onClose={handleCloseDialog}
        onApply={fetchFilteredData}
      />
      <Table data={data} />
    </div>
  );
};

export default Home;

