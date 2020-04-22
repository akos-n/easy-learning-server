const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");

const usersRouter = require("./routes/users");
const graphsRouter = require("./routes/graphs");
const runAlgorithmRouter = require("./routes/run_algorithms");

const app = express();

const mongoose = require("mongoose");

const url =
  "mongodb+srv://server-admin:Psp.2474@easy-learning-db-wm4qe.mongodb.net/easy-learning";
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/users", usersRouter);
app.use("/graphs", graphsRouter);
app.use("/run-algorithm", runAlgorithmRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
});

module.exports = app;
