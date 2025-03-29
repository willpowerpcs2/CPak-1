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
  Checkbox,
  FormControlLabel,
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
  Stack,
  Chip
} from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import PrintIcon from '@mui/icons-material/Print';
import FilterListIcon from '@mui/icons-material/FilterList';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import BarChartIcon from '@mui/icons-material/BarChart';

const PastDueReports = () => {
  const [reportType, setReportType] = useState('summary');
  const [selectedZone, setSelectedZone] = useState('');
  const [daysOverdue, setDaysOverdue] = useState(30);
  const [includeInactive, setIncludeInactive] = useState(false);
  const [asOfDate, setAsOfDate] = useState(new Date());
  const [showDetails, setShowDetails] = useState(false);
  
  // Mock zones data
  const zones = [
    { id: 1, name: 'Zone 1 - Downtown' },
    { id: 2, name: 'Zone 2 - Midtown' },
    { id: 3, name: 'Zone 3 - Uptown' },
    { id: 4, name: 'Zone 4 - West Side' },
    { id: 5, name: 'Zone 5 - East Side' },
  ];
  
  // Mock past due data
  const pastDueAccounts = [
    { id: 1, name: 'ABC Company', zone: 1, balance: 1250.00, daysOverdue: 45, lastPayment: '2025-02-10', status: 'active' },
    { id: 2, name: 'XYZ Corporation', zone: 2, balance: 875.50, daysOverdue: 60, lastPayment: '2025-01-25', status: 'active' },
    { id: 3, name: 'Acme Industries', zone: 1, balance: 2340.75, daysOverdue: 90, lastPayment: '2024-12-15', status: 'inactive' },
    { id: 4, name: 'Global Enterprises', zone: 3, balance: 1500.25, daysOverdue: 30, lastPayment: '2025-02-25', status: 'active' },
    { id: 5, name: 'Local Business LLC', zone: 2, balance: 450.00, daysOverdue: 15, lastPayment: '2025-03-10', status: 'active' },
    { id: 6, name: 'Metro Services', zone: 4, balance: 3200.50, daysOverdue: 75, lastPayment: '2025-01-05', status: 'active' },
    { id: 7, name: 'City Suppliers', zone: 5, balance: 1800.25, daysOverdue: 120, lastPayment: '2024-11-20', status: 'active' },
    { id: 8, name: 'Regional Distributors', zone: 3, balance: 950.75, daysOverdue: 45, lastPayment: '2025-02-10', status: 'inactive' },
  ];
  
  const handleReportTypeChange = (event) => {
    setReportType(event.target.value);
  };
  
  const handleZoneChange = (event) => {
    setSelectedZone(event.target.value);
  };
  
  const handleDaysOverdueChange = (event) => {
    setDaysOverdue(parseInt(event.target.value));
  };
  
  const handlePrintReport = () => {
    alert(`Printing ${reportType} report for accounts ${daysOverdue}+ days overdue`);
    // In a real app, this would generate and print the report
  };
  
  const handleExportReport = () => {
    alert(`Exporting ${reportType} report to Excel`);
    // In a real app, this would generate an Excel file for download
  };
  
  // Filter accounts based on selected criteria
  const filteredAccounts = pastDueAccounts.filter(account => {
    // Filter by zone if selected
    if (selectedZone && account.zone !== parseInt(selectedZone)) {
      return false;
    }
    
    // Filter by days overdue
    if (account.daysOverdue < daysOverdue) {
      return false;
    }
    
    // Filter by status if not including inactive
    if (!includeInactive && account.status === 'inactive') {
      return false;
    }
    
    return true;
  });
  
  // Calculate summary statistics
  const totalPastDue = filteredAccounts.reduce((sum, account) => sum + account.balance, 0);
  const accountCount = filteredAccounts.length;
  const averagePastDue = accountCount > 0 ? totalPastDue / accountCount : 0;
  
  // Group by zone for summary report
  const zoneGroups = {};
  filteredAccounts.forEach(account => {
    const zoneName = zones.find(z => z.id === account.zone)?.name || `Zone ${account.zone}`;
    if (!zoneGroups[zoneName]) {
      zoneGroups[zoneName] = {
        count: 0,
        total: 0
      };
    }
    zoneGroups[zoneName].count += 1;
    zoneGroups[zoneName].total += account.balance;
  });
  
  // Group by age for aging report
  const ageGroups = {
    '1-30 days': { count: 0, total: 0 },
    '31-60 days': { count: 0, total: 0 },
    '61-90 days': { count: 0, total: 0 },
    '91+ days': { count: 0, total: 0 }
  };
  
  filteredAccounts.forEach(account => {
    if (account.daysOverdue <= 30) {
      ageGroups['1-30 days'].count += 1;
      ageGroups['1-30 days'].total += account.balance;
    } else if (account.daysOverdue <= 60) {
      ageGroups['31-60 days'].count += 1;
      ageGroups['31-60 days'].total += account.balance;
    } else if (account.daysOverdue <= 90) {
      ageGroups['61-90 days'].count += 1;
      ageGroups['61-90 days'].total += account.balance;
    } else {
      ageGroups['91+ days'].count += 1;
      ageGroups['91+ days'].total += account.balance;
    }
  });
  
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Paper sx={{ p: 4, borderRadius: 2 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center" sx={{ mb: 4 }}>
          Past Due Reports
        </Typography>
        
        <Grid container spacing={4}>
          {/* Report Options Section */}
          <Grid item xs={12} md={4}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  <FilterListIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                  Report Options
                </Typography>
                
                <FormControl fullWidth margin="normal">
                  <InputLabel id="report-type-label">Report Type</InputLabel>
                  <Select
                    labelId="report-type-label"
                    id="report-type"
                    value={reportType}
                    label="Report Type"
                    onChange={handleReportTypeChange}
                  >
                    <MenuItem value="summary">Summary Report</MenuItem>
                    <MenuItem value="detail">Detailed Report</MenuItem>
                    <MenuItem value="aging">Aging Report</MenuItem>
                  </Select>
                </FormControl>
                
                <FormControl fullWidth margin="normal">
                  <InputLabel id="zone-select-label">Zone</InputLabel>
                  <Select
                    labelId="zone-select-label"
                    id="zone-select"
                    value={selectedZone}
                    label="Zone"
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
                
                <FormControl fullWidth margin="normal">
                  <InputLabel id="days-overdue-label">Minimum Days Overdue</InputLabel>
                  <Select
                    labelId="days-overdue-label"
                    id="days-overdue"
                    value={daysOverdue}
                    label="Minimum Days Overdue"
                    onChange={handleDaysOverdueChange}
                  >
                    <MenuItem value={0}>All Past Due</MenuItem>
                    <MenuItem value={30}>30+ Days</MenuItem>
                    <MenuItem value={60}>60+ Days</MenuItem>
                    <MenuItem value={90}>90+ Days</MenuItem>
                    <MenuItem value={120}>120+ Days</MenuItem>
                  </Select>
                </FormControl>
                
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    label="As of Date"
                    value={asOfDate}
                    onChange={(newValue) => setAsOfDate(newValue)}
                    slotProps={{
                      textField: { fullWidth: true, margin: 'normal' }
                    }}
                  />
                </LocalizationProvider>
                
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={includeInactive}
                      onChange={(e) => setIncludeInactive(e.target.checked)}
                      name="includeInactive"
                    />
                  }
                  label="Include Inactive Accounts"
                  sx={{ mt: 2, display: 'block' }}
                />
                
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={showDetails}
                      onChange={(e) => setShowDetails(e.target.checked)}
                      name="showDetails"
                    />
                  }
                  label="Show Account Details"
                  sx={{ display: 'block' }}
                />
                
                <Box sx={{ mt: 3 }}>
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    startIcon={<PrintIcon />}
                    onClick={handlePrintReport}
                    sx={{ mb: 2 }}
                  >
                    Print Report
                  </Button>
                  
                  <Button
                    variant="outlined"
                    color="primary"
                    fullWidth
                    startIcon={<SaveAltIcon />}
                    onClick={handleExportReport}
                  >
                    Export to Excel
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          
          {/* Report Preview Section */}
          <Grid item xs={12} md={8}>
            <Card variant="outlined">
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                  <Typography variant="h6">
                    {reportType === 'summary' && 'Summary Report'}
                    {reportType === 'detail' && 'Detailed Report'}
                    {reportType === 'aging' && 'Aging Report'}
                  </Typography>
                  <Stack direction="row" spacing={1}>
                    <Chip 
                      label={`${accountCount} Accounts`} 
                      color="primary" 
                      variant="outlined" 
                    />
                    <Chip 
                      label={`Total: $${totalPastDue.toFixed(2)}`} 
                      color="primary" 
                    />
                  </Stack>
                </Box>
                
                <Divider sx={{ mb: 3 }} />
                
                {/* Summary Report */}
                {reportType === 'summary' && (
                  <>
                    <TableContainer>
                      <Table>
                        <TableHead>
                          <TableRow>
                            <TableCell>Zone</TableCell>
                            <TableCell align="right">Accounts</TableCell>
                            <TableCell align="right">Total Past Due</TableCell>
                            <TableCell align="right">Average</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {Object.entries(zoneGroups).map(([zoneName, data]) => (
                            <TableRow key={zoneName}>
                              <TableCell>{zoneName}</TableCell>
                              <TableCell align="right">{data.count}</TableCell>
                              <TableCell align="right">${data.total.toFixed(2)}</TableCell>
                              <TableCell align="right">${(data.total / data.count).toFixed(2)}</TableCell>
                            </TableRow>
                          ))}
                          <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                            <TableCell><strong>Total</strong></TableCell>
                            <TableCell align="right"><strong>{accountCount}</strong></TableCell>
                            <TableCell align="right"><strong>${totalPastDue.toFixed(2)}</strong></TableCell>
                            <TableCell align="right"><strong>${averagePastDue.toFixed(2)}</strong></TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </TableContainer>
                    
                    {showDetails && (
                      <>
                        <Typography variant="h6" sx={{ mt: 4, mb: 2 }}>
                          Account Details
                        </Typography>
                        <TableContainer>
                          <Table size="small">
                            <TableHead>
                              <TableRow>
                                <TableCell>Account</TableCell>
                                <TableCell>Zone</TableCell>
                                <TableCell align="right">Days Overdue</TableCell>
                                <TableCell align="right">Balance</TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {filteredAccounts.map((account) => (
                                <TableRow key={account.id}>
                                  <TableCell>{account.name}</TableCell>
                                  <TableCell>{zones.find(z => z.id === account.zone)?.name}</TableCell>
                                  <TableCell align="right">{account.daysOverdue}</TableCell>
                                  <TableCell align="right">${account.balance.toFixed(2)}</TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </TableContainer>
                      </>
                    )}
                  </>
                )}
                
                {/* Detailed Report */}
                {reportType === 'detail' && (
                  <TableContainer>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>Account</TableCell>
                          <TableCell>Zone</TableCell>
                          <TableCell align="right">Days Overdue</TableCell>
                          <TableCell align="right">Balance</TableCell>
                          <TableCell>Last Payment</TableCell>
                          <TableCell>Status</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {filteredAccounts.map((account) => (
                          <TableRow key={account.id}>
                            <TableCell>{account.name}</TableCell>
                            <TableCell>{zones.find(z => z.id === account.zone)?.name}</TableCell>
                            <TableCell align="right">{account.daysOverdue}</TableCell>
                            <TableCell align="right">${account.balance.toFixed(2)}</TableCell>
                            <TableCell>{account.lastPayment}</TableCell>
                            <TableCell>
                              <Chip 
                                label={account.status} 
                                color={account.status === 'active' ? 'success' : 'default'} 
                                size="small" 
                              />
                            </TableCell>
                          </TableRow>
                        ))}
                        <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                          <TableCell colSpan={3}><strong>Total</strong></TableCell>
                          <TableCell align="right"><strong>${totalPastDue.toFixed(2)}</strong></TableCell>
                          <TableCell colSpan={2}></TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                )}
                
                {/* Aging Report */}
                {reportType === 'aging' && (
                  <>
                    <TableContainer>
                      <Table>
                        <TableHead>
                          <TableRow>
                            <TableCell>Age Range</TableCell>
                            <TableCell align="right">Accounts</TableCell>
                            <TableCell align="right">Total Amount</TableCell>
                            <TableCell align="right">Percentage</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {Object.entries(ageGroups).map(([ageRange, data]) => (
                            <TableRow key={ageRange}>
                              <TableCell>{ageRange}</TableCell>
                              <TableCell align="right">{data.count}</TableCell>
                              <TableCell align="right">${data.total.toFixed(2)}</TableCell>
                              <TableCell align="right">
                                {totalPastDue > 0 ? `${((data.total / totalPastDue) * 100).toFixed(1)}%` : '0%'}
                              </TableCell>
                            </TableRow>
                          ))}
                          <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                            <TableCell><strong>Total</strong></TableCell>
                            <TableCell align="right"><strong>{accountCount}</strong></TableCell>
                            <TableCell align="right"><strong>${totalPastDue.toFixed(2)}</strong></TableCell>
                            <TableCell align="right"><strong>100%</strong></TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </TableContainer>
                    
                    {showDetails && (
                      <>
                        <Typography variant="h6" sx={{ mt: 4, mb: 2 }}>
                          Account Details
                        </Typography>
                        <TableContainer>
                          <Table size="small">
                            <TableHead>
                              <TableRow>
                                <TableCell>Account</TableCell>
                                <TableCell align="right">Days Overdue</TableCell>
                                <TableCell>Age Category</TableCell>
                                <TableCell align="right">Balance</TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {filteredAccounts.map((account) => {
                                let ageCategory = '';
                                if (account.daysOverdue <= 30) ageCategory = '1-30 days';
                                else if (account.daysOverdue <= 60) ageCategory = '31-60 days';
                                else if (account.daysOverdue <= 90) ageCategory = '61-90 days';
                                else ageCategory = '91+ days';
                                
                                return (
                                  <TableRow key={account.id}>
                                    <TableCell>{account.name}</TableCell>
                                    <TableCell align="right">{account.daysOverdue}</TableCell>
                                    <TableCell>{ageCategory}</TableCell>
                                    <TableCell align="right">${account.balance.toFixed(2)}</TableCell>
                                  </TableRow>
                                );
                              })}
                            </TableBody>
                          </Table>
                        </TableContainer>
                      </>
                    )}
                  </>
                )}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default PastDueReports;