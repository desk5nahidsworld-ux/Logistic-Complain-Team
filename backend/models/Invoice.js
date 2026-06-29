const mongoose = require('mongoose');

const invoiceSchema = new mongoose.Schema({
  invoiceNumber: {
    type: String,
    required: true,
    unique: true
  },
  order: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order',
    required: true
  },
  customer: {
    fullName: String,
    email: String,
    phone: String,
    address: String
  },
  items: [{
    productName: String,
    sku: String,
    quantity: Number,
    unitPrice: Number,
    total: Number
  }],
  subtotal: Number,
  tax: Number,
  shippingCost: Number,
  totalAmount: Number,
  paymentStatus: {
    type: String,
    enum: ['pending', 'paid', 'failed'],
    default: 'pending'
  },
  issuedAt: {
    type: Date,
    default: Date.now
  },
  dueDate: Date,
  notes: String
});

module.exports = mongoose.model('Invoice', invoiceSchema);
