const express = require("express");

const router = express.Router();

const dashboardRoute = require("./dashboard");
const cardRoute = require("./card");

router.use("/dashboard", dashboardRoute);
router.use("/card", cardRoute);

module.exports = router;
