const express = require('express');
const router = express.Router();

const { createSession, getSessionsByUser } = require('../controller/sessionControllers');

router.post('/createsession', createSession);
router.get('/getsessions/:userId', getSessionsByUser);

module.exports = router;