const express = require("express");
const router = express.Router();
const { dasboardController } = require("../controller/dashboard.controller");

router.get("/bar-chart", dasboardController.getbarChartdata);
router.get("/pie-chart", dasboardController.getPieChartdata);
router.get("/line-chart", dasboardController.getLineChartdata);
router.get("/doughnut-chart", dasboardController.getDoughnutChartdata);
router.get("/element-table", dasboardController.getTableChartdata);

module.exports = router;
