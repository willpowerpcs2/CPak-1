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
  Checkbox,
  FormControlLabel,
  Card,
  CardContent,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Radio,
  RadioGroup,
  FormLabel,
  Alert
} from '@mui/material';
import PrintIcon from '@mui/icons-material/Print';
import FilterListIcon from '@mui/icons-material/FilterList';
import SaveIcon from '@mui/icons-material/Save';
import PreviewIcon from '@mui/icons-material/Preview';

const PrintLabels = () => {
  const [selectedZone, setSelectedZone] = useState('');
  const [selectedLabelType, setSelectedLabelType] = useState('all');
  const [includeInactive, setIncludeInactive] = useState(false);
  const [sortBy, setSortBy] = useState('name');
  const [previewMode, setPreviewMode] = useState(false);
  const [selectedCustomers, setSelectedCustomers] = useState([]);
  
  // Mock zones data
  const zones = [
    { id: 1, name: 'Zone 1 - Downtown' },
    { id: 2, name: 'Zone 2 - Midtown' },
    { id: 3, name: 'Zone 3 - Uptown' },
    { id: 4, name: 'Zone 4 - West Side' },
    { id: 5, name: 'Zone 5 - East Side' },
  ];
  
  // Mock customers data
  const customers = [
    { id: 1, name: 'ABC Company', address: '123 Main St, Suite 100', city: 'New York', state: 'NY', zip: '10001', zone: 1, status: 'active' },
    { id: 2, name: 'XYZ Corporation', address: '456 Park Ave', city: 'New York', state: 'NY', zip: '10022', zone: 2, status: 'active' },
    { id: 3, name: 'Acme Industries', address: '789 Broadway', city: 'New York', state: 'NY', zip: '10003', zone: 1, status: 'inactive' },
    { id: 4, name: 'Global Enterprises', address: '321 Fifth Ave', city: 'New York', state: 'NY', zip: '10016', zone: 3, status: 'active' },
    { id: 5, name: 'Local Business LLC', address: '555 Lexington Ave', city: 'New York', state: 'NY', zip: '10017', zone: 2, status: 'active' },
  ];
  
  const handleZoneChange = (event) => {
    setSelectedZone(event.target.value);
  };
  
  const handleLabelTypeChange = (event) => {
    setSelectedLabelType(event.target.value);
  };
  
  const handleSortByChange = (event) => {
    setSortBy(event.target.value);
  };
  
  const toggleCustomerSelection = (customerId) => {
    if (selectedCustomers.includes(customerId)) {
      setSelectedCustomers(selectedCustomers.filter(id => id !== customerId));
    } else {
      setSelectedCustomers([...selectedCustomers, customerId]);
    }
  };
  
  const selectAllCustomers = () => {
    const allIds = filteredCustomers.map(customer => customer.id);
    setSelectedCustomers(allIds);
  };
  
  const deselectAllCustomers = () => {
    setSelectedCustomers([]);
  };
  
  const handlePrintLabels = () => {
    alert(`Printing ${selectedCustomers.length} labels`);
    // In a real app, this would send the print job to the server
  };
  
  // Filter customers based on selected criteria
  const filteredCustomers = customers.filter(customer => {
    // Filter by zone if selected
    if (selectedZone && customer.zone !== parseInt(selectedZone)) {
      return false;
    }
    
    // Filter by status if not including inactive
    if (!includeInactive && customer.status === 'inactive') {
      return false;
    }
    
    return true;
  });
  
  // Sort customers based on selected sort criteria
  const sortedCustomers = [...filteredCustomers].sort((a, b) => {
    if (sortBy === 'name') {
      return a.name.localeCompare(b.name);
    } else if (sortBy === 'zip') {
      return a.zip.localeCompare(b.zip);
    } else if (sortBy === 'zone') {
      return a.zone - b.zone;
    }
    return 0;
  });
  
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Paper sx={{ p: 4, borderRadius: 2 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center" sx={{ mb: 4 }}>
          Print Mailing Labels
        </Typography>
        
        <Grid container spacing={4}>
          {/* Filter Section */}
          <Grid item xs={12} md={4}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  <FilterListIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                  Filter Options
                </Typography>
                
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
                
                <FormControl component="fieldset" margin="normal">
                  <FormLabel component="legend">Label Type</FormLabel>
                  <RadioGroup
                    aria-label="label-type"
                    name="label-type"
                    value={selectedLabelType}
                    onChange={handleLabelTypeChange}
                  >
                    <FormControlLabel value="all" control={<Radio />} label="All Customers" />
                    <FormControlLabel value="past-due" control={<Radio />} label="Past Due Only" />
                    <FormControlLabel value="current" control={<Radio />} label="Current Customers Only" />
                  </RadioGroup>
                </FormControl>
                
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
                
                <FormControl component="fieldset" margin="normal">
                  <FormLabel component="legend">Sort By</FormLabel>
                  <RadioGroup
                    aria-label="sort-by"
                    name="sort-by"
                    value={sortBy}
                    onChange={handleSortByChange}
                  >
                    <FormControlLabel value="name" control={<Radio />} label="Customer Name" />
                    <FormControlLabel value="zip" control={<Radio />} label="ZIP Code" />
                    <FormControlLabel value="zone" control={<Radio />} label="Zone" />
                  </RadioGroup>
                </FormControl>
                
                <Box sx={{ mt: 3 }}>
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    startIcon={<PreviewIcon />}
                    onClick={() => setPreviewMode(!previewMode)}
                    sx={{ mb: 2 }}
                  >
                    {previewMode ? 'Hide Preview' : 'Show Preview'}
                  </Button>
                  
                  <Button
                    variant="contained"
                    color="secondary"
                    fullWidth
                    startIcon={<PrintIcon />}
                    onClick={handlePrintLabels}
                    disabled={selectedCustomers.length === 0}
                  >
                    Print {selectedCustomers.length} Labels
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          
          {/* Customer Selection Section */}
          <Grid item xs={12} md={8}>
            <Card variant="outlined">
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Typography variant="h6">
                    Customer Selection ({filteredCustomers.length} customers)
                  </Typography>
                  <Box>
                    <Button 
                      size="small" 
                      onClick={selectAllCustomers}
                      sx={{ mr: 1 }}
                    >
                      Select All
                    </Button>
                    <Button 
                      size="small" 
                      onClick={deselectAllCustomers}
                    >
                      Deselect All
                    </Button>
                  </Box>
                </Box>
                
                {filteredCustomers.length === 0 ? (
                  <Alert severity="info" sx={{ mt: 2 }}>
                    No customers match the selected criteria.
                  </Alert>
                ) : (
                  <List sx={{ maxHeight: '400px', overflow: 'auto' }}>
                    {sortedCustomers.map((customer) => (
                      <React.Fragment key={customer.id}>
                        <ListItem
                          button
                          onClick={() => toggleCustomerSelection(customer.id)}
                          selected={selectedCustomers.includes(customer.id)}
                        >
                          <ListItemIcon>
                            <Checkbox
                              edge="start"
                              checked={selectedCustomers.includes(customer.id)}
                              tabIndex={-1}
                              disableRipple
                            />
                          </ListItemIcon>
                          <ListItemText
                            primary={customer.name}
                            secondary={
                              <>
                                {customer.address}, {customer.city}, {customer.state} {customer.zip}
                                <br />
                                Zone: {zones.find(z => z.id === customer.zone)?.name}
                                {customer.status === 'inactive' && ' (Inactive)'}
                              </>
                            }
                          />
                        </ListItem>
                        <Divider />
                      </React.Fragment>
                    ))}
                  </List>
                )}
              </CardContent>
            </Card>
            
            {/* Label Preview */}
            {previewMode && selectedCustomers.length > 0 && (
              <Card variant="outlined" sx={{ mt: 3 }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Label Preview
                  </Typography>
                  <Grid container spacing={2}>
                    {sortedCustomers
                      .filter(customer => selectedCustomers.includes(customer.id))
                      .slice(0, 4)
                      .map((customer) => (
                        <Grid item xs={6} key={customer.id}>
                          <Paper 
                            elevation={1} 
                            sx={{ 
                              p: 2, 
                              height: '120px', 
                              border: '1px dashed #ccc',
                              fontFamily: 'monospace'
                            }}
                          >
                            <Typography variant="body2" component="div" sx={{ whiteSpace: 'pre-line' }}>
                              {customer.name}
                              {'\n'}
                              {customer.address}
                              {'\n'}
                              {customer.city}, {customer.state} {customer.zip}
                            </Typography>
                          </Paper>
                        </Grid>
                      ))}
                  </Grid>
                  {selectedCustomers.length > 4 && (
                    <Typography variant="body2" sx={{ mt: 2, fontStyle: 'italic', textAlign: 'center' }}>
                      Showing 4 of {selectedCustomers.length} labels
                    </Typography>
                  )}
                </CardContent>
              </Card>
            )}
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default PrintLabels;