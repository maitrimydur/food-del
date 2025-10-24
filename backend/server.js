// backend/server.js
require('dotenv').config();

const path = require('path');
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const connectDB = require('./config/db');
const userRouter = require('./routes/userRoute');
const foodRouter = require('./routes/foodRoute');
const orderRouter = require('./routes/orderRoute');
const checkoutRouter = require('./routes/checkoutRoute');

const app = express();

app.use(express.json());
app.use(cookieParser());

// CORS for frontend + admin
const allowed = [process.env.FRONTEND_URL, process.env.ADMIN_URL].filter(Boolean);
app.use(cors({
  origin: (origin, cb) => (!origin || allowed.includes(origin)) ? cb(null, true) : cb(new Error('Not allowed by CORS')),
  credentials: true
}));

// serve images from backend/uploads
app.use('/images', express.static(path.join(__dirname, 'uploads')));

// routes
app.use('/api/user', userRouter);
app.use('/api/food', foodRouter);
app.use('/api/order', orderRouter);
app.use('/api/checkout', checkoutRouter);

// health
app.get('/api/health', (_req, res) => res.json({ ok: true }));

const PORT = process.env.PORT || 4000;

connectDB().then(() => {
  app.listen(PORT, () => console.log(`API running on http://localhost:${PORT}`));
}).catch(err => {
  console.error('DB connection failed:', err);
  process.exit(1);
});
