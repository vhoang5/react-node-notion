import React from 'react';
import Home from './pages/Home';
import { FilterProvider } from './context/FilterContext'; // Adjust import path as needed

const App: React.FC = () => {
  return (
    <FilterProvider>
      <Home />
    </FilterProvider>
  );
};

export default App;
