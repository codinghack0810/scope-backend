const mysql = require("mysql2")
const dotenv = require("dotenv");

dotenv.config();

async function dbConnect() {

  const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
  })

  db.connect((err) => {
    if (err) {
      console.error('Database connection failed: ' + err.stack)
      return
    } else {  
      console.log('Connected to database.');      
    }
  })
}

module.exports = dbConnect;
