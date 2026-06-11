const ERROR = require("../utils/errors");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../utils/config");

module.exports = (req, res, next) => {
  const {
    headers: { authorization },
  } = req;
  if (authorization === undefined) {
    return res.status(ERROR.ERROR_CODE_401).json({ message: "Invalid token" });
  }
  const token = authorization.replace("Bearer ", "");

  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.user = payload;
  } catch (err) {
    return res.status(ERROR.ERROR_CODE_401).json({ message: "Invalid token" });
  }
  next();
};
