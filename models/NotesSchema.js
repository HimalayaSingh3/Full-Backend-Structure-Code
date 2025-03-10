const mongoose = require("mongoose");

const NoteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
      unique: true,
    },
    notes: [
      {
        type: mongoose.Types.ObjectId,
        ref: "notes",
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("NoteSchema", NoteSchema);
