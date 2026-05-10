const express = require('express');
const router = express.Router();
const sessionMoodController = require('../../controllers/sessionMoodController');
const authenticateToken = require('../../middlewares/verifyJWT');

router.post('/save', authenticateToken(), sessionMoodController.saveSessionMood);
router.get('/current', authenticateToken(), sessionMoodController.getCurrentSessionMood);
router.get('/history', authenticateToken(), sessionMoodController.getSessionMoodHistory);
router.get('/sessions', authenticateToken(), sessionMoodController.getSessionMoods);

module.exports = router;