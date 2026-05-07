// CONTROLLER
const mongoose = require("mongoose");
const express = require("express");
const ClothingItems = require("../models/clothingItem");

// get all items
module.exports.getClothingItems = (req, res) => {
  ClothingItems.find({}).then((clothingItems) =>
    res.send({ data: clothingItems })
  );
};

// create new item
module.exports.createClothingItem = (req, res) => {
  ClothingItems.create({
    name: req.body.name,
    weather: req.body.weather,
    imageUrl: req.body.imageUrl,
    owner: req.user._id,
  })
    .then((clothingItem) => res.send({ data: clothingItem }))
    .catch((err) => {
      console.error(err);
      if (err.name === "ValidationError") {
        return res.status(400).send({ message: "Invalid data provided" });
      } else {
        return res
          .status(500)
          .send({ message: "An error has occurred on the server" });
      }
    });
};

// delete item by id
module.exports.deleteClothingItem = (req, res) => {
  const { id } = req.params;
  ClothingItems.findById(id)
    .orFail()
    .then((item) => res.send({ data: ClothingItems }));
};

// put like an item

// delete unlike an item
