const express = require("express");
const router = express.Router();

const userController = require("../../controllers/user.controller");

router.get("/", userController.test);
router.post("/signup", userController.signup);
router.post("/signin", userController.signin);

module.exports = router;
