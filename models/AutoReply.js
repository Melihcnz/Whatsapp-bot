const mongoose = require('mongoose');

const autoReplySchema = new mongoose.Schema({
    trigger: {
        type: String,
        required: true
    },
    response: {
        type: String,
        required: true
    },
    isRegex: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('AutoReply', autoReplySchema); 