const mongoose = require('mongoose');

const alertSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        remedy: {
            type: String,
            required: true,
        },
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User', // Admin
        }
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Alert', alertSchema);
