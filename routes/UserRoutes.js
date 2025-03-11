const router = require("express").Router();
const bcrypt = require("bcrypt");
const User = require("../models/UserSchema");
const authMiddleware = require("../middleware/auth");
const jwt = require("jsonwebtoken");

// Register route
router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }
    if (username.length < 5) {
      return res
        .status(400)
        .json({ message: "Username must be 5 characters long" });
    }
    if (password.length < 8) {
      return res
        .status(400)
        .json({ message: "Password must be 8 characters long" });
    }

    // Check if user exists by email
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: "User Already exists",
      });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();
    return res.status(201).json({
      message: "User Created Successfully",
    });
  } catch (error) {
    console.error("register error", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

// Login Route
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if user exists by email
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    const isMatch = await bcrypt.compare(password, existingUser.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: existingUser.id, email: existingUser.email },
      process.env.JWT_SECRET,
      { expiresIn: "30d" }
    );

    // Set token in cookie
    res.cookie("notesUserToken", token, {
      httpOnly: true,
      maxAge: 30 * 24 * 60 * 60 * 1000,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Lax",
    });

    return res.status(200).json({
      id: existingUser.id,
      username: existingUser.username,
      email: existingUser.email,
      message: "Login Successfully",
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal Error" });
  }
});

// Logout Route
router.post("/logout", (req, res) => {
  try {
    res.clearCookie("notesUserToken");
    res.status(200).json({ message: "Logged Out Successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

// Check if cookie exists
router.get("/check-cookie", (req, res) => {
  try {
    const token = req.cookies.notesUserToken;
    if (token) {
      return res.status(200).json({ message: true });
    }
    return res.status(204).json({ message: false }); // No content if no token
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
});

// Fetch user detail Route
router.get("/user-detail", authMiddleware, async (req, res) => {
  try {
    const { email } = req.user;
    const existingUser = await User.findOne({ email }).select("-password");
    return res.status(200).json({
      user: existingUser,
    });
  } catch (error) {
    return res.status(500).json({ error: error });
  }
});

module.exports = router;