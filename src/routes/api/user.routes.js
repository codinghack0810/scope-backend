const router = require("express").Router();
const requireAuth = require("../../middlewares/requiredAuth");
const userController = require("../../controllers/user.controller");
const verifyController = require("../../controllers/verify.controller");

router.get("/", userController.test);
router.post("/signup", userController.signup);
router.post("/verify", verifyController.sendCode);
router.put("/verify", verifyController.verifyCode);
router.post("/signin", userController.signin);
router.post("/signout", requireAuth, userController.signout);
router.put("/data", requireAuth, userController.updateUser);
router.get("/search/:key", requireAuth, userController.search);

module.exports = router;
