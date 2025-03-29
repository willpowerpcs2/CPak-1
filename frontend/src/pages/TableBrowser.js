import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  CircularProgress,
  TextField,
  InputAdornment,
  Box,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import StorageIcon from '@mui/icons-material/Storage';
import axios from 'axios';

const TableBrowser = () => {
  const navigate = useNavigate();
  const [tables, setTables] = useState([]);
  const [filteredTables, setFilteredTables] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchTables = async () => {
      try {
        const response = await axios.get('/api/summary');
        const tableData = response.data.tables || [];
        setTables(tableData);
        setFilteredTables(tableData);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching tables:', err);
        setError('Failed to load tables');
        setLoading(false);
      }
    };

    fetchTables();
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredTables(tables);
    } else {
      const filtered = tables.filter(table => 
        table.table_name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredTables(filtered);
    }
  }, [searchQuery, tables]);

  const handleTableClick = (tableName) => {
    navigate(`/tables/${tableName}`);
  };

  if (loading) {
    return (
      <Container sx={{ mt: 4, mb: 4, textAlign: 'center' }}>
        <CircularProgress />
        <Typography variant="h6" sx={{ mt: 2 }}>
          Loading tables...
        </Typography>
      </Container>
    );
  }

  if (error) {
    return (
      <Container sx={{ mt: 4, mb: 4 }}>
        <Paper sx={{ p: 3, textAlign: 'center' }}>
          <Typography variant="h6" color="error">
            {error}
          </Typography>
          <Typography variant="body1" sx={{ mt: 2 }}>
            Please check your database connection and try again.
          </Typography>
        </Paper>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        Database Tables
      </Typography>
      
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper sx={{ p: 2, mb: 3 }}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Search tables..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Paper>
        </Grid>
        
        <Grid item xs={12}>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Table Name</TableCell>
                  <TableCell align="right">Rows</TableCell>
                  <TableCell align="right">Columns</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredTables.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={3} align="center">
                      No tables found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredTables.map((table) => (
                    <TableRow 
                      key={table.table_name}
                      hover
                      onClick={() => handleTableClick(table.table_name)}
                      className="clickable-row"
                    >
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <StorageIcon sx={{ mr: 1, color: 'primary.main' }} />
                          {table.table_name}
                        </Box>
                      </TableCell>
                      <TableCell align="right">{table.row_count.toLocaleString()}</TableCell>
                      <TableCell align="right">{table.column_count}</TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </Container>
  );
};

export default TableBrowser;