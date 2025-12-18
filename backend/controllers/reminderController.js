const Reminder = require('../models/Reminder');

// @desc    Get reminders for user
// @route   GET /api/reminders
// @access  Private
const getReminders = async (req, res) => {
    try {
        const reminders = await Reminder.find({ user: req.user.id }).populate('gardenPlant', 'name');
        res.status(200).json(reminders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Add reminder
// @route   POST /api/reminders
// @access  Private
const addReminder = async (req, res) => {
    const { gardenPlantId, type, date } = req.body;

    if (!type || !date) {
        return res.status(400).json({ message: 'Please add type and date' });
    }

    try {
        const reminder = await Reminder.create({
            user: req.user.id,
            gardenPlant: gardenPlantId || null,
            type,
            date,
        });
        res.status(201).json(reminder);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Delete reminder
// @route   DELETE /api/reminders/:id
// @access  Private
const deleteReminder = async (req, res) => {
    try {
        const reminder = await Reminder.findById(req.params.id);

        if (!reminder) {
            return res.status(404).json({ message: 'Reminder not found' });
        }

        if (reminder.user.toString() !== req.user.id) {
            return res.status(401).json({ message: 'User not authorized' });
        }

        await reminder.deleteOne();

        res.status(200).json({ id: req.params.id });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getReminders,
    addReminder,
    deleteReminder,
};
