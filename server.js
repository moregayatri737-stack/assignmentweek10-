const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const bookRoutes = require("./routes/bookRoutes");
const requestRoutes = require("./routes/requestRoutes"); // ✅ ADD THIS

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.error(err));

app.use("/api/auth", authRoutes);
app.use("/api/books", bookRoutes);
app.use("/api/requests", requestRoutes); // ✅ ADD THIS

app.listen(5000, () => console.log("Server running on port 5000"));
