const router = require("express").Router();
const transactionController = require("../../controllers/transaction.controller");

router.get("/", transactionController.test);
router.post("/create/:serviceId", transactionController.create);
router.put("/update/:serviceId", transactionController.update);
router.delete("/delete/:serviceId", transactionController.deleteTrans);
router.put("/paid/:serviceId", transactionController.paid);

module.exports = router;
