const mongoose = require('mongoose');

const plantSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        instructions: {
            type: String,
            required: true,
        },
        sunlight: {
            type: String,
            required: true,
        },
        fertilizer: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Plant', plantSchema);
