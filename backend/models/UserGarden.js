const mongoose = require('mongoose');

const userGardenSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
        plant: {
            type: mongoose.Schema.Types.ObjectId,
            // Not strictly required if adding a custom plant, but usually we ref the master plant
            // For simple college project, let's assume users select from master or add custom fields.
            // Wait, the req says "Add plants with...". Let's store plant details here to allow custom plants or just copies.
            ref: 'Plant',
        },
        // To allow storing independent details even if based on master plant
        name: String,
        waterReq: String,
        sunlight: String,
        fertilizer: String,
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('UserGarden', userGardenSchema);
