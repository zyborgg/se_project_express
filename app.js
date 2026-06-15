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

mongoose
  .connect("mongodb://127.0.0.1:27017/wtwr_db")
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  });

app.use(cors());
app.use(express.json());

app.post("/signup", createUser);
app.post("/signin", login);
app.get("/items", getClothingItems);

// HAD TO ADD THIS TO BE ABLE TO SUBMIT MY PROJECT
// app.use((req, res, next) => {
//   if (!req.user) {
//     req.user = {
//       _id: "5d8b8592978f8bd833ca8133",
//     };
//   }
//   next();
// });

// Auth middleware applied here
app.use(auth);

// Protected routes (auth required)
app.use("/", mainRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
