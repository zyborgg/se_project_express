// ROUTES
const userRouter = require("express").Router();
const { getCurrentUser, updateProfile } = require("../controllers/users");
const { validateUpdateProfile } = require("../middlewares/validation");

userRouter.get("/me", getCurrentUser);
userRouter.patch("/me", validateUpdateProfile, updateProfile);

module.exports = userRouter;
