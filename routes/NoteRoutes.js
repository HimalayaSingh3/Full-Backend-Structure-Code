const Notes = require("../models/NotesSchema");
const User = require("../models/UserSchema");
const authMiddleware = require("../middleware/auth");
const router = require("express").Router();

// Get all Notes
router.get("/get-notes", authMiddleware, async (req, res) => {
  try {
    const { user } = req;
    const userId = user.id;

    const existingUser = await User.findById(userId);
    if (!existingUser) {
      return res.status(404).json({ message: "User not found" });
    }

    const notes = await Notes.find({ userId });

    return res.status(200).json({
      message: "Notes fetched successfully",
      notes,
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
});

// Create Note
router.post("/add-notes", authMiddleware, async (req, res) => {
  try {
    const { title, description } = req.body;
    if (!title || !description) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const { user } = req;
    const userId = user.id;

    const existingUser = await User.findById(userId);
    if (!existingUser) {
      return res.status(404).json({ message: "User not found" });
    }

    const newNote = new Notes({ title, description, userId });
    await newNote.save();

    return res.status(201).json({
      message: "Note added successfully",
      note: newNote,
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
});

// Delete Note
router.delete("/delete-notes/:id", authMiddleware, async (req, res) => {
  try {
    const { user } = req;
    const userId = user.id;

    const existingUser = await User.findById(userId);
    if (!existingUser) {
      return res.status(404).json({ message: "User not found" });
    }

    const note = await Notes.findOneAndDelete({ _id: req.params.id, userId });

    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    return res.status(200).json({
      message: "Note deleted successfully",
      note,
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
});

// Update Note
router.put("/update-notes/:id", authMiddleware, async (req, res) => {
  try {
    const { title, description } = req.body;
    if (!title || !description) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const { user } = req;
    const userId = user.id;

    const existingUser = await User.findById(userId);
    if (!existingUser) {
      return res.status(404).json({ message: "User not found" });
    }

    const note = await Notes.findOneAndUpdate(
      { _id: req.params.id, userId },
      { title, description },
      { new: true }
    );

    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    return res.status(200).json({
      message: "Note updated successfully",
      note,
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
