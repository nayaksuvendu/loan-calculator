import ThemeToggle from './ThemeToggle.jsx'
import { Link } from 'react-router-dom'
import React, {  useState } from 'react';
import { AppBar, Toolbar, Button, IconButton, Drawer, List, ListItem, ListItemText} from '@mui/material';
import {FiMenu} from 'react-icons/fi';


export default function Header({children}) {
  const [open, setOpen] = useState(false);

  const toggleDrawer = (state) => () => {
    setOpen(state);
  };

  const navItems = [
    { label: 'HOME', to: '/' },
    { label: 'EXCHANGE RATES (LIVE)', to: '/exchange' },
    { label: 'ABOUT', to: '/about' },
    { label: 'ERROR PAGE', to: '/error' },
  ];
 
  return (
    <>
    <AppBar position="static" className="bg-blue-600 text-white">
      <Toolbar className="flex justify-between">
        <div className="text-white font-semibold text-lg">Loan Calculator</div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-4">
          {navItems.map((item) => (
            <Link key={item.to} component={Link} to={item.to} className="text-white normal-case shadow-2xl ">
              {item.label}
            </Link>
          ))}
          <ThemeToggle/>
        </div>

        {/* Mobile Menu Icon */}
        <div className="md:hidden ">
          <IconButton  color="inherit" onClick={toggleDrawer(true)}>
            <FiMenu/>
          </IconButton>
        </div>
      </Toolbar>
    </AppBar>

    {/* Mobile Sidebar */}
    <Drawer anchor="left" open={open} onClose={toggleDrawer(false)}>
      <div className="w-64 p-4">
        <List>
          {navItems.map((item) => (
            <ListItem
              button
              key={item.to}
              component={Link}
              to={item.to}
              onClick={toggleDrawer(false)}
            >
              <ListItemText primary={item.label} />
            </ListItem>
          ))}
          <div className="pl-4 pt-4">
            <ThemeToggle/>
          </div>
        </List>
      </div>
    </Drawer>
    {children}
  </>
  )

}
