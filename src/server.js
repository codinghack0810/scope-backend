const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const morgan = require("morgan");

const db = require("./models");
const routes = require("./routes/api");

const app = express();

// Load environment variables from .env file
dotenv.config();

// Enable Cross-Origin Resource Sharing (CORS)
app.use(cors());

// Middleware to parse JSON request bodies
app.use(express.json());
// Middleware to parse URL-encoded request bodies
app.use(express.urlencoded({ extended: true }));
// HTTP request logger middleware for logging requests to the console
app.use(morgan("dev"));

const PORT = process.env.PORT;
const HOST = process.env.HOST;

// Sync the database models with the database.
// If `force: true`, it will drop and recreate tables each time the server starts.
// Commented out alternative sync which only syncs without dropping existing tables.
// db.sequelize.sync().then(() => {
//     console.log("⏳ Database connected");
// });

// Force sync all models, which drops existing tables and re-creates them
// db.sequelize.sync({ force: true }).then(() => {
//     console.log("⏳ New Database connected");
// });

// Basic route to verify that the server is running
app.get("/", (req, res) => {
    res.status(200).json("⏳ Server is running!");
});

// Mount the API routes under "/api/v1" path
app.use("/api/v1", routes);

// Start the server and listen on specified host and port
app.listen(PORT, HOST, () => {
    console.log(`⏳ Server is running on http://${HOST}:${PORT}`);
});
