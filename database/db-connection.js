const mysql = require("mysql2");

const dbInit = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

const initializeDatabase = (callback) => {
  dbInit.connect((err) => {
    if (err) return callback(err);

    dbInit.query(
      `CREATE DATABASE IF NOT EXISTS \`${process.env.DB_NAME}\``,
      (err) => {
        if (err) return callback(err);

        const db = mysql.createConnection({
          host: process.env.DB_HOST,
          user: process.env.DB_USER,
          password: process.env.DB_PASSWORD,
          database: process.env.DB_NAME,
        });

        db.connect((err) => {
          if (err) return callback(err);
          console.log(`✅ Connected to DB: ${process.env.DB_NAME}`);

          const createTable = `
          CREATE TABLE IF NOT EXISTS students (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(100),
            email VARCHAR(100) UNIQUE,
            age INT
          )`;

          db.query(createTable, (err) => {
            if (err) return callback(err);
            console.log("✅ Table 'students' is ready.");
            callback(null, db);
          });
        });
      }
    );
  });
};

module.exports = initializeDatabase;
