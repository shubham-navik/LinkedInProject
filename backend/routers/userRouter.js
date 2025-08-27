const express = require('express');
const router = express.Router();

const { createUser, userLogin } = require('../controller/userControllers');

router.post('/createUser', createUser);
router.post('/login', userLogin);

module.exports = router;