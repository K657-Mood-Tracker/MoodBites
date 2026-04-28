const express = require('express');
const router = express.Router();
const moodController = require('../../controllers/moodController');

router.post('/save', moodController.saveMood);
router.get('/current', moodController.getMood);

module.exports = router;