// CLOTHING ITEMS CONTROLLER
const ClothingItems = require("../models/clothingItem");

const BadRequestError = require("../errors/BadRequest");
const ForbiddenError = require("../errors/Forbidden");
const NotFoundError = require("../errors/NotFound");

// get all items
module.exports.getClothingItems = (req, res, next) => {
  ClothingItems.find({})
    .then((clothingItems) => res.send({ data: clothingItems }))
    .catch((err) => {
      console.error(err);
      if (err.name === "TypeError") {
        next(new BadRequestError("Invalid data provided"));
      } else {
        next(err);
      }
    });
};

// create new item
module.exports.createClothingItem = (req, res, next) => {
  const { name, weather, imageUrl } = req.body;

  if (!name || !weather || !imageUrl) {
    throw new BadRequestError("name, weather, and image URL are required");
  }

  ClothingItems.create({
    name,
    weather,
    imageUrl,
    owner: req.user._id,
  })
    .then((clothingItem) => res.status(201).send({ data: clothingItem }))
    .catch((err) => {
      if (err.name === "ValidationError") {
        next(new BadRequestError("Invalid data provided"));
      } else {
        next(err);
      }
    });
};

// delete item by id
module.exports.deleteClothingItem = (req, res, next) => {
  const { id } = req.params;

  ClothingItems.findById(id)
    .orFail(() => new NotFoundError("Item not found"))
    .then((clothingItem) => {
      if (!clothingItem.owner.equals(req.user._id)) {
        throw new ForbiddenError("You cannot delete this item");
      }

      return clothingItem.deleteOne().then(() => {
        res.send({ message: "Item deleted successfully" });
      });
    })
    .catch((err) => {
      if (err.name === "CastError") {
        next(new BadRequestError("Invalid item ID format"));
      } else {
        next(err);
      }
    });
};

// put like an item
module.exports.likeClothingItem = (req, res, next) => {
  ClothingItems.findByIdAndUpdate(
    req.params.id,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .orFail(() => new NotFoundError("Item not found"))
    .then((clothingItem) => {
      res.send(clothingItem);
    })
    .catch((err) => {
      if (err.name === "CastError") {
        next(new BadRequestError("Invalid item ID format"));
      } else {
        next(err);
      }
    });
};

// dislike item
module.exports.dislikeClothingItem = (req, res, next) => {
  ClothingItems.findByIdAndUpdate(
    req.params.id,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .orFail(() => new NotFoundError("Item not found"))
    .then((updatedItem) => {
      res.status(200).send({ data: updatedItem });
    })
    .catch((err) => {
      if (err.name === "CastError") {
        next(new BadRequestError("Invalid item ID format"));
      } else {
        next(err);
      }
    });
};
