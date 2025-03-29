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
  IconButton,
  Alert,
  Snackbar
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import MapIcon from '@mui/icons-material/Map';

const ZonePricing = () => {
  const [zones, setZones] = useState([
    { id: 1, name: 'Zone 1 - Downtown', basePrice: 125.00, description: 'Central business district' },
    { id: 2, name: 'Zone 2 - Midtown', basePrice: 100.00, description: 'Midtown commercial area' },
    { id: 3, name: 'Zone 3 - Uptown', basePrice: 85.00, description: 'Uptown residential and commercial' },
    { id: 4, name: 'Zone 4 - West Side', basePrice: 95.00, description: 'West side industrial and commercial' },
    { id: 5, name: 'Zone 5 - East Side', basePrice: 90.00, description: 'East side mixed use' },
  ]);
  
  const [selectedZone, setSelectedZone] = useState('');
  const [editingZone, setEditingZone] = useState(null);
  const [newZone, setNewZone] = useState({ name: '', basePrice: '', description: '' });
  const [isAddingZone, setIsAddingZone] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  
  // Mock service types
  const serviceTypes = [
    { id: 1, name: 'Standard Service', multiplier: 1.0 },
    { id: 2, name: 'Premium Service', multiplier: 1.5 },
    { id: 3, name: 'Express Service', multiplier: 2.0 },
    { id: 4, name: 'Basic Service', multiplier: 0.8 },
  ];
  
  // Mock customer assignments
  const zoneAssignments = [
    { id: 1, customerName: 'ABC Company', zone: 1, serviceType: 1, customPrice: null },
    { id: 2, customerName: 'XYZ Corporation', zone: 2, serviceType: 2, customPrice: 175.00 },
    { id: 3, customerName: 'Acme Industries', zone: 1, serviceType: 3, customPrice: null },
    { id: 4, customerName: 'Global Enterprises', zone: 3, serviceType: 1, customPrice: 100.00 },
    { id: 5, customerName: 'Local Business LLC', zone: 2, serviceType: 1, customPrice: null },
    { id: 6, customerName: 'Metro Services', zone: 4, serviceType: 2, customPrice: null },
    { id: 7, customerName: 'City Suppliers', zone: 5, serviceType: 1, customPrice: null },
    { id: 8, customerName: 'Regional Distributors', zone: 3, serviceType: 4, customPrice: 75.00 },
  ];
  
  const handleZoneChange = (event) => {
    setSelectedZone(event.target.value);
  };
  
  const handleEditZone = (zone) => {
    setEditingZone({ ...zone });
  };
  
  const handleSaveZone = () => {
    if (editingZone) {
      setZones(zones.map(zone => zone.id === editingZone.id ? editingZone : zone));
      setEditingZone(null);
      showSnackbar('Zone updated successfully');
    }
  };
  
  const handleCancelEdit = () => {
    setEditingZone(null);
  };
  
  const handleAddZone = () => {
    setIsAddingZone(true);
  };
  
  const handleSaveNewZone = () => {
    if (!newZone.name || !newZone.basePrice) {
      showSnackbar('Please fill in all required fields', 'error');
      return;
    }
    
    const newId = Math.max(...zones.map(z => z.id)) + 1;
    const zoneToAdd = {
      id: newId,
      name: newZone.name,
      basePrice: parseFloat(newZone.basePrice),
      description: newZone.description || ''
    };
    
    setZones([...zones, zoneToAdd]);
    setNewZone({ name: '', basePrice: '', description: '' });
    setIsAddingZone(false);
    showSnackbar('New zone added successfully');
  };
  
  const handleCancelAdd = () => {
    setNewZone({ name: '', basePrice: '', description: '' });
    setIsAddingZone(false);
  };
  
  const handleDeleteZone = (zoneId) => {
    // Check if zone is in use
    const isZoneInUse = zoneAssignments.some(assignment => assignment.zone === zoneId);
    
    if (isZoneInUse) {
      showSnackbar('Cannot delete zone that is assigned to customers', 'error');
      return;
    }
    
    setZones(zones.filter(zone => zone.id !== zoneId));
    showSnackbar('Zone deleted successfully');
  };
  
  const handleInputChange = (e, field) => {
    setEditingZone({
      ...editingZone,
      [field]: field === 'basePrice' ? parseFloat(e.target.value) : e.target.value
    });
  };
  
  const handleNewZoneInputChange = (e, field) => {
    setNewZone({
      ...newZone,
      [field]: e.target.value
    });
  };
  
  const showSnackbar = (message, severity = 'success') => {
    setSnackbarMessage(message);
    setSnackbarOpen(true);
  };
  
  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };
  
  // Filter assignments by selected zone
  const filteredAssignments = selectedZone 
    ? zoneAssignments.filter(assignment => assignment.zone === parseInt(selectedZone))
    : zoneAssignments;
  
  // Calculate price for each assignment
  const assignmentsWithPrices = filteredAssignments.map(assignment => {
    const zone = zones.find(z => z.id === assignment.zone);
    const service = serviceTypes.find(s => s.id === assignment.serviceType);
    const calculatedPrice = zone.basePrice * service.multiplier;
    const finalPrice = assignment.customPrice || calculatedPrice;
    
    return {
      ...assignment,
      zoneName: zone.name,
      serviceName: service.name,
      calculatedPrice,
      finalPrice
    };
  });
  
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Paper sx={{ p: 4, borderRadius: 2 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center" sx={{ mb: 4 }}>
          Zone Pricing Management
        </Typography>
        
        <Grid container spacing={4}>
          {/* Zone Management Section */}
          <Grid item xs={12} md={6}>
            <Card variant="outlined">
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Typography variant="h6">
                    <MapIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                    Zones
                  </Typography>
                  <Button 
                    variant="contained" 
                    size="small" 
                    startIcon={<AddIcon />}
                    onClick={handleAddZone}
                    disabled={isAddingZone}
                  >
                    Add Zone
                  </Button>
                </Box>
                
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Zone Name</TableCell>
                        <TableCell align="right">Base Price</TableCell>
                        <TableCell>Description</TableCell>
                        <TableCell align="center">Actions</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {zones.map((zone) => (
                        <TableRow key={zone.id}>
                          {editingZone && editingZone.id === zone.id ? (
                            // Editing mode
                            <>
                              <TableCell>
                                <TextField
                                  fullWidth
                                  size="small"
                                  value={editingZone.name}
                                  onChange={(e) => handleInputChange(e, 'name')}
                                />
                              </TableCell>
                              <TableCell>
                                <TextField
                                  fullWidth
                                  size="small"
                                  type="number"
                                  value={editingZone.basePrice}
                                  onChange={(e) => handleInputChange(e, 'basePrice')}
                                  InputProps={{
                                    startAdornment: <Box component="span" sx={{ mr: 1 }}>$</Box>,
                                  }}
                                />
                              </TableCell>
                              <TableCell>
                                <TextField
                                  fullWidth
                                  size="small"
                                  value={editingZone.description}
                                  onChange={(e) => handleInputChange(e, 'description')}
                                />
                              </TableCell>
                              <TableCell align="center">
                                <IconButton color="primary" onClick={handleSaveZone}>
                                  <SaveIcon />
                                </IconButton>
                                <IconButton color="default" onClick={handleCancelEdit}>
                                  <CancelIcon />
                                </IconButton>
                              </TableCell>
                            </>
                          ) : (
                            // Display mode
                            <>
                              <TableCell>{zone.name}</TableCell>
                              <TableCell align="right">${zone.basePrice.toFixed(2)}</TableCell>
                              <TableCell>{zone.description}</TableCell>
                              <TableCell align="center">
                                <IconButton color="primary" onClick={() => handleEditZone(zone)}>
                                  <EditIcon />
                                </IconButton>
                                <IconButton color="error" onClick={() => handleDeleteZone(zone.id)}>
                                  <DeleteIcon />
                                </IconButton>
                              </TableCell>
                            </>
                          )}
                        </TableRow>
                      ))}
                      
                      {/* Add new zone row */}
                      {isAddingZone && (
                        <TableRow>
                          <TableCell>
                            <TextField
                              fullWidth
                              size="small"
                              placeholder="Zone Name"
                              value={newZone.name}
                              onChange={(e) => handleNewZoneInputChange(e, 'name')}
                            />
                          </TableCell>
                          <TableCell>
                            <TextField
                              fullWidth
                              size="small"
                              type="number"
                              placeholder="Base Price"
                              value={newZone.basePrice}
                              onChange={(e) => handleNewZoneInputChange(e, 'basePrice')}
                              InputProps={{
                                startAdornment: <Box component="span" sx={{ mr: 1 }}>$</Box>,
                              }}
                            />
                          </TableCell>
                          <TableCell>
                            <TextField
                              fullWidth
                              size="small"
                              placeholder="Description"
                              value={newZone.description}
                              onChange={(e) => handleNewZoneInputChange(e, 'description')}
                            />
                          </TableCell>
                          <TableCell align="center">
                            <IconButton color="primary" onClick={handleSaveNewZone}>
                              <SaveIcon />
                            </IconButton>
                            <IconButton color="default" onClick={handleCancelAdd}>
                              <CancelIcon />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>
            
            {/* Service Types Section */}
            <Card variant="outlined" sx={{ mt: 3 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Service Types
                </Typography>
                
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Service Type</TableCell>
                        <TableCell align="right">Price Multiplier</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {serviceTypes.map((service) => (
                        <TableRow key={service.id}>
                          <TableCell>{service.name}</TableCell>
                          <TableCell align="right">×{service.multiplier.toFixed(1)}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>
          </Grid>
          
          {/* Customer Assignments Section */}
          <Grid item xs={12} md={6}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Customer Zone Assignments
                </Typography>
                
                <FormControl fullWidth margin="normal">
                  <InputLabel id="zone-filter-label">Filter by Zone</InputLabel>
                  <Select
                    labelId="zone-filter-label"
                    id="zone-filter"
                    value={selectedZone}
                    label="Filter by Zone"
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
                
                <TableContainer sx={{ mt: 2 }}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Customer</TableCell>
                        <TableCell>Zone</TableCell>
                        <TableCell>Service Type</TableCell>
                        <TableCell align="right">Calculated Price</TableCell>
                        <TableCell align="right">Final Price</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {assignmentsWithPrices.map((assignment) => (
                        <TableRow key={assignment.id}>
                          <TableCell>{assignment.customerName}</TableCell>
                          <TableCell>{assignment.zoneName}</TableCell>
                          <TableCell>{assignment.serviceName}</TableCell>
                          <TableCell align="right">${assignment.calculatedPrice.toFixed(2)}</TableCell>
                          <TableCell align="right">
                            ${assignment.finalPrice.toFixed(2)}
                            {assignment.customPrice && (
                              <Typography variant="caption" sx={{ display: 'block', color: 'text.secondary' }}>
                                (Custom)
                              </Typography>
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                      {assignmentsWithPrices.length === 0 && (
                        <TableRow>
                          <TableCell colSpan={5} align="center">
                            No customer assignments found for the selected zone.
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>
            
            {/* Price Calculator */}
            <Card variant="outlined" sx={{ mt: 3 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Price Calculator
                </Typography>
                
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth margin="normal">
                      <InputLabel id="calc-zone-label">Zone</InputLabel>
                      <Select
                        labelId="calc-zone-label"
                        id="calc-zone"
                        value={selectedZone || ''}
                        label="Zone"
                        onChange={handleZoneChange}
                      >
                        {zones.map((zone) => (
                          <MenuItem key={zone.id} value={zone.id}>
                            {zone.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth margin="normal">
                      <InputLabel id="calc-service-label">Service Type</InputLabel>
                      <Select
                        labelId="calc-service-label"
                        id="calc-service"
                        value={1}
                        label="Service Type"
                      >
                        {serviceTypes.map((service) => (
                          <MenuItem key={service.id} value={service.id}>
                            {service.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
                
                {selectedZone && (
                  <Box sx={{ mt: 3, p: 2, bgcolor: 'background.default', borderRadius: 1 }}>
                    <Typography variant="body1">
                      <strong>Base Price:</strong> ${zones.find(z => z.id === parseInt(selectedZone))?.basePrice.toFixed(2)}
                    </Typography>
                    <Typography variant="body1">
                      <strong>Standard Service Price:</strong> ${(zones.find(z => z.id === parseInt(selectedZone))?.basePrice * 1.0).toFixed(2)}
                    </Typography>
                    <Typography variant="body1">
                      <strong>Premium Service Price:</strong> ${(zones.find(z => z.id === parseInt(selectedZone))?.basePrice * 1.5).toFixed(2)}
                    </Typography>
                    <Typography variant="body1">
                      <strong>Express Service Price:</strong> ${(zones.find(z => z.id === parseInt(selectedZone))?.basePrice * 2.0).toFixed(2)}
                    </Typography>
                    <Typography variant="body1">
                      <strong>Basic Service Price:</strong> ${(zones.find(z => z.id === parseInt(selectedZone))?.basePrice * 0.8).toFixed(2)}
                    </Typography>
                  </Box>
                )}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Paper>
      
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

export default ZonePricing;