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
import PrintIcon from '@mui/icons-material/Print';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import BarChartIcon from '@mui/icons-material/BarChart';
import PieChartIcon from '@mui/icons-material/PieChart';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';

const YtdTotals = () => {
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedZone, setSelectedZone] = useState('');
  const [compareWithPrevYear, setCompareWithPrevYear] = useState(true);
  const [reportType, setReportType] = useState('monthly');
  
  // Mock zones data
  const zones = [
    { id: 1, name: 'Zone 1 - Downtown' },
    { id: 2, name: 'Zone 2 - Midtown' },
    { id: 3, name: 'Zone 3 - Uptown' },
    { id: 4, name: 'Zone 4 - West Side' },
    { id: 5, name: 'Zone 5 - East Side' },
  ];
  
  // Mock monthly revenue data
  const monthlyData = [
    { month: 'January', revenue: 45250.00, customerCount: 42, prevYearRevenue: 42100.00, prevYearCustomerCount: 40 },
    { month: 'February', revenue: 48750.00, customerCount: 45, prevYearRevenue: 43500.00, prevYearCustomerCount: 41 },
    { month: 'March', revenue: 52300.00, customerCount: 48, prevYearRevenue: 46800.00, prevYearCustomerCount: 44 },
    { month: 'April', revenue: 0, customerCount: 0, prevYearRevenue: 49200.00, prevYearCustomerCount: 46 },
    { month: 'May', revenue: 0, customerCount: 0, prevYearRevenue: 51500.00, prevYearCustomerCount: 48 },
    { month: 'June', revenue: 0, customerCount: 0, prevYearRevenue: 54800.00, prevYearCustomerCount: 50 },
    { month: 'July', revenue: 0, customerCount: 0, prevYearRevenue: 56200.00, prevYearCustomerCount: 52 },
    { month: 'August', revenue: 0, customerCount: 0, prevYearRevenue: 57500.00, prevYearCustomerCount: 53 },
    { month: 'September', revenue: 0, customerCount: 0, prevYearRevenue: 55800.00, prevYearCustomerCount: 52 },
    { month: 'October', revenue: 0, customerCount: 0, prevYearRevenue: 53200.00, prevYearCustomerCount: 50 },
    { month: 'November', revenue: 0, customerCount: 0, prevYearRevenue: 51500.00, prevYearCustomerCount: 48 },
    { month: 'December', revenue: 0, customerCount: 0, prevYearRevenue: 49800.00, prevYearCustomerCount: 47 },
  ];
  
  // Mock zone revenue data
  const zoneData = [
    { zone: 1, zoneName: 'Zone 1 - Downtown', revenue: 62500.00, customerCount: 50, prevYearRevenue: 58200.00, prevYearCustomerCount: 48 },
    { zone: 2, zoneName: 'Zone 2 - Midtown', revenue: 48750.00, customerCount: 45, prevYearRevenue: 45500.00, prevYearCustomerCount: 43 },
    { zone: 3, zoneName: 'Zone 3 - Uptown', revenue: 35250.00, customerCount: 35, prevYearRevenue: 32800.00, prevYearCustomerCount: 32 },
    { zone: 4, zoneName: 'Zone 4 - West Side', revenue: 42300.00, customerCount: 40, prevYearRevenue: 39600.00, prevYearCustomerCount: 38 },
    { zone: 5, zoneName: 'Zone 5 - East Side', revenue: 38500.00, customerCount: 38, prevYearRevenue: 36200.00, prevYearCustomerCount: 36 },
  ];
  
  const handleYearChange = (event) => {
    setSelectedYear(parseInt(event.target.value));
  };
  
  const handleZoneChange = (event) => {
    setSelectedZone(event.target.value);
  };
  
  const handleReportTypeChange = (event) => {
    setReportType(event.target.value);
  };
  
  const handleCompareToggle = () => {
    setCompareWithPrevYear(!compareWithPrevYear);
  };
  
  const handlePrintReport = () => {
    alert(`Printing ${reportType} report for year ${selectedYear}`);
    // In a real app, this would generate and print the report
  };
  
  const handleExportReport = () => {
    alert(`Exporting ${reportType} report to Excel`);
    // In a real app, this would generate an Excel file for download
  };
  
  // Filter data based on selected zone
  const filteredMonthlyData = selectedZone 
    ? monthlyData.map(month => {
        const zoneMultiplier = zoneData.find(z => z.zone === parseInt(selectedZone))?.revenue / 
          zoneData.reduce((sum, z) => sum + z.revenue, 0);
        
        return {
          ...month,
          revenue: month.revenue * zoneMultiplier,
          customerCount: Math.round(month.customerCount * zoneMultiplier),
          prevYearRevenue: month.prevYearRevenue * zoneMultiplier,
          prevYearCustomerCount: Math.round(month.prevYearCustomerCount * zoneMultiplier)
        };
      })
    : monthlyData;
  
  const filteredZoneData = selectedZone 
    ? zoneData.filter(zone => zone.zone === parseInt(selectedZone))
    : zoneData;
  
  // Calculate totals
  const totalRevenue = reportType === 'monthly' 
    ? filteredMonthlyData.reduce((sum, month) => sum + month.revenue, 0)
    : filteredZoneData.reduce((sum, zone) => sum + zone.revenue, 0);
  
  const totalPrevYearRevenue = reportType === 'monthly'
    ? filteredMonthlyData.reduce((sum, month) => sum + month.prevYearRevenue, 0)
    : filteredZoneData.reduce((sum, zone) => sum + zone.prevYearRevenue, 0);
  
  const yearOverYearChange = totalPrevYearRevenue > 0 
    ? ((totalRevenue - totalPrevYearRevenue) / totalPrevYearRevenue) * 100
    : 0;
  
  // Calculate quarterly totals for quarterly report
  const quarterlyData = [
    {
      quarter: 'Q1',
      revenue: filteredMonthlyData.slice(0, 3).reduce((sum, month) => sum + month.revenue, 0),
      customerCount: Math.round(filteredMonthlyData.slice(0, 3).reduce((sum, month) => sum + month.customerCount, 0) / 3),
      prevYearRevenue: filteredMonthlyData.slice(0, 3).reduce((sum, month) => sum + month.prevYearRevenue, 0),
      prevYearCustomerCount: Math.round(filteredMonthlyData.slice(0, 3).reduce((sum, month) => sum + month.prevYearCustomerCount, 0) / 3)
    },
    {
      quarter: 'Q2',
      revenue: filteredMonthlyData.slice(3, 6).reduce((sum, month) => sum + month.revenue, 0),
      customerCount: Math.round(filteredMonthlyData.slice(3, 6).reduce((sum, month) => sum + month.customerCount, 0) / 3),
      prevYearRevenue: filteredMonthlyData.slice(3, 6).reduce((sum, month) => sum + month.prevYearRevenue, 0),
      prevYearCustomerCount: Math.round(filteredMonthlyData.slice(3, 6).reduce((sum, month) => sum + month.prevYearCustomerCount, 0) / 3)
    },
    {
      quarter: 'Q3',
      revenue: filteredMonthlyData.slice(6, 9).reduce((sum, month) => sum + month.revenue, 0),
      customerCount: Math.round(filteredMonthlyData.slice(6, 9).reduce((sum, month) => sum + month.customerCount, 0) / 3),
      prevYearRevenue: filteredMonthlyData.slice(6, 9).reduce((sum, month) => sum + month.prevYearRevenue, 0),
      prevYearCustomerCount: Math.round(filteredMonthlyData.slice(6, 9).reduce((sum, month) => sum + month.prevYearCustomerCount, 0) / 3)
    },
    {
      quarter: 'Q4',
      revenue: filteredMonthlyData.slice(9, 12).reduce((sum, month) => sum + month.revenue, 0),
      customerCount: Math.round(filteredMonthlyData.slice(9, 12).reduce((sum, month) => sum + month.customerCount, 0) / 3),
      prevYearRevenue: filteredMonthlyData.slice(9, 12).reduce((sum, month) => sum + month.prevYearRevenue, 0),
      prevYearCustomerCount: Math.round(filteredMonthlyData.slice(9, 12).reduce((sum, month) => sum + month.prevYearCustomerCount, 0) / 3)
    }
  ];
  
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Paper sx={{ p: 4, borderRadius: 2 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center" sx={{ mb: 4 }}>
          Year-to-Date Totals
        </Typography>
        
        <Grid container spacing={4}>
          {/* Filter Section */}
          <Grid item xs={12} md={4}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  <CalendarTodayIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                  Report Options
                </Typography>
                
                <FormControl fullWidth margin="normal">
                  <InputLabel id="year-select-label">Year</InputLabel>
                  <Select
                    labelId="year-select-label"
                    id="year-select"
                    value={selectedYear}
                    label="Year"
                    onChange={handleYearChange}
                  >
                    <MenuItem value={2023}>2023</MenuItem>
                    <MenuItem value={2024}>2024</MenuItem>
                    <MenuItem value={2025}>2025</MenuItem>
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
                  <InputLabel id="report-type-label">Report Type</InputLabel>
                  <Select
                    labelId="report-type-label"
                    id="report-type"
                    value={reportType}
                    label="Report Type"
                    onChange={handleReportTypeChange}
                  >
                    <MenuItem value="monthly">Monthly</MenuItem>
                    <MenuItem value="quarterly">Quarterly</MenuItem>
                    <MenuItem value="zone">By Zone</MenuItem>
                  </Select>
                </FormControl>
                
                <Button
                  variant="outlined"
                  fullWidth
                  startIcon={<CompareArrowsIcon />}
                  onClick={handleCompareToggle}
                  sx={{ mt: 2 }}
                >
                  {compareWithPrevYear ? 'Hide Previous Year' : 'Compare with Previous Year'}
                </Button>
                
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
            
            {/* Summary Card */}
            <Card variant="outlined" sx={{ mt: 3 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Summary
                </Typography>
                
                <Box sx={{ mb: 2 }}>
                  <Typography variant="body1" sx={{ fontWeight: 'bold', fontSize: '1.2rem' }}>
                    YTD Revenue: ${totalRevenue.toFixed(2)}
                  </Typography>
                  
                  {compareWithPrevYear && (
                    <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                      <Typography variant="body2" sx={{ mr: 1 }}>
                        vs Previous Year: ${totalPrevYearRevenue.toFixed(2)}
                      </Typography>
                      <Chip 
                        label={`${yearOverYearChange >= 0 ? '+' : ''}${yearOverYearChange.toFixed(1)}%`} 
                        color={yearOverYearChange >= 0 ? 'success' : 'error'} 
                        size="small" 
                      />
                    </Box>
                  )}
                </Box>
                
                <Divider sx={{ my: 2 }} />
                
                <Typography variant="body1">
                  <strong>Report Type:</strong> {reportType.charAt(0).toUpperCase() + reportType.slice(1)}
                </Typography>
                
                <Typography variant="body1">
                  <strong>Year:</strong> {selectedYear}
                </Typography>
                
                <Typography variant="body1">
                  <strong>Zone:</strong> {selectedZone ? zones.find(z => z.id === parseInt(selectedZone))?.name : 'All Zones'}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          
          {/* Report Display Section */}
          <Grid item xs={12} md={8}>
            <Card variant="outlined">
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                  <Typography variant="h6">
                    {reportType === 'monthly' && <><BarChartIcon sx={{ mr: 1, verticalAlign: 'middle' }} />Monthly Revenue</>}
                    {reportType === 'quarterly' && <><PieChartIcon sx={{ mr: 1, verticalAlign: 'middle' }} />Quarterly Revenue</>}
                    {reportType === 'zone' && <><MapIcon sx={{ mr: 1, verticalAlign: 'middle' }} />Revenue by Zone</>}
                  </Typography>
                  <Chip 
                    label={`${selectedYear} ${selectedZone ? `- ${zones.find(z => z.id === parseInt(selectedZone))?.name}` : ''}`} 
                    color="primary" 
                  />
                </Box>
                
                <Divider sx={{ mb: 3 }} />
                
                {/* Monthly Report */}
                {reportType === 'monthly' && (
                  <TableContainer>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>Month</TableCell>
                          <TableCell align="right">Revenue</TableCell>
                          {compareWithPrevYear && (
                            <>
                              <TableCell align="right">Previous Year</TableCell>
                              <TableCell align="right">Change</TableCell>
                            </>
                          )}
                          <TableCell align="right">Customers</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {filteredMonthlyData.map((month) => {
                          const change = month.prevYearRevenue > 0 
                            ? ((month.revenue - month.prevYearRevenue) / month.prevYearRevenue) * 100
                            : 0;
                          
                          return (
                            <TableRow key={month.month}>
                              <TableCell>{month.month}</TableCell>
                              <TableCell align="right">${month.revenue.toFixed(2)}</TableCell>
                              {compareWithPrevYear && (
                                <>
                                  <TableCell align="right">${month.prevYearRevenue.toFixed(2)}</TableCell>
                                  <TableCell align="right">
                                    <Chip 
                                      label={`${change >= 0 ? '+' : ''}${change.toFixed(1)}%`} 
                                      color={change >= 0 ? 'success' : 'error'} 
                                      size="small" 
                                    />
                                  </TableCell>
                                </>
                              )}
                              <TableCell align="right">{month.customerCount}</TableCell>
                            </TableRow>
                          );
                        })}
                        <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                          <TableCell><strong>Total</strong></TableCell>
                          <TableCell align="right"><strong>${totalRevenue.toFixed(2)}</strong></TableCell>
                          {compareWithPrevYear && (
                            <>
                              <TableCell align="right"><strong>${totalPrevYearRevenue.toFixed(2)}</strong></TableCell>
                              <TableCell align="right">
                                <Chip 
                                  label={`${yearOverYearChange >= 0 ? '+' : ''}${yearOverYearChange.toFixed(1)}%`} 
                                  color={yearOverYearChange >= 0 ? 'success' : 'error'} 
                                  size="small" 
                                />
                              </TableCell>
                            </>
                          )}
                          <TableCell align="right"><strong>{filteredMonthlyData.reduce((sum, month) => sum + month.customerCount, 0)}</strong></TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                )}
                
                {/* Quarterly Report */}
                {reportType === 'quarterly' && (
                  <TableContainer>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>Quarter</TableCell>
                          <TableCell align="right">Revenue</TableCell>
                          {compareWithPrevYear && (
                            <>
                              <TableCell align="right">Previous Year</TableCell>
                              <TableCell align="right">Change</TableCell>
                            </>
                          )}
                          <TableCell align="right">Avg. Customers</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {quarterlyData.map((quarter) => {
                          const change = quarter.prevYearRevenue > 0 
                            ? ((quarter.revenue - quarter.prevYearRevenue) / quarter.prevYearRevenue) * 100
                            : 0;
                          
                          return (
                            <TableRow key={quarter.quarter}>
                              <TableCell>{quarter.quarter}</TableCell>
                              <TableCell align="right">${quarter.revenue.toFixed(2)}</TableCell>
                              {compareWithPrevYear && (
                                <>
                                  <TableCell align="right">${quarter.prevYearRevenue.toFixed(2)}</TableCell>
                                  <TableCell align="right">
                                    <Chip 
                                      label={`${change >= 0 ? '+' : ''}${change.toFixed(1)}%`} 
                                      color={change >= 0 ? 'success' : 'error'} 
                                      size="small" 
                                    />
                                  </TableCell>
                                </>
                              )}
                              <TableCell align="right">{quarter.customerCount}</TableCell>
                            </TableRow>
                          );
                        })}
                        <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                          <TableCell><strong>Total</strong></TableCell>
                          <TableCell align="right"><strong>${totalRevenue.toFixed(2)}</strong></TableCell>
                          {compareWithPrevYear && (
                            <>
                              <TableCell align="right"><strong>${totalPrevYearRevenue.toFixed(2)}</strong></TableCell>
                              <TableCell align="right">
                                <Chip 
                                  label={`${yearOverYearChange >= 0 ? '+' : ''}${yearOverYearChange.toFixed(1)}%`} 
                                  color={yearOverYearChange >= 0 ? 'success' : 'error'} 
                                  size="small" 
                                />
                              </TableCell>
                            </>
                          )}
                          <TableCell align="right"><strong>{Math.round(quarterlyData.reduce((sum, q) => sum + q.customerCount, 0) / 4)}</strong></TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                )}
                
                {/* Zone Report */}
                {reportType === 'zone' && (
                  <TableContainer>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>Zone</TableCell>
                          <TableCell align="right">Revenue</TableCell>
                          {compareWithPrevYear && (
                            <>
                              <TableCell align="right">Previous Year</TableCell>
                              <TableCell align="right">Change</TableCell>
                            </>
                          )}
                          <TableCell align="right">Customers</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {filteredZoneData.map((zone) => {
                          const change = zone.prevYearRevenue > 0 
                            ? ((zone.revenue - zone.prevYearRevenue) / zone.prevYearRevenue) * 100
                            : 0;
                          
                          return (
                            <TableRow key={zone.zone}>
                              <TableCell>{zone.zoneName}</TableCell>
                              <TableCell align="right">${zone.revenue.toFixed(2)}</TableCell>
                              {compareWithPrevYear && (
                                <>
                                  <TableCell align="right">${zone.prevYearRevenue.toFixed(2)}</TableCell>
                                  <TableCell align="right">
                                    <Chip 
                                      label={`${change >= 0 ? '+' : ''}${change.toFixed(1)}%`} 
                                      color={change >= 0 ? 'success' : 'error'} 
                                      size="small" 
                                    />
                                  </TableCell>
                                </>
                              )}
                              <TableCell align="right">{zone.customerCount}</TableCell>
                            </TableRow>
                          );
                        })}
                        <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                          <TableCell><strong>Total</strong></TableCell>
                          <TableCell align="right"><strong>${totalRevenue.toFixed(2)}</strong></TableCell>
                          {compareWithPrevYear && (
                            <>
                              <TableCell align="right"><strong>${totalPrevYearRevenue.toFixed(2)}</strong></TableCell>
                              <TableCell align="right">
                                <Chip 
                                  label={`${yearOverYearChange >= 0 ? '+' : ''}${yearOverYearChange.toFixed(1)}%`} 
                                  color={yearOverYearChange >= 0 ? 'success' : 'error'} 
                                  size="small" 
                                />
                              </TableCell>
                            </>
                          )}
                          <TableCell align="right"><strong>{filteredZoneData.reduce((sum, zone) => sum + zone.customerCount, 0)}</strong></TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                )}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default YtdTotals;