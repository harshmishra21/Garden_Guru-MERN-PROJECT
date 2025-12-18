const express = require('express');
const router = express.Router();
const {
    getAlerts,
    createAlert,
    deleteAlert,
} = require('../controllers/alertController');
const { protect, admin } = require('../middleware/authMiddleware');

router.route('/').get(protect, getAlerts).post(protect, admin, createAlert);
router.route('/:id').delete(protect, admin, deleteAlert);

module.exports = router;
