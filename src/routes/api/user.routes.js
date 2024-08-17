const router = require("express").Router();
const requireAuth = require("../../middlewares/requiredAuth");
const userController = require("../../controllers/user.controller");

router.get("/", userController.test);
router.post("/signup", userController.signup);
router.post("/signin", userController.signin);
router.post("/signout", requireAuth, userController.signout);
router.post("/fill", userController.fillUser);
router.put("/update/:id", userController.updateUser);
router.get("/search/:key", userController.search);

module.exports = router;
