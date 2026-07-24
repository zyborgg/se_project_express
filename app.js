require("dotenv").config();

const express = require("express");

const mongoose = require("mongoose");

const cors = require("cors");

const { errors } = require("celebrate");

const { PORT = 3001 } = process.env;

const app = express();

const { errorLogger, requestLogger } = require("./middlewares/logger");

const errorHandler = require("./middlewares/errorHandler");

const routes = require("./routes");

if (process.env.NODE_ENV !== "test") {
  mongoose
    .connect("mongodb://127.0.0.1:27017/wtwr_db")
    .then(() => {
      console.log("Connected to MongoDB");
    })
    .catch((err) => {
      console.error("MongoDB connection error:", err);
      process.exit(1);
    });
}

app.use(cors());
app.use(express.json());

app.use(requestLogger);

app.get("/crash-test", () => {
  setTimeout(() => {
    throw new Error("Server will crash now");
  }, 0);
});

// Protected routes
app.use(routes);

// Error logging
app.use(errorLogger);

// Celebrate errors
app.use(errors());

// Centralized error handler
app.use(errorHandler);

if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

module.exports = app;
