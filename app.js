const express = require("express");
const logger = require("morgan");
const cors = require("cors");
require('dotenv').config();

const userRouter = require("./routes/api/users");
const contactsRouter = require("./routes/api/contacts");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.use("/api/users", userRouter);
app.use("/api/contacts", contactsRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found such way!" });
});

app.use((err, req, res, next) => {
  const { message = "Server Failure", status = 500 } = err;
  res.status(status).json({ message: message });
});

module.exports = app;
