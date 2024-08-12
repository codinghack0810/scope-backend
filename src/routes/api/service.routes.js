const router = require("express").Router();
const serviceController = require("../../controllers/service.controller");

router.get("/", serviceController.test);
router.post("/signup", serviceController.signup);

module.exports = router;