require('dotenv').config();

const path = require('path');
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const connectDB = require('./src/config/db');
const userRouter = require('./src/routes/userRoute');
const foodRouter = require('./src/routes/foodRoute');
const orderRouter = require('./src/routes/orderRoute');
const checkoutRouter = require('./src/routes/checkoutRoute');

const app = express();

app.use(express.json());
app.use(cookieParser());

// CORS: allow frontend + admin with credentials
const allowed = [process.env.FRONTEND_URL, process.env.ADMIN_URL].filter(Boolean);
app.use(cors({
  origin: function (origin, cb) {
    // allow REST clients (no origin) and the two UIs
    if (!origin || allowed.includes(origin)) return cb(null, true);
    return cb(new Error('Not allowed by CORS'));
  },
  credentials: true
}));

// Static images (e.g., /images/burger.png)
app.use('/images', express.static(path.join(process.cwd(), 'server', 'images')));

// API routes
app.use('/api/user', userRouter);
app.use('/api/food', foodRouter);
app.use('/api/order', orderRouter);
app.use('/api/checkout', checkoutRouter);

// Health check
app.get('/api/health', (_req, res) => res.json({ ok: true }));

const PORT = process.env.PORT || 4000;

// Start after DB connects
connectDB().then(() => {
  app.listen(PORT, () => console.log(`API running on http://localhost:${PORT}`));
}).catch(err => {
  console.error('DB connection failed:', err);
  process.exit(1);
});
