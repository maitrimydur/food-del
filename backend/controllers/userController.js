const jwt = require('jsonwebtoken');
const User = require('../models/User');

function sign(id) {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });
}

exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) return res.status(400).json({ message: 'Missing fields' });
    const exists = await User.findOne({ email });
    if (exists) return res.status(409).json({ message: 'Email already registered' });
    const user = await User.create({ name, email, password });
    const token = sign(user._id);
    res.cookie('token', token, { httpOnly: true, sameSite: 'lax' });
    res.json({ id: user._id, name: user.name, email: user.email });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    const token = sign(user._id);
    res.cookie('token', token, { httpOnly: true, sameSite: 'lax' });
    res.json({ id: user._id, name: user.name, email: user.email });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

exports.me = async (req, res) => {
  const user = await User.findById(req.userId).select('name email');
  res.json(user);
};

exports.logout = (req, res) => {
  res.clearCookie('token');
  res.json({ ok: true });
};
