import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  TextField,
  Grid,
  Button,
  Card,
  CardContent,
  CardActions,
  Divider,
  List,
  ListItem,
  ListItemText,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  CircularProgress,
  Alert,
  Tabs,
  Tab
} from '@mui/material';
import { styled } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import PersonIcon from '@mui/icons-material/Person';
import ReceiptIcon from '@mui/icons-material/Receipt';
import HistoryIcon from '@mui/icons-material/History';
import EditIcon from '@mui/icons-material/Edit';
import axios from 'axios';

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`customer-tabpanel-${index}`}
      aria-labelledby={`customer-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
};

const CustomerInquiries = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [customers, setCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [tabValue, setTabValue] = useState(0);

  // Mock data for demonstration
  const mockCustomers = [
    {
      id: 1,
      name: 'ABC Store',
      accountNumber: 'ACC001',
      contactName: 'John Smith',
      phone: '555-123-4567',
      email: 'john@abcstore.com',
      address: '123 Main St, Anytown, USA',
      zone: 'A',
      status: 'Active',
      balance: 1250.75,
      lastPaymentDate: '2025-01-10',
      lastPaymentAmount: 500.00,
      paymentHistory: [
        { date: '2025-01-10', amount: 500.00, checkNumber: '1234' },
        { date: '2024-12-15', amount: 750.00, checkNumber: '1200' },
        { date: '2024-11-10', amount: 500.00, checkNumber: '1150' }
      ],
      notes: 'Prefers email communication. Always pays on time.'
    },
    {
      id: 2,
      name: 'XYZ Market',
      accountNumber: 'ACC002',
      contactName: 'Jane Doe',
      phone: '555-987-6543',
      email: 'jane@xyzmarket.com',
      address: '456 Oak Ave, Somewhere, USA',
      zone: 'B',
      status: 'Active',
      balance: 875.50,
      lastPaymentDate: '2025-02-01',
      lastPaymentAmount: 300.00,
      paymentHistory: [
        { date: '2025-02-01', amount: 300.00, checkNumber: '5678' },
        { date: '2025-01-05', amount: 400.00, checkNumber: '5600' },
        { date: '2024-12-03', amount: 300.00, checkNumber: '5550' }
      ],
      notes: 'Call before delivery. Closed on Sundays.'
    },
    {
      id: 3,
      name: 'Main Street Shop',
      accountNumber: 'ACC003',
      contactName: 'Robert Johnson',
      phone: '555-456-7890',
      email: 'robert@mainstreetshop.com',
      address: '789 Elm St, Elsewhere, USA',
      zone: 'A',
      status: 'Active',
      balance: 2100.25,
      lastPaymentDate: '2025-02-15',
      lastPaymentAmount: 750.00,
      paymentHistory: [
        { date: '2025-02-15', amount: 750.00, checkNumber: '9012' },
        { date: '2025-01-12', amount: 800.00, checkNumber: '8900' },
        { date: '2024-12-10', amount: 750.00, checkNumber: '8850' }
      ],
      notes: 'Prefers morning deliveries. Ask for manager on duty.'
    }
  ];

  const handleSearch = () => {
    if (!searchTerm.trim()) return;
    
    setLoading(true);
    setError(null);
    
    // Simulate API call
    setTimeout(() => {
      const filteredCustomers = mockCustomers.filter(customer => 
        customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.accountNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.contactName.toLowerCase().includes(searchTerm.toLowerCase())
      );
      
      setCustomers(filteredCustomers);
      setLoading(false);
      
      if (filteredCustomers.length === 0) {
        setError('No customers found matching your search criteria');
      }
    }, 1000);
    
    // Real API call would look like this:
    // try {
    //   const response = await axios.get(`/api/customers/search?q=${searchTerm}`);
    //   setCustomers(response.data);
    //   setLoading(false);
    //   if (response.data.length === 0) {
    //     setError('No customers found matching your search criteria');
    //   }
    // } catch (err) {
    //   console.error('Error searching customers:', err);
    //   setError('Failed to search customers');
    //   setLoading(false);
    // }
  };

  const handleSelectCustomer = (customer) => {
    setSelectedCustomer(customer);
    setTabValue(0);
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleEditCustomer = () => {
    // In a real application, this would navigate to the edit page
    console.log('Edit customer:', selectedCustomer);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Customer Inquiries
      </Typography>
      
      <Paper sx={{ p: 3, mb: 3 }}>
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={12} md={8}>
            <TextField
              fullWidth
              label="Search by Name, Account # or Contact Person"
              variant="outlined"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              InputProps={{
                startAdornment: <SearchIcon sx={{ mr: 1, color: 'text.secondary' }} />,
              }}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <Button 
              variant="contained" 
              onClick={handleSearch}
              disabled={!searchTerm.trim()}
              fullWidth
            >
              Search
            </Button>
          </Grid>
        </Grid>
      </Paper>
      
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Alert severity="info" sx={{ mb: 3 }}>{error}</Alert>
      ) : (
        <Grid container spacing={3}>
          {/* Customer List */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>
              Search Results
            </Typography>
            
            {customers.length > 0 ? (
              <List sx={{ bgcolor: 'background.paper', borderRadius: 1 }}>
                {customers.map((customer) => (
                  <React.Fragment key={customer.id}>
                    <ListItem 
                      button 
                      onClick={() => handleSelectCustomer(customer)}
                      selected={selectedCustomer && selectedCustomer.id === customer.id}
                    >
                      <ListItemText
                        primary={customer.name}
                        secondary={`Account #: ${customer.accountNumber} | Contact: ${customer.contactName}`}
                      />
                    </ListItem>
                    <Divider component="li" />
                  </React.Fragment>
                ))}
              </List>
            ) : (
              <Paper sx={{ p: 3, textAlign: 'center' }}>
                <Typography variant="body1" color="text.secondary">
                  Search for customers to see results
                </Typography>
              </Paper>
            )}
          </Grid>
          
          {/* Customer Details */}
          <Grid item xs={12} md={8}>
            {selectedCustomer ? (
              <Card>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                    <Typography variant="h5" component="div">
                      {selectedCustomer.name}
                    </Typography>
                    <Button
                      variant="outlined"
                      startIcon={<EditIcon />}
                      onClick={handleEditCustomer}
                    >
                      Edit
                    </Button>
                  </Box>
                  
                  <Divider sx={{ mb: 2 }} />
                  
                  <Tabs value={tabValue} onChange={handleTabChange} aria-label="customer tabs">
                    <Tab icon={<PersonIcon />} label="Info" id="customer-tab-0" />
                    <Tab icon={<ReceiptIcon />} label="Account" id="customer-tab-1" />
                    <Tab icon={<HistoryIcon />} label="History" id="customer-tab-2" />
                  </Tabs>
                  
                  <TabPanel value={tabValue} index={0}>
                    <Grid container spacing={2}>
                      <Grid item xs={12} md={6}>
                        <Typography variant="subtitle2">Account Number</Typography>
                        <Typography variant="body1" gutterBottom>{selectedCustomer.accountNumber}</Typography>
                        
                        <Typography variant="subtitle2">Contact Name</Typography>
                        <Typography variant="body1" gutterBottom>{selectedCustomer.contactName}</Typography>
                        
                        <Typography variant="subtitle2">Phone</Typography>
                        <Typography variant="body1" gutterBottom>{selectedCustomer.phone}</Typography>
                        
                        <Typography variant="subtitle2">Email</Typography>
                        <Typography variant="body1" gutterBottom>{selectedCustomer.email}</Typography>
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <Typography variant="subtitle2">Address</Typography>
                        <Typography variant="body1" gutterBottom>{selectedCustomer.address}</Typography>
                        
                        <Typography variant="subtitle2">Zone</Typography>
                        <Typography variant="body1" gutterBottom>{selectedCustomer.zone}</Typography>
                        
                        <Typography variant="subtitle2">Status</Typography>
                        <Typography variant="body1" gutterBottom>{selectedCustomer.status}</Typography>
                        
                        <Typography variant="subtitle2">Notes</Typography>
                        <Typography variant="body1" gutterBottom>{selectedCustomer.notes}</Typography>
                      </Grid>
                    </Grid>
                  </TabPanel>
                  
                  <TabPanel value={tabValue} index={1}>
                    <Box sx={{ mb: 3, p: 2, bgcolor: 'background.paper', borderRadius: 1 }}>
                      <Grid container spacing={2}>
                        <Grid item xs={12} md={6}>
                          <Typography variant="subtitle2">Current Balance</Typography>
                          <Typography variant="h6" color={selectedCustomer.balance > 0 ? 'error' : 'success'}>
                            ${selectedCustomer.balance.toFixed(2)}
                          </Typography>
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <Typography variant="subtitle2">Last Payment</Typography>
                          <Typography variant="body1">
                            ${selectedCustomer.lastPaymentAmount.toFixed(2)} on {selectedCustomer.lastPaymentDate}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Box>
                    
                    <Typography variant="subtitle1" gutterBottom>
                      Account Status
                    </Typography>
                    <Paper sx={{ p: 2, mb: 3 }}>
                      <Typography variant="body1">
                        {selectedCustomer.status === 'Active' 
                          ? 'This account is in good standing.' 
                          : 'This account has issues that need attention.'}
                      </Typography>
                    </Paper>
                  </TabPanel>
                  
                  <TabPanel value={tabValue} index={2}>
                    <Typography variant="subtitle1" gutterBottom>
                      Payment History
                    </Typography>
                    <TableContainer component={Paper}>
                      <Table size="small">
                        <TableHead>
                          <TableRow>
                            <TableCell>Date</TableCell>
                            <TableCell align="right">Amount</TableCell>
                            <TableCell>Check #</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {selectedCustomer.paymentHistory.map((payment, index) => (
                            <TableRow key={index}>
                              <TableCell>{payment.date}</TableCell>
                              <TableCell align="right">${payment.amount.toFixed(2)}</TableCell>
                              <TableCell>{payment.checkNumber}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </TabPanel>
                </CardContent>
                <CardActions>
                  <Button size="small" onClick={() => setSelectedCustomer(null)}>
                    Back to Results
                  </Button>
                </CardActions>
              </Card>
            ) : (
              <Paper sx={{ p: 3, textAlign: 'center', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Typography variant="body1" color="text.secondary">
                  Select a customer to view details
                </Typography>
              </Paper>
            )}
          </Grid>
        </Grid>
      )}
    </Box>
  );
};

export default CustomerInquiries;