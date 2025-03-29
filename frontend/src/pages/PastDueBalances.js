import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  TextField,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Snackbar,
  Alert,
  CircularProgress
} from '@mui/material';
import { styled } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import PrintIcon from '@mui/icons-material/Print';
import PaymentIcon from '@mui/icons-material/Payment';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
  '&.past-due': {
    backgroundColor: '#ffcccc',
  },
  '&.very-past-due': {
    backgroundColor: '#ff9999',
  },
}));

const PastDueBalances = () => {
  const [pastDueAccounts, setPastDueAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDays, setFilterDays] = useState('all');
  const [openPaymentDialog, setOpenPaymentDialog] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [paymentAmount, setPaymentAmount] = useState('');
  const [checkNumber, setCheckNumber] = useState('');
  const [paymentDate, setPaymentDate] = useState(new Date().toISOString().split('T')[0]);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  // Mock data for demonstration
  const mockPastDueAccounts = [
    {
      id: 1,
      merchantName: 'ABC Store',
      accountNumber: 'ACC001',
      balance: 1250.75,
      dueDate: '2025-02-15',
      daysPastDue: 42,
      lastPaymentDate: '2025-01-10',
      lastPaymentAmount: 500.00,
      zone: 'A',
      status: 'Active'
    },
    {
      id: 2,
      merchantName: 'XYZ Market',
      accountNumber: 'ACC002',
      balance: 875.50,
      dueDate: '2025-03-01',
      daysPastDue: 28,
      lastPaymentDate: '2025-02-01',
      lastPaymentAmount: 300.00,
      zone: 'B',
      status: 'Active'
    },
    {
      id: 3,
      merchantName: 'Main Street Shop',
      accountNumber: 'ACC003',
      balance: 2100.25,
      dueDate: '2025-03-10',
      daysPastDue: 19,
      lastPaymentDate: '2025-02-15',
      lastPaymentAmount: 750.00,
      zone: 'A',
      status: 'Active'
    },
    {
      id: 4,
      merchantName: 'Corner Deli',
      accountNumber: 'ACC004',
      balance: 450.00,
      dueDate: '2025-03-15',
      daysPastDue: 14,
      lastPaymentDate: '2025-02-28',
      lastPaymentAmount: 200.00,
      zone: 'C',
      status: 'Active'
    },
    {
      id: 5,
      merchantName: 'City Pharmacy',
      accountNumber: 'ACC005',
      balance: 3200.80,
      dueDate: '2025-02-01',
      daysPastDue: 57,
      lastPaymentDate: '2025-01-05',
      lastPaymentAmount: 1000.00,
      zone: 'B',
      status: 'Active'
    }
  ];

  useEffect(() => {
    // In a real application, this would be an API call
    // For now, we'll use mock data
    const fetchPastDueAccounts = async () => {
      try {
        // Simulate API call
        setTimeout(() => {
          setPastDueAccounts(mockPastDueAccounts);
          setLoading(false);
        }, 1000);
        
        // Real API call would look like this:
        // const response = await axios.get('/api/accounts/past-due');
        // setPastDueAccounts(response.data);
        // setLoading(false);
      } catch (err) {
        console.error('Error fetching past due accounts:', err);
        setError('Failed to load past due accounts');
        setLoading(false);
      }
    };

    fetchPastDueAccounts();
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleFilterChange = (event) => {
    setFilterDays(event.target.value);
  };

  const handleOpenPaymentDialog = (account) => {
    setSelectedAccount(account);
    setPaymentAmount(account.balance.toFixed(2));
    setOpenPaymentDialog(true);
  };

  const handleClosePaymentDialog = () => {
    setOpenPaymentDialog(false);
    setSelectedAccount(null);
    setPaymentAmount('');
    setCheckNumber('');
  };

  const handlePaymentSubmit = () => {
    // In a real application, this would be an API call to record the payment
    console.log('Payment submitted:', {
      accountId: selectedAccount.id,
      amount: parseFloat(paymentAmount),
      checkNumber,
      paymentDate
    });
    
    // Show success message
    setSnackbar({
      open: true,
      message: `Payment of $${paymentAmount} recorded for ${selectedAccount.merchantName}`,
      severity: 'success'
    });
    
    // Close dialog
    handleClosePaymentDialog();
    
    // Update the account in the list (in a real app, you might refetch the data)
    const updatedAccounts = pastDueAccounts.map(account => {
      if (account.id === selectedAccount.id) {
        return {
          ...account,
          balance: account.balance - parseFloat(paymentAmount),
          lastPaymentDate: paymentDate,
          lastPaymentAmount: parseFloat(paymentAmount)
        };
      }
      return account;
    });
    
    setPastDueAccounts(updatedAccounts);
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const handlePrintReport = () => {
    // In a real application, this would generate a report
    setSnackbar({
      open: true,
      message: 'Past Due Report generated and sent to printer',
      severity: 'info'
    });
  };

  // Filter accounts based on search term and days filter
  const filteredAccounts = pastDueAccounts.filter(account => {
    const matchesSearch = account.merchantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         account.accountNumber.toLowerCase().includes(searchTerm.toLowerCase());
    
    let matchesDaysFilter = true;
    if (filterDays === '30') {
      matchesDaysFilter = account.daysPastDue <= 30;
    } else if (filterDays === '60') {
      matchesDaysFilter = account.daysPastDue > 30 && account.daysPastDue <= 60;
    } else if (filterDays === '90') {
      matchesDaysFilter = account.daysPastDue > 60 && account.daysPastDue <= 90;
    } else if (filterDays === '90+') {
      matchesDaysFilter = account.daysPastDue > 90;
    }
    
    return matchesSearch && matchesDaysFilter;
  });

  // Calculate total past due amount
  const totalPastDueAmount = filteredAccounts.reduce((total, account) => total + account.balance, 0);

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Past Due Balances
      </Typography>
      
      <Paper sx={{ p: 3, mb: 3 }}>
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              label="Search by Name or Account #"
              variant="outlined"
              value={searchTerm}
              onChange={handleSearchChange}
              InputProps={{
                startAdornment: <SearchIcon sx={{ mr: 1, color: 'text.secondary' }} />,
              }}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <FormControl fullWidth variant="outlined">
              <InputLabel>Filter by Days Past Due</InputLabel>
              <Select
                value={filterDays}
                onChange={handleFilterChange}
                label="Filter by Days Past Due"
              >
                <MenuItem value="all">All Past Due</MenuItem>
                <MenuItem value="30">0-30 Days</MenuItem>
                <MenuItem value="60">31-60 Days</MenuItem>
                <MenuItem value="90">61-90 Days</MenuItem>
                <MenuItem value="90+">Over 90 Days</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={5}>
            <Button 
              variant="contained" 
              startIcon={<PrintIcon />}
              onClick={handlePrintReport}
              sx={{ mr: 2 }}
            >
              Print Report
            </Button>
          </Grid>
        </Grid>
      </Paper>
      
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>
      ) : (
        <>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="past due accounts table">
              <TableHead>
                <TableRow>
                  <TableCell>Merchant Name</TableCell>
                  <TableCell>Account #</TableCell>
                  <TableCell align="right">Balance</TableCell>
                  <TableCell>Due Date</TableCell>
                  <TableCell align="right">Days Past Due</TableCell>
                  <TableCell>Last Payment</TableCell>
                  <TableCell>Zone</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredAccounts.map((account) => (
                  <StyledTableRow 
                    key={account.id}
                    className={
                      account.daysPastDue > 90 ? 'very-past-due' : 
                      account.daysPastDue > 60 ? 'past-due' : ''
                    }
                  >
                    <TableCell component="th" scope="row">
                      {account.merchantName}
                    </TableCell>
                    <TableCell>{account.accountNumber}</TableCell>
                    <TableCell align="right">${account.balance.toFixed(2)}</TableCell>
                    <TableCell>{account.dueDate}</TableCell>
                    <TableCell align="right">{account.daysPastDue}</TableCell>
                    <TableCell>
                      {account.lastPaymentDate} (${account.lastPaymentAmount.toFixed(2)})
                    </TableCell>
                    <TableCell>{account.zone}</TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        size="small"
                        startIcon={<PaymentIcon />}
                        onClick={() => handleOpenPaymentDialog(account)}
                      >
                        Record Payment
                      </Button>
                    </TableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          
          <Box sx={{ mt: 3, p: 2, bgcolor: 'background.paper', borderRadius: 1 }}>
            <Typography variant="h6">
              Total Past Due: ${totalPastDueAmount.toFixed(2)}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Showing {filteredAccounts.length} of {pastDueAccounts.length} accounts
            </Typography>
          </Box>
        </>
      )}
      
      {/* Payment Dialog */}
      <Dialog open={openPaymentDialog} onClose={handleClosePaymentDialog} maxWidth="sm" fullWidth>
        <DialogTitle>
          Record Payment
          <IconButton
            aria-label="close"
            onClick={handleClosePaymentDialog}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          {selectedAccount && (
            <Box sx={{ mt: 2 }}>
              <Typography variant="subtitle1" gutterBottom>
                {selectedAccount.merchantName} (Account #: {selectedAccount.accountNumber})
              </Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Current Balance: ${selectedAccount.balance.toFixed(2)}
              </Typography>
              
              <Grid container spacing={3} sx={{ mt: 1 }}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Payment Amount"
                    variant="outlined"
                    type="number"
                    value={paymentAmount}
                    onChange={(e) => setPaymentAmount(e.target.value)}
                    InputProps={{
                      startAdornment: <Typography sx={{ mr: 1 }}>$</Typography>,
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Check Number"
                    variant="outlined"
                    value={checkNumber}
                    onChange={(e) => setCheckNumber(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Payment Date"
                    variant="outlined"
                    type="date"
                    value={paymentDate}
                    onChange={(e) => setPaymentDate(e.target.value)}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>
              </Grid>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClosePaymentDialog}>Cancel</Button>
          <Button 
            onClick={handlePaymentSubmit} 
            variant="contained" 
            color="primary"
            disabled={!paymentAmount || parseFloat(paymentAmount) <= 0}
          >
            Record Payment
          </Button>
        </DialogActions>
      </Dialog>
      
      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default PastDueBalances;