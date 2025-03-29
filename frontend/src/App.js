import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';

// Components
import AppHeader from './components/AppHeader';
import Sidebar from './components/Sidebar';

// Pages
import Dashboard from './pages/Dashboard';
import MainDashboard from './pages/MainDashboard';
import TableBrowser from './pages/TableBrowser';
import TableDetail from './pages/TableDetail';
import Search from './pages/Search';
import NotFound from './pages/NotFound';
import PaymentManager from './pages/PaymentManager';
import ZoneManager from './pages/ZoneManager';
import PastDueBalances from './pages/PastDueBalances';
import CustomerInquiries from './pages/CustomerInquiries';
import NewMerchant from './pages/NewMerchant';
import EditMerchant from './pages/EditMerchant';

// Create theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
    background: {
      default: '#f5f5f5',
    },
  },
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
    ].join(','),
  },
});

function App() {
  const [open, setOpen] = React.useState(true);
  
  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Box sx={{ display: 'flex' }}>
          <AppHeader open={open} toggleDrawer={toggleDrawer} />
          <Sidebar open={open} toggleDrawer={toggleDrawer} />
          <Box
            component="main"
            sx={{
              backgroundColor: (theme) => theme.palette.background.default,
              flexGrow: 1,
              height: '100vh',
              overflow: 'auto',
              pt: 8, // Padding top to account for AppBar
              px: 3,
              pb: 3,
            }}
          >
            <Routes>
              <Route path="/" element={<MainDashboard />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/tables" element={<TableBrowser />} />
              <Route path="/tables/:tableName" element={<TableDetail />} />
              <Route path="/search" element={<Search />} />
              <Route path="/payments" element={<PaymentManager />} />
              <Route path="/zones" element={<ZoneManager />} />
              
              {/* CPak routes */}
              <Route path="/past-due-balances" element={<PastDueBalances />} />
              <Route path="/customer-inquiries" element={<CustomerInquiries />} />
              <Route path="/edit-merchant/:id" element={<EditMerchant />} />
              <Route path="/new-merchant" element={<NewMerchant />} />
              <Route path="/accounts-form" element={<NotFound />} />
              <Route path="/print-labels" element={<NotFound />} />
              <Route path="/past-due-reports" element={<NotFound />} />
              <Route path="/review-date-zone" element={<NotFound />} />
              <Route path="/zone-pricing" element={<NotFound />} />
              <Route path="/set-status" element={<NotFound />} />
              <Route path="/ytd-totals" element={<NotFound />} />
              
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Box>
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;