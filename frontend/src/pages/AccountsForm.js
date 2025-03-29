import React, { useState } from 'react';
import {
  Box,
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Divider,
  Card,
  CardContent
} from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const AccountsForm = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedCustomer, setSelectedCustomer] = useState('');
  const [paymentAmount, setPaymentAmount] = useState('');
  const [checkNumber, setCheckNumber] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('check');
  const [notes, setNotes] = useState('');
  
  // Mock customer data
  const customers = [
    { id: 1, name: 'ABC Company', balance: 1250.00 },
    { id: 2, name: 'XYZ Corporation', balance: 875.50 },
    { id: 3, name: 'Acme Industries', balance: 2340.75 },
    { id: 4, name: 'Global Enterprises', balance: 1500.25 },
    { id: 5, name: 'Local Business LLC', balance: 450.00 },
  ];
  
  // Mock transaction history
  const transactionHistory = [
    { id: 1, date: '2025-03-15', amount: 500.00, type: 'Payment', checkNumber: '1234', notes: 'Monthly payment' },
    { id: 2, date: '2025-02-15', amount: 500.00, type: 'Payment', checkNumber: '1200', notes: 'Monthly payment' },
    { id: 3, date: '2025-01-15', amount: 500.00, type: 'Payment', checkNumber: '1175', notes: 'Monthly payment' },
    { id: 4, date: '2024-12-15', amount: 500.00, type: 'Payment', checkNumber: '1150', notes: 'Monthly payment' },
  ];
  
  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Payment of $${paymentAmount} recorded for customer ${selectedCustomer}`);
    // In a real app, you would save this to the database
  };
  
  const handleCustomerChange = (event) => {
    setSelectedCustomer(event.target.value);
  };
  
  const handlePaymentMethodChange = (event) => {
    setPaymentMethod(event.target.value);
  };
  
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Paper sx={{ p: 4, borderRadius: 2 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center" sx={{ mb: 4 }}>
          Accounts Form
        </Typography>
        
        <Grid container spacing={4}>
          {/* Customer Information Section */}
          <Grid item xs={12} md={6}>
            <Card variant="outlined" sx={{ mb: 3 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Customer Information
                </Typography>
                <FormControl fullWidth sx={{ mb: 2 }}>
                  <InputLabel id="customer-select-label">Select Customer</InputLabel>
                  <Select
                    labelId="customer-select-label"
                    id="customer-select"
                    value={selectedCustomer}
                    label="Select Customer"
                    onChange={handleCustomerChange}
                  >
                    {customers.map((customer) => (
                      <MenuItem key={customer.id} value={customer.id}>
                        {customer.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                
                {selectedCustomer && (
                  <Box>
                    <Typography variant="body1">
                      <strong>Current Balance:</strong> ${customers.find(c => c.id === selectedCustomer)?.balance.toFixed(2)}
                    </Typography>
                    <Typography variant="body1">
                      <strong>Account Status:</strong> Active
                    </Typography>
                    <Typography variant="body1">
                      <strong>Payment Terms:</strong> Net 30
                    </Typography>
                  </Box>
                )}
              </CardContent>
            </Card>
          </Grid>
          
          {/* Payment Entry Section */}
          <Grid item xs={12} md={6}>
            <Card variant="outlined" sx={{ mb: 3 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Record Payment
                </Typography>
                <form onSubmit={handleSubmit}>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                      label="Payment Date"
                      value={selectedDate}
                      onChange={(newValue) => setSelectedDate(newValue)}
                      renderInput={(params) => <TextField {...params} fullWidth sx={{ mb: 2 }} />}
                      slotProps={{
                        textField: { fullWidth: true, margin: 'normal' }
                      }}
                    />
                  </LocalizationProvider>
                  
                  <TextField
                    label="Payment Amount"
                    type="number"
                    value={paymentAmount}
                    onChange={(e) => setPaymentAmount(e.target.value)}
                    fullWidth
                    margin="normal"
                    InputProps={{
                      startAdornment: <Box component="span" sx={{ mr: 1 }}>$</Box>,
                    }}
                  />
                  
                  <FormControl fullWidth margin="normal">
                    <InputLabel id="payment-method-label">Payment Method</InputLabel>
                    <Select
                      labelId="payment-method-label"
                      id="payment-method"
                      value={paymentMethod}
                      label="Payment Method"
                      onChange={handlePaymentMethodChange}
                    >
                      <MenuItem value="check">Check</MenuItem>
                      <MenuItem value="cash">Cash</MenuItem>
                      <MenuItem value="credit">Credit Card</MenuItem>
                      <MenuItem value="ach">ACH Transfer</MenuItem>
                    </Select>
                  </FormControl>
                  
                  {paymentMethod === 'check' && (
                    <TextField
                      label="Check Number"
                      value={checkNumber}
                      onChange={(e) => setCheckNumber(e.target.value)}
                      fullWidth
                      margin="normal"
                    />
                  )}
                  
                  <TextField
                    label="Notes"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    fullWidth
                    margin="normal"
                    multiline
                    rows={2}
                  />
                  
                  <Button 
                    type="submit" 
                    variant="contained" 
                    color="primary" 
                    fullWidth 
                    sx={{ mt: 2 }}
                    disabled={!selectedCustomer || !paymentAmount}
                  >
                    Record Payment
                  </Button>
                </form>
              </CardContent>
            </Card>
          </Grid>
          
          {/* Transaction History Section */}
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>
              Transaction History
            </Typography>
            <TableContainer component={Paper} variant="outlined">
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>Type</TableCell>
                    <TableCell>Amount</TableCell>
                    <TableCell>Check #</TableCell>
                    <TableCell>Notes</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {transactionHistory.map((transaction) => (
                    <TableRow key={transaction.id}>
                      <TableCell>{transaction.date}</TableCell>
                      <TableCell>{transaction.type}</TableCell>
                      <TableCell>${transaction.amount.toFixed(2)}</TableCell>
                      <TableCell>{transaction.checkNumber}</TableCell>
                      <TableCell>{transaction.notes}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default AccountsForm;