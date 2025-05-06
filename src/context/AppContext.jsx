import React, { createContext, useContext, useState } from 'react';

export const AppContext = createContext();
export const useApp = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');
  const [currency, setCurrency] = useState('USD');

  return (
    <AppContext.Provider value={{ theme, setTheme, currency, setCurrency }}>
      {children}
    </AppContext.Provider>
  );
};