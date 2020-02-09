const Validator = require("validator");
const _ = require("lodash");

module.exports = function validatePasswordReset(data) {
  let errors = {};

  data.password = !_.isEmpty(data.password) ? data.password : "";
  data.repeatPassword = !_.isEmpty(data.repeatPassword) ? data.repeatPassword : "";

  //Password Validator
  if (Validator.isEmpty(data.password)) {
    errors.password = "password field is empty.";
  }
  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = "Password must be between 6 and 30 characters.";
  }
  if (data.password !== data.repeatPassword) {
    errors.password = "Passwords do not match.";
  }

  return {
    errors,
    isValid: _.isEmpty(errors)
  };
};