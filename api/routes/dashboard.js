const express = require("express");
const router = express.Router();
const auth = require("../config/auth");
const { dasboardController } = require("../controller/dashboard.controller");

router.get("/bar-chart", auth.required, dasboardController.getbarChartdata);
router.get("/pie-chart", auth.required, dasboardController.getPieChartdata);
router.get("/line-chart", auth.required, dasboardController.getLineChartdata);
router.get(
  "/doughnut-chart",
  auth.required,
  dasboardController.getDoughnutChartdata
);
router.get(
  "/element-table",
  auth.required,
  dasboardController.getTableChartdata
);

module.exports = router;
