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
  Stack,
  Chip,
  TextField
} from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import SearchIcon from '@mui/icons-material/Search';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import MapIcon from '@mui/icons-material/Map';
import PrintIcon from '@mui/icons-material/Print';
import SaveAltIcon from '@mui/icons-material/SaveAlt';

const ReviewDateZone = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedZone, setSelectedZone] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Mock zones data
  const zones = [
    { id: 1, name: 'Zone 1 - Downtown' },
    { id: 2, name: 'Zone 2 - Midtown' },
    { id: 3, name: 'Zone 3 - Uptown' },
    { id: 4, name: 'Zone 4 - West Side' },
    { id: 5, name: 'Zone 5 - East Side' },
  ];
  
  // Mock scheduled accounts data
  const scheduledAccounts = [
    { id: 1, name: 'ABC Company', address: '123 Main St', city: 'New York', zone: 1, scheduledDate: '2025-04-15', status: 'scheduled', balance: 1250.00 },
    { id: 2, name: 'XYZ Corporation', address: '456 Park Ave', city: 'New York', zone: 2, scheduledDate: '2025-04-15', status: 'scheduled', balance: 875.50 },
    { id: 3, name: 'Acme Industries', address: '789 Broadway', city: 'New York', zone: 1, scheduledDate: '2025-04-15', status: 'completed', balance: 0.00 },
    { id: 4, name: 'Global Enterprises', address: '321 Fifth Ave', city: 'New York', zone: 3, scheduledDate: '2025-04-15', status: 'scheduled', balance: 1500.25 },
    { id: 5, name: 'Local Business LLC', address: '555 Lexington Ave', city: 'New York', zone: 2, scheduledDate: '2025-04-15', status: 'cancelled', balance: 450.00 },
    { id: 6, name: 'Metro Services', address: '777 Sixth Ave', city: 'New York', zone: 4, scheduledDate: '2025-04-16', status: 'scheduled', balance: 3200.50 },
    { id: 7, name: 'City Suppliers', address: '888 Seventh Ave', city: 'New York', zone: 5, scheduledDate: '2025-04-16', status: 'scheduled', balance: 1800.25 },
    { id: 8, name: 'Regional Distributors', address: '999 Eighth Ave', city: 'New York', zone: 3, scheduledDate: '2025-04-16', status: 'scheduled', balance: 950.75 },
  ];
  
  const handleZoneChange = (event) => {
    setSelectedZone(event.target.value);
  };
  
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };
  
  const handlePrintSchedule = () => {
    alert(`Printing schedule for ${selectedDate.toLocaleDateString()} ${selectedZone ? `- ${zones.find(z => z.id === parseInt(selectedZone))?.name}` : 'all zones'}`);
    // In a real app, this would generate and print the schedule
  };
  
  const handleExportSchedule = () => {
    alert(`Exporting schedule to Excel`);
    // In a real app, this would generate an Excel file for download
  };
  
  // Format date for comparison
  const formatDate = (date) => {
    const d = new Date(date);
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  };
  
  // Filter accounts based on selected criteria
  const filteredAccounts = scheduledAccounts.filter(account => {
    // Filter by date
    const selectedDateStr = formatDate(selectedDate);
    if (account.scheduledDate !== selectedDateStr) {
      return false;
    }
    
    // Filter by zone if selected
    if (selectedZone && account.zone !== parseInt(selectedZone)) {
      return false;
    }
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        account.name.toLowerCase().includes(query) ||
        account.address.toLowerCase().includes(query) ||
        account.city.toLowerCase().includes(query)
      );
    }
    
    return true;
  });
  
  // Group by zone for summary
  const zoneSummary = {};
  filteredAccounts.forEach(account => {
    const zoneName = zones.find(z => z.id === account.zone)?.name || `Zone ${account.zone}`;
    if (!zoneSummary[zoneName]) {
      zoneSummary[zoneName] = {
        count: 0,
        scheduled: 0,
        completed: 0,
        cancelled: 0,
        totalBalance: 0
      };
    }
    zoneSummary[zoneName].count += 1;
    
    if (account.status === 'scheduled') {
      zoneSummary[zoneName].scheduled += 1;
      zoneSummary[zoneName].totalBalance += account.balance;
    } else if (account.status === 'completed') {
      zoneSummary[zoneName].completed += 1;
    } else if (account.status === 'cancelled') {
      zoneSummary[zoneName].cancelled += 1;
    }
  });
  
  // Calculate totals
  const totalAccounts = filteredAccounts.length;
  const totalScheduled = filteredAccounts.filter(a => a.status === 'scheduled').length;
  const totalCompleted = filteredAccounts.filter(a => a.status === 'completed').length;
  const totalCancelled = filteredAccounts.filter(a => a.status === 'cancelled').length;
  const totalBalance = filteredAccounts.reduce((sum, account) => sum + (account.status === 'scheduled' ? account.balance : 0), 0);
  
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Paper sx={{ p: 4, borderRadius: 2 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center" sx={{ mb: 4 }}>
          Review Specified Date/Zone
        </Typography>
        
        <Grid container spacing={4}>
          {/* Filter Section */}
          <Grid item xs={12} md={4}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  <CalendarMonthIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                  Select Date & Zone
                </Typography>
                
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    label="Select Date"
                    value={selectedDate}
                    onChange={(newValue) => setSelectedDate(newValue)}
                    slotProps={{
                      textField: { fullWidth: true, margin: 'normal' }
                    }}
                  />
                </LocalizationProvider>
                
                <FormControl fullWidth margin="normal">
                  <InputLabel id="zone-select-label">Select Zone</InputLabel>
                  <Select
                    labelId="zone-select-label"
                    id="zone-select"
                    value={selectedZone}
                    label="Select Zone"
                    onChange={handleZoneChange}
                  >
                    <MenuItem value="">All Zones</MenuItem>
                    {zones.map((zone) => (
                      <MenuItem key={zone.id} value={zone.id}>
                        {zone.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                
                <TextField
                  fullWidth
                  margin="normal"
                  label="Search Accounts"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  InputProps={{
                    startAdornment: <SearchIcon sx={{ color: 'action.active', mr: 1 }} />,
                  }}
                />
                
                <Box sx={{ mt: 3 }}>
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    startIcon={<PrintIcon />}
                    onClick={handlePrintSchedule}
                    sx={{ mb: 2 }}
                  >
                    Print Schedule
                  </Button>
                  
                  <Button
                    variant="outlined"
                    color="primary"
                    fullWidth
                    startIcon={<SaveAltIcon />}
                    onClick={handleExportSchedule}
                  >
                    Export to Excel
                  </Button>
                </Box>
              </CardContent>
            </Card>
            
            {/* Summary Card */}
            <Card variant="outlined" sx={{ mt: 3 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Summary
                </Typography>
                
                <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
                  <Chip 
                    label={`Total: ${totalAccounts}`} 
                    color="primary" 
                    variant="outlined" 
                  />
                  <Chip 
                    label={`Scheduled: ${totalScheduled}`} 
                    color="success" 
                    variant="outlined" 
                  />
                  <Chip 
                    label={`Completed: ${totalCompleted}`} 
                    color="info" 
                    variant="outlined" 
                  />
                </Stack>
                
                <Typography variant="body1" sx={{ mt: 1 }}>
                  <strong>Total Expected Revenue:</strong> ${totalBalance.toFixed(2)}
                </Typography>
                
                <Typography variant="body1" sx={{ mt: 1 }}>
                  <strong>Date:</strong> {selectedDate.toLocaleDateString()}
                </Typography>
                
                <Typography variant="body1" sx={{ mt: 1 }}>
                  <strong>Zone:</strong> {selectedZone ? zones.find(z => z.id === parseInt(selectedZone))?.name : 'All Zones'}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          
          {/* Schedule Display Section */}
          <Grid item xs={12} md={8}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  <MapIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                  Zone Schedule for {selectedDate.toLocaleDateString()}
                </Typography>
                
                <Divider sx={{ mb: 3 }} />
                
                {/* Zone Summary */}
                <TableContainer sx={{ mb: 4 }}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Zone</TableCell>
                        <TableCell align="right">Total</TableCell>
                        <TableCell align="right">Scheduled</TableCell>
                        <TableCell align="right">Completed</TableCell>
                        <TableCell align="right">Cancelled</TableCell>
                        <TableCell align="right">Expected Revenue</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {Object.entries(zoneSummary).map(([zoneName, data]) => (
                        <TableRow key={zoneName}>
                          <TableCell>{zoneName}</TableCell>
                          <TableCell align="right">{data.count}</TableCell>
                          <TableCell align="right">{data.scheduled}</TableCell>
                          <TableCell align="right">{data.completed}</TableCell>
                          <TableCell align="right">{data.cancelled}</TableCell>
                          <TableCell align="right">${data.totalBalance.toFixed(2)}</TableCell>
                        </TableRow>
                      ))}
                      <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                        <TableCell><strong>Total</strong></TableCell>
                        <TableCell align="right"><strong>{totalAccounts}</strong></TableCell>
                        <TableCell align="right"><strong>{totalScheduled}</strong></TableCell>
                        <TableCell align="right"><strong>{totalCompleted}</strong></TableCell>
                        <TableCell align="right"><strong>{totalCancelled}</strong></TableCell>
                        <TableCell align="right"><strong>${totalBalance.toFixed(2)}</strong></TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
                
                {/* Account Details */}
                <Typography variant="h6" gutterBottom>
                  Account Details
                </Typography>
                
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Account</TableCell>
                        <TableCell>Address</TableCell>
                        <TableCell>Zone</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell align="right">Balance</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {filteredAccounts.map((account) => (
                        <TableRow key={account.id}>
                          <TableCell>{account.name}</TableCell>
                          <TableCell>{account.address}, {account.city}</TableCell>
                          <TableCell>{zones.find(z => z.id === account.zone)?.name}</TableCell>
                          <TableCell>
                            <Chip 
                              label={account.status} 
                              color={
                                account.status === 'scheduled' ? 'success' : 
                                account.status === 'completed' ? 'info' : 
                                'default'
                              } 
                              size="small" 
                            />
                          </TableCell>
                          <TableCell align="right">${account.balance.toFixed(2)}</TableCell>
                        </TableRow>
                      ))}
                      {filteredAccounts.length === 0 && (
                        <TableRow>
                          <TableCell colSpan={5} align="center">
                            No accounts scheduled for this date and zone.
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
    </Container>
  );
};

export default ReviewDateZone;