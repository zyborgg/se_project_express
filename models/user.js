const mongoose = require("mongoose");
const validator = require("validator");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    required: true,
    validate: {
      validator(value) {
        return validator.isURL(value);
      },
      message: "You must enter a valid URL",
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});

// UserSchema.statics.findUserByCredentials = function (email, password) {
//   UserSchema.findOne({ email })
//     .select("+password")
//     .then((user) => {
//       bcrypt.compare(password, user.password);
//     });
// };
// REMEMBER TO COME BACK TO THIS
UserSchema.statics.findUserByCredentials = async function (email, password) {
  try {
    const user = await this.findOne({ email: email })
      .select("+password")
      .bcrypt.compare(password, user.password);
  } catch (err) {
    console.error;
  }
};

module.exports = mongoose.model("User", UserSchema);
