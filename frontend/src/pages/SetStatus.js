import React, { useState } from 'react';
import {
  Box,
  Container,
  Paper,
  Typography,
  Button,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Divider,
  TextField,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControlLabel,
  Checkbox,
  Snackbar,
  Alert
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import PauseCircleIcon from '@mui/icons-material/PauseCircle';
import ToggleOnIcon from '@mui/icons-material/ToggleOn';

const SetStatus = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [newStatus, setNewStatus] = useState('');
  const [statusNote, setStatusNote] = useState('');
  const [sendNotification, setSendNotification] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  
  // Mock customer data
  const customers = [
    { id: 1, name: 'ABC Company', address: '123 Main St', city: 'New York', status: 'active', lastUpdated: '2025-03-15', notes: 'Regular customer since 2020' },
    { id: 2, name: 'XYZ Corporation', address: '456 Park Ave', city: 'New York', status: 'inactive', lastUpdated: '2025-02-10', notes: 'Temporarily closed for renovations' },
    { id: 3, name: 'Acme Industries', address: '789 Broadway', city: 'New York', status: 'suspended', lastUpdated: '2025-01-20', notes: 'Payment issues - follow up required' },
    { id: 4, name: 'Global Enterprises', address: '321 Fifth Ave', city: 'New York', status: 'active', lastUpdated: '2025-03-01', notes: 'Premium customer' },
    { id: 5, name: 'Local Business LLC', address: '555 Lexington Ave', city: 'New York', status: 'active', lastUpdated: '2025-03-10', notes: '' },
    { id: 6, name: 'Metro Services', address: '777 Sixth Ave', city: 'New York', status: 'pending', lastUpdated: '2025-03-25', notes: 'Awaiting final paperwork' },
    { id: 7, name: 'City Suppliers', address: '888 Seventh Ave', city: 'New York', status: 'active', lastUpdated: '2025-02-28', notes: 'New location opening soon' },
    { id: 8, name: 'Regional Distributors', address: '999 Eighth Ave', city: 'New York', status: 'inactive', lastUpdated: '2024-12-15', notes: 'Seasonal business - reopens in spring' },
  ];
  
  // Status options
  const statusOptions = [
    { value: 'active', label: 'Active', color: 'success', icon: <CheckCircleIcon /> },
    { value: 'inactive', label: 'Inactive', color: 'default', icon: <CancelIcon /> },
    { value: 'suspended', label: 'Suspended', color: 'error', icon: <PauseCircleIcon /> },
    { value: 'pending', label: 'Pending', color: 'warning', icon: <ToggleOnIcon /> },
  ];
  
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };
  
  const handleStatusFilterChange = (event) => {
    setStatusFilter(event.target.value);
  };
  
  const handleOpenDialog = (customer, status) => {
    setSelectedCustomer(customer);
    setNewStatus(status);
    setStatusNote('');
    setSendNotification(false);
    setDialogOpen(true);
  };
  
  const handleCloseDialog = () => {
    setDialogOpen(false);
  };
  
  const handleStatusChange = () => {
    // In a real app, this would update the database
    showSnackbar(`Status for ${selectedCustomer.name} changed to ${newStatus.toUpperCase()}`);
    setDialogOpen(false);
  };
  
  const showSnackbar = (message) => {
    setSnackbarMessage(message);
    setSnackbarOpen(true);
  };
  
  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };
  
  // Filter customers based on search query and status filter
  const filteredCustomers = customers.filter(customer => {
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      const matchesSearch = 
        customer.name.toLowerCase().includes(query) ||
        customer.address.toLowerCase().includes(query) ||
        customer.city.toLowerCase().includes(query);
      
      if (!matchesSearch) return false;
    }
    
    // Filter by status
    if (statusFilter !== 'all' && customer.status !== statusFilter) {
      return false;
    }
    
    return true;
  });
  
  // Get status chip for display
  const getStatusChip = (status) => {
    const statusOption = statusOptions.find(option => option.value === status);
    return (
      <Chip 
        icon={statusOption.icon}
        label={statusOption.label} 
        color={statusOption.color} 
        size="small" 
      />
    );
  };
  
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Paper sx={{ p: 4, borderRadius: 2 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center" sx={{ mb: 4 }}>
          Set Customer Status
        </Typography>
        
        <Grid container spacing={4}>
          {/* Filter Section */}
          <Grid item xs={12} md={4}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Search & Filter
                </Typography>
                
                <TextField
                  fullWidth
                  margin="normal"
                  label="Search Customers"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  InputProps={{
                    startAdornment: <SearchIcon sx={{ color: 'action.active', mr: 1 }} />,
                  }}
                />
                
                <FormControl fullWidth margin="normal">
                  <InputLabel id="status-filter-label">Filter by Status</InputLabel>
                  <Select
                    labelId="status-filter-label"
                    id="status-filter"
                    value={statusFilter}
                    label="Filter by Status"
                    onChange={handleStatusFilterChange}
                  >
                    <MenuItem value="all">All Statuses</MenuItem>
                    {statusOptions.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          {option.icon}
                          <Box sx={{ ml: 1 }}>{option.label}</Box>
                        </Box>
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                
                <Box sx={{ mt: 3 }}>
                  <Typography variant="subtitle2" gutterBottom>
                    Status Legend:
                  </Typography>
                  <Grid container spacing={1}>
                    {statusOptions.map((option) => (
                      <Grid item xs={6} key={option.value}>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                          <Chip 
                            icon={option.icon}
                            label={option.label} 
                            color={option.color} 
                            size="small" 
                            sx={{ mr: 1 }}
                          />
                        </Box>
                      </Grid>
                    ))}
                  </Grid>
                </Box>
              </CardContent>
            </Card>
            
            {/* Status Summary */}
            <Card variant="outlined" sx={{ mt: 3 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Status Summary
                </Typography>
                
                <TableContainer>
                  <Table size="small">
                    <TableBody>
                      <TableRow>
                        <TableCell>Total Customers:</TableCell>
                        <TableCell align="right">{customers.length}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Active:</TableCell>
                        <TableCell align="right">{customers.filter(c => c.status === 'active').length}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Inactive:</TableCell>
                        <TableCell align="right">{customers.filter(c => c.status === 'inactive').length}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Suspended:</TableCell>
                        <TableCell align="right">{customers.filter(c => c.status === 'suspended').length}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Pending:</TableCell>
                        <TableCell align="right">{customers.filter(c => c.status === 'pending').length}</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>
          </Grid>
          
          {/* Customer List Section */}
          <Grid item xs={12} md={8}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Customer List
                </Typography>
                
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Customer</TableCell>
                        <TableCell>Address</TableCell>
                        <TableCell>Current Status</TableCell>
                        <TableCell>Last Updated</TableCell>
                        <TableCell>Actions</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {filteredCustomers.map((customer) => (
                        <TableRow key={customer.id}>
                          <TableCell>{customer.name}</TableCell>
                          <TableCell>{customer.address}, {customer.city}</TableCell>
                          <TableCell>{getStatusChip(customer.status)}</TableCell>
                          <TableCell>{customer.lastUpdated}</TableCell>
                          <TableCell>
                            <FormControl fullWidth size="small">
                              <Select
                                value=""
                                displayEmpty
                                onChange={(e) => handleOpenDialog(customer, e.target.value)}
                                renderValue={() => "Change Status"}
                              >
                                {statusOptions.map((option) => (
                                  <MenuItem 
                                    key={option.value} 
                                    value={option.value}
                                    disabled={customer.status === option.value}
                                  >
                                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                      {option.icon}
                                      <Box sx={{ ml: 1 }}>{option.label}</Box>
                                    </Box>
                                  </MenuItem>
                                ))}
                              </Select>
                            </FormControl>
                          </TableCell>
                        </TableRow>
                      ))}
                      {filteredCustomers.length === 0 && (
                        <TableRow>
                          <TableCell colSpan={5} align="center">
                            No customers match the selected criteria.
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Paper>
      
      {/* Status Change Dialog */}
      <Dialog open={dialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>
          Change Status for {selectedCustomer?.name}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            You are about to change the status from <strong>{selectedCustomer?.status.toUpperCase()}</strong> to <strong>{newStatus.toUpperCase()}</strong>.
          </DialogContentText>
          
          <TextField
            autoFocus
            margin="dense"
            label="Status Change Note"
            fullWidth
            multiline
            rows={3}
            value={statusNote}
            onChange={(e) => setStatusNote(e.target.value)}
            sx={{ mt: 2 }}
          />
          
          <FormControlLabel
            control={
              <Checkbox
                checked={sendNotification}
                onChange={(e) => setSendNotification(e.target.checked)}
              />
            }
            label="Send notification to customer"
            sx={{ mt: 2, display: 'block' }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button 
            onClick={handleStatusChange} 
            variant="contained"
            color={
              newStatus === 'active' ? 'success' : 
              newStatus === 'suspended' ? 'error' : 
              newStatus === 'pending' ? 'warning' : 
              'primary'
            }
          >
            Change Status
          </Button>
        </DialogActions>
      </Dialog>
      
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default SetStatus;