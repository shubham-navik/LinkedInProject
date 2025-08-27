const express = require('express');
const router = express.Router();

const { createUser, userLogin,updateUserLevel,submitTest } = require('../controller/userControllers');

router.post('/createuser', createUser);
router.post('/login', userLogin);
router.post('/submittest', submitTest);
router.post('/updatelevel', updateUserLevel);

module.exports = router;