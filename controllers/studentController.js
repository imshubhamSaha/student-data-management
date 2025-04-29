const { getDb } = require("../database/init");

// CREATE
exports.createStudent = (req, res, next) => {
  const { name, email, age } = req.body;
  if (!name || !email || !age)
    return res.status(400).json({ error: "All fields required." });

  const db = getDb();
  db.query(
    "INSERT INTO students (name, email, age) VALUES (?, ?, ?)",
    [name, email, age],
    (err, result) => {
      if (err) {
        if (err.code === "ER_DUP_ENTRY")
          return res.status(409).json({ error: "Email exists." });
        return next(err);
      }
      console.log("✅ Inserted:", result.insertId);
      res.status(201).json({ id: result.insertId, name, email, age });
    }
  );
};

// READ ALL
exports.getAllStudents = (req, res, next) => {
  const db = getDb();
  db.query("SELECT * FROM students", (err, results) => {
    if (err) return next(err);
    res.json(results);
  });
};

// READ BY ID
exports.getStudentById = (req, res, next) => {
  const db = getDb();
  db.query(
    "SELECT * FROM students WHERE id = ?",
    [req.params.id],
    (err, results) => {
      if (err) return next(err);
      if (results.length === 0)
        return res.status(404).json({ error: "Not found" });
      res.json(results[0]);
    }
  );
};

// UPDATE
exports.updateStudent = (req, res, next) => {
  const { name, email, age } = req.body;
  if (!name || !email || !age)
    return res.status(400).json({ error: "All fields required." });

  const db = getDb();
  db.query(
    "UPDATE students SET name = ?, email = ?, age = ? WHERE id = ?",
    [name, email, age, req.params.id],
    (err, result) => {
      if (err) {
        if (err.code === "ER_DUP_ENTRY")
          return res.status(409).json({ error: "Email exists." });
        return next(err);
      }
      if (result.affectedRows === 0)
        return res.status(404).json({ error: "Not found" });
      console.log("✅ Updated ID:", req.params.id);
      res.json({ message: "Student updated." });
    }
  );
};

// DELETE
exports.deleteStudent = (req, res, next) => {
  const db = getDb();
  db.query(
    "DELETE FROM students WHERE id = ?",
    [req.params.id],
    (err, result) => {
      if (err) return next(err);
      if (result.affectedRows === 0)
        return res.status(404).json({ error: "Not found" });
      console.log("🗑️ Deleted ID:", req.params.id);
      res.json({ message: "Student deleted." });
    }
  );
};
