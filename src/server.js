const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const morgan = require("morgan");

const dbConnect = require("./config/db");
// const routes = require("./routes/api");

const app = express();

dotenv.config();
dbConnect();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

const PORT = process.env.PORT;
const HOST = process.env.HOST;

app.get("/", (req, res) => {
  res.status(200).json("⏳ Server is running!");
});

// app.use("/api/v1", routes);

app.listen(PORT, HOST, () => {
  console.log(`⏳ Server is running on http://${HOST}:${PORT}`);
});
