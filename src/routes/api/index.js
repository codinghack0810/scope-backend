const router = require("express").Router();
const userRoutes = require("./user.routes");
const serviceRoutes = require("./service.routes");
const transactionRoutes = require("./transaction.routes");

router.use("/user", userRoutes);
router.use("/service", serviceRoutes);
router.use("/transaction", transactionRoutes);

module.exports = router;