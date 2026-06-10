// LOGIN CONTROLLER
const User = require("../models/user");
const { JWT_SECRET } = require("../utils/config");
const jwt = require("jsonwebtoken");
const ERROR = require("../utils/errors");

module.exports.login = (req, res) => {
  User.findUserByCredentials({
    email: req.body.email,
    password: req.body.password,
  })
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: "7d",
      });
      res.send({ token });
    })
    .catch((err) => {
      console.error(err);
      if (err.name === "CredentialFailure") {
        return res
          .status(ERROR.ERROR_CODE_401)
          .send({ message: "Invalid Credentials" });
      }
    });
};
