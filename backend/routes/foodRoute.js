const router = require('express').Router();
const ctrl = require('../controllers/foodController');

router.get('/', ctrl.list);
router.post('/seed', ctrl.seed); // optional dev endpoint

module.exports = router;
