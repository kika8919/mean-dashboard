"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

const dotenv = require("dotenv");
dotenv.config({ debug: true });
const PORT = process.env.PORT || 3000;

require("./db/db");
require("./config/passport");

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/api", require("./routes"));

app.use((req, res, next) => {
  const err = new Error("Not found");
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  if (err) {
    console.log(`${err}`);
    res.status(err.status || 500);
    res.json({ error: { message: err.message, err } });
  }
});

app.listen(PORT, () => {
  console.log(`listening on port: ${PORT}`);
});

module.exports = app;
