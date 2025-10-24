const User = require('../models/User');
const Food = require('../models/Food');
const Order = require('../models/Order');

exports.create = async (req, res) => {
  const { items } = req.body; // [{foodId, qty}]
  if (!Array.isArray(items) || items.length === 0) return res.status(400).json({ message: 'No items' });

  const foods = await Food.find({ _id: { $in: items.map(i => i.foodId) } });
  const itemsDetailed = items.map(i => {
    const f = foods.find(x => String(x._id) === i.foodId);
    if (!f) throw new Error('Food not found');
    return { food: f._id, qty: i.qty, price: f.price };
  });

  const amount = itemsDetailed.reduce((sum, i) => sum + i.price * i.qty, 0);

  const order = await Order.create({
    user: req.userId,
    items: itemsDetailed,
    amount
  });

  res.json({ orderId: order._id, amount });
};

exports.mine = async (req, res) => {
  const orders = await Order.find({ user: req.userId }).sort({ createdAt: -1 }).populate('items.food', 'name image');
  res.json(orders);
};
