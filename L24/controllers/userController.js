import User from "../models/userModel.js";
import jwt from "jsonwebtoken";

const mySecret = "secret";

// Register
export const registerUser = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        // check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ success: false, message: "User already exists" });
        }

        const user = new User({ name, email, password });
        await user.save();

        res.status(201).json({ 
            success: true, 
            message: "User created successfully", 
            user: { id: user._id, name: user.name, email: user.email }
        });
    } catch (error) {
        console.error("Error creating user:", error);
        res.status(500).json({ success: false, error: "Internal server error" });
    }
};

// Login (RAW password check)
export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ success: false, message: "Invalid credentials (email)" });
        }

        if (user.password !== password) {
            return res.status(401).json({ success: false, message: "Invalid credentials (password)" });
        }

        // create token
        const token = jwt.sign({ id: user._id }, mySecret, { expiresIn: "1h" });

        res.json({ 
            success: true, 
            message: "Login successful", 
            token, 
            user: { id: user._id, name: user.name, email: user.email }
        });
    } catch (error) {
        console.error("Error logging in:", error);
        res.status(500).json({ success: false, error: "Internal server error" });
    }
};
