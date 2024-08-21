const router = require("express").Router();
const requireAuth = require("../../middlewares/requiredAuth");
const requiredVerify = require("../../middlewares/requiredVerify");
const userController = require("../../controllers/user.controller");
const verifyController = require("../../controllers/verify.controller");

router.get("/", userController.test);
router.post("/signup", userController.signup);
router.post("/verify", verifyController.sendCode);
router.put("/verify", verifyController.verifyCode);
router.post("/signin", requiredVerify, userController.signin);
router.post("/signout", requireAuth, userController.signout);
router.put("/data", requireAuth, userController.updateUser);
router.get("/search", requireAuth, userController.search);
router.get("/all", requireAuth, userController.allServices);
router.get("/forgotpwd", userController.forgotPwd);
router.post("/forgotpwd", userController.forgotPwdAnswer);
router.put("/forgotpwd", userController.forgotPwdReset);

module.exports = router;
