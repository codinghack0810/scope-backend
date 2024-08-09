const mysql = require("mysql2");
const dotenv = require("dotenv");

dotenv.config();

async function dbConnect() {
  const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE, // Use the name of the database you created
  });

  // Connect to the MySQL database
  db.connect((err) => {
    if (err) {
      console.error("Error connecting to the database: " + err.stack);
      return;
    }
    console.log("Connected to the database as ID " + db.threadId);
  });
}

module.exports = dbConnect;
