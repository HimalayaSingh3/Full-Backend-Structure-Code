const jwt = require("jsonwebtoken");
const User = require("../models/UserSchema");

const authMiddleware = async (req, res) => {
  const token = req.cookies.notesUserToken;
  try {
    if (token) {
      const decode = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decode.id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      req.user = user;
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Invalid Token" });
  }
};

module.exports = authMiddleware;
