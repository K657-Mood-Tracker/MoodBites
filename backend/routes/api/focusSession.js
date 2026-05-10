const express = require('express');
const router = express.Router();
const focusSessionController = require('../../controllers/focusSessionController');
const authenticateToken = require('../../middlewares/verifyJWT');

router.post('/create', authenticateToken(), focusSessionController.createFocusSession);
router.get('/', authenticateToken(), focusSessionController.getFocusSessions);

module.exports = router;