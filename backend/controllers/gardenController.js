const UserGarden = require('../models/UserGarden');

// @desc    User ke garden plants lao
// @route   GET /api/garden
// @access  Private
const getGarden = async (req, res) => {
    try {
        const garden = await UserGarden.find({ user: req.user.id });
        res.status(200).json(garden);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Garden mein plant add karo
// @route   POST /api/garden
// @access  Private
const addToGarden = async (req, res) => {
    const { plantId, name, waterReq, sunlight, fertilizer } = req.body;

    // Default/Custom values use karo
    // If plantId is provided, we might look it up, but for simplicity we assume frontend passes data
    // If name is not provided and plantId is needed validation is needed.

    if (!name) {
        return res.status(400).json({ message: 'Please add a name' });
    }

    try {
        const gardenPlant = await UserGarden.create({
            user: req.user.id,
            plant: plantId || null,
            name,
            waterReq,
            sunlight,
            fertilizer,
        });
        res.status(201).json(gardenPlant);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Garden se plant delete karo
// @route   DELETE /api/garden/:id
// @access  Private
const deleteFromGarden = async (req, res) => {
    try {
        const gardenPlant = await UserGarden.findById(req.params.id);

        if (!gardenPlant) {
            return res.status(404).json({ message: 'Plant not found' });
        }

        if (gardenPlant.user.toString() !== req.user.id) {
            return res.status(401).json({ message: 'User not authorized' });
        }

        await gardenPlant.deleteOne();

        res.status(200).json({ id: req.params.id });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getGarden,
    addToGarden,
    deleteFromGarden,
};
