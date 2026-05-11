const ClothingItems = require("../models/clothingItem");

const ERROR = require("../utils/errors");

// get all items
module.exports.getClothingItems = (req, res) => {
  ClothingItems.find({})
    .then((clothingItems) => res.send({ data: clothingItems }))
    .catch((err) => {
      console.error(err);
      if (err.name === "TypeError") {
        return res
          .status(ERROR.ERROR_CODE_400)
          .send({ message: "Invalid data provided" });
      }
      return res
        .status(ERROR.ERROR_CODE_500)
        .send({ message: "An error has occurred on the server" });
    });
};

// create new item
module.exports.createClothingItem = (req, res) => {
  ClothingItems.create({
    name: req.body.name,
    weather: req.body.weather,
    imageUrl: req.body.imageUrl,
    owner: req.user._id,
  })
    .then((clothingItem) => res.status(201).send({ data: clothingItem }))
    .catch((err) => {
      console.error(err);
      if (err.name === "ValidationError") {
        return res
          .status(ERROR.ERROR_CODE_400)
          .send({ message: "Invalid data provided" });
      }
      return res
        .status(ERROR.ERROR_CODE_500)
        .send({ message: "An error has occurred on the server" });
    });
};

// delete item by id
module.exports.deleteClothingItem = (req, res) => {
  const { id } = req.params;

  ClothingItems.findByIdAndDelete(id)
    .orFail()
    .then((clothingItem) => res.status(200).send(clothingItem))
    .catch((err) => {
      console.error(err);
      if (err.name === "CastError") {
        return res
          .status(ERROR.ERROR_CODE_400)
          .send({ message: "Invalid item ID format" });
      }
      if (err.name === "DocumentNotFoundError") {
        return res
          .status(ERROR.ERROR_CODE_404)
          .send({ message: "Item not found" });
      }
      return res
        .status(ERROR.ERROR_CODE_500)
        .send({ message: "An error has occurred on the server" });
    });
};

// put like an item
module.exports.likeClothingItem = (req, res) => {
  ClothingItems.findByIdAndUpdate(
    req.params.id,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .orFail()
    .then((clothingItem) => {
      res.status(200).send(clothingItem);
    })
    .catch((err) => {
      console.error(err);
      if (err.name === "CastError") {
        return res
          .status(ERROR.ERROR_CODE_400)
          .send({ message: "Invalid item ID format" });
      }
      if (err.name === "DocumentNotFoundError") {
        return res
          .status(ERROR.ERROR_CODE_404)
          .send({ message: "Item not found" });
      }
      return res
        .status(ERROR.ERROR_CODE_500)
        .send({ message: "An error has occurred on the server" });
    });
};

// dislike item
module.exports.dislikeClothingItem = (req, res) => {
  ClothingItems.findByIdAndUpdate(
    req.params.id,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .orFail()
    .then((updatedItem) => {
      res.status(200).send({ data: updatedItem });
    })
    .catch((err) => {
      console.error(err);
      if (err.name === "CastError") {
        return res
          .status(ERROR.ERROR_CODE_400)
          .send({ message: "Invalid item ID format" });
      }
      if (err.name === "DocumentNotFoundError") {
        return res
          .status(ERROR.ERROR_CODE_404)
          .send({ message: "Item not found" });
      }
      return res
        .status(ERROR.ERROR_CODE_500)
        .send({ message: "An error has occurred on the server" });
    });
};
