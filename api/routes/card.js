const express = require("express");
const router = express.Router();

const auth = require("../config/auth");

const {
  cardController: { getAllCard, addCard, updateCard, deleteCard },
} = require("../controller/card.controller");

router.get("/", auth.required, getAllCard);
router.post("/", auth.required, addCard);
router.put("/", auth.required, updateCard);
router.delete("/:id", auth.required, deleteCard);

module.exports = router;
