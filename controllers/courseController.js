const pool = require("../config/db");

// Helper: validate course input
function validateCourseInput({ title, credits }) {
  if (!title || typeof title !== "string" || title.trim() === "") {
    return "Title is required and must be a non-empty string.";
  }
  if (credits === undefined || isNaN(credits) || credits < 0) {
    return "Credits must be a non-negative number.";
  }
  return null;
}

//  Get all courses
exports.getCourses = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM courses ORDER BY id ASC");
    res.status(200).json(result.rows);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to fetch courses", details: err.message });
  }
};

//  Get course by ID
exports.getCourseById = async (req, res) => {
  try {
    const { id } = req.params;
    if (isNaN(id)) return res.status(400).json({ error: "Invalid course ID" });

    const result = await pool.query("SELECT * FROM courses WHERE id = $1", [
      id,
    ]);
    if (result.rows.length === 0)
      return res.status(404).json({ error: "Course not found" });

    res.status(200).json(result.rows[0]);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to fetch course", details: err.message });
  }
};

//  Create course
exports.createCourse = async (req, res) => {
  try {
    const { title, description, credits } = req.body;

    // Validate
    const error = validateCourseInput({ title, credits });
    if (error) return res.status(400).json({ error });

    const result = await pool.query(
      "INSERT INTO courses (title, description, credits) VALUES ($1, $2, $3) RETURNING *",
      [title.trim(), description || null, credits]
    );

    res
      .status(201)
      .json({ message: "Course created successfully", course: result.rows[0] });
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to create course", details: err.message });
  }
};

// Update course
exports.updateCourse = async (req, res) => {
  try {
    const { id } = req.params;
    if (isNaN(id)) return res.status(400).json({ error: "Invalid course ID" });

    const { title, description, credits } = req.body;

    // Validate only if fields provided
    if (title !== undefined || credits !== undefined) {
      const error = validateCourseInput({
        title: title || "dummy",
        credits: credits ?? 0,
      });
      if (error && (title !== undefined || credits !== undefined)) {
        return res.status(400).json({ error });
      }
    }

    const result = await pool.query(
      "UPDATE courses SET title = COALESCE($1, title), description = COALESCE($2, description), credits = COALESCE($3, credits) WHERE id = $4 RETURNING *",
      [title, description, credits, id]
    );

    if (result.rows.length === 0)
      return res.status(404).json({ error: "Course not found" });

    res
      .status(200)
      .json({ message: "Course updated successfully", course: result.rows[0] });
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to update course", details: err.message });
  }
};

//  Delete course
exports.deleteCourse = async (req, res) => {
  try {
    const { id } = req.params;
    if (isNaN(id)) return res.status(400).json({ error: "Invalid course ID" });

    const result = await pool.query(
      "DELETE FROM courses WHERE id = $1 RETURNING *",
      [id]
    );
    if (result.rows.length === 0)
      return res.status(404).json({ error: "Course not found" });

    res.status(200).json({ message: "Course deleted successfully" });
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to delete course", details: err.message });
  }
};
