const { body } = require("express-validator");
module.exports = {
  registerValidator: [
    body("email")
      .trim()
      .isEmail()
      .withMessage("Email must be a valid email")
      .normalizeEmail()
      .toLowerCase(),

    body("password")
      .trim()
      .isLength(2)
      .withMessage("Password too short, min 2 character require"),

    body("password2").custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Password do not match");
      }
      return true;
    }),

    body("password").custom((value, { req }) => {
      if (!value) {
        throw new Error("Require Password");
      }
      return true;
    }),
  ],
};
