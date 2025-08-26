// controllers/adminController.js
const User = require('../models/User');

// This function is only accessible by admins
const createUserByAdmin = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        if (!name || !email || !password || !role) {
            return res.status(400).json({ message: 'Please provide all fields: name, email, password, role' });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "An account with this email already exists." });
        }

        const newUser = new User({
            name,
            email,
            password,
            role // The admin can specify the role here
        });

        await newUser.save();

        const userResponse = { ...newUser._doc };
        delete userResponse.password;

        res.status(201).json({ message: `User created with role: ${role}`, user: userResponse });

    } catch (err) {
        res.status(500).json({ message: "Error creating user", error: err.message });
    }
};

module.exports = {
    createUserByAdmin
};