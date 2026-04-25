const express = require('express');
const router = express.Router();
const habitController = require('../../controllers/habitController');

router.get('/', habitController.getHabits);
router.post('/add', habitController.addHabit);
router.post('/toggle', habitController.toggleHabit);
router.put('/update', habitController.updateHabit);

module.exports = router;