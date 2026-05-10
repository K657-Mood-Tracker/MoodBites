const express = require('express');
const router = express.Router();
const moodController = require('../../controllers/moodController');
const authenticateToken = require('../../middlewares/verifyJWT');

router.post('/save', authenticateToken(), moodController.saveMood);
router.get('/current', authenticateToken(), moodController.getMood);
router.get('/history', authenticateToken(), moodController.getMoodHistory);

module.exports = router;