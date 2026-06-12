const express = require("express");

const mongoose = require("mongoose");

const cors = require("cors");

const { PORT = 3001 } = process.env;

const app = express();

const mainRouter = require("./routes/index");

const { auth } = require("./middlewares/auth");

const userRouter = require("./routes/users");

const itemRouter = require("./routes/clothingItems");

const { createUser } = require("./controllers/users");

const { login } = require("./controllers/login");

const { getClothingItems } = require("./controllers/clothingItems");

mongoose.connect("mongodb://127.0.0.1:27017/wtwr_db");
app.use(cors());
app.use(express.json());

app.post("/signup", createUser);
app.post("/signin", login);
app.get("/items", getClothingItems);

// Auth middleware applied here
app.use(auth);

// Protected routes (auth required)
app.use("/", mainRouter);
app.use("/users", userRouter);
app.use("/items", itemRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
