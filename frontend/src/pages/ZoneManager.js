import React, { useState, useEffect } from 'react';
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
  TextField,
  InputAdornment,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  IconButton,
  Divider,
  Alert,
  Snackbar,
  Checkbox,
  FormControlLabel
} from '@mui/material';
import {
  Search as SearchIcon,
  Add as AddIcon,
  Edit as EditIcon,
  Save as SaveIcon,
  Delete as DeleteIcon,
  Print as PrintIcon
} from '@mui/icons-material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import DatePickerWrapper from '../components/DatePickerWrapper';
import axios from 'axios';

const ZoneManager = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [customers, setCustomers] = useState([]);
  const [zones, setZones] = useState([]);
  const [zoneCosts, setZoneCosts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [openZoningDialog, setOpenZoningDialog] = useState(false);
  const [zoningDate, setZoningDate] = useState(new Date());
  const [selectedZones, setSelectedZones] = useState({});
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch customers (main_table)
        const customersResponse = await axios.get('/api/tables/main_table/data', {
          params: { limit: 1000 }
        });
        setCustomers(customersResponse.data.data);
        setFilteredCustomers(customersResponse.data.data);
        
        // Fetch zones
        const zonesResponse = await axios.get('/api/tables/zones/data', {
          params: { limit: 100 }
        });
        setZones(zonesResponse.data.data || []);
        
        // Fetch zone costs
        const zoneCostsResponse = await axios.get('/api/tables/zonecost/data', {
          params: { limit: 100 }
        });
        setZoneCosts(zoneCostsResponse.data.data || []);
        
        setLoading(false);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to load zone data');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredCustomers(customers);
    } else {
      const query = searchQuery.toLowerCase();
      
      // Filter customers
      const filtered = customers.filter(customer => {
        return (
          (customer.company_name && customer.company_name.toLowerCase().includes(query)) ||
          (customer.name && customer.name.toLowerCase().includes(query)) ||
          (customer.phone_number && customer.phone_number.toLowerCase().includes(query))
        );
      });
      setFilteredCustomers(filtered);
    }
  }, [searchQuery, customers]);

  const handleOpenZoningDialog = (customer) => {
    setSelectedCustomer(customer);
    setZoningDate(new Date());
    
    // Initialize selected zones (in a real app, we would fetch current zones for this customer)
    const initialZones = {};
    for (let i = 1; i <= 16; i++) {
      initialZones[`zone_${i}`] = false;
    }
    setSelectedZones(initialZones);
    
    setOpenZoningDialog(true);
  };

  const handleCloseZoningDialog = () => {
    setOpenZoningDialog(false);
  };

  const handleZoneChange = (zoneName) => {
    setSelectedZones({
      ...selectedZones,
      [zoneName]: !selectedZones[zoneName]
    });
  };

  const calculateTotalCost = () => {
    let total = 0;
    
    // In a real app, we would use actual zone costs from the database
    // For now, we'll use a fixed cost per zone
    Object.keys(selectedZones).forEach(zoneName => {
      if (selectedZones[zoneName]) {
        // Extract zone number from the zone name (e.g., "zone_1" -> 1)
        const zoneNumber = parseInt(zoneName.split('_')[1]);
        
        // Find the cost for this zone
        const zoneCost = zoneCosts.find(zc => zc.zone_number === zoneNumber);
        const cost = zoneCost ? parseFloat(zoneCost.cost) : 50; // Default to $50 if not found
        
        total += cost;
      }
    });
    
    return total;
  };

  const handleSaveZoning = async () => {
    try {
      // In a real application, this would update the database
      // For now, we'll just show a success message
      
      const totalCost = calculateTotalCost();
      
      // Mock API call to save zoning
      /*
      await axios.post('/api/zoning', {
        company_name: selectedCustomer.company_name,
        zoning_date: zoningDate,
        cost_for_this_month: totalCost,
        balance_due: totalCost,
        ...selectedZones
      });
      */
      
      // Show success message
      setSnackbarMessage(`Zoning saved for ${selectedCustomer.company_name} with total cost $${totalCost.toFixed(2)}`);
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
      
      // Close dialog
      setOpenZoningDialog(false);
      
      // In a real app, we would refresh the data here
    } catch (err) {
      console.error('Error saving zoning:', err);
      setSnackbarMessage('Failed to save zoning');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  if (loading) {
    return (
      <Container sx={{ mt: 4, mb: 4, textAlign: 'center' }}>
        <CircularProgress />
        <Typography variant="h6" sx={{ mt: 2 }}>
          Loading zone data...
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
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Zone Manager
        </Typography>
        
        <Paper sx={{ width: '100%', mb: 2, p: 2 }}>
          <Box sx={{ mb: 2 }}>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  variant="outlined"
                  placeholder="Search customers..."
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
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <Button
                    variant="contained"
                    startIcon={<PrintIcon />}
                    sx={{ ml: 1 }}
                  >
                    Print Zone Report
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Box>
          
          <TableContainer>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Company Name</TableCell>
                  <TableCell>Contact Name</TableCell>
                  <TableCell>Phone</TableCell>
                  <TableCell>City</TableCell>
                  <TableCell>Type of Business</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredCustomers.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} align="center">
                      No customers found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredCustomers.map((customer, index) => (
                    <TableRow key={index}>
                      <TableCell>{customer.company_name || 'N/A'}</TableCell>
                      <TableCell>{customer.name || 'N/A'}</TableCell>
                      <TableCell>{customer.phone_number || 'N/A'}</TableCell>
                      <TableCell>{customer.city || 'N/A'}</TableCell>
                      <TableCell>{customer.type_of_business || 'N/A'}</TableCell>
                      <TableCell>
                        <IconButton
                          color="primary"
                          size="small"
                          onClick={() => handleOpenZoningDialog(customer)}
                          title="Assign Zones"
                        >
                          <EditIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
        
        {/* Zoning Dialog */}
        <Dialog open={openZoningDialog} onClose={handleCloseZoningDialog} maxWidth="md" fullWidth>
          <DialogTitle>
            Assign Zones for {selectedCustomer?.company_name}
          </DialogTitle>
          <DialogContent>
            <Box sx={{ p: 1 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle1" gutterBottom>
                    <strong>Company:</strong> {selectedCustomer?.company_name}
                  </Typography>
                  <Typography variant="subtitle1" gutterBottom>
                    <strong>Contact:</strong> {selectedCustomer?.name || 'N/A'}
                  </Typography>
                  <Typography variant="subtitle1" gutterBottom>
                    <strong>Phone:</strong> {selectedCustomer?.phone_number || 'N/A'}
                  </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <DatePickerWrapper
                    label="Zoning Date"
                    value={zoningDate}
                    onChange={(newDate) => setZoningDate(newDate)}
                    margin="normal"
                  />
                </Grid>
              </Grid>
              
              <Divider sx={{ my: 2 }} />
              
              <Typography variant="h6" gutterBottom>
                Select Zones
              </Typography>
              
              <Grid container spacing={2}>
                {Array.from({ length: 16 }, (_, i) => i + 1).map((zoneNumber) => (
                  <Grid item xs={6} sm={4} md={3} key={zoneNumber}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={selectedZones[`zone_${zoneNumber}`] || false}
                          onChange={() => handleZoneChange(`zone_${zoneNumber}`)}
                          name={`zone_${zoneNumber}`}
                        />
                      }
                      label={`Zone ${zoneNumber}`}
                    />
                  </Grid>
                ))}
              </Grid>
              
              <Divider sx={{ my: 2 }} />
              
              <Typography variant="h6" gutterBottom>
                Total Cost: ${calculateTotalCost().toFixed(2)}
              </Typography>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseZoningDialog}>Cancel</Button>
            <Button 
              onClick={handleSaveZoning} 
              variant="contained" 
              color="primary"
              startIcon={<SaveIcon />}
            >
              Save Zoning
            </Button>
          </DialogActions>
        </Dialog>
        
        {/* Snackbar for notifications */}
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={6000}
          onClose={handleSnackbarClose}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        >
          <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </Container>
    </LocalizationProvider>
  );
};

export default ZoneManager;