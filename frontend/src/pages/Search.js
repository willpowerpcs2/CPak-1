import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Container,
  Typography,
  Grid,
  Paper,
  TextField,
  InputAdornment,
  Button,
  CircularProgress,
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
} from '@mui/material';
import {
  Search as SearchIcon,
  ExpandMore as ExpandMoreIcon,
  Storage as StorageIcon,
} from '@mui/icons-material';
import axios from 'axios';

// Helper function to parse query parameters
const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const Search = () => {
  const navigate = useNavigate();
  const query = useQuery();
  const initialSearchQuery = query.get('q') || '';
  
  const [searchQuery, setSearchQuery] = useState(initialSearchQuery);
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [totalMatches, setTotalMatches] = useState(0);

  useEffect(() => {
    if (initialSearchQuery) {
      performSearch(initialSearchQuery);
    }
  }, [initialSearchQuery]);

  const performSearch = async (query) => {
    if (!query.trim()) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const response = await axios.get('/api/search', {
        params: { query }
      });
      
      setSearchResults(response.data.results || []);
      setTotalMatches(response.data.totalMatches || 0);
      setLoading(false);
      
      // Update URL with search query
      navigate(`/search?q=${encodeURIComponent(query)}`, { replace: true });
    } catch (err) {
      console.error('Error performing search:', err);
      setError('Failed to perform search. Please try again.');
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    performSearch(searchQuery);
  };

  const handleTableClick = (tableName) => {
    navigate(`/tables/${tableName}`);
  };

  // Highlight search terms in text
  const highlightText = (text, query) => {
    if (!query || !text) return text;
    
    const parts = String(text).split(new RegExp(`(${query})`, 'gi'));
    
    return parts.map((part, index) => 
      part.toLowerCase() === query.toLowerCase() ? 
        <span key={index} className="search-highlight">{part}</span> : 
        part
    );
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        Search Database
      </Typography>
      
      <Paper component="form" onSubmit={handleSearch} sx={{ p: 3, mb: 4 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={10}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Search across all tables..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} md={2}>
            <Button 
              fullWidth 
              variant="contained" 
              color="primary" 
              type="submit"
              disabled={loading || !searchQuery.trim()}
            >
              {loading ? <CircularProgress size={24} /> : 'Search'}
            </Button>
          </Grid>
        </Grid>
      </Paper>

      {error && (
        <Paper sx={{ p: 3, mb: 4, bgcolor: 'error.light' }}>
          <Typography color="error" variant="body1">
            {error}
          </Typography>
        </Paper>
      )}

      {searchResults.length > 0 && (
        <Box sx={{ mb: 2 }}>
          <Typography variant="h6" gutterBottom>
            Found {totalMatches} matches across {searchResults.length} tables
          </Typography>
          
          {searchResults.map((result) => (
            <Accordion key={result.tableName} sx={{ mb: 2 }}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <StorageIcon sx={{ mr: 1, color: 'primary.main' }} />
                  <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                    {result.tableName}
                  </Typography>
                  <Chip 
                    label={`${result.count} matches`} 
                    size="small" 
                    color="primary" 
                    sx={{ ml: 2 }} 
                  />
                  <Button 
                    size="small" 
                    variant="outlined" 
                    sx={{ ml: 2 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleTableClick(result.tableName);
                    }}
                  >
                    View Table
                  </Button>
                </Box>
              </AccordionSummary>
              <AccordionDetails>
                <div className="table-container">
                  <TableContainer>
                    <Table size="small">
                      <TableHead>
                        <TableRow>
                          {Object.keys(result.data[0] || {}).map((column) => (
                            <TableCell key={column}>{column}</TableCell>
                          ))}
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {result.data.map((row, rowIndex) => (
                          <TableRow key={rowIndex}>
                            {Object.entries(row).map(([column, value], colIndex) => (
                              <TableCell key={`${rowIndex}-${colIndex}`}>
                                {value !== null && value !== undefined
                                  ? highlightText(String(value), searchQuery)
                                  : 'NULL'}
                              </TableCell>
                            ))}
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </div>
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>
      )}

      {searchQuery && !loading && searchResults.length === 0 && (
        <Paper sx={{ p: 4, textAlign: 'center' }}>
          <Typography variant="h6">No results found</Typography>
          <Typography variant="body1" color="textSecondary">
            Try using different keywords or check your spelling
          </Typography>
        </Paper>
      )}
    </Container>
  );
};

export default Search;