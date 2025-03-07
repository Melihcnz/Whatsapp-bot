const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    phoneNumber: {
        type: String,
        required: true,
        unique: true
    },
    name: String,
    isAdmin: {
        type: Boolean,
        default: false
    },
    lastSeen: Date,
    commandCount: {
        type: Number,
        default: 0
    }
});

module.exports = mongoose.model('User', userSchema); 