const express = require('express');
const router = express.Router();

const { createQuestion, getQuestions } = require('../controller/questionControllers');

router.post('/createquestion', createQuestion);
router.get('/getquestions', getQuestions);

module.exports = router;