const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    receiver_waba_id: { type: String, maxlength: 256, unique: true },
    from: { type: Number, max: 9999999999999 },
    to: { type: Number, max: 9999999999999 },
    message_id: { type: String, maxlength: 256 },
    conversation_id: { type: String, maxlength: 256 },
    message_type: {
        type: String,
        enum: ['text', 'reaction', 'image', 'sticker', 'unknown', 'location', 'button', 'interactive', 'order', 'system']
    },
    previewUrl: Boolean,
    cloud_api: {
        message: {
            text: String,
            reaction: {
                emoji: { type: String, maxlength: 256 },
                message_id: { type: String, maxlength: 256 },
            },
            image: {
                link: { type: String, maxlength: 256 },
                caption: String,
                id: String,
                sha256: String,
                mime_type: { type: String, maxlength: 256 },
            },
            sticker: {
                id: String,
                sha256: String,
                mime_type: { type: String, maxlength: 256 },
            },
            location: {
                latitude: Number,
                longitude: Number,
                name: { type: String, maxlength: 256 },
                address: { type: String, maxlength: 1024 },
            },
            interactive: {
                text: { type: String, maxlength: 1024 },
                type: {
                    type: String,
                    enum: ['list', 'button', 'list_reply', 'button_reply', 'address_message', 'nfm_reply'],
                },
                list_reply: {
                    id: { type: String, maxlength: 256 },
                    title: { type: String, maxlength: 256 },
                    description: { type: String, maxlength: 1024 }
                },
                button_reply: {
                    id: { type: String, maxlength: 256 },
                    title: { type: String, maxlength: 256 },
                },
                action: {
                    name: String,
                    parameters: {
                        country: String,
                        name: { type: String, maxlength: 256 },
                        phone_number: { type: Number, max: 999999999999 },
                        is_saved: Boolean,
                        saved_addr_id: { type: String, maxlength: 256 },
                        in_pin_code: { type: Number, max: 999999 },
                        floor_number: { type: Number, max: 99999 },
                        building_name: { type: String, maxlength: 256 },
                        address: { type: String, maxlength: 1024 },
                        landmark_area: { type: String, maxlength: 256 },
                        city: { type: String, maxlength: 256 }
                    }
                },
            },
            referral: {
                source_url: { type: String, maxlength: 1024 },
                source_id: { type: String, maxlength: 256 },
                source_type: {
                    type: String,
                    enum: ['ad', 'post']
                },
                headline: { type: String, maxlength: 256 },
                body: { type: String, maxlength: 1024 },
                media_type: {
                    type: String,
                    enum: ['image', 'video']
                },
                image_url: { type: String, maxlength: 1024 },
                video_url: { type: String, maxlength: 1024 },
                thumbnail_url: { type: String, maxlength: 1024 },
                ctwa_clid: { type: String, maxlength: 1024 }
            },
            context: {
                from: { type: Number, max: 99999999999 },
                id: { type: String, maxlength: 256 },
                message_id: { type: String, maxlength: 256 },
                referred_product: {
                    catalog_id: { type: String, maxlength: 256 },
                    product_retailer_id: { type: String, maxlength: 256 }
                }
            },
            order: {
                catalog_id: { type: String, maxlength: 256 },
                product_items: [
                    {
                        product_retailer_id: { type: String, maxlength: 256 },
                        quantity: { type: Number, max: 99999999999 },
                        item_price: Number,
                        currency: { type: String, maxlength: 64 }
                    }
                ],
                text: String,
            },
            system: {
                body: { type: String, maxlength: 256 },
                new_wa_id: { type: Number, max: 9999999999999 },
                type: { type: String, maxlength: 256 }
            },
            contacts: [{
                addresses: [{
                    city: { type: String, maxlength: 256 },
                    country: { type: String, maxlength: 256 },
                    country_code: { type: String, maxlength: 256 },
                    state: { type: String, maxlength: 256 },
                    street: { type: String, maxlength: 256 },
                    type: {
                        type: String,
                        enum: ['HOME', 'WORK']
                    },
                    zip: { type: Number, max: 999999 }
                }],
                birthday: { type: String, maxlength: 256 },
                emails: [{
                    email: { type: String, maxlength: 256 },
                    type: {
                        type: String,
                        enum: ['HOME', 'WORK']
                    }
                }],
                name: {
                    formatted_name: { type: String, maxlength: 256 },
                    first_name: { type: String, maxlength: 256 },
                    last_name: { type: String, maxlength: 256 },
                    middle_name: { type: String, maxlength: 256 },
                    suffix: { type: String, maxlength: 256 },
                    prefix: { type: String, maxlength: 256 },
                },
                org: {
                    company: { type: String, maxlength: 256 },
                    department: { type: String, maxlength: 256 },
                    title: { type: String, maxlength: 256 }
                },
                phones: [{
                    phone: { type: Number, max: 9999999999999 },
                    wa_id: { type: String, maxlength: 256 },
                    type: {
                        type: String,
                        enum: ['HOME', 'WORK']
                    }
                }],
                urls: [{
                    url: { type: String, maxlength: 1024 },
                    type: {
                        type: String,
                        enum: ['HOME', 'WORK']
                    }
                }]
            }],
        },
        templated: {
            template: Object,
            payload: Object,
        }
    },
    timestamps: {
        sent: {
            timestamp: Date,
            billable: Boolean,
            pricing_model: { type: String, maxlength: 256 },
            category: { type: String, maxlength: 256 },
            expiry_timestamp: Date,
            origin_type: { type: String, maxlength: 256 },
        },
        delivered: {
            timestamp: Date,
            billable: Boolean,
            pricing_model: { type: String, maxlength: 256 },
            category: { type: String, maxlength: 256 },
            expiry_timestamp: Date,
            origin_type: { type: String, maxlength: 256 },
        },
        read: {
            timestamp: Date,
        },
        received : Date,
        failed: {
            timestamp: Date,
            errors: [
                {
                    code: { type: Number, max: 99999999999 },
                    title: { type: String, maxlength: 256 },
                    message: { type: String, maxlength: 256 },
                }
            ]
        }
    },
    response: { type: mongoose.Schema.Types.Mixed },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
});

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;
