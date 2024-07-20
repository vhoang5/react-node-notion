import axios from 'axios';

export const fetchNotionDatabase = async () => {
  try {
    const response = await axios.get(`http://localhost:8000/`);
    return response.data;
  } catch (error) {
    console.error("Error fetching the Notion database:", error);
    throw error;
  }
};
