import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';

// Components
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import TableViewer from './pages/TableViewer';
import TableData from './pages/TableData';

// Create theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

function App() {
  const [tables, setTables] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(true);

  useEffect(() => {
    // Fetch tables from the API
    fetch('/api/tables')
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch tables');
        }
        return response.json();
      })
      .then(data => {
        setTables(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching tables:', err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Box sx={{ display: 'flex' }}>
          <Navbar toggleDrawer={toggleDrawer} />
          <Sidebar 
            open={drawerOpen} 
            tables={tables} 
            loading={loading} 
            error={error} 
          />
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              p: 3,
              width: { sm: `calc(100% - ${drawerOpen ? 240 : 0}px)` },
              ml: { sm: `${drawerOpen ? 240 : 0}px` },
              mt: '64px',
              transition: theme => theme.transitions.create(['width', 'margin'], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
              }),
            }}
          >
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/tables" element={<TableViewer tables={tables} loading={loading} error={error} />} />
              <Route path="/tables/:tableName" element={<TableData />} />
            </Routes>
          </Box>
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;