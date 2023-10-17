const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
    waba_id: {
        type: String,
        maxlength: 256
    },
    name: {
        type: String,
        maxlength: 256
    },
    phone: {
        type: Number,
        max: 9999999999999 // Assuming you want a 13-digit integer
    },
    agent_id: {
        type: String,
        maxlength: 256
    },
    lastMessage: {
        message: String,
        time: {
            type: Date,
            default: Date.now
        },
        expiry_timestamp: {
            type: Date,
            default: Date.now
        },
    },
    notes: {
        note: String,
        time: Date
    },
    broadcastGroups:{
        broadcast_id: { type: String, maxlength: 256 },
        broadcast_name: { type: String, maxlength: 256 },
        added_on: Date,
        added_by: { type: String, maxlength: 256 },
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    }
});

const customers = mongoose.model('customer', customerSchema);

module.exports = customers;
