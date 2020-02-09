const Validator = require("validator");
const _ = require("lodash");

module.exports = function validateEmailReset(data) {
  let errors = {};

  data.oldEmail = !_.isEmpty(data.oldEmail) ? data.oldEmail : "";
  data.newEmail = !_.isEmpty(data.newEmail) ? data.newEmail : "";

  //Password Validator
  if (Validator.isEmpty(data.oldEmail)) {
    errors.oldEmail = "Email field is empty.";
  }
  if (!Validator.isLength(data.oldEmail, { min: 6, max: 50 })) {
    errors.oldEmail = "Email address must be between 6 and 50 characters.";
  }

  return {
    errors,
    isValid: _.isEmpty(errors)
  };
};