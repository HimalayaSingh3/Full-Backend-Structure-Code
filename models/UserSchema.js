const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
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

module.exports = mongoose.model("UserSchema", UserSchema);
