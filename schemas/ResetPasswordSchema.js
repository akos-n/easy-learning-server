const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const ResetPasswordSchema = mongoose.Schema({
  userId: { type: String, unique: true },
  newPassword: { type: String },
  expires: { type: Date, expires: 600 },
});

ResetPasswordSchema.plugin(uniqueValidator);

module.exports = ResetPasswordSchema;
