const express = require('express');
const { protect, authorize } = require('../middleware/authMiddleware');
const { 
    getOrders, 
    getOrder, 
    createOrder, 
    updateOrder, 
    deleteOrder 
} = require('../controllers/orderController');

const router = express.Router();

router.use(protect);

router.route('/')
    .get(getOrders)
    .post(createOrder);

router.route('/:id')
    .get(getOrder)
    .put(updateOrder)
    .delete(deleteOrder);

module.exports = router;
