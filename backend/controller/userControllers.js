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
