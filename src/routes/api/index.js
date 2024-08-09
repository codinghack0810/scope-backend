const express = require("express");
const router = express.Router();

const userRoutes = require("./user.routes");
// const authRoutes = require("./authRoutes");

// router.use("/auth", authRoutes);
router.use("/user", userRoutes);

module.exports = router;
