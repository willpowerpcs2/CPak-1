import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import TableChartIcon from '@mui/icons-material/TableChart';
import SearchIcon from '@mui/icons-material/Search';
import StorageIcon from '@mui/icons-material/Storage';
import PaymentIcon from '@mui/icons-material/Payment';
import MapIcon from '@mui/icons-material/Map';
import HomeIcon from '@mui/icons-material/Home';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import EditIcon from '@mui/icons-material/Edit';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import LocalPrintshopIcon from '@mui/icons-material/LocalPrintshop';
import AssessmentIcon from '@mui/icons-material/Assessment';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ToggleOnIcon from '@mui/icons-material/ToggleOn';
import SummarizeIcon from '@mui/icons-material/Summarize';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const StyledDrawer = styled(Drawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

const Sidebar = ({ open, toggleDrawer }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [tables, setTables] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTables = async () => {
      try {
        const response = await axios.get('/api/tables');
        setTables(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching tables:', err);
        setError('Failed to load tables');
        setLoading(false);
      }
    };

    fetchTables();
  }, []);

  const handleNavigation = (path) => {
    navigate(path);
  };

  const mainMenuItems = [
    { title: 'Main Menu', icon: <HomeIcon />, path: '/' },
    { title: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard' },
    { title: 'Past Due Balances', icon: <AccountBalanceIcon />, path: '/past-due-balances' },
    { title: 'Customer Inquiries', icon: <PersonSearchIcon />, path: '/customer-inquiries' },
    { title: 'Edit Merchant Info', icon: <EditIcon />, path: '/edit-merchant' },
    { title: 'Enter New Merchant', icon: <PersonAddIcon />, path: '/new-merchant' },
    { title: 'Accounts Form', icon: <ReceiptLongIcon />, path: '/accounts-form' },
    { title: 'Print Mailing Labels', icon: <LocalPrintshopIcon />, path: '/print-labels' },
    { title: 'Print Past Due Reports', icon: <AssessmentIcon />, path: '/past-due-reports' },
    { title: 'Review Date/Zone', icon: <CalendarMonthIcon />, path: '/review-date-zone' },
    { title: 'Set Zone Pricing', icon: <MapIcon />, path: '/zone-pricing' },
    { title: 'Set Status', icon: <ToggleOnIcon />, path: '/set-status' },
    { title: 'YTD Totals', icon: <SummarizeIcon />, path: '/ytd-totals' },
  ];

  const dataMenuItems = [
    { title: 'All Tables', icon: <TableChartIcon />, path: '/tables' },
    { title: 'Search', icon: <SearchIcon />, path: '/search' },
    { title: 'Payment Manager', icon: <PaymentIcon />, path: '/payments' },
    { title: 'Zone Manager', icon: <MapIcon />, path: '/zones' },
  ];

  return (
    <StyledDrawer variant="permanent" open={open}>
      <DrawerHeader />
      <Divider />
      <List>
        {mainMenuItems.map((item, index) => (
          <ListItem key={index} disablePadding sx={{ display: 'block' }}>
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? 'initial' : 'center',
                px: 2.5,
                backgroundColor: location.pathname === item.path ? 'rgba(0, 0, 0, 0.08)' : 'transparent',
              }}
              onClick={() => handleNavigation(item.path)}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : 'auto',
                  justifyContent: 'center',
                }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.title} sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {dataMenuItems.map((item, index) => (
          <ListItem key={index} disablePadding sx={{ display: 'block' }}>
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? 'initial' : 'center',
                px: 2.5,
                backgroundColor: location.pathname === item.path ? 'rgba(0, 0, 0, 0.08)' : 'transparent',
              }}
              onClick={() => handleNavigation(item.path)}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : 'auto',
                  justifyContent: 'center',
                }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.title} sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      {open && <List sx={{ maxHeight: 'calc(100vh - 200px)', overflow: 'auto' }}>
        {loading ? (
          <ListItem>
            <ListItemText primary="Loading tables..." />
          </ListItem>
        ) : error ? (
          <ListItem>
            <ListItemText primary={error} />
          </ListItem>
        ) : (
          tables.map((table) => (
            <ListItem key={table} disablePadding>
              <ListItemButton
                sx={{
                  backgroundColor: location.pathname === `/tables/${table}` ? 'rgba(0, 0, 0, 0.08)' : 'transparent',
                }}
                onClick={() => handleNavigation(`/tables/${table}`)}
              >
                <ListItemIcon>
                  <StorageIcon />
                </ListItemIcon>
                <ListItemText primary={table} />
              </ListItemButton>
            </ListItem>
          ))
        )}
      </List>}
    </StyledDrawer>
  );
};

export default Sidebar;