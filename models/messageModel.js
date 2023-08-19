const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  from: String,
  id: String,
  timestamp: String,
  text: String,
  type: String,
});

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;