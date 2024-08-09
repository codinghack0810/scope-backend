const express = require("express");
const router = express.Router();

const userRoutes = require("./userRoutes");
// const authRoutes = require("./authRoutes");

// router.use("/auth", authRoutes);
router.use("/user", userRoutes);

module.exports = router;
