const express = require("express");

const router = express.Router();

const dashboardRoute = require("./dashboard");

router.use("/dashboard", dashboardRoute);

module.exports = router;
