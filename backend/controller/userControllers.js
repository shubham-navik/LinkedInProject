const User = require('../models/User');
const jwt = require('jsonwebtoken');

// User registration
exports.createUser = async (req, res) => {
    const { name, email } = req.body;
    try {
        let existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ msg: "User already exists with this email" });
        }

        const newUser = new User({
            name,
            email
        });

        await newUser.save();
        res.status(201).json({ message: "User registered successfully", user: newUser });
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Error in registering');
    }
}

// User login (without password)
exports.userLogin = async (req, res) => {
    const { email } = req.body;
    try {
        let existingUser = await User.findOne({ email });
        if (!existingUser) {
            return res.status(400).json({ msg: "User does not exist with this email: " + email });
        }

        // create JWT
        // const payload = {
        //     user: {
        //         id: existingUser._id,
        //         name: existingUser.name,
        //         email: existingUser.email,
        //     }
        // };

        // const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '24h' });

        res.json({ message: 'User logged in successfully', user: existingUser});
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server error');
    }
}




exports.updateUserLevel = async (userId, testScore) => {
  try {
    const user = await User.findById(userId);
    if (!user) throw new Error("User not found");

    // Add new test score
    user.testsTaken.push({ score: testScore });

    // Calculate new average
    const totalScore = user.testsTaken.reduce((acc, t) => acc + t.score, 0);
    const avgScore = totalScore / user.testsTaken.length;
    user.averageScore = avgScore;

    // Update level based on average score
    if (avgScore < 50) user.level = "Beginner";
    else if (avgScore < 80) user.level = "Intermediate";
    else user.level = "Advanced";

    await user.save();
    return user;
  } catch (err) {
    console.error("Error updating user level:", err);
    throw err;
  }
};


// Controller for submitting test
exports.submitTest = async (req, res) => {
  try {
    const { userId, score } = req.body; // score: 0-100

    const updatedUser = await updateUserLevel(userId, score);

    res.status(200).json({
      message: "Test submitted successfully",
      level: updatedUser.level,
      averageScore: updatedUser.averageScore,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
