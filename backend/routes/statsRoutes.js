const express = require('express');
const router = express.Router();
const { getPlantStats, getOverviewStats, quickLogAction } = require('../controllers/statsController');
const { protect } = require('../middleware/authMiddleware');

// GET /api/stats/overview - Get overview stats for all plants
router.get('/overview', protect, getOverviewStats);

// GET /api/stats/:plantId - Get stats for specific plant
router.get('/:plantId', protect, getPlantStats);

// POST /api/stats/log - Quick log a care action
router.post('/log', protect, quickLogAction);

module.exports = router;
