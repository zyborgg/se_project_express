class BadRequestError extends Error {
  constructor(message) {
    this.statusCode = 400;
  }
}

module.exports = BadRequestError;
