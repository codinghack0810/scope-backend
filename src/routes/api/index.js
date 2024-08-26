const router = require("express").Router();
const userRoutes = require("./user.routes");
const transactionRoutes = require("./transaction.routes");

router.use("/user", userRoutes);
router.use("/transaction", transactionRoutes);

module.exports = router;