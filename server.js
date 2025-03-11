const express = require("express");
const dotenv = require("dotenv");
const Db = require("./controllers/Db");
const NoteAPI = require("./routes/NoteRoutes");
const UserAPI = require("./routes/UserRoutes");
const cookieParser = require("cookie-parser");
const cors = require("cors");

dotenv.config();
const app = express();

// Connect to database
Db();

// Middleware
app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

const PORT = process.env.PORT || 5000;

// Routes
app.use("/api/v1/users", UserAPI);
app.use("/api/v1/notes", NoteAPI);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
