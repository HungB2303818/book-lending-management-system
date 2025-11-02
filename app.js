/* eslint-disable no-unused-vars */
const express = require("express");
const cors = require("cors");
const ApiError = require("./app/api-error");

const booksRouter = require("./app/routes/book.route");
const publishersRouter = require("./app/routes/publisher.route");
const readersRouter = require("./app/routes/reader.route");
const borrowrecordsRouter = require("./app/routes/borrowrecord.route");
const EmployeesRouter = require("./app/routes/employee.route");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/books", booksRouter);
app.use("/api/publishers", publishersRouter);
app.use("/api/readers", readersRouter);
app.use("/api/borrowrecords", borrowrecordsRouter);
app.use("/api/employees", EmployeesRouter);
//Trang mặc định
app.get("/", (req, res) => {
  res.json({ message: "Welcome to book lending system." });
});

app.use((req, res, next) => {
  return next(new ApiError(404, "Resource not found"));
});

app.use((err, req, res, next) => {
  console.error(err);
  return res.status(err.statusCode || 500).json({
    message: err.message || "internal Server Error",
  });
});

module.exports = app;
