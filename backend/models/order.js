const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [{
    food: { type: mongoose.Schema.Types.ObjectId, ref: 'Food', required: true },
    qty: { type: Number, required: true },
    price: { type: Number, required: true } // snapshot price
  }],
  amount: { type: Number, required: true }, // cents
  status: { type: String, default: 'pending', enum: ['pending', 'paid', 'canceled', 'delivered'] },
  paymentIntentId: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
