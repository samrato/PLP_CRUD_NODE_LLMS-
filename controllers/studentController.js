const pool = require("../config/db");

// Get all students
exports.getStudents = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM students ORDER BY id ASC");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//  Get student by ID
exports.getStudentById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query("SELECT * FROM students WHERE id = $1", [id]);
    if (result.rows.length === 0) return res.status(404).json({ error: "Student not found" });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Create student with email check
exports.createStudent = async (req, res) => {
  try {
    const { name, email, age } = req.body;

    // Validation
    if (!name || !email || !age) {
      return res.status(400).json({ error: "Name, email, and age are required" });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ error: "Invalid email format" });
    }
    if (age < 10 || age > 100) {
      return res.status(400).json({ error: "Age must be between 10 and 100" });
    }

    // Email uniqueness check
    const existing = await pool.query("SELECT * FROM students WHERE email = $1", [email]);
    if (existing.rows.length > 0) {
      return res.status(400).json({ error: "Email already exists" });
    }

    // Insert student
    const result = await pool.query(
      "INSERT INTO students (name, email, age) VALUES ($1, $2, $3) RETURNING *",
      [name, email, age]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//  Update student with email uniqueness check
exports.updateStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, age } = req.body;

    // Check if updating to a duplicate email
    if (email) {
      const existing = await pool.query("SELECT * FROM students WHERE email = $1 AND id <> $2", [email, id]);
      if (existing.rows.length > 0) {
        return res.status(400).json({ error: "Email already exists" });
      }
    }

    const result = await pool.query(
      "UPDATE students SET name = COALESCE($1, name), email = COALESCE($2, email), age = COALESCE($3, age) WHERE id = $4 RETURNING *",
      [name, email, age, id]
    );

    if (result.rows.length === 0) return res.status(404).json({ error: "Student not found" });

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//  Delete student
exports.deleteStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query("DELETE FROM students WHERE id = $1 RETURNING *", [id]);
    if (result.rows.length === 0) return res.status(404).json({ error: "Student not found" });
    res.json({ message: "Student deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
