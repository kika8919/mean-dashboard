"use strict";

const { expressjwt: jwt } = require("express-jwt");
const secret = process.env.SECRET;

const getTokenFromHeader = (req) => {
  const [prefix, token] = req.headers.authorization?.split(" ") || [null, null];
  if (prefix === "Token" || prefix === "Bearer") {
    return token;
  }
  return null;
};

const auth = {
  required: jwt({
    secret,
    algorithms: ["HS256"],
    requestProperty: "payload",
    getToken: getTokenFromHeader,
  }),
  optional: jwt({
    secret,
    algorithms: ["HS256"],
    requestProperty: "payload",
    credentialsRequired: false,
    getToken: getTokenFromHeader,
  }),
};

module.exports = auth;
