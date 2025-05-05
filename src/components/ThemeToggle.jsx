import React from 'react';
import { Switch, FormControlLabel } from '@mui/material';
import { useApp } from '../context/AppContext.jsx';


export default function ThemeToggle() {
    const { theme,setTheme } = useApp();
    const handleToggle = () => {
      setTheme(prev => !prev);
    };
  return (
    <FormControlLabel
      control={
        <Switch
          checked={theme}
          onChange={handleToggle}
          color="default"
        />
      }
      label={theme ? 'Dark Mode' : 'Light Mode'}
    />
  );
};

