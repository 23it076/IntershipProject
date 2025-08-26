const User = require('../models/User');
const jwt = require('jsonwebtoken');

// REGISTER User
const register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "An account with this email already exists." });
    }

    const newUser = new User({
      name,
      email,
      password,
      role: role || 'user'
    });
    await newUser.save();

    const userResponse = { ...newUser._doc };
    delete userResponse.password;

    res.status(201).json({ message: "User registered successfully", user: userResponse });
  } catch (err) {
    res.status(500).json({ message: "Error registering user", error: err.message });
  }
};

// LOGIN User
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: "Invalid email or password" });

    const isMatch = await user.matchPassword(password);
    if (!isMatch) return res.status(401).json({ message: "Invalid email or password" });

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    const userResponse = { ...user._doc };
    delete userResponse.password;

    res.status(200).json({ message: "Login successful", token, user: userResponse });
  } catch (err) {
    res.status(500).json({ message: "Error logging in", error: err.message });
  }
};

module.exports = { register, login };
