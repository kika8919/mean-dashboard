"use strict";
const mongoose = require("mongoose");

const dashboardCardSchema = new mongoose.Schema(
  {
    type: { required: true, type: String },
    description: { required: true, type: String },
    cols: { required: true, type: Number },
    rows: { required: true, type: Number },
    enabled: { default: true, type: Boolean },
    heading: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("dashboardCard", dashboardCardSchema);
