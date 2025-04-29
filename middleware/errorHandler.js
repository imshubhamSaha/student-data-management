const errorHandler = (err, req, res, next) => {
  console.error("❌ Error:", err.message);

  if (err.code === "ER_DUP_ENTRY") {
    return res.status(409).json({ error: "Duplicate entry for email." });
  }

  if (err.code === "ER_BAD_FIELD_ERROR") {
    return res.status(400).json({ error: "Bad request: invalid field." });
  }
  res.status(500).json({ error: "Internal Server Error" });
};

module.exports = errorHandler;
