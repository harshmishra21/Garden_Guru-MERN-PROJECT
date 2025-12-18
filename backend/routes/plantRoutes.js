const express = require('express');
const router = express.Router();
const {
    getPlants,
    getPlant,
    createPlant,
    updatePlant,
    deletePlant,
} = require('../controllers/plantController');
const { protect, admin } = require('../middleware/authMiddleware');

router.route('/').get(protect, getPlants).post(protect, admin, createPlant);
router.route('/:id').get(protect, getPlant).put(protect, admin, updatePlant).delete(protect, admin, deletePlant);

module.exports = router;
