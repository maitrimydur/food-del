const Food = require('../models/Food');

// List all foods
exports.list = async (_req, res) => {
  const foods = await Food.find().sort({ createdAt: -1 });
  res.json(foods);
};

// Seed a few (dev helper)
exports.seed = async (_req, res) => {
  const sample = [
    { name: 'Cheese Burger', desc: 'Juicy beef + cheese', price: 899, image: '/images/burger.png' },
    { name: 'Margherita Pizza', desc: 'Tomato & mozzarella', price: 1299, image: '/images/pizza.png' },
    { name: 'Pasta Alfredo', desc: 'Creamy sauce', price: 1099, image: '/images/pasta.png' }
  ];
  await Food.deleteMany({});
  const out = await Food.insertMany(sample);
  res.json(out);
};
