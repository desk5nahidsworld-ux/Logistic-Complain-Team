const express = require('express');
const multer = require('multer');
const path = require('path');
const Product = require('../models/Product');
const auth = require('../middleware/auth');

const router = express.Router();

// Multer Configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/products');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

// Create Product
router.post('/create', auth, upload.array('images', 5), async (req, res) => {
  try {
    const { name, sku, description, price, quantity, category } = req.body;

    // Check if SKU exists
    const existingProduct = await Product.findOne({ sku });
    if (existingProduct) {
      return res.status(400).json({ message: 'এই SKU ইতিমধ্যে আছে' });
    }

    // Process images
    const images = req.files.map(file => ({
      filename: file.filename,
      url: `/uploads/products/${file.filename}`,
      uploadedAt: new Date()
    }));

    const product = new Product({
      name,
      sku,
      description,
      price,
      quantity,
      category,
      images,
      createdBy: req.user.id
    });

    await product.save();
    res.status(201).json({ message: '✅ প্রোডাক্ট তৈরি হয়েছে', product });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get All Products
router.get('/all', async (req, res) => {
  try {
    const products = await Product.find().populate('createdBy', 'fullName');
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get Product by ID
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate('createdBy');
    if (!product) {
      return res.status(404).json({ message: 'প্রোডাক্ট খুঁজে পাওয়া যায়নি' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
