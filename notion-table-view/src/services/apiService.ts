// src/services/apiService.ts
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/', // replace with your API base URL
});

export const getData = async () => {
  try {
    const response = await api.get(''); // replace with your API endpoint
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};
