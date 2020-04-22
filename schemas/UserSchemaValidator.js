const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const UserSchemaValidator = mongoose.Schema({
  username: { type: String, unique: true },
  email: { type: String, unique: true },
  password: { type: String },
});

UserSchemaValidator.plugin(uniqueValidator);

module.exports = UserSchemaValidator;
