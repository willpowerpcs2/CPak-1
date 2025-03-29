import React, { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';

function Dashboard() {
  const [tableStats, setTableStats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch tables from the API
    fetch('/api/tables')
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch tables');
        }
        return response.json();
      })
      .then(async (tables) => {
        // Get row counts for each table
        const statsPromises = tables.slice(0, 10).map(async (table) => {
          try {
            const response = await fetch(`/api/data/${table.table_name}?limit=1`);
            if (!response.ok) {
              throw new Error(`Failed to fetch data from ${table.table_name}`);
            }
            const data = await response.json();
            return {
              name: table.table_name,
              rowCount: data.total
            };
          } catch (err) {
            console.error(`Error fetching data for ${table.table_name}:`, err);
            return {
              name: table.table_name,
              rowCount: 'Error',
              error: err.message
            };
          }
        });

        const stats = await Promise.all(statsPromises);
        setTableStats(stats);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching tables:', err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        CPak Database Dashboard
      </Typography>
      <Typography variant="body1" paragraph>
        Welcome to the CPak Database Management System. This application allows you to view and manage data from your migrated PostgreSQL database.
      </Typography>

      <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
        Database Overview
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
        <Grid container spacing={3} sx={{ mt: 1 }}>
          {tableStats.map((table) => (
            <Grid item xs={12} sm={6} md={4} key={table.name}>
              <Card>
                <CardContent>
                  <Typography variant="h6" component="div">
                    {table.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {table.error ? (
                      <Alert severity="error" sx={{ mt: 1 }}>
                        {table.error}
                      </Alert>
                    ) : (
                      `Rows: ${table.rowCount}`
                    )}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button 
                    size="small" 
                    component={RouterLink} 
                    to={`/tables/${table.name}`}
                  >
                    View Data
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </div>
  );
}

export default Dashboard;