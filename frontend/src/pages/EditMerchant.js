import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Box,
  Typography,
  Paper,
  TextField,
  Grid,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Divider,
  Snackbar,
  Alert,
  FormHelperText,
  CircularProgress
} from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';

const EditMerchant = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    contactName: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    zone: '',
    status: 'Active',
    notes: ''
  });
  
  const [errors, setErrors] = useState({});
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [submitting, setSubmitting] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  // Mock data for demonstration
  const mockMerchants = [
    {
      id: 1,
      name: 'ABC Store',
      accountNumber: 'ACC001',
      contactName: 'John Smith',
      phone: '555-123-4567',
      email: 'john@abcstore.com',
      address: '123 Main St',
      city: 'Anytown',
      state: 'CA',
      zip: '12345',
      zone: 'A',
      status: 'Active',
      notes: 'Prefers email communication. Always pays on time.'
    },
    {
      id: 2,
      name: 'XYZ Market',
      accountNumber: 'ACC002',
      contactName: 'Jane Doe',
      phone: '555-987-6543',
      email: 'jane@xyzmarket.com',
      address: '456 Oak Ave',
      city: 'Somewhere',
      state: 'NY',
      zip: '67890',
      zone: 'B',
      status: 'Active',
      notes: 'Call before delivery. Closed on Sundays.'
    },
    {
      id: 3,
      name: 'Main Street Shop',
      accountNumber: 'ACC003',
      contactName: 'Robert Johnson',
      phone: '555-456-7890',
      email: 'robert@mainstreetshop.com',
      address: '789 Elm St',
      city: 'Elsewhere',
      state: 'TX',
      zip: '54321',
      zone: 'A',
      status: 'Active',
      notes: 'Prefers morning deliveries. Ask for manager on duty.'
    }
  ];

  useEffect(() => {
    // In a real application, this would be an API call
    // For now, we'll use mock data
    const fetchMerchant = async () => {
      try {
        // Simulate API call
        setTimeout(() => {
          const merchant = mockMerchants.find(m => m.id === parseInt(id));
          
          if (merchant) {
            setFormData(merchant);
            setLoading(false);
          } else {
            setError('Merchant not found');
            setLoading(false);
          }
        }, 1000);
        
        // Real API call would look like this:
        // const response = await axios.get(`/api/merchants/${id}`);
        // setFormData(response.data);
        // setLoading(false);
      } catch (err) {
        console.error('Error fetching merchant:', err);
        setError('Failed to load merchant data');
        setLoading(false);
      }
    };

    fetchMerchant();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error for this field when user types
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Merchant name is required';
    }
    
    if (!formData.contactName.trim()) {
      newErrors.contactName = 'Contact name is required';
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\d{3}-\d{3}-\d{4}$/.test(formData.phone) && !/^\(\d{3}\) \d{3}-\d{4}$/.test(formData.phone)) {
      newErrors.phone = 'Phone format should be 555-123-4567 or (555) 123-4567';
    }
    
    if (formData.email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)) {
      newErrors.email = 'Invalid email address';
    }
    
    if (!formData.address.trim()) {
      newErrors.address = 'Address is required';
    }
    
    if (!formData.city.trim()) {
      newErrors.city = 'City is required';
    }
    
    if (!formData.state.trim()) {
      newErrors.state = 'State is required';
    }
    
    if (!formData.zip.trim()) {
      newErrors.zip = 'ZIP code is required';
    } else if (!/^\d{5}(-\d{4})?$/.test(formData.zip)) {
      newErrors.zip = 'ZIP code format should be 12345 or 12345-6789';
    }
    
    if (!formData.zone) {
      newErrors.zone = 'Zone is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      setSnackbar({
        open: true,
        message: 'Please correct the errors in the form',
        severity: 'error'
      });
      return;
    }
    
    setSubmitting(true);
    
    // In a real application, this would be an API call
    // For now, we'll simulate it
    setTimeout(() => {
      console.log('Merchant data updated:', formData);
      
      // Show success message
      setSnackbar({
        open: true,
        message: `Merchant "${formData.name}" has been successfully updated`,
        severity: 'success'
      });
      
      setSubmitting(false);
    }, 1500);
    
    // Real API call would look like this:
    // try {
    //   const response = await axios.put(`/api/merchants/${id}`, formData);
    //   setSnackbar({
    //     open: true,
    //     message: `Merchant "${formData.name}" has been successfully updated`,
    //     severity: 'success'
    //   });
    //   setSubmitting(false);
    // } catch (err) {
    //   console.error('Error updating merchant:', err);
    //   setSnackbar({
    //     open: true,
    //     message: 'Failed to update merchant. Please try again.',
    //     severity: 'error'
    //   });
    //   setSubmitting(false);
    // }
  };

  const handleDelete = async () => {
    // In a real application, this would be an API call
    // For now, we'll simulate it
    setTimeout(() => {
      console.log('Merchant deleted:', formData.id);
      
      // Show success message
      setSnackbar({
        open: true,
        message: `Merchant "${formData.name}" has been successfully deleted`,
        severity: 'success'
      });
      
      // Navigate back to the main page
      navigate('/');
    }, 1500);
    
    // Real API call would look like this:
    // try {
    //   await axios.delete(`/api/merchants/${id}`);
    //   setSnackbar({
    //     open: true,
    //     message: `Merchant "${formData.name}" has been successfully deleted`,
    //     severity: 'success'
    //   });
    //   navigate('/');
    // } catch (err) {
    //   console.error('Error deleting merchant:', err);
    //   setSnackbar({
    //     open: true,
    //     message: 'Failed to delete merchant. Please try again.',
    //     severity: 'error'
    //   });
    // }
  };

  const handleCancel = () => {
    navigate('/');
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity="error">{error}</Alert>
        <Button variant="contained" onClick={() => navigate('/')} sx={{ mt: 2 }}>
          Back to Home
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Edit Merchant Information
      </Typography>
      
      <Paper sx={{ p: 3 }}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Merchant Information
              </Typography>
              <Divider sx={{ mb: 2 }} />
            </Grid>
            
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Merchant Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                error={!!errors.name}
                helperText={errors.name}
                required
              />
            </Grid>
            
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Account Number"
                name="accountNumber"
                value={formData.accountNumber}
                disabled
              />
            </Grid>
            
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Contact Person"
                name="contactName"
                value={formData.contactName}
                onChange={handleChange}
                error={!!errors.contactName}
                helperText={errors.contactName}
                required
              />
            </Grid>
            
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                error={!!errors.phone}
                helperText={errors.phone || "Format: 555-123-4567"}
                required
              />
            </Grid>
            
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                error={!!errors.email}
                helperText={errors.email}
              />
            </Grid>
            
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                Address
              </Typography>
              <Divider sx={{ mb: 2 }} />
            </Grid>
            
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Street Address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                error={!!errors.address}
                helperText={errors.address}
                required
              />
            </Grid>
            
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="City"
                name="city"
                value={formData.city}
                onChange={handleChange}
                error={!!errors.city}
                helperText={errors.city}
                required
              />
            </Grid>
            
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="State"
                name="state"
                value={formData.state}
                onChange={handleChange}
                error={!!errors.state}
                helperText={errors.state}
                required
              />
            </Grid>
            
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="ZIP Code"
                name="zip"
                value={formData.zip}
                onChange={handleChange}
                error={!!errors.zip}
                helperText={errors.zip}
                required
              />
            </Grid>
            
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                Account Settings
              </Typography>
              <Divider sx={{ mb: 2 }} />
            </Grid>
            
            <Grid item xs={12} md={6}>
              <FormControl fullWidth error={!!errors.zone} required>
                <InputLabel>Zone</InputLabel>
                <Select
                  name="zone"
                  value={formData.zone}
                  onChange={handleChange}
                  label="Zone"
                >
                  <MenuItem value="">Select a Zone</MenuItem>
                  <MenuItem value="A">Zone A</MenuItem>
                  <MenuItem value="B">Zone B</MenuItem>
                  <MenuItem value="C">Zone C</MenuItem>
                  <MenuItem value="D">Zone D</MenuItem>
                </Select>
                {errors.zone && <FormHelperText>{errors.zone}</FormHelperText>}
              </FormControl>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Status</InputLabel>
                <Select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  label="Status"
                >
                  <MenuItem value="Active">Active</MenuItem>
                  <MenuItem value="Inactive">Inactive</MenuItem>
                  <MenuItem value="Pending">Pending</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Notes"
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                multiline
                rows={4}
              />
            </Grid>
            
            <Grid item xs={12}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={handleDelete}
                  startIcon={<DeleteIcon />}
                >
                  Delete Merchant
                </Button>
                
                <Box>
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={handleCancel}
                    startIcon={<CancelIcon />}
                    sx={{ mr: 2 }}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    startIcon={<SaveIcon />}
                    disabled={submitting}
                  >
                    {submitting ? 'Saving...' : 'Save Changes'}
                  </Button>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </form>
      </Paper>
      
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

export default EditMerchant;