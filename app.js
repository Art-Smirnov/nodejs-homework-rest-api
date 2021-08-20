const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const HttpCode = require("./helpers/codes-constants");

const api = require("./api");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(cors());
app.use(logger(formatsLogger));
app.use(express.json());

app.use("/api/contacts", api.contacts);

app.use((err, req, res, next) => {
  res.status(HttpCode.NOT_FOUND).json({ status: "error", code: HttpCode.NOT_FOUND, message: err.message });
});

app.use((err, req, res, next) => {
  const status = err.status || HttpCode.INTERAL_SERVE_ERROR;
  res.status(status).json({ status: "fail", code: status, message: err.message });
});

module.exports = app;
