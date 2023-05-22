const express = require("express");
const router = express.Router();

const {
  cardController: { getAllCard, addCard, updateCard, deleteCard },
} = require("../controller/card.controller");

router.get("/", getAllCard);
router.post("/", addCard);
router.put("/", updateCard);
router.delete("/:id", deleteCard);

module.exports = router;
