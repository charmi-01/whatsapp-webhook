const mongoose = require('mongoose');

const sentMessageSchema = new mongoose.Schema({
    to:String,
    id: String,
    text: String,
    timestamp: String,
    conversationid: String,
    expirationtimestamp: String,
    status: String,
});

const SentMessage = mongoose.model('SentMessage', sentMessageSchema);

module.exports = SentMessage;