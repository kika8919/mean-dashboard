"use strict";
const mongoose = require("mongoose");
const { ObjectId } = require("mongodb");
const DashboardCard = mongoose.model("dashboardCard");
const cardController = {};

cardController.getAllCard = async (req, res, next) => {
  try {
    const cards = await DashboardCard.find();
    res.json(cards);
  } catch (err) {
    console.log(err);
    next(err);
  }
};

cardController.addCard = async (req, res, next) => {
  try {
    const card = await DashboardCard.create(req.body.card);
    res.json(card);
  } catch (err) {
    console.log(err);
    next(err);
  }
};

cardController.updateCard = async (req, res, next) => {
  try {
    const updatedCard = await DashboardCard.findOneAndUpdate(
      {
        _id: new ObjectId(req.body.card.id),
      },
      { $set: req.body.card },
      { new: true }
    );
    res.json(updatedCard);
  } catch (err) {
    console.log(err);
    next(err);
  }
};

cardController.deleteCard = async (req, res, next) => {
  try {
    const result = await DashboardCard.deleteOne({
      _id: new ObjectId(req.params.id),
    });
    if (result.deletedCount) {
      res.json({ status: "success" });
    } else {
      res.status(304).send();
    }
  } catch (err) {
    console.log(err);
    next(err);
  }
};

module.exports = { cardController };
