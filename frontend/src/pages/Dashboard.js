import React, { useState, useEffect } from 'react';
import { 
  Typography, 
  Grid, 
  Paper, 
  Card, 
  CardContent, 
  CardHeader,
  List,
  ListItem,
  ListItemText,
  Divider
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    height: '100%',
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardHeader: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
  },
  cardContent: {
    flexGrow: 1,
  },
  statValue: {
    fontSize: '2rem',
    fontWeight: 'bold',
    marginBottom: theme.spacing(1),
  },
  statLabel: {
    fontSize: '1rem',
    color: theme.palette.text.secondary,
  },
}));

const Dashboard = () => {
  const classes = useStyles();
  const [stats, setStats] = useState({
    products: 0,
    customers: 0,
    orders: 0,
    suppliers: 0,
  });
  const [recentOrders, setRecentOrders] = useState([]);
  const [lowStockProducts, setLowStockProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // In a real application, these would be actual API calls
        // For now, we'll simulate the data
        
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock data
        setStats({
          products: 156,
          customers: 87,
          orders: 42,
          suppliers: 15,
        });
        
        setRecentOrders([
          { id: 1, customer: 'Acme Corp', date: '2025-03-28', total: 1250.99, status: 'Shipped' },
          { id: 2, customer: 'XYZ Industries', date: '2025-03-27', total: 876.50, status: 'Processing' },
          { id: 3, customer: 'Global Enterprises', date: '2025-03-26', total: 2340.75, status: 'Delivered' },
          { id: 4, customer: 'Local Business', date: '2025-03-25', total: 450.25, status: 'Pending' },
        ]);
        
        setLowStockProducts([
          { id: 1, name: 'Widget A', stock: 5, reorderLevel: 10 },
          { id: 2, name: 'Gadget B', stock: 3, reorderLevel: 15 },
          { id: 3, name: 'Component C', stock: 8, reorderLevel: 20 },
        ]);
        
        setLoading(false);
      } catch (err) {
        setError('Failed to load dashboard data');
        setLoading(false);
      }
    };
    
    fetchDashboardData();
  }, []);

  if (loading) {
    return <Typography>Loading dashboard data...</Typography>;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  return (
    <div className={classes.root}>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
      
      {/* Stats Cards */}
      <Grid container spacing={3} style={{ marginBottom: '24px' }}>
        <Grid item xs={12} sm={6} md={3}>
          <Paper className={classes.paper}>
            <div className={classes.statValue}>{stats.products}</div>
            <div className={classes.statLabel}>Total Products</div>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper className={classes.paper}>
            <div className={classes.statValue}>{stats.customers}</div>
            <div className={classes.statLabel}>Total Customers</div>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper className={classes.paper}>
            <div className={classes.statValue}>{stats.orders}</div>
            <div className={classes.statLabel}>Orders This Month</div>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper className={classes.paper}>
            <div className={classes.statValue}>{stats.suppliers}</div>
            <div className={classes.statLabel}>Active Suppliers</div>
          </Paper>
        </Grid>
      </Grid>
      
      {/* Recent Orders and Low Stock */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card className={classes.card}>
            <CardHeader
              title="Recent Orders"
              className={classes.cardHeader}
            />
            <CardContent className={classes.cardContent}>
              <List>
                {recentOrders.map((order, index) => (
                  <React.Fragment key={order.id}>
                    {index > 0 && <Divider />}
                    <ListItem>
                      <ListItemText
                        primary={`Order #${order.id} - ${order.customer}`}
                        secondary={`${order.date} | $${order.total.toFixed(2)} | ${order.status}`}
                      />
                    </ListItem>
                  </React.Fragment>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card className={classes.card}>
            <CardHeader
              title="Low Stock Products"
              className={classes.cardHeader}
            />
            <CardContent className={classes.cardContent}>
              <List>
                {lowStockProducts.map((product, index) => (
                  <React.Fragment key={product.id}>
                    {index > 0 && <Divider />}
                    <ListItem>
                      <ListItemText
                        primary={product.name}
                        secondary={`Stock: ${product.stock} | Reorder Level: ${product.reorderLevel}`}
                      />
                    </ListItem>
                  </React.Fragment>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default Dashboard;