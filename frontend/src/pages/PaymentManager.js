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
  Tabs,
  Tab,
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
  Snackbar
} from '@mui/material';
import {
  Search as SearchIcon,
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Payment as PaymentIcon,
  Receipt as ReceiptIcon,
  Warning as WarningIcon,
  CheckCircle as CheckCircleIcon,
  Print as PrintIcon
} from '@mui/icons-material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import DatePickerWrapper from '../components/DatePickerWrapper';
import axios from 'axios';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`payment-tabpanel-${index}`}
      aria-labelledby={`payment-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

const PaymentManager = () => {
  const [tabValue, setTabValue] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pastDueAccounts, setPastDueAccounts] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredAccounts, setFilteredAccounts] = useState([]);
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const [openPaymentDialog, setOpenPaymentDialog] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [paymentAmount, setPaymentAmount] = useState('');
  const [checkNumber, setCheckNumber] = useState('');
  const [paymentDate, setPaymentDate] = useState(new Date());
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [openCustomerDialog, setOpenCustomerDialog] = useState(false);
  const [customerFormData, setCustomerFormData] = useState({
    company_name: '',
    name: '',
    phone_number: '',
    street_address: '',
    city: '',
    state: '',
    zip_code: '',
    type_of_business: '',
    active: true
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        const pastDueResponse = await axios.get('/api/tables/past due accounts/data', {
          params: { limit: 1000 }
        });
        setPastDueAccounts(pastDueResponse.data.data);
        setFilteredAccounts(pastDueResponse.data.data);
        
        const customersResponse = await axios.get('/api/tables/main_table/data', {
          params: { limit: 1000 }
        });
        setCustomers(customersResponse.data.data);
        setFilteredCustomers(customersResponse.data.data);
        
        setLoading(false);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to load payment data');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredAccounts(pastDueAccounts);
      setFilteredCustomers(customers);
    } else {
      const query = searchQuery.toLowerCase();
      
      const filteredPastDue = pastDueAccounts.filter(account => {
        return account.company_name && account.company_name.toLowerCase().includes(query);
      });
      setFilteredAccounts(filteredPastDue);
      
      const filteredCustomerList = customers.filter(customer => {
        return (
          (customer.company_name && customer.company_name.toLowerCase().includes(query)) ||
          (customer.name && customer.name.toLowerCase().includes(query)) ||
          (customer.phone_number && customer.phone_number.toLowerCase().includes(query))
        );
      });
      setFilteredCustomers(filteredCustomerList);
    }
  }, [searchQuery, pastDueAccounts, customers]);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleOpenPaymentDialog = (account) => {
    setSelectedAccount(account);
    setPaymentAmount(account.balance_due || '');
    setCheckNumber('');
    setPaymentDate(new Date());
    setOpenPaymentDialog(true);
  };

  const handleClosePaymentDialog = () => {
    setOpenPaymentDialog(false);
  };

  const handlePaymentSubmit = async () => {
    try {
      await axios.post('/api/payments', {
        company_name: selectedAccount.company_name,
        amount_paid: paymentAmount,
        check_number: checkNumber,
        date_check_received: paymentDate,
        balance_due: selectedAccount.balance_due - paymentAmount
      });
      
      setSnackbarMessage(`Payment of $${paymentAmount} recorded for ${selectedAccount.company_name}`);
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
      
      setOpenPaymentDialog(false);
    } catch (err) {
      console.error('Error recording payment:', err);
      setSnackbarMessage('Failed to record payment');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  };

  const handleOpenCustomerDialog = (customer = null) => {
    if (customer) {
      setCustomerFormData({
        company_name: customer.company_name || '',
        name: customer.name || '',
        phone_number: customer.phone_number || '',
        street_address: customer.street_address || '',
        city: customer.city || '',
        state: customer.state || '',
        zip_code: customer.zip_code || '',
        type_of_business: customer.type_of_business || '',
        active: customer.active !== false
      });
    } else {
      setCustomerFormData({
        company_name: '',
        name: '',
        phone_number: '',
        street_address: '',
        city: '',
        state: '',
        zip_code: '',
        type_of_business: '',
        active: true
      });
    }
    setOpenCustomerDialog(true);
  };

  const handleCloseCustomerDialog = () => {
    setOpenCustomerDialog(false);
  };

  const handleCustomerFormChange = (e) => {
    const { name, value, type, checked } = e.target;
    setCustomerFormData({
      ...customerFormData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleCustomerSubmit = async () => {
    try {
      await axios.post('/api/customers', customerFormData);
      
      setSnackbarMessage(`Customer ${customerFormData.company_name} saved successfully`);
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
      
      setOpenCustomerDialog(false);
    } catch (err) {
      console.error('Error saving customer:', err);
      setSnackbarMessage('Failed to save customer');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const formatCurrency = (value) => {
    if (value === null || value === undefined) return '$0.00';
    return `$${parseFloat(value).toFixed(2)}`;
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  if (loading) {
    return (
      <Container sx={{ mt: 4, mb: 4, textAlign: 'center' }}>
        <CircularProgress />
        <Typography variant="h6" sx={{ mt: 2 }}>
          Loading payment data...
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
          Payment Manager
        </Typography>
        
        <Paper sx={{ width: '100%', mb: 2 }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={tabValue} onChange={handleTabChange} aria-label="payment tabs">
              <Tab label="Past Due Accounts" id="payment-tab-0" aria-controls="payment-tabpanel-0" />
              <Tab label="Customer Management" id="payment-tab-1" aria-controls="payment-tabpanel-1" />
              <Tab label="Reports" id="payment-tab-2" aria-controls="payment-tabpanel-2" />
            </Tabs>
          </Box>
          
          <TabPanel value={tabValue} index={0}>
            <Box sx={{ mb: 2 }}>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    variant="outlined"
                    placeholder="Search by company name..."
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
                      Print Report
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
                    <TableCell>Zoning Date</TableCell>
                    <TableCell>Cost</TableCell>
                    <TableCell>Balance Due</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredAccounts.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} align="center">
                        No past due accounts found
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredAccounts.map((account, index) => (
                      <TableRow key={index}>
                        <TableCell>{account.company_name || 'N/A'}</TableCell>
                        <TableCell>{formatDate(account.zoning_date)}</TableCell>
                        <TableCell>{formatCurrency(account.cost_for_this_month)}</TableCell>
                        <TableCell>{formatCurrency(account.balance_due)}</TableCell>
                        <TableCell>
                          <Chip
                            icon={<WarningIcon />}
                            label="Past Due"
                            color="error"
                            size="small"
                          />
                        </TableCell>
                        <TableCell>
                          <IconButton
                            color="primary"
                            size="small"
                            onClick={() => handleOpenPaymentDialog(account)}
                            title="Record Payment"
                          >
                            <PaymentIcon />
                          </IconButton>
                          <IconButton
                            color="secondary"
                            size="small"
                            title="View Details"
                          >
                            <ReceiptIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </TabPanel>
          
          <TabPanel value={tabValue} index={1}>
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
                      startIcon={<AddIcon />}
                      onClick={() => handleOpenCustomerDialog()}
                    >
                      Add Customer
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
                    <TableCell>Status</TableCell>
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
                        <TableCell>
                          <Chip
                            icon={customer.active !== false ? <CheckCircleIcon /> : <WarningIcon />}
                            label={customer.active !== false ? 'Active' : 'Inactive'}
                            color={customer.active !== false ? 'success' : 'default'}
                            size="small"
                          />
                        </TableCell>
                        <TableCell>
                          <IconButton
                            color="primary"
                            size="small"
                            onClick={() => handleOpenCustomerDialog(customer)}
                            title="Edit Customer"
                          >
                            <EditIcon />
                          </IconButton>
                          <IconButton
                            color="secondary"
                            size="small"
                            title="View Payments"
                          >
                            <ReceiptIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </TabPanel>
          
          <TabPanel value={tabValue} index={2}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={4}>
                <Paper sx={{ p: 2, textAlign: 'center', height: '100%' }}>
                  <ReceiptIcon sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
                  <Typography variant="h6" gutterBottom>
                    Payment History
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    View and print payment history reports by customer or date range
                  </Typography>
                  <Button variant="contained" fullWidth>
                    Generate Report
                  </Button>
                </Paper>
              </Grid>
              
              <Grid item xs={12} md={4}>
                <Paper sx={{ p: 2, textAlign: 'center', height: '100%' }}>
                  <WarningIcon sx={{ fontSize: 60, color: 'error.main', mb: 2 }} />
                  <Typography variant="h6" gutterBottom>
                    Past Due Accounts
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    Generate reports of all past due accounts by age
                  </Typography>
                  <Button variant="contained" color="error" fullWidth>
                    Generate Report
                  </Button>
                </Paper>
              </Grid>
              
              <Grid item xs={12} md={4}>
                <Paper sx={{ p: 2, textAlign: 'center', height: '100%' }}>
                  <CheckCircleIcon sx={{ fontSize: 60, color: 'success.main', mb: 2 }} />
                  <Typography variant="h6" gutterBottom>
                    Customer Status
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    View and print customer status reports and activity summaries
                  </Typography>
                  <Button variant="contained" color="success" fullWidth>
                    Generate Report
                  </Button>
                </Paper>
              </Grid>
            </Grid>
          </TabPanel>
        </Paper>
        
        <Dialog open={openPaymentDialog} onClose={handleClosePaymentDialog} maxWidth="sm" fullWidth>
          <DialogTitle>Record Payment</DialogTitle>
          <DialogContent>
            <Box sx={{ p: 1 }}>
              <Typography variant="subtitle1" gutterBottom>
                <strong>Company:</strong> {selectedAccount?.company_name}
              </Typography>
              <Typography variant="subtitle1" gutterBottom>
                <strong>Balance Due:</strong> {selectedAccount ? formatCurrency(selectedAccount.balance_due) : '$0.00'}
              </Typography>
              <Typography variant="subtitle1" gutterBottom>
                <strong>Zoning Date:</strong> {selectedAccount ? formatDate(selectedAccount.zoning_date) : ''}
              </Typography>
              
              <Divider sx={{ my: 2 }} />
              
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Payment Amount"
                    type="number"
                    value={paymentAmount}
                    onChange={(e) => setPaymentAmount(e.target.value)}
                    InputProps={{
                      startAdornment: <InputAdornment position="start">$</InputAdornment>,
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Check Number"
                    value={checkNumber}
                    onChange={(e) => setCheckNumber(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <DatePickerWrapper
                    label="Payment Date"
                    value={paymentDate}
                    onChange={(newDate) => setPaymentDate(newDate)}
                  />
                </Grid>
              </Grid>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClosePaymentDialog}>Cancel</Button>
            <Button 
              onClick={handlePaymentSubmit} 
              variant="contained" 
              color="primary"
              startIcon={<PaymentIcon />}
            >
              Record Payment
            </Button>
          </DialogActions>
        </Dialog>
        
        <Dialog open={openCustomerDialog} onClose={handleCloseCustomerDialog} maxWidth="md" fullWidth>
          <DialogTitle>
            {customerFormData.company_name ? `Edit Customer: ${customerFormData.company_name}` : 'Add New Customer'}
          </DialogTitle>
          <DialogContent>
            <Box sx={{ p: 1 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Company Name"
                    name="company_name"
                    value={customerFormData.company_name}
                    onChange={handleCustomerFormChange}
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Contact Name"
                    name="name"
                    value={customerFormData.name}
                    onChange={handleCustomerFormChange}
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Phone Number"
                    name="phone_number"
                    value={customerFormData.phone_number}
                    onChange={handleCustomerFormChange}
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Type of Business"
                    name="type_of_business"
                    value={customerFormData.type_of_business}
                    onChange={handleCustomerFormChange}
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Street Address"
                    name="street_address"
                    value={customerFormData.street_address}
                    onChange={handleCustomerFormChange}
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    label="City"
                    name="city"
                    value={customerFormData.city}
                    onChange={handleCustomerFormChange}
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    label="State"
                    name="state"
                    value={customerFormData.state}
                    onChange={handleCustomerFormChange}
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    label="Zip Code"
                    name="zip_code"
                    value={customerFormData.zip_code}
                    onChange={handleCustomerFormChange}
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControl component="fieldset" margin="normal">
                    <label>
                      <input
                        type="checkbox"
                        name="active"
                        checked={customerFormData.active}
                        onChange={handleCustomerFormChange}
                      />
                      {' '}Active Customer
                    </label>
                  </FormControl>
                </Grid>
              </Grid>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseCustomerDialog}>Cancel</Button>
            <Button 
              onClick={handleCustomerSubmit} 
              variant="contained" 
              color="primary"
            >
              Save Customer
            </Button>
          </DialogActions>
        </Dialog>
        
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

export default PaymentManager;