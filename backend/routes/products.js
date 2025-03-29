/**
 * Products API Routes
 * 
 * This file contains the routes for the products API.
 */

const express = require('express');
const router = express.Router();
const { Pool } = require('pg');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Database connection
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT || 5432,
});

/**
 * @route   GET /api/products
 * @desc    Get all products
 * @access  Public
 */
router.get('/', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM products ORDER BY product_name');
    res.json(rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Server error' });
  }
});

/**
 * @route   GET /api/products/:id
 * @desc    Get product by ID
 * @access  Public
 */
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { rows } = await pool.query('SELECT * FROM products WHERE product_id = $1', [id]);
    
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Product not found' });
    }
    
    res.json(rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Server error' });
  }
});

/**
 * @route   POST /api/products
 * @desc    Create a new product
 * @access  Private
 */
router.post('/', async (req, res) => {
  try {
    const {
      product_code,
      product_name,
      description,
      category,
      price,
      cost,
      stock_quantity,
      reorder_level,
      supplier_id
    } = req.body;
    
    // Validate required fields
    if (!product_code || !product_name || !price) {
      return res.status(400).json({ error: 'Product code, name, and price are required' });
    }
    
    // Check if product code already exists
    const existingProduct = await pool.query('SELECT * FROM products WHERE product_code = $1', [product_code]);
    if (existingProduct.rows.length > 0) {
      return res.status(400).json({ error: 'Product code already exists' });
    }
    
    // Insert new product
    const query = `
      INSERT INTO products (
        product_code, product_name, description, category, price, cost,
        stock_quantity, reorder_level, supplier_id
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      RETURNING *
    `;
    
    const values = [
      product_code,
      product_name,
      description || null,
      category || null,
      price,
      cost || null,
      stock_quantity || 0,
      reorder_level || null,
      supplier_id || null
    ];
    
    const { rows } = await pool.query(query, values);
    res.status(201).json(rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Server error' });
  }
});

/**
 * @route   PUT /api/products/:id
 * @desc    Update a product
 * @access  Private
 */
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const {
      product_code,
      product_name,
      description,
      category,
      price,
      cost,
      stock_quantity,
      reorder_level,
      supplier_id
    } = req.body;
    
    // Validate required fields
    if (!product_code || !product_name || !price) {
      return res.status(400).json({ error: 'Product code, name, and price are required' });
    }
    
    // Check if product exists
    const productCheck = await pool.query('SELECT * FROM products WHERE product_id = $1', [id]);
    if (productCheck.rows.length === 0) {
      return res.status(404).json({ error: 'Product not found' });
    }
    
    // Check if product code already exists for another product
    const existingProduct = await pool.query(
      'SELECT * FROM products WHERE product_code = $1 AND product_id != $2',
      [product_code, id]
    );
    if (existingProduct.rows.length > 0) {
      return res.status(400).json({ error: 'Product code already exists for another product' });
    }
    
    // Update product
    const query = `
      UPDATE products
      SET product_code = $1,
          product_name = $2,
          description = $3,
          category = $4,
          price = $5,
          cost = $6,
          stock_quantity = $7,
          reorder_level = $8,
          supplier_id = $9,
          updated_at = CURRENT_TIMESTAMP
      WHERE product_id = $10
      RETURNING *
    `;
    
    const values = [
      product_code,
      product_name,
      description || null,
      category || null,
      price,
      cost || null,
      stock_quantity || 0,
      reorder_level || null,
      supplier_id || null,
      id
    ];
    
    const { rows } = await pool.query(query, values);
    res.json(rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Server error' });
  }
});

/**
 * @route   DELETE /api/products/:id
 * @desc    Delete a product
 * @access  Private
 */
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    // Check if product exists
    const productCheck = await pool.query('SELECT * FROM products WHERE product_id = $1', [id]);
    if (productCheck.rows.length === 0) {
      return res.status(404).json({ error: 'Product not found' });
    }
    
    // Check if product is referenced in order_details
    const orderDetailsCheck = await pool.query(
      'SELECT * FROM order_details WHERE product_id = $1 LIMIT 1',
      [id]
    );
    if (orderDetailsCheck.rows.length > 0) {
      return res.status(400).json({ error: 'Cannot delete product that is referenced in orders' });
    }
    
    // Delete product
    await pool.query('DELETE FROM products WHERE product_id = $1', [id]);
    res.json({ message: 'Product deleted successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;