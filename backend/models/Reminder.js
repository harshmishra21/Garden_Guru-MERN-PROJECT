const mongoose = require('mongoose');

const reminderSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
        gardenPlant: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'UserGarden',
        },
        type: {
            type: String,
            enum: ['watering', 'pruning', 'harvesting', 'other'],
            required: true,
        },
        date: {
            type: Date, // Next due date
            required: true,
        },
        completed: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Reminder', reminderSchema);
