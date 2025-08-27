const Session = require("../models/Session");


// create a new session
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
    console.log(err.message);
    res.status(500).send("Error in creating session");
  }
}


// get all sessions for a user
exports.getSessionsByUser = async (req, res) => {
  const { userId } = req.params;

  try {
    const sessions = await Session.find({ userId }).populate('questions.questionId');
    res.json(sessions);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Error in fetching sessions");
  }
}