const express = require('express');
const Invoice = require('../models/Invoice');
const Order = require('../models/Order');
const auth = require('../middleware/auth');

const router = express.Router();

// Generate Invoice Number
function generateInvoiceNumber() {
  return 'INV-' + Date.now() + '-' + Math.random().toString(36).substr(2, 5);
}

// Create Invoice from Order
router.post('/create/:orderId', auth, async (req, res) => {
  try {
    const order = await Order.findById(req.params.orderId)
      .populate('customer')
      .populate('items.product');

    if (!order) {
      return res.status(404).json({ message: 'অর্ডার খুঁজে পাওয়া যায়নি' });
    }

    // Format invoice items
    const items = order.items.map(item => ({
      productName: item.product.name,
      sku: item.product.sku,
      quantity: item.quantity,
      unitPrice: item.price,
      total: item.subtotal
    }));

    const invoice = new Invoice({
      invoiceNumber: generateInvoiceNumber(),
      order: order._id,
      customer: {
        fullName: order.customer.fullName,
        email: order.customer.email,
        phone: order.customer.phone,
        address: `${order.shippingAddress.street}, ${order.shippingAddress.city}`
      },
      items,
      subtotal: order.totalAmount,
      tax: 0,
      shippingCost: 0,
      totalAmount: order.totalAmount
    });

    await invoice.save();

    res.status(201).json({
      message: '✅ ইনভয়েস তৈরি হয়েছে',
      invoice
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get Invoice by ID
router.get('/:invoiceId', async (req, res) => {
  try {
    const invoice = await Invoice.findById(req.params.invoiceId).populate('order');
    if (!invoice) {
      return res.status(404).json({ message: 'ইনভয়েস খুঁজে পাওয়া যায়নি' });
    }
    res.json(invoice);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get All Invoices
router.get('/all/list', async (req, res) => {
  try {
    const invoices = await Invoice.find().populate('order').sort({ issuedAt: -1 });
    res.json(invoices);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
