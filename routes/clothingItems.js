// ROUTES
const itemRouter = require("express").Router();
const {
  getClothingItems,
  createClothingItem,
  deleteClothingItem,
  likeClothingItem,
  dislikeClothingItem,
} = require("../controllers/clothingItems");

itemRouter.get("/", getClothingItems);
itemRouter.post("/", createClothingItem);
itemRouter.delete("/:id", deleteClothingItem);
itemRouter.put("/:id/likes", likeClothingItem);
itemRouter.delete("/:id/likes", dislikeClothingItem);

module.exports = itemRouter;
