const express = require('express');
const router = express.Router();
const habitController = require('../../controllers/habitController');
const authenticateToken = require('../../middlewares/verifyJWT');

router.get('/', authenticateToken(), habitController.getHabits);
router.post('/add', authenticateToken(), habitController.addHabit);
router.post('/toggle', authenticateToken(), habitController.toggleHabit);
router.put('/update', authenticateToken(), habitController.updateHabit);
router.delete('/delete', authenticateToken(), habitController.deleteHabit);
router.get('/history', authenticateToken(), habitController.getHabitHistory);

module.exports = router;