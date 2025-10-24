const router = require('express').Router();
const auth = require('../middleware/auth');
const ctrl = require('../controllers/checkoutController');

// user must be logged in to pay
router.post('/create-payment-intent', auth, ctrl.createPaymentIntent);

module.exports = router;
