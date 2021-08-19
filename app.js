const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const HttpCode = require("./helpers/codes-constants");

const contactsRouter = require("./routes/api/api-contacts");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use("/api/contacts", contactsRouter);

app.use((req, res) => {
  res.status(HttpCode.NOT_FOUND).json({ status: "error", code: HttpCode.NOT_FOUND, message: err.message });
});

app.use((err, req, res, next) => {
  const status = err.status || HttpCode.INTERAL_SERVE_ERROR;
  res.status(status).json({ status: "fail", code: status, message: err.message });
});

module.exports = app;
