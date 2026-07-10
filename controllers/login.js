// LOGIN CONTROLLER
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const { JWT_SECRET } = require("../utils/config");

const BadRequestError = require("../errors/BadRequest");
const UnauthorizedError = require("../errors/Unauthorized");

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  // Required fields
  if (!email || !password) {
    throw new BadRequestError("Email and password are required");
  }

  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: "7d",
      });

      res.send({ token });
    })
    .catch((err) => {
      if (err.name === "CredentialFailure") {
        next(new UnauthorizedError("Invalid credentials"));
      } else {
        next(err);
      }
    });
};
