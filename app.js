const express = require("express");
const mongoose = require("mongoose");
const { PORT = 3001 } = process.env;
const app = express();

mongoose.connect("mongodb://127.0.0.1:27017/wtwr_db");

app.use((req, res, next) => {
  req.user = {
    _id: "5d8b8592978f8bd833ca8133", // paste the _id of the test user created in the previous step
  };
  next();
});

module.exports.createClothingItem = (req, res) => {
  console.log(req.user._id); // _id will become accessible
};

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
