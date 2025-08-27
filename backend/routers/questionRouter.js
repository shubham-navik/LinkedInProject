const express = require('express');
const router = express.Router();

const { createQuestion, getQuestions ,addManyQuestions} = require('../controller/questionControllers');

router.post('/createquestion', createQuestion);
router.get('/getquestions', getQuestions);
router.get('/addmultiplequestion', addManyQuestions);

module.exports = router;