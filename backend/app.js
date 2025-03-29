const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
const dotenv = require('dotenv');
const helmet = require('helmet');
const morgan = require('morgan');
const path = require('path');

// Load environment variables
dotenv.config();

// Create Express app
const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(helmet());
app.use(morgan('dev'));

// Database connection
console.log('Database connection details:');
console.log('User:', process.env.DB_USER);
console.log('Host:', process.env.DB_HOST);
console.log('Database:', process.env.DB_NAME);
console.log('Password:', process.env.DB_PASSWORD ? '******' : 'not set');
console.log('Port:', process.env.DB_PORT);

// Remove quotes if they exist in the password
let dbPassword = process.env.DB_PASSWORD || 'postgres';
if (dbPassword.startsWith('"') && dbPassword.endsWith('"')) {
  dbPassword = dbPassword.slice(1, -1);
}

const pool = new Pool({
  user: process.env.DB_USER || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'cpak',
  password: dbPassword,
  port: process.env.DB_PORT || 5432,
});

// Test database connection
pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('Database connection error:', err.stack);
  } else {
    console.log('Database connected successfully at:', res.rows[0].now);
  }
});

// API Routes

// Get all table names
app.get('/api/tables', async (req, res) => {
  try {
    const query = `
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      ORDER BY table_name;
    `;
    const result = await pool.query(query);
    res.json(result.rows.map(row => row.table_name));
  } catch (error) {
    console.error('Error fetching tables:', error);
    res.status(500).json({ error: 'Failed to fetch tables' });
  }
});

// Get table structure
app.get('/api/tables/:tableName/structure', async (req, res) => {
  try {
    const { tableName } = req.params;
    
    // Validate table name to prevent SQL injection
    const tableNameRegex = /^[a-zA-Z0-9_]+$/;
    if (!tableNameRegex.test(tableName)) {
      return res.status(400).json({ error: 'Invalid table name' });
    }
    
    const query = `
      SELECT column_name, data_type, character_maximum_length, is_nullable
      FROM information_schema.columns
      WHERE table_schema = 'public' AND table_name = $1
      ORDER BY ordinal_position;
    `;
    
    const result = await pool.query(query, [tableName]);
    res.json(result.rows);
  } catch (error) {
    console.error(`Error fetching structure for table ${req.params.tableName}:`, error);
    res.status(500).json({ error: 'Failed to fetch table structure' });
  }
});

// Get table data with pagination
app.get('/api/tables/:tableName/data', async (req, res) => {
  try {
    const { tableName } = req.params;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 50;
    const offset = (page - 1) * limit;
    
    // Validate table name to prevent SQL injection
    const tableNameRegex = /^[a-zA-Z0-9_]+$/;
    if (!tableNameRegex.test(tableName)) {
      return res.status(400).json({ error: 'Invalid table name' });
    }
    
    // Get total count
    const countQuery = `SELECT COUNT(*) FROM "${tableName}"`;
    const countResult = await pool.query(countQuery);
    const totalCount = parseInt(countResult.rows[0].count);
    
    // Get data with pagination
    const dataQuery = `SELECT * FROM "${tableName}" LIMIT $1 OFFSET $2`;
    const dataResult = await pool.query(dataQuery, [limit, offset]);
    
    res.json({
      data: dataResult.rows,
      pagination: {
        total: totalCount,
        page,
        limit,
        pages: Math.ceil(totalCount / limit)
      }
    });
  } catch (error) {
    console.error(`Error fetching data for table ${req.params.tableName}:`, error);
    res.status(500).json({ error: 'Failed to fetch table data' });
  }
});

// Get table statistics
app.get('/api/tables/:tableName/stats', async (req, res) => {
  try {
    const { tableName } = req.params;
    
    // Validate table name to prevent SQL injection
    const tableNameRegex = /^[a-zA-Z0-9_]+$/;
    if (!tableNameRegex.test(tableName)) {
      return res.status(400).json({ error: 'Invalid table name' });
    }
    
    // Get row count
    const countQuery = `SELECT COUNT(*) FROM "${tableName}"`;
    const countResult = await pool.query(countQuery);
    const rowCount = parseInt(countResult.rows[0].count);
    
    // Get column count
    const columnQuery = `
      SELECT COUNT(*) 
      FROM information_schema.columns 
      WHERE table_schema = 'public' AND table_name = $1
    `;
    const columnResult = await pool.query(columnQuery, [tableName]);
    const columnCount = parseInt(columnResult.rows[0].count);
    
    res.json({
      tableName,
      rowCount,
      columnCount
    });
  } catch (error) {
    console.error(`Error fetching stats for table ${req.params.tableName}:`, error);
    res.status(500).json({ error: 'Failed to fetch table statistics' });
  }
});

// Get database summary
app.get('/api/summary', async (req, res) => {
  try {
    // Get all tables with row counts
    const query = `
      SELECT 
        table_name,
        (SELECT COUNT(*) FROM information_schema.columns WHERE table_schema = 'public' AND information_schema.columns.table_name = t.table_name) as column_count,
        (SELECT reltuples::bigint FROM pg_class WHERE relname = t.table_name) as row_count
      FROM information_schema.tables t
      WHERE table_schema = 'public'
      ORDER BY table_name;
    `;
    
    const result = await pool.query(query);
    
    // Get total row count across all tables
    const totalRowsQuery = `
      SELECT SUM(reltuples::bigint) as total_rows
      FROM pg_class
      WHERE relkind = 'r' AND relnamespace = (SELECT oid FROM pg_namespace WHERE nspname = 'public');
    `;
    
    const totalRowsResult = await pool.query(totalRowsQuery);
    const totalRows = parseInt(totalRowsResult.rows[0].total_rows || 0);
    
    res.json({
      tables: result.rows,
      totalTables: result.rows.length,
      totalRows
    });
  } catch (error) {
    console.error('Error fetching database summary:', error);
    res.status(500).json({ error: 'Failed to fetch database summary' });
  }
});

// Search across tables
app.get('/api/search', async (req, res) => {
  try {
    const { query, tables } = req.query;
    
    if (!query) {
      return res.status(400).json({ error: 'Search query is required' });
    }
    
    let tableList = [];
    if (tables) {
      tableList = tables.split(',');
      // Validate table names
      const tableNameRegex = /^[a-zA-Z0-9_]+$/;
      for (const table of tableList) {
        if (!tableNameRegex.test(table)) {
          return res.status(400).json({ error: `Invalid table name: ${table}` });
        }
      }
    } else {
      // Get all tables if not specified
      const tablesQuery = `
        SELECT table_name 
        FROM information_schema.tables 
        WHERE table_schema = 'public'
      `;
      const tablesResult = await pool.query(tablesQuery);
      tableList = tablesResult.rows.map(row => row.table_name);
    }
    
    const results = [];
    
    // Search each table
    for (const tableName of tableList) {
      // Get columns for this table
      const columnsQuery = `
        SELECT column_name, data_type
        FROM information_schema.columns
        WHERE table_schema = 'public' AND table_name = $1
      `;
      
      const columnsResult = await pool.query(columnsQuery, [tableName]);
      const columns = columnsResult.rows;
      
      // Build search conditions for text/varchar columns
      const textColumns = columns
        .filter(col => ['character varying', 'text', 'varchar'].includes(col.data_type.toLowerCase()))
        .map(col => col.column_name);
      
      if (textColumns.length > 0) {
        const conditions = textColumns
          .map(col => `"${col}"::text ILIKE $1`)
          .join(' OR ');
        
        const searchQuery = `
          SELECT * FROM "${tableName}"
          WHERE ${conditions}
          LIMIT 100
        `;
        
        const searchResult = await pool.query(searchQuery, [`%${query}%`]);
        
        if (searchResult.rows.length > 0) {
          results.push({
            tableName,
            count: searchResult.rows.length,
            data: searchResult.rows
          });
        }
      }
    }
    
    res.json({
      query,
      results,
      totalMatches: results.reduce((sum, table) => sum + table.count, 0)
    });
  } catch (error) {
    console.error('Error performing search:', error);
    res.status(500).json({ error: 'Failed to perform search' });
  }
});

// Serve static files in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/build')));
  
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
  });
}

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

module.exports = app;