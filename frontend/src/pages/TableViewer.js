import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import TableViewIcon from '@mui/icons-material/TableView';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Paper from '@mui/material/Paper';

function TableViewer({ tables, loading, error }) {
  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Database Tables
      </Typography>
      <Typography variant="body1" paragraph>
        View and manage all tables in your PostgreSQL database.
      </Typography>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Alert severity="error" sx={{ m: 2 }}>
          {error}
        </Alert>
      ) : (
        <Paper elevation={3} sx={{ mt: 3 }}>
          <List>
            {tables.map((table) => (
              <ListItem 
                key={table.table_name}
                component={RouterLink}
                to={`/tables/${table.table_name}`}
                sx={{ 
                  textDecoration: 'none', 
                  color: 'inherit',
                  '&:hover': {
                    backgroundColor: 'rgba(0, 0, 0, 0.04)',
                  }
                }}
              >
                <ListItemIcon>
                  <TableViewIcon />
                </ListItemIcon>
                <ListItemText 
                  primary={table.table_name} 
                />
              </ListItem>
            ))}
          </List>
        </Paper>
      )}
    </div>
  );
}

export default TableViewer;