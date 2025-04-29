const db = require("../db/init");

exports.createStudent = async (req, res, next) => {
  const { name, email, age } = req.body;
  try {
    if (!name || !email || !age) {
      const error = new Error("Name, email, and age are required.");
      error.status = 400;
      throw error;
    }

    const [result] = await db.execute(
      "INSERT INTO students (name, email, age) VALUES (?, ?, ?)",
      [name, email, age]
    );

    console.log("✅ Inserted student ID:", result.insertId);
    res.status(201).json({ id: result.insertId, name, email, age });
  } catch (err) {
    next(err);
  }
};

exports.getAllStudents = async (req, res, next) => {
  try {
    const [rows] = await db.execute("SELECT * FROM students");
    res.json(rows);
  } catch (err) {
    next(err);
  }
};

exports.getStudentById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const [rows] = await db.execute("SELECT * FROM students WHERE id = ?", [
      id,
    ]);
    if (rows.length === 0) {
      const error = new Error("Student not found.");
      error.status = 404;
      throw error;
    }
    res.json(rows[0]);
  } catch (err) {
    next(err);
  }
};

exports.updateStudent = async (req, res, next) => {
  const { id } = req.params;
  const { name, email, age } = req.body;
  try {
    const [result] = await db.execute(
      "UPDATE students SET name = ?, email = ?, age = ? WHERE id = ?",
      [name, email, age, id]
    );

    if (result.affectedRows === 0) {
      const error = new Error("Student not found.");
      error.status = 404;
      throw error;
    }

    console.log("✅ Updated student ID:", id);
    res.json({ message: "Student updated successfully" });
  } catch (err) {
    next(err);
  }
};

exports.deleteStudent = async (req, res, next) => {
  const { id } = req.params;
  try {
    const [result] = await db.execute("DELETE FROM students WHERE id = ?", [
      id,
    ]);
    if (result.affectedRows === 0) {
      const error = new Error("Student not found.");
      error.status = 404;
      throw error;
    }
    console.log("✅ Deleted student ID:", id);
    res.json({ message: "Student deleted successfully" });
  } catch (err) {
    next(err);
  }
};
