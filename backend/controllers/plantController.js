const Plant = require('../models/Plant');

// @desc    Saare plants lao
// @route   GET /api/plants
// @access  Private
const getPlants = async (req, res) => {
    try {
        const plants = await Plant.find();
        res.status(200).json(plants);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Ek plant lao
// @route   GET /api/plants/:id
// @access  Private
const getPlant = async (req, res) => {
    try {
        const plant = await Plant.findById(req.params.id);
        if (!plant) {
            return res.status(404).json({ message: 'Plant not found' });
        }
        res.status(200).json(plant);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Naya plant banao
// @route   POST /api/plants
// @access  Private/Admin
const createPlant = async (req, res) => {
    const { name, instructions, sunlight, fertilizer } = req.body;

    if (!name || !instructions || !sunlight || !fertilizer) {
        return res.status(400).json({ message: 'Please add all fields' });
    }

    try {
        const plant = await Plant.create({
            name,
            instructions,
            sunlight,
            fertilizer,
        });
        res.status(201).json(plant);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Plant update karo
// @route   PUT /api/plants/:id
// @access  Private/Admin
const updatePlant = async (req, res) => {
    try {
        const plant = await Plant.findById(req.params.id);

        if (!plant) {
            return res.status(404).json({ message: 'Plant not found' });
        }

        const updatedPlant = await Plant.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        res.status(200).json(updatedPlant);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Plant delete karo
// @route   DELETE /api/plants/:id
// @access  Private/Admin
const deletePlant = async (req, res) => {
    try {
        const plant = await Plant.findById(req.params.id);

        if (!plant) {
            return res.status(404).json({ message: 'Plant not found' });
        }

        await plant.deleteOne();

        res.status(200).json({ id: req.params.id });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getPlants,
    getPlant,
    createPlant,
    updatePlant,
    deletePlant,
};
