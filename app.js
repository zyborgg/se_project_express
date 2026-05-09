const express = require("express");

const mongoose = require("mongoose");

const { PORT = 3001 } = process.env;

const app = express();

mongoose.connect("mongodb://127.0.0.1:27017/wtwr_db");
app.use(express.json());

app.use((req, res, next) => {
  req.user = {
    _id: "69fe680d3abe94d46b085e6d", // paste the _id of the test user created in the previous step
  };
  next();
});

const User = require("./routes/users");

const ClothingItems = require("./routes/clothingItems");

app.use("/users", User);
app.use("/items", ClothingItems);

app.use((req, res) => {
  res.status(404).json({ message: "Requested resource not found" });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
