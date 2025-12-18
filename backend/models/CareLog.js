const mongoose = require('mongoose');

const careLogSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
        gardenPlant: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'UserGarden',
        },
        actionType: {
            type: String,
            enum: ['watering', 'fertilizing', 'pruning', 'harvesting', 'repotting', 'other'],
            default: 'other',
        },
        date: {
            type: Date,
            default: Date.now,
        },
        notes: String,
        photo: String, // URL/path to photo
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('CareLog', careLogSchema);

