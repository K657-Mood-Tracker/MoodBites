const express = require('express');
const router = express.Router();
const journalController = require('../../controllers/journalController');

router.post('/save', journalController.saveJournal);
router.get('/current', journalController.getJournal);

module.exports = router;