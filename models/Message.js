const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    sender: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true,
        default: "Boş Mesaj"
    },
    timestamp: {
        type: Date,
        default: Date.now
    },
    isGroup: {
        type: Boolean,
        default: false
    },
    groupName: {
        type: String,
        default: null
    }
});

module.exports = mongoose.model('Message', messageSchema); 