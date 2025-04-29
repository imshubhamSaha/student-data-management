require("dotenv").config();
const express = require("express");
const app = express();
const initializeDatabase = require("./database/db-connection");
const { setDb } = require("./database/init");
const studentRoutes = require("./routes/studentRoute");
const errorHandler = require("./middleware/errorHandler");

app.use(express.json());

initializeDatabase((err, db) => {
  if (err) {
    console.error("❌ DB Initialization Error:", err.message);
    process.exit(1);
  }

  setDb(db);

  app.use("/api/students", studentRoutes);

  app.use(errorHandler);

  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`🚀 Server connected and running at http://localhost:${PORT}`);
  });
});
