import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/',
});

export const getData = async () => {
  try {
    const response = await api.get('');
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};
