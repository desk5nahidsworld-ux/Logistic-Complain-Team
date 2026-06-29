const express = require('express');
const Order = require('../models/Order');
const Product = require('../models/Product');
const auth = require('../middleware/auth');

const router = express.Router();

// Generate Order Number
function generateOrderNumber() {
  return 'ORD-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9);
}

// Create Order
router.post('/create', auth, async (req, res) => {
  try {
    const { items, shippingAddress } = req.body;

    let totalAmount = 0;
    const orderItems = [];

    // Calculate total and validate items
    for (const item of items) {
      const product = await Product.findById(item.productId);
      if (!product) {
        return res.status(404).json({ message: `প্রোডাক্ট খুঁজে পাওয়া যায়নি: ${item.productId}` });
      }

      const subtotal = product.price * item.quantity;
      totalAmount += subtotal;

      orderItems.push({
        product: product._id,
        quantity: item.quantity,
        price: product.price,
        subtotal
      });
    }

    const order = new Order({
      orderNumber: generateOrderNumber(),
      customer: req.user.id,
      items: orderItems,
      totalAmount,
      shippingAddress,
      statusHistory: [{
        status: 'pending',
        changedAt: new Date(),
        notes: 'অর্ডার তৈরি হয়েছে'
      }]
    });

    await order.save();
    await order.populate('customer');
    await order.populate('items.product');

    res.status(201).json({
      message: '✅ অর্ডার তৈরি হয়েছে',
      order
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get All Orders
router.get('/all', auth, async (req, res) => {
  try {
    const orders = await Order.find()
      .populate('customer', 'fullName email phone')
      .populate('items.product', 'name sku price');
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update Order Status
router.put('/:orderId/status', auth, async (req, res) => {
  try {
    const { status, notes } = req.body;
    const validStatuses = ['pending', 'processing', 'shipped', 'delivered', 'cancelled'];

    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: 'অবৈধ স্ট্যাটাস' });
    }

    const order = await Order.findById(req.params.orderId);
    if (!order) {
      return res.status(404).json({ message: 'অর্ডার খুঁজে পাওয়া যায়নি' });
    }

    order.status = status;
    order.statusHistory.push({
      status,
      changedAt: new Date(),
      notes: notes || ''
    });
    order.updatedAt = new Date();

    await order.save();

    res.json({
      message: '✅ স্ট্যাটাস আপডেট হয়েছে',
      order
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get Order by ID
router.get('/:orderId', async (req, res) => {
  try {
    const order = await Order.findById(req.params.orderId)
      .populate('customer')
      .populate('items.product');

    if (!order) {
      return res.status(404).json({ message: 'অর্ডার খুঁজে পাওয়া যায়নি' });
    }

    res.json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
