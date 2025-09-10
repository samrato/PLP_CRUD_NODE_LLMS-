const express = require("express");
const dotenv = require("dotenv");
const studentRoutes = require("./routes/studentRoutes");
const courseRoutes = require("./routes/courseRoutes");

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

// Routes
app.use("/api/students", studentRoutes);
app.use("/api/courses", courseRoutes);

app.listen(PORT, () => {
  try {
    console.log(` Server running on port ${PORT}`);
  } catch (error) {
    console.log("There is error in server connection",error)
  }
});
