const User = require("../models/User");

// Create User
exports.createUser = async (req, res) => {
  const { name, email } = req.body;
  try {
    let existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ msg: "User already exists" });

    const newUser = new User({ name, email });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully", user: newUser });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Error in registering" });
  }
};

// User Login
exports.userLogin = async (req, res) => {
  const { email } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (!existingUser) return res.status(400).json({ msg: "User does not exist" });

    res.json({ message: "User logged in successfully", user: existingUser });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Server error" });
  }
};

// Update user level based on test score
// Update user level based on percentage score
exports.submitTest = async (req, res) => {
  try {
    const { userId, score, total } = req.body; // total number of questions
    if (!userId) return res.status(400).json({ message: "User ID required" });

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    if (!user.testsTaken) user.testsTaken = [];
    const percentageScore = (score / total) * 100; // convert to %

    user.testsTaken.push({ score: percentageScore, date: new Date() });

    // Update level based on percentage
    if (percentageScore < 50) user.level = "Beginner";
    else if (percentageScore < 80) user.level = "Intermediate";
    else user.level = "Advanced";

    // Optional: calculate average
    const totalScore = user.testsTaken.reduce((acc, t) => acc + t.score, 0);
    user.averageScore = totalScore / user.testsTaken.length;

    await user.save();

    res.status(200).json({
      message: "Test submitted successfully",
      level: user.level,
      averageScore: user.averageScore,
    });
  } catch (err) {
    console.error("SubmitTest error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
