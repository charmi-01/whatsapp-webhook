const mongoose = require('mongoose');

const sentMessageSchema = new mongoose.Schema({
    to:String,
    id: String,
    text: String,
    timestamp: String,
    conversationId: String,
    expirationTimestamp: String,
    status: String,
});

const SentMessage = mongoose.model('SentMessage', sentMessageSchema);

module.exports = SentMessage;