const router = require("express").Router();
const userRouter = require("./users");
const clothingItemRouter = require("./clothingItems");

const { createUser } = require("../controllers/users");
const { login } = require("../controllers/login");

const {
  validateUserBody,
  validateLoginBody,
} = require("../middlewares/validation");

const NotFoundError = require("../errors/NotFound");

router.post("/signup", validateUserBody, createUser);
router.post("/signin", validateLoginBody, login);

router.use("/users", userRouter);
router.use("/items", clothingItemRouter);

router.use((req, res, next) => {
  next(new NotFoundError("Requested resource not Found"));
});

module.exports = router;
