// controllers/questionController.js
const Question = require("../models/Question");

// Create question
exports.createQuestion = async (req, res) => {
  try {
    const { id, question, options, correctAnswer, difficulty, topic } = req.body;

    // Basic validation
    if (!id || !question || !options || options.length < 2 || correctAnswer === undefined || !difficulty || !topic) {
      return res.status(400).json({
        message: "All fields are required and options should have at least 2 items.",
      });
    }

    if (correctAnswer < 0 || correctAnswer >= options.length) {
      return res.status(400).json({ message: "Correct answer index is out of bounds." });
    }

    // Check if id already exists
    const existing = await Question.findOne({ id });
    if (existing) {
      return res.status(400).json({ message: `Question with id ${id} already exists.` });
    }

    // Create new question
    const newQuestion = new Question({
      id,
      question,
      options,
      correctAnswer,
      difficulty,
      topic,
    });

    await newQuestion.save();
    res.status(201).json({
      message: "Question created successfully",
      question: newQuestion,
    });
  } catch (error) {
    console.error("Error creating question:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get 10 questions based on difficulty and topic
exports.getQuestions = async (req, res) => {
  try {
    const { difficulty, topic } = req.query;
    const filter = {};
    if (difficulty) filter.difficulty = difficulty;
    if (topic) filter.topic = topic;

    const questions = await Question.aggregate([
      { $match: filter },
      { $sample: { size: 10 } }, // Randomly select 10 questions
    ]);

    res.status(200).json({ questions });
  } catch (error) {
    console.error("Error fetching questions:", error);
    res.status(500).json({ message: "Server error" });
  }
};
