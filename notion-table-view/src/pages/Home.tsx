// src/pages/Home.tsx
import React, { useEffect, useState } from 'react';
import AdvancedFilter from '../components/Filter/AdvancedFilter';
import Table from '../components/Table/Table';
import axios from 'axios';
import { getData } from '../services/apiService';

const Home: React.FC = () => {
  const [data, setData] = useState<any[]>([]);

  const fetchFilteredData = (filters: any) => {
    // Convert filters to API request format and fetch data
    axios.get('http://localhost:8000/', filters)
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  };

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


  return (
    <div>
      <AdvancedFilter onApply={fetchFilteredData} />
      <Table data={data} />
    </div>
  );
};

export default Home;
