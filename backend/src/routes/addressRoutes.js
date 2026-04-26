const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const { 
    getAddresses, 
    getAddress, 
    createAddress, 
    updateAddress, 
    deleteAddress 
} = require('../controllers/addressController');

const router = express.Router();

router.use(protect);

router.route('/')
    .get(getAddresses)
    .post(createAddress);

router.route('/:id')
    .get(getAddress)
    .put(updateAddress)
    .delete(deleteAddress);

module.exports = router;
