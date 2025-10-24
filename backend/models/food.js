const mongoose = require('mongoose');

const foodSchema = new mongoose.Schema({
  name: { type: String, required: true },
  desc: { type: String, default: '' },
  price: { type: Number, required: true },
  image: { type: String, required: true } // e.g. /images/burger.png
}, { timestamps: true });

module.exports = mongoose.model('Food', foodSchema);
