const router = require('express').Router();
const auth = require('../middleware/auth');
const ctrl = require('../controllers/orderController');

router.post('/', auth, ctrl.create);
router.get('/mine', auth, ctrl.mine);

module.exports = router;
