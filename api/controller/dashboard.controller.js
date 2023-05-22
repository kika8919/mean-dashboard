"use strict";
const mongoose = require("mongoose");
const { ObjectId } = require("mongodb");

const dasboardController = {};

dasboardController.getbarChartdata = (req, res, next) => {
  try {
    res.json({
      labels: ["2006", "2007", "2008", "2009", "2010", "2011", "2012"],
      datasets: [
        { data: [65, 59, 80, 81, 56, 55, 40], label: "Series A" },
        { data: [28, 48, 40, 19, 86, 27, 90], label: "Series B" },
      ],
    });
  } catch (err) {
    next(err);
  }
};

dasboardController.getLineChartdata = (req, res, next) => {
  try {
    res.json({
      labels: ["January", "February", "March", "April", "May", "June", "July"],
      datasets: [
        {
          data: [65, 59, 80, 81, 56, 55, 40],
          label: "Series A",
          fill: true,
          tension: 0.5,
          borderColor: "black",
          backgroundColor: "rgba(255,0,0,0.3)",
        },
      ],
    });
  } catch (err) {
    next(err);
  }
};

dasboardController.getPieChartdata = (req, res, next) => {
  try {
    res.json({
      datasets: [
        {
          data: [300, 500, 100],
        },
      ],
      labels: ["Download Sales", "In-Store Sales", "Mail-order-Sales"],
    });
  } catch (err) {
    next(err);
  }
};

dasboardController.getDoughnutChartdata = (req, res, next) => {
  try {
    res.json({
      datasets: [
        { data: [350, 450, 100], label: "Series A" },
        { data: [50, 150, 120], label: "Series B" },
        { data: [250, 130, 70], label: "Series C" },
      ],
      labels: ["Download Sales", "In-Store Sales", "Mail-Order Sales"],
    });
  } catch (err) {
    next(err);
  }
};

dasboardController.getTableChartdata = (req, res, next) => {
  try {
    res.json([
      { position: 1, name: "Hydrogen", weight: 1.0079, symbol: "H" },
      { position: 2, name: "Helium", weight: 4.0026, symbol: "He" },
      { position: 3, name: "Lithium", weight: 6.941, symbol: "Li" },
      { position: 4, name: "Beryllium", weight: 9.0122, symbol: "Be" },
      { position: 5, name: "Boron", weight: 10.811, symbol: "B" },
      { position: 6, name: "Carbon", weight: 12.0107, symbol: "C" },
      { position: 7, name: "Nitrogen", weight: 14.0067, symbol: "N" },
      { position: 8, name: "Oxygen", weight: 15.9994, symbol: "O" },
      { position: 9, name: "Fluorine", weight: 18.9984, symbol: "F" },
      { position: 10, name: "Neon", weight: 20.1797, symbol: "Ne" },
      { position: 11, name: "Sodium", weight: 22.9897, symbol: "Na" },
      { position: 12, name: "Magnesium", weight: 24.305, symbol: "Mg" },
      { position: 13, name: "Aluminum", weight: 26.9815, symbol: "Al" },
      { position: 14, name: "Silicon", weight: 28.0855, symbol: "Si" },
      { position: 15, name: "Phosphorus", weight: 30.9738, symbol: "P" },
      { position: 16, name: "Sulfur", weight: 32.065, symbol: "S" },
      { position: 17, name: "Chlorine", weight: 35.453, symbol: "Cl" },
      { position: 18, name: "Argon", weight: 39.948, symbol: "Ar" },
      { position: 19, name: "Potassium", weight: 39.0983, symbol: "K" },
      { position: 20, name: "Calcium", weight: 40.078, symbol: "Ca" },
    ]);
  } catch (err) {
    next(err);
  }
};

module.exports = { dasboardController };
