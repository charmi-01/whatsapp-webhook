const mongoose = require('mongoose');

const wabaProfileSchema = new mongoose.Schema({
    cloud_api: {
        app_id: { type: String, maxlength: 256 },
        waba_id: { type: String, maxlength: 256, unique: true },
        phone_id: { type: String, maxlength: 256 },
        access_token: { type: String, maxlength: 1024 },
        is_webhook_setup: Boolean,
    },
    gupshup: {
        user_id: { type: String, maxlength: 256 },
        user_pass: { type: String, maxlength: 256 },
    },
    waba_phone: {
        countryCode: { type: Number, max: 999 },
        number: { type: Number, max: 999999999999 }, // Adjust as needed
    },
    provider: { type: String, enum: ['gupshup', 'cloud'] },
    about: { type: String, maxlength: 1024 },
    address: { type: String, maxlength: 256 },
    description: { type: String, maxlength: 512 },
    email: { type: String, maxlength: 128 },
    profile_picture_url: { type: String, maxlength: 1024 },
    websites: { type: String, maxlength: 256 },
    vertical: {
        type: String,
        enum: [
            'UNDEFINED',
            'OTHER',
            'AUTO',
            'BEAUTY',
            'APPAREL',
            'EDU',
            'ENTERTAIN',
            'EVENT_PLAN',
            'FINANCE',
            'GROCERY',
            'GOVT',
            'HOTEL',
            'HEALTH',
            'NONPROFIT',
            'PROF_SERVICES',
            'RETAIL',
            'TRAVEL',
            'RESTAURANT',
            'NOT_A_BIZ',
        ],
    },
    role: { type: String, default: 'admin' },
    credits: { type: Number, max: 99999999999 }, // Adjust as needed
    status: Boolean,
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
});

const wabaProfile = mongoose.model('waba_profile', wabaProfileSchema);

module.exports = wabaProfile;
