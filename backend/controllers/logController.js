const CareLog = require('../models/CareLog');

// @desc    Get logs for a plant
// @route   GET /api/logs/:plantId
// @access  Private
const getLogs = async (req, res) => {
    try {
        const logs = await CareLog.find({
            user: req.user.id,
            gardenPlant: req.params.plantId
        }).sort({ date: -1 });
        res.status(200).json(logs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Add care log
// @route   POST /api/logs
// @access  Private
const addLog = async (req, res) => {
    const { gardenPlantId, notes } = req.body;

    if (!gardenPlantId || !notes) {
        res.status(400);
        throw new Error('Please add notes');
    }

    const photo = req.file ? req.file.path : '';

    try {
        const log = await CareLog.create({
            user: req.user.id,
            gardenPlant: gardenPlantId,
            notes,
            photo,
        });
        res.status(201).json(log);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getLogs,
    addLog,
};
