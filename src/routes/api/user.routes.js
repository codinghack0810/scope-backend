const router = require("express").Router();
const userController = require("../../controllers/user.controller");

router.get("/", userController.test);
router.post("/signup", userController.signup);
router.post("/signin", userController.signin);
router.post("/signout", userController.signout);
router.put("/updateuser/:id", userController.updateUser);

module.exports = router;
