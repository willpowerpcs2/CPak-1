import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import { DataGrid } from '@mui/x-data-grid';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Pagination from '@mui/material/Pagination';

function TableData() {
  const { tableName } = useParams();
  const [data, setData] = useState([]);
  const [columns, setColumns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    page: 0,
    pageSize: 25,
    total: 0
  });

  useEffect(() => {
    fetchData();
  }, [tableName, pagination.page, pagination.pageSize]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `/api/data/${tableName}?limit=${pagination.pageSize}&offset=${pagination.page * pagination.pageSize}`
      );
      
      if (!response.ok) {
        throw new Error(`Failed to fetch data from ${tableName}`);
      }
      
      const result = await response.json();
      
      if (result.data.length > 0) {
        // Create columns from the first row
        const cols = Object.keys(result.data[0]).map(key => ({
          field: key,
          headerName: key.charAt(0).toUpperCase() + key.slice(1).replace(/_/g, ' '),
          flex: 1,
          minWidth: 150
        }));
        
        // Add id to each row for DataGrid
        const rowsWithId = result.data.map((row, index) => ({
          id: index,
          ...row
        }));
        
        setColumns(cols);
        setData(rowsWithId);
        setPagination(prev => ({
          ...prev,
          total: result.total
        }));
      } else {
        setColumns([]);
        setData([]);
        setPagination(prev => ({
          ...prev,
          total: 0
        }));
      }
      
      setLoading(false);
    } catch (err) {
      console.error(`Error fetching data from ${tableName}:`, err);
      setError(err.message);
      setLoading(false);
    }
  };

  const handlePageChange = (event, newPage) => {
    setPagination(prev => ({
      ...prev,
      page: newPage - 1
    }));
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        {tableName}
      </Typography>
      
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Alert severity="error" sx={{ m: 2 }}>
          {error}
        </Alert>
      ) : data.length === 0 ? (
        <Alert severity="info" sx={{ m: 2 }}>
          No data found in this table.
        </Alert>
      ) : (
        <Paper elevation={3} sx={{ height: 'calc(100vh - 200px)', width: '100%', mt: 3 }}>
          <DataGrid
            rows={data}
            columns={columns}
            disableRowSelectionOnClick
            hideFooter
            autoHeight
          />
          <Box sx={{ display: 'flex', justifyContent: 'center', p: 2 }}>
            <Pagination
              count={Math.ceil(pagination.total / pagination.pageSize)}
              page={pagination.page + 1}
              onChange={handlePageChange}
              color="primary"
            />
          </Box>
        </Paper>
      )}
    </div>
  );
}

export default TableData;