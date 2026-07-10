// ROUTES
const itemRouter = require("express").Router();
const {
  createClothingItem,
  deleteClothingItem,
  likeClothingItem,
  dislikeClothingItem,
} = require("../controllers/clothingItems");

const {
  validateClothingItemBody,
  validateId,
} = require("../middlewares/validation");

itemRouter.post("/", validateClothingItemBody, createClothingItem);
itemRouter.delete("/:id", validateId, deleteClothingItem);
itemRouter.put("/:id/likes", validateId, likeClothingItem);
itemRouter.delete("/:id/likes", validateId, dislikeClothingItem);

module.exports = itemRouter;
