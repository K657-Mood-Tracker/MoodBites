const express = require('express');
const router = express.Router();
const journalController = require('../../controllers/journalController');
const authenticateToken = require('../../middlewares/verifyJWT');

router.post('/save', authenticateToken(), journalController.saveJournal);
router.get('/current', authenticateToken(), journalController.getJournal);

module.exports = router;