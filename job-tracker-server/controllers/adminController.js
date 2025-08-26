import User from "../models/User.js";
import Organization from "../models/organizationModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Admin Login
export const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        const admin = await User.findOne({ email, role: "admin" });
        if (!admin) return res.status(400).json({ message: "Invalid credentials" });

        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

        const token = jwt.sign(
            { id: admin._id, role: "admin" },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        res.json({ token });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get All Users
export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({ role: "user" }).select("-password");
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Delete User
export const deleteUser = async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.json({ message: "User deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get Providers
export const getProviders = async (req, res) => {
    try {
        const providers = await Organization.find();
        res.json(providers);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Approve Provider
export const approveProvider = async (req, res) => {
    try {
        const provider = await Organization.findByIdAndUpdate(
            req.params.id,
            { status: "approved" },
            { new: true }
        );
        res.json(provider);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Reject Provider
export const rejectProvider = async (req, res) => {
    try {
        const provider = await Organization.findByIdAndUpdate(
            req.params.id,
            { status: "rejected" },
            { new: true }
        );
        res.json(provider);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
