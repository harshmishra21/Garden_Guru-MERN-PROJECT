const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const {
    getLogs,
    addLog,
} = require('../controllers/logController');
const { protect } = require('../middleware/authMiddleware');

// Set up storage engine
const storage = multer.diskStorage({
    destination: './uploads/',
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

// Init upload
const upload = multer({
    storage: storage,
    limits: { fileSize: 1000000 },
    fileFilter: function (req, file, cb) {
        checkFileType(file, cb);
    }
}).single('photo');

// Check File Type
function checkFileType(file, cb) {
    const filetypes = /jpeg|jpg|png|gif/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb('Error: Images Only!');
    }
}

router.route('/:id').get(protect, getLogs);
// Pass upload middleware before controller
router.route('/').post(protect, upload, addLog);

module.exports = router;
