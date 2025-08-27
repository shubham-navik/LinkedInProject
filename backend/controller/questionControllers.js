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
const User = require("../models/User"); // assuming you have a User model
// const Question = require("../models/Question");


exports.getQuestions = async (req, res) => {
  try {
    const { userId } = req.query;
    if (!userId) return res.status(400).json({ message: "User ID required" });

    const user = await User.findById(userId);
    let level = "beginner";

    if (user && user.averageScore !== undefined) {
      if (user.averageScore < 50) level = "beginner";
      else if (user.averageScore < 80) level = "intermediate";
      else level = "advanced";
    }

    let questions = [];

    if (level === "beginner") {
      questions = await Question.aggregate([
        { $match: { difficulty: "easy" } },
        { $sample: { size: 10 } }
      ]);
    } else if (level === "intermediate") {
      const medium = await Question.aggregate([
        { $match: { difficulty: "medium" } },
        { $sample: { size: 5 } }
      ]);
      const hard = await Question.aggregate([
        { $match: { difficulty: "hard" } },
        { $sample: { size: 5 } }
      ]);
      questions = [...medium, ...hard];
    } else if (level === "advanced") {
      questions = await Question.aggregate([
        { $match: { difficulty: "hard" } },
        { $sample: { size: 10 } }
      ]);
    }

    res.status(200).json({ questions, level });
  } catch (err) {
    console.error("Error fetching questions:", err);
    res.status(500).json({ message: "Server error" });
  }
};