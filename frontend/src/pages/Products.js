import React, { useState, useEffect } from 'react';
import {
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Button,
  TextField,
  InputAdornment,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  Snackbar
} from '@material-ui/core';
import {
  Add as AddIcon,
  Search as SearchIcon,
  Edit as EditIcon,
  Delete as DeleteIcon
} from '@material-ui/icons';
import { Alert } from '@material-ui/lab';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  tableContainer: {
    maxHeight: 'calc(100vh - 300px)',
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing(2),
  },
  searchField: {
    marginBottom: theme.spacing(2),
  },
  formField: {
    marginBottom: theme.spacing(2),
  },
}));

const Products = () => {
  const classes = useStyles();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [currentProduct, setCurrentProduct] = useState({
    product_code: '',
    product_name: '',
    description: '',
    category: '',
    price: '',
    cost: '',
    stock_quantity: '',
    reorder_level: '',
    supplier_id: ''
  });
  const [isEditing, setIsEditing] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // In a real application, this would be an actual API call
        // For now, we'll simulate the data
        
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock data
        const mockProducts = [
          { id: 1, product_code: 'P001', product_name: 'Widget A', description: 'Standard widget', category: 'Widgets', price: 19.99, cost: 10.50, stock_quantity: 150, reorder_level: 25, supplier_id: 1 },
          { id: 2, product_code: 'P002', product_name: 'Widget B', description: 'Premium widget', category: 'Widgets', price: 29.99, cost: 15.75, stock_quantity: 75, reorder_level: 15, supplier_id: 1 },
          { id: 3, product_code: 'P003', product_name: 'Gadget C', description: 'Basic gadget', category: 'Gadgets', price: 49.99, cost: 25.00, stock_quantity: 50, reorder_level: 10, supplier_id: 2 },
          { id: 4, product_code: 'P004', product_name: 'Gadget D', description: 'Advanced gadget', category: 'Gadgets', price: 79.99, cost: 40.00, stock_quantity: 30, reorder_level: 8, supplier_id: 2 },
          { id: 5, product_code: 'P005', product_name: 'Component E', description: 'Small component', category: 'Components', price: 9.99, cost: 3.25, stock_quantity: 200, reorder_level: 50, supplier_id: 3 },
          { id: 6, product_code: 'P006', product_name: 'Component F', description: 'Large component', category: 'Components', price: 14.99, cost: 6.50, stock_quantity: 120, reorder_level: 30, supplier_id: 3 },
          { id: 7, product_code: 'P007', product_name: 'Tool G', description: 'Hand tool', category: 'Tools', price: 24.99, cost: 12.75, stock_quantity: 45, reorder_level: 10, supplier_id: 4 },
          { id: 8, product_code: 'P008', product_name: 'Tool H', description: 'Power tool', category: 'Tools', price: 89.99, cost: 45.00, stock_quantity: 25, reorder_level: 5, supplier_id: 4 },
          { id: 9, product_code: 'P009', product_name: 'Accessory I', description: 'Basic accessory', category: 'Accessories', price: 7.99, cost: 2.50, stock_quantity: 300, reorder_level: 75, supplier_id: 5 },
          { id: 10, product_code: 'P010', product_name: 'Accessory J', description: 'Premium accessory', category: 'Accessories', price: 12.99, cost: 5.25, stock_quantity: 150, reorder_level: 40, supplier_id: 5 },
          { id: 11, product_code: 'P011', product_name: 'Widget K', description: 'Deluxe widget', category: 'Widgets', price: 39.99, cost: 20.00, stock_quantity: 60, reorder_level: 15, supplier_id: 1 },
          { id: 12, product_code: 'P012', product_name: 'Gadget L', description: 'Pro gadget', category: 'Gadgets', price: 99.99, cost: 55.00, stock_quantity: 20, reorder_level: 5, supplier_id: 2 },
        ];
        
        setProducts(mockProducts);
        setLoading(false);
      } catch (err) {
        setError('Failed to load products');
        setLoading(false);
      }
    };
    
    fetchProducts();
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setPage(0);
  };

  const handleOpenDialog = (product = null) => {
    if (product) {
      setCurrentProduct(product);
      setIsEditing(true);
    } else {
      setCurrentProduct({
        product_code: '',
        product_name: '',
        description: '',
        category: '',
        price: '',
        cost: '',
        stock_quantity: '',
        reorder_level: '',
        supplier_id: ''
      });
      setIsEditing(false);
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCurrentProduct({
      ...currentProduct,
      [name]: value
    });
  };

  const handleSaveProduct = async () => {
    try {
      // In a real application, this would be an actual API call
      // For now, we'll simulate the data update
      
      if (isEditing) {
        // Update existing product
        const updatedProducts = products.map(product => 
          product.id === currentProduct.id ? currentProduct : product
        );
        setProducts(updatedProducts);
        setSnackbar({
          open: true,
          message: 'Product updated successfully',
          severity: 'success'
        });
      } else {
        // Add new product
        const newProduct = {
          ...currentProduct,
          id: Math.max(...products.map(p => p.id)) + 1
        };
        setProducts([...products, newProduct]);
        setSnackbar({
          open: true,
          message: 'Product added successfully',
          severity: 'success'
        });
      }
      
      handleCloseDialog();
    } catch (err) {
      setSnackbar({
        open: true,
        message: 'Error saving product',
        severity: 'error'
      });
    }
  };

  const handleDeleteProduct = async (id) => {
    try {
      // In a real application, this would be an actual API call
      // For now, we'll simulate the data update
      
      const updatedProducts = products.filter(product => product.id !== id);
      setProducts(updatedProducts);
      setSnackbar({
        open: true,
        message: 'Product deleted successfully',
        severity: 'success'
      });
    } catch (err) {
      setSnackbar({
        open: true,
        message: 'Error deleting product',
        severity: 'error'
      });
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar({
      ...snackbar,
      open: false
    });
  };

  // Filter products based on search term
  const filteredProducts = products.filter(product => 
    product.product_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.product_code.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Paginate products
  const paginatedProducts = filteredProducts.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  if (loading) {
    return <Typography>Loading products...</Typography>;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <Typography variant="h4" gutterBottom>
          Products
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => handleOpenDialog()}
        >
          Add Product
        </Button>
      </div>
      
      <TextField
        className={classes.searchField}
        variant="outlined"
        fullWidth
        placeholder="Search products..."
        value={searchTerm}
        onChange={handleSearch}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
      
      <Paper className={classes.paper}>
        <TableContainer className={classes.tableContainer}>
          <Table
            className={classes.table}
            stickyHeader
            aria-labelledby="tableTitle"
            size="medium"
          >
            <TableHead>
              <TableRow>
                <TableCell>Code</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Category</TableCell>
                <TableCell align="right">Price</TableCell>
                <TableCell align="right">Stock</TableCell>
                <TableCell align="right">Reorder Level</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedProducts.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>{product.product_code}</TableCell>
                  <TableCell>{product.product_name}</TableCell>
                  <TableCell>{product.category}</TableCell>
                  <TableCell align="right">${product.price.toFixed(2)}</TableCell>
                  <TableCell align="right">{product.stock_quantity}</TableCell>
                  <TableCell align="right">{product.reorder_level}</TableCell>
                  <TableCell>
                    <IconButton
                      aria-label="edit"
                      onClick={() => handleOpenDialog(product)}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      aria-label="delete"
                      onClick={() => handleDeleteProduct(product.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
              {paginatedProducts.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7} align="center">
                    No products found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredProducts.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      
      {/* Product Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        <DialogTitle>{isEditing ? 'Edit Product' : 'Add Product'}</DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                className={classes.formField}
                name="product_code"
                label="Product Code"
                variant="outlined"
                fullWidth
                value={currentProduct.product_code}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                className={classes.formField}
                name="product_name"
                label="Product Name"
                variant="outlined"
                fullWidth
                value={currentProduct.product_name}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                className={classes.formField}
                name="description"
                label="Description"
                variant="outlined"
                fullWidth
                multiline
                rows={2}
                value={currentProduct.description}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                className={classes.formField}
                name="category"
                label="Category"
                variant="outlined"
                fullWidth
                value={currentProduct.category}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                className={classes.formField}
                name="supplier_id"
                label="Supplier ID"
                variant="outlined"
                fullWidth
                value={currentProduct.supplier_id}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                className={classes.formField}
                name="price"
                label="Price"
                variant="outlined"
                fullWidth
                type="number"
                InputProps={{
                  startAdornment: <InputAdornment position="start">$</InputAdornment>,
                }}
                value={currentProduct.price}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                className={classes.formField}
                name="cost"
                label="Cost"
                variant="outlined"
                fullWidth
                type="number"
                InputProps={{
                  startAdornment: <InputAdornment position="start">$</InputAdornment>,
                }}
                value={currentProduct.cost}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                className={classes.formField}
                name="stock_quantity"
                label="Stock Quantity"
                variant="outlined"
                fullWidth
                type="number"
                value={currentProduct.stock_quantity}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                className={classes.formField}
                name="reorder_level"
                label="Reorder Level"
                variant="outlined"
                fullWidth
                type="number"
                value={currentProduct.reorder_level}
                onChange={handleInputChange}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSaveProduct} color="primary" variant="contained">
            Save
          </Button>
        </DialogActions>
      </Dialog>
      
      {/* Snackbar for notifications */}
      <Snackbar open={snackbar.open} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Products;