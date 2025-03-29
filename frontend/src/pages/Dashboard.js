import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Grid,
  Paper,
  Box,
  CircularProgress,
  Card,
  CardContent,
  CardActionArea,
  Divider,
} from '@mui/material';
import {
  TableChart as TableChartIcon,
  Storage as StorageIcon,
  ViewList as ViewListIcon,
} from '@mui/icons-material';
import axios from 'axios';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title } from 'chart.js';
import { Pie, Bar } from 'react-chartjs-2';

// Register ChartJS components
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title);

const Dashboard = () => {
  const navigate = useNavigate();
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const response = await axios.get('/api/summary');
        setSummary(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching database summary:', err);
        setError('Failed to load database summary');
        setLoading(false);
      }
    };

    fetchSummary();
  }, []);

  const getTopTables = () => {
    if (!summary || !summary.tables) return [];
    
    return [...summary.tables]
      .sort((a, b) => b.row_count - a.row_count)
      .slice(0, 5);
  };

  const getPieChartData = () => {
    const topTables = getTopTables();
    
    return {
      labels: topTables.map(table => table.table_name),
      datasets: [
        {
          data: topTables.map(table => table.row_count),
          backgroundColor: [
            'rgba(255, 99, 132, 0.6)',
            'rgba(54, 162, 235, 0.6)',
            'rgba(255, 206, 86, 0.6)',
            'rgba(75, 192, 192, 0.6)',
            'rgba(153, 102, 255, 0.6)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
          ],
          borderWidth: 1,
        },
      ],
    };
  };

  const getBarChartData = () => {
    const topTables = getTopTables();
    
    return {
      labels: topTables.map(table => table.table_name),
      datasets: [
        {
          label: 'Columns',
          data: topTables.map(table => table.column_count),
          backgroundColor: 'rgba(54, 162, 235, 0.6)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1,
        },
      ],
    };
  };

  if (loading) {
    return (
      <Container sx={{ mt: 4, mb: 4, textAlign: 'center' }}>
        <CircularProgress />
        <Typography variant="h6" sx={{ mt: 2 }}>
          Loading database summary...
        </Typography>
      </Container>
    );
  }

  if (error) {
    return (
      <Container sx={{ mt: 4, mb: 4 }}>
        <Paper sx={{ p: 3, textAlign: 'center' }}>
          <Typography variant="h6" color="error">
            {error}
          </Typography>
          <Typography variant="body1" sx={{ mt: 2 }}>
            Please check your database connection and try again.
          </Typography>
        </Paper>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        CPak Database Dashboard
      </Typography>
      
      <Grid container spacing={3}>
        {/* Summary Cards */}
        <Grid item xs={12} md={4}>
          <Paper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              height: 140,
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <TableChartIcon color="primary" sx={{ fontSize: 40, mr: 1 }} />
              <Typography component="h2" variant="h4">
                {summary?.totalTables || 0}
              </Typography>
            </Box>
            <Typography variant="h6" color="text.secondary">
              Tables
            </Typography>
          </Paper>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Paper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              height: 140,
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <StorageIcon color="primary" sx={{ fontSize: 40, mr: 1 }} />
              <Typography component="h2" variant="h4">
                {summary?.totalRows?.toLocaleString() || 0}
              </Typography>
            </Box>
            <Typography variant="h6" color="text.secondary">
              Total Records
            </Typography>
          </Paper>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Paper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              height: 140,
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <ViewListIcon color="primary" sx={{ fontSize: 40, mr: 1 }} />
              <Typography component="h2" variant="h4">
                {summary?.tables?.reduce((sum, table) => sum + table.column_count, 0) || 0}
              </Typography>
            </Box>
            <Typography variant="h6" color="text.secondary">
              Total Columns
            </Typography>
          </Paper>
        </Grid>

        {/* Charts */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Top Tables by Row Count
            </Typography>
            <Box sx={{ height: 300, display: 'flex', justifyContent: 'center' }}>
              <Pie data={getPieChartData()} options={{ maintainAspectRatio: false }} />
            </Box>
          </Paper>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Column Count by Table
            </Typography>
            <Box sx={{ height: 300 }}>
              <Bar 
                data={getBarChartData()} 
                options={{ 
                  maintainAspectRatio: false,
                  scales: {
                    y: {
                      beginAtZero: true,
                    },
                  },
                }} 
              />
            </Box>
          </Paper>
        </Grid>

        {/* Top Tables */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Largest Tables
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <Grid container spacing={2}>
              {getTopTables().map((table) => (
                <Grid item xs={12} sm={6} md={4} key={table.table_name}>
                  <Card>
                    <CardActionArea onClick={() => navigate(`/tables/${table.table_name}`)}>
                      <CardContent>
                        <Typography variant="h6" noWrap>
                          {table.table_name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {table.row_count.toLocaleString()} rows
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {table.column_count} columns
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;