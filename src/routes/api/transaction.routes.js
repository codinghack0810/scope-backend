const router = require("express").Router();
const transactionController = require("../../controllers/transaction.controller");

router.get("/", transactionController.test);
router.post("/create/:userId/:serviceId", transactionController.create);
router.put("/update/:userId/:serviceId", transactionController.update);
router.delete("/delete/:userId/:serviceId", transactionController.deleteTrans);
router.put("/paid/:userId/:serviceId", transactionController.paid);

module.exports = router;
