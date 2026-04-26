const mongoose = require('mongoose');

const AddressSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    landmark: { type: String, required: true },
    village: { type: String },
    district: { type: String },
    state: { type: String },
    gpsLocation: {
        latitude: { type: Number },
        longitude: { type: Number }
    },
    photo: { type: String },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Address', AddressSchema);
