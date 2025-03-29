import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
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
  Box,
  Tabs,
  Tab,
  Pagination,
  TextField,
  InputAdornment,
  IconButton,
  Chip,
  Divider,
  Button,
} from '@mui/material';
import {
  Search as SearchIcon,
  ArrowBack as ArrowBackIcon,
  Storage as StorageIcon,
  ViewList as ViewListIcon,
  Info as InfoIcon,
} from '@mui/icons-material';
import axios from 'axios';

// Tab panel component
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`table-tabpanel-${index}`}
      aria-labelledby={`table-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

const TableDetail = () => {
  const { tableName } = useParams();
  const navigate = useNavigate();
  const [tabValue, setTabValue] = useState(0);
  const [tableData, setTableData] = useState([]);
  const [tableStructure, setTableStructure] = useState([]);
  const [tableStats, setTableStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(50);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    const fetchTableData = async () => {
      try {
        setLoading(true);
        
        // Fetch table structure
        const structureResponse = await axios.get(`/api/tables/${tableName}/structure`);
        setTableStructure(structureResponse.data);
        
        // Fetch table stats
        const statsResponse = await axios.get(`/api/tables/${tableName}/stats`);
        setTableStats(statsResponse.data);
        
        // Fetch table data with pagination
        const dataResponse = await axios.get(`/api/tables/${tableName}/data`, {
          params: { page, limit: rowsPerPage }
        });
        
        setTableData(dataResponse.data.data);
        setFilteredData(dataResponse.data.data);
        setTotalPages(dataResponse.data.pagination.pages);
        setLoading(false);
      } catch (err) {
        console.error(`Error fetching data for table ${tableName}:`, err);
        setError(`Failed to load data for table ${tableName}`);
        setLoading(false);
      }
    };

    fetchTableData();
  }, [tableName, page, rowsPerPage]);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredData(tableData);
      setIsSearching(false);
    } else {
      setIsSearching(true);
      const filtered = tableData.filter(row => {
        return Object.values(row).some(value => {
          if (value === null || value === undefined) return false;
          return String(value).toLowerCase().includes(searchQuery.toLowerCase());
        });
      });
      setFilteredData(filtered);
    }
  }, [searchQuery, tableData]);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(1);
  };

  const handleBackClick = () => {
    navigate('/tables');
  };

  const getDataType = (column) => {
    let type = column.data_type;
    if (column.character_maximum_length) {
      type += `(${column.character_maximum_length})`;
    }
    return type;
  };

  if (loading && !tableStructure.length) {
    return (
      <Container sx={{ mt: 4, mb: 4, textAlign: 'center' }}>
        <CircularProgress />
        <Typography variant="h6" sx={{ mt: 2 }}>
          Loading table data...
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
          <Button
            variant="contained"
            startIcon={<ArrowBackIcon />}
            onClick={handleBackClick}
            sx={{ mt: 2 }}
          >
            Back to Tables
          </Button>
        </Paper>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <IconButton onClick={handleBackClick} sx={{ mr: 2 }}>
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h4" component="h1">
          <StorageIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
          {tableName}
        </Typography>
      </Box>

      {tableStats && (
        <Paper sx={{ p: 2, mb: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <ViewListIcon color="primary" sx={{ mr: 1 }} />
                <Typography variant="body1">
                  <strong>Rows:</strong> {tableStats.rowCount.toLocaleString()}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <InfoIcon color="primary" sx={{ mr: 1 }} />
                <Typography variant="body1">
                  <strong>Columns:</strong> {tableStats.columnCount}
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Paper>
      )}

      <Paper sx={{ width: '100%', mb: 2 }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={tabValue} onChange={handleTabChange} aria-label="table tabs">
            <Tab label="Data" id="table-tab-0" aria-controls="table-tabpanel-0" />
            <Tab label="Structure" id="table-tab-1" aria-controls="table-tabpanel-1" />
          </Tabs>
        </Box>

        <TabPanel value={tabValue} index={0}>
          <Box sx={{ mb: 2 }}>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  variant="outlined"
                  placeholder="Search in current page..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon />
                      </InputAdornment>
                    ),
                  }}
                  size="small"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                  <Typography variant="body2" sx={{ mr: 2 }}>
                    Rows per page:
                  </Typography>
                  <TextField
                    select
                    value={rowsPerPage}
                    onChange={handleRowsPerPageChange}
                    SelectProps={{
                      native: true,
                    }}
                    size="small"
                    sx={{ width: 80, mr: 2 }}
                  >
                    {[10, 25, 50, 100].map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </TextField>
                </Box>
              </Grid>
            </Grid>
          </Box>

          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
              <CircularProgress />
            </Box>
          ) : (
            <>
              <div className="table-container">
                <TableContainer>
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        {tableStructure.map((column) => (
                          <TableCell key={column.column_name}>
                            {column.column_name}
                          </TableCell>
                        ))}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {filteredData.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={tableStructure.length} align="center">
                            {isSearching ? 'No matching records found' : 'No data available'}
                          </TableCell>
                        </TableRow>
                      ) : (
                        filteredData.map((row, rowIndex) => (
                          <TableRow key={rowIndex}>
                            {tableStructure.map((column) => (
                              <TableCell key={`${rowIndex}-${column.column_name}`}>
                                {row[column.column_name] !== null && row[column.column_name] !== undefined
                                  ? String(row[column.column_name])
                                  : 'NULL'}
                              </TableCell>
                            ))}
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
              </div>

              {!isSearching && (
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
                  <Pagination
                    count={totalPages}
                    page={page}
                    onChange={handlePageChange}
                    color="primary"
                    showFirstButton
                    showLastButton
                  />
                </Box>
              )}
            </>
          )}
        </TabPanel>

        <TabPanel value={tabValue} index={1}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Column Name</TableCell>
                  <TableCell>Data Type</TableCell>
                  <TableCell>Nullable</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {tableStructure.map((column) => (
                  <TableRow key={column.column_name}>
                    <TableCell>{column.column_name}</TableCell>
                    <TableCell>
                      <Chip
                        label={getDataType(column)}
                        color={
                          column.data_type.includes('int') ? 'primary' :
                          column.data_type.includes('char') || column.data_type.includes('text') ? 'success' :
                          column.data_type.includes('date') || column.data_type.includes('time') ? 'warning' :
                          column.data_type.includes('bool') ? 'secondary' : 'default'
                        }
                        variant="outlined"
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      {column.is_nullable === 'YES' ? 'Yes' : 'No'}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </TabPanel>
      </Paper>
    </Container>
  );
};

export default TableDetail;