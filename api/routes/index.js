const express = require("express");

const router = express.Router();

const dashboardRoute = require("./dashboard");
const cardRoute = require("./card");
const authRoute = require("./auth");

router.use("/dashboard", dashboardRoute);
router.use("/card", cardRoute);
router.use("/auth", authRoute);

module.exports = router;
