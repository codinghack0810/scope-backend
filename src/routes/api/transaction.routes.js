const router = require("express").Router();
const requireAuth = require("../../middlewares/requiredAuth");
const transactionController = require("../../controllers/transaction.controller");

router.get("/", transactionController.test);
router.post("/create", requireAuth, transactionController.create);
router.put("/update", requireAuth, transactionController.update);
router.delete("/delete", requireAuth, transactionController.deleteTrans);
router.put("/paid", transactionController.paid);

module.exports = router;
