import axios from 'axios';
import { FilterGroup } from '../interface/types';
import convertToNotionFilter from '../utils/convertToNotionFilter';
const api = axios.create({
  baseURL: 'http://localhost:8000/',
});

export const searchData = async (filterGroups: FilterGroup[]) => {
  try {
    const notionFilter = convertToNotionFilter(filterGroups);
    if(notionFilter && (notionFilter.and || notionFilter.or) ) {
      const response = await api.post('', notionFilter);
      return response.data;
    } else {
      const response = await api.get('');
      return response.data;
    }
    
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

