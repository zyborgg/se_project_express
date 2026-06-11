// ROUTES
const userRouter = require("express").Router();
const { getCurrentUser } = require("../controllers/users");
const { updateProfile } = require("../controllers/users");

userRouter.get("/users/me", getCurrentUser);
userRouter.patch("/users/me", updateProfile);

module.exports = userRouter;
