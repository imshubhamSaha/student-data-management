require("dotenv").config();
const mysql = require("mysql2");

const dbInit = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

const initDatabase = () => {
  return new Promise((resolve, reject) => {
    dbInit.connect((err) => {
      if (err)
        return reject(new Error("MySQL connection failed: " + err.message));

      const dbName = process.env.DB_NAME;

      /******* Create database if not exists *********/
      dbInit.query(`CREATE DATABASE IF NOT EXISTS \`${dbName}\``, (err) => {
        if (err)
          return reject(new Error("Failed to create database: " + err.message));

        /******* Connect to the specific database ********/
        const db = mysql.createConnection({
          host: process.env.DB_HOST,
          user: process.env.DB_USER,
          password: process.env.DB_PASSWORD,
          database: dbName,
        });

        db.connect((err) => {
          if (err)
            return reject(
              new Error("Failed to connect to database: " + err.message)
            );
          console.log(`✅ Connected to MySQL Database: ${dbName}`);

          /********Create the students table ***************/
          const createTableQuery = `
            CREATE TABLE IF NOT EXISTS students (
              id INT AUTO_INCREMENT PRIMARY KEY,
              name VARCHAR(100),
              email VARCHAR(100) UNIQUE,
              age INT
            )
          `;

          db.query(createTableQuery, (err) => {
            if (err)
              return reject(
                new Error("Failed to create students table: " + err.message)
              );
            console.log("✅ Table 'students' is ready.");
            resolve(db);
          });
        });
      });
    });
  });
};

module.exports = initDatabase;
