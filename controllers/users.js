// USER CONTROLLER
const User = require("../models/user");

const ERROR = require("../utils/errors");

const bcrypt = require("bcryptjs");

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
      }
      return res
        .status(ERROR.ERROR_CODE_500)
        .send({ message: "An error has occurred on the server" });
    });
};

// Get one user by ID
module.exports.getCurrentUser = (req, res) => {
  const userId = req.user._id;

  User.findById(userId)
    .orFail()
    .then((user) => res.status(200).send({ data: user }))
    .catch((err) => {
      console.error(err);
      if (err.name === "CastError") {
        return res
          .status(ERROR.ERROR_CODE_400)
          .send({ message: "Invalid user ID" });
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
  const { name, avatar, email, password } = req.body;

  bcrypt
    .hash(password, 10)
    .then((hash) => User.create({ name, avatar, email, password: hash }))
    .then((user) => {
      const userObject = JSON.parse(JSON.stringify(user));
      delete userObject.password;
      res.status(201).send({ data: userObject });
    })
    .catch((err) => {
      console.error(err);
      if (err.name === "ValidationError") {
        return res
          .status(ERROR.ERROR_CODE_400)
          .send({ message: "Invalid data provided" });
      }
      if (err.code === 11000)
        return res
          .status(ERROR.ERROR_CODE_409)
          .send({ message: "email is not unique" });
      return res
        .status(ERROR.ERROR_CODE_500)
        .send({ message: "An error has occurred on the server" });
    });
};

// update existing user
module.exports.updateProfile = (req, res) => {
  const userId = req.user._id;
  const { name, avatar } = req.body;
  User.findByIdAndUpdate(
    userId,
    { name, avatar },
    {
      new: true,
      runValidators: true,
    }
  )
    .then((user) => {
      if (user === null) {
        return res
          .status(ERROR.ERROR_CODE_404)
          .send({ message: "User not found" });
      }
      return res.status(200).send({ data: user });
    })
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
