const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  phoneNumber: {
    type: String,
    unique: true, // Ensure uniqueness of phone numbers
  },
  name: String,
});

const Contact = mongoose.model('Contact', contactSchema);

module.exports = Contact;