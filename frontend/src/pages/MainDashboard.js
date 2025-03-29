import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Box, 
  Button, 
  Typography, 
  Paper, 
  Grid,
  Container
} from '@mui/material';
import { styled } from '@mui/material/styles';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import EditIcon from '@mui/icons-material/Edit';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import LocalPrintshopIcon from '@mui/icons-material/LocalPrintshop';
import AssessmentIcon from '@mui/icons-material/Assessment';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import MapIcon from '@mui/icons-material/Map';
import ToggleOnIcon from '@mui/icons-material/ToggleOn';
import SummarizeIcon from '@mui/icons-material/Summarize';

const StyledButton = styled(Button)(({ theme }) => ({
  width: '100%',
  height: '100px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  textAlign: 'center',
  padding: theme.spacing(2),
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  '&:hover': {
    backgroundColor: theme.palette.primary.dark,
  },
}));

const ButtonIcon = styled(Box)(({ theme }) => ({
  fontSize: '2rem',
  marginBottom: theme.spacing(1),
}));

const MainDashboard = () => {
  const navigate = useNavigate();

  const menuItems = [
    { 
      title: 'Past Due Balances', 
      icon: <AccountBalanceIcon fontSize="large" />, 
      path: '/past-due-balances',
      description: 'View and manage past due customer accounts'
    },
    { 
      title: 'Customer Inquiries', 
      icon: <PersonSearchIcon fontSize="large" />, 
      path: '/customer-inquiries',
      description: 'Search and view customer information'
    },
    { 
      title: 'Edit Merchant Info', 
      icon: <EditIcon fontSize="large" />, 
      path: '/edit-merchant',
      description: 'Edit existing merchant information'
    },
    { 
      title: 'Enter New Merchant', 
      icon: <PersonAddIcon fontSize="large" />, 
      path: '/new-merchant',
      description: 'Add a new merchant to the system'
    },
    { 
      title: 'Accounts Form', 
      icon: <ReceiptLongIcon fontSize="large" />, 
      path: '/accounts-form',
      description: 'Manage customer accounts and payments'
    },
    { 
      title: 'Print Mailing Labels', 
      icon: <LocalPrintshopIcon fontSize="large" />, 
      path: '/print-labels',
      description: 'Generate and print mailing labels'
    },
    { 
      title: 'Print Past Due Reports', 
      icon: <AssessmentIcon fontSize="large" />, 
      path: '/past-due-reports',
      description: 'Generate reports for past due accounts'
    },
    { 
      title: 'Review Specified Date/Zone', 
      icon: <CalendarMonthIcon fontSize="large" />, 
      path: '/review-date-zone',
      description: 'Review accounts by date and zone'
    },
    { 
      title: 'Set Zone Pricing', 
      icon: <MapIcon fontSize="large" />, 
      path: '/zone-pricing',
      description: 'Configure pricing for different zones'
    },
    { 
      title: 'Set Status', 
      icon: <ToggleOnIcon fontSize="large" />, 
      path: '/set-status',
      description: 'Set customer account status'
    },
    { 
      title: 'YTD Totals', 
      icon: <SummarizeIcon fontSize="large" />, 
      path: '/ytd-totals',
      description: 'View year-to-date financial totals'
    }
  ];

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Paper sx={{ p: 4, borderRadius: 2 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center" sx={{ mb: 4 }}>
          CPak Management System
        </Typography>
        
        <Grid container spacing={3}>
          {menuItems.map((item, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <StyledButton 
                variant="contained" 
                onClick={() => navigate(item.path)}
              >
                <ButtonIcon>{item.icon}</ButtonIcon>
                <Typography variant="button">{item.title}</Typography>
              </StyledButton>
            </Grid>
          ))}
        </Grid>
      </Paper>
    </Container>
  );
};

export default MainDashboard;