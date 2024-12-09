
const cors = require("cors");
const logger = require("morgan");
const compression = require("compression");
const express = require("express");
const db = require("../config/dbConnection")

function setupMiddlewares(app) {
  app.use(cors({ origin: "*" }));
  app.use(logger("dev"));
  app.use(compression({ level: 6 }));

  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  db.connect();
}

module.exports = setupMiddlewares;
