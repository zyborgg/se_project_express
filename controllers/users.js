const User = require("../models/user");

const ERROR = require("../utils/errors");

// Get all users
module.exports.getUsers = (req, res) => {
  User.find({})
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      console.error(err);
      if (err.name === "TypeError") {
        return res
          .status(ERROR.ERROR_CODE_400)
          .send({ message: "Invalid data provided" });
      } else {
        return res
          .status(ERROR.ERROR_CODE_500)
          .send({ message: "An error has occurred on the server" });
      }
    });
};

// Get one user by ID
module.exports.getUser = (req, res) => {
  const { userId } = req.params;

  User.findById(userId)
    .orFail()
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      console.error(err);
      if (err.name === "CastError") {
        return res
          .status(ERROR.ERROR_CODE_400)
          .send({ message: "Invalid user ID format" });
      }
      if (err.name === "DocumentNotFoundError") {
        return res
          .status(ERROR.ERROR_CODE_404)
          .send({ message: "User not found" });
      }
      return res
        .status(ERROR.ERROR_CODE_500)
        .send({ message: "An error has occurred on the server" });
    });
};

// Create new user
module.exports.createUser = (req, res) => {
  const { name, avatar } = req.body;

  User.create({ name, avatar })
    .then((user) => res.send({ data: user }))
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
