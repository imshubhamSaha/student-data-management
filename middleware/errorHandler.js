module.exports = (err, req, res, next) => {
  console.error(`[${new Date().toISOString()}] ❌ Error:`, err.message);
  if (err.code === "ER_DUP_ENTRY") {
    return res.status(409).json({ error: "Email already exists" });
  }
  res
    .status(err.status || 500)
    .json({ error: err.message || "Internal Server Error" });
};
