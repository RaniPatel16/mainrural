const Address = require('../models/Address');

// @desc    Get all addresses
exports.getAddresses = async (req, res) => {
    try {
        const addresses = await Address.find({ user: req.user.id });
        res.status(200).json({ data: addresses });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// @desc    Get single address
exports.getAddress = async (req, res) => {
    try {
        const address = await Address.findById(req.params.id);
        if (!address) return res.status(404).json({ message: 'Address not found' });
        res.status(200).json({ data: address });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// @desc    Create address
exports.createAddress = async (req, res) => {
    try {
        req.body.user = req.user.id;
        const address = await Address.create(req.body);
        res.status(201).json({ data: address });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// @desc    Update address
exports.updateAddress = async (req, res) => {
    try {
        const address = await Address.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json({ data: address });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// @desc    Delete address
exports.deleteAddress = async (req, res) => {
    try {
        await Address.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Address deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
