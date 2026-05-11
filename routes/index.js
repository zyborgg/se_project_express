const router = require("express").Router();
const userRouter = require("./users");
const clothingItemRouter = require("./clothingItems");
const { ERROR_CODE_404 } = require("../utils/errors");

router.use("/users", userRouter);
router.use("/items", clothingItemRouter);

router.use((req, res) => {
  res.status(ERROR_CODE_404).send({ message: "Requested resource not found" });
});

module.exports = router;
