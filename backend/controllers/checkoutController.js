const Stripe = require('stripe');
const Order = require('../models/Order');

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

exports.createPaymentIntent = async (req, res) => {
  const { orderId } = req.body;
  if (!orderId) return res.status(400).json({ message: 'orderId required' });
  const order = await Order.findById(orderId);
  if (!order) return res.status(404).json({ message: 'Order not found' });

  const pi = await stripe.paymentIntents.create({
    amount: order.amount, // in cents
    currency: 'usd',
    metadata: { orderId: order._id.toString(), userId: req.userId || '' },
    automatic_payment_methods: { enabled: true }
  });

  order.paymentIntentId = pi.id;
  await order.save();

  res.json({ clientSecret: pi.client_secret });
};
