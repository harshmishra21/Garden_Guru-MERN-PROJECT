const Alert = require('../models/Alert');

// @desc    Get alerts
// @route   GET /api/alerts
// @access  Private
const getAlerts = async (req, res) => {
    try {
        const alerts = await Alert.find();
        res.status(200).json(alerts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create alert
// @route   POST /api/alerts
// @access  Private/Admin
const createAlert = async (req, res) => {
    const { title, description, remedy } = req.body;

    if (!title || !description || !remedy) {
        return res.status(400).json({ message: 'Please add all fields' });
    }

    try {
        const alert = await Alert.create({
            title,
            description,
            remedy,
            createdBy: req.user.id,
        });
        res.status(201).json(alert);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Delete alert
// @route   DELETE /api/alerts/:id
// @access  Private/Admin
const deleteAlert = async (req, res) => {
    try {
        const alert = await Alert.findById(req.params.id);

        if (!alert) {
            return res.status(404).json({ message: 'Alert not found' });
        }

        await alert.deleteOne();

        res.status(200).json({ id: req.params.id });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getAlerts,
    createAlert,
    deleteAlert,
};
