const pool = require("../config/db");

// 📌 Get all courses
exports.getCourses = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM courses ORDER BY id ASC");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 📌 Get course by ID
exports.getCourseById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query("SELECT * FROM courses WHERE id = $1", [id]);
    if (result.rows.length === 0) return res.status(404).json({ error: "Course not found" });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 📌 Create course
exports.createCourse = async (req, res) => {
  try {
    const { title, description, credits } = req.body;
    const result = await pool.query(
      "INSERT INTO courses (title, description, credits) VALUES ($1, $2, $3) RETURNING *",
      [title, description, credits]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 📌 Update course
exports.updateCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, credits } = req.body;
    const result = await pool.query(
      "UPDATE courses SET title = $1, description = $2, credits = $3 WHERE id = $4 RETURNING *",
      [title, description, credits, id]
    );
    if (result.rows.length === 0) return res.status(404).json({ error: "Course not found" });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 📌 Delete course
exports.deleteCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query("DELETE FROM courses WHERE id = $1 RETURNING *", [id]);
    if (result.rows.length === 0) return res.status(404).json({ error: "Course not found" });
    res.json({ message: "Course deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
