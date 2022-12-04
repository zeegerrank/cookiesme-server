const { body } = require("express-validator");const User = require("../models/User");

module.exports = {
  registerValidator: [
    // Check and normalize to valid email
    body("email")
      .trim()
      .isEmail()
      .withMessage("Email must be a valid email")
      .normalizeEmail()
      .toLowerCase(),

    // Check used email
    body("email").custom((localEmail) => {
      return User.findOne({ localEmail }).then((usedEmail) => {
        if (usedEmail) {
          return Promise.reject("Email is already used");
        }
      });
    }),
    body("password")
      .trim()
      .isLength(2)
      .withMessage("Password too short, min 2 character require"),

    // body("password2").custom((value, { req }) => {
    //   if (value !== req.body.password) {
    //     throw new Error("Password do not match");
    //   }
    //   return true;
    // }),

    body("password").custom((value, { req }) => {
      if (!value || value == null || value == undefined) {
        throw new Error("Require Password");
      }
      return true;
    }),
  ],
};
