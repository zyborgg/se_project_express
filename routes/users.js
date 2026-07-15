// ROUTES
const userRouter = require("express").Router();
const {
  getCurrentUser,
  updateProfile,
  createUser,
} = require("../controllers/users");
const { login } = require("../controllers/login");

const {
  validateUserBody,
  validateLoginBody,
} = require("../middlewares/validation");

userRouter.post("/signup", validateUserBody, createUser);
userRouter.post("/signin", validateLoginBody, login);
userRouter.get("/me", getCurrentUser);
userRouter.patch("/me", updateProfile);

module.exports = userRouter;
