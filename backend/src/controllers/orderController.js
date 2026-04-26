const Order = require('../models/Order');

// @desc    Get all orders
// @route   GET /api/orders
exports.getOrders = async (req, res) => {
    try {
        let query;
        if (req.user.role === 'admin') {
            query = Order.find().populate('addressId');
        } else if (req.user.role === 'agent') {
            query = Order.find({ agent: req.user.id }).populate('addressId');
        } else {
            query = Order.find({ user: req.user.id }).populate('addressId');
        }
        const orders = await query;
        res.status(200).json({ data: orders });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// @desc    Get single order
exports.getOrder = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id).populate('addressId');
        if (!order) return res.status(404).json({ message: 'Order not found' });
        res.status(200).json({ data: order });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// @desc    Create order
exports.createOrder = async (req, res) => {
    try {
        req.body.user = req.user.id;
        const order = await Order.create(req.body);
        res.status(201).json({ data: order });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// @desc    Update order
exports.updateOrder = async (req, res) => {
    try {
        const order = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json({ data: order });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// @desc    Delete order
exports.deleteOrder = async (req, res) => {
    try {
        await Order.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Order deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
