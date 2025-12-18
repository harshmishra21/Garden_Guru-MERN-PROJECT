const express = require('express');
const router = express.Router();
const { chatWithAI } = require('../controllers/chatController');
const { protect } = require('../middleware/authMiddleware');

// POST /api/chat - Send message to AI
router.post('/', protect, chatWithAI);

module.exports = router;
