const Session = require("../models/Session");

// Create a new session
exports.createSession = async (req, res) => {
  const { userId, questions, score, total, weakAreas, difficulty } = req.body;

  try {
    const newSession = new Session({
      userId,
      questions,
      score,
      total,
      weakAreas,
      difficulty,
    });

    await newSession.save();
    res.status(201).json({ message: "Session created successfully", session: newSession });
  } catch (err) {
    console.error("Session creation error:", err);
    res.status(500).json({ message: err.message || "Error in creating session" });
  }
};

// Get all sessions for a user
exports.getSessionsByUser = async (req, res) => {
  const { userId } = req.params;

  try {
    // Remove populate because questionId is Number
    const sessions = await Session.find({ userId }).lean();

    res.status(200).json({ sessions });
  } catch (err) {
    console.error("Error fetching sessions:", err);
    res.status(500).json({ message: "Error in fetching sessions" });
  }
};
