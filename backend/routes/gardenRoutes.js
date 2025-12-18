const express = require('express');
const router = express.Router();
const {
    getGarden,
    addToGarden,
    deleteFromGarden,
} = require('../controllers/gardenController');
const { protect } = require('../middleware/authMiddleware');

router.route('/').get(protect, getGarden).post(protect, addToGarden);
router.route('/:id').delete(protect, deleteFromGarden);

module.exports = router;
