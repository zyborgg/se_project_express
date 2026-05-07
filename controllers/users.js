// CONTROLLER
const mongoose = require("mongoose");
const express = require("express");
const User = require("../models/user");

// Get all users
module.exports.getUsers = (req, res) => {
  User.find({}).then((users) => res.send({ data: users }));
};

// Get one user by ID
module.exports.getUser = (req, res) => {
  const { id } = req.params;

  User.findById(id)
    .orFail()
    .then((user) => res.send({ data: user }));
};

// Create new user
module.exports.createUser = (req, res) => {
  const { name, avatar } = req.body;

  User.create({ name, avatar }).then((user) => res.send({ data: user }));
};
