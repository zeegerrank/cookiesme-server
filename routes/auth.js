const express = require("express");
const router = express.Router();

const User = require("../models/User");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");

// Register endpoint
router.post(
  "/register",
  body("email").isEmail().normalizeEmail(),
  async (req, res) => {
    const { email, password } = req.body;
    console.log(email, password);

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    console.log(hashedPassword);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send({ errors: errors.array() });
    }

    // try {
    //   if (body("email").isEmpty()) {
    //     throw Error("No Email");
    //   }
    //   if (body("email").isNot().isEmail()) {
    //     throw Error("Email invalid");
    //   }
    // } catch (error) {
    //   console.error(error);
    //   return;
    // }

    const user = new User({
      email,
      password: hashedPassword,
      createdAt: new Date().toUTCString(),
    });

    console.log(user);

    res.status(200);

    // try {
    // } catch (error) {
    //   res.status(400).send(error);
    // }
  }
);

// Login endpoint
router.post("/login", (req, res) => {
  // check if email exists
  User.findOne({ email: req.body.email })

    // if email exists
    .then((user) => {
      // compare the password entered and the hashed password found
      bcrypt
        .compare(req.body.password, user.password)

        // if the passwords match
        .then((passwordCheck) => {
          // check if password matches
          if (!passwordCheck) {
            return res.status(400).send({
              error: 101,
              message: "Passwords does not match",
            });
          }

          //   create JWT token
          const token = jwt.sign(
            {
              userId: user._id,
              userEmail: user.email,
            },
            "RANDOM-TOKEN",
            { expiresIn: "24h" }
          );

          //   return success res
          res.status(200).send({
            message: "Login Successful",
            email: user.email,
            token,
          });
        })
        // catch error if password does not match
        .catch((error) => {
          res.status(400).send({
            error: 102,
            message: "Passwords does not match",
          });
        });
    })
    // catch error if email does not exist
    .catch((error) => {
      res.status(404).send({
        error: 103,
        message: "Email not found",
      });
    });
});

module.exports = router;
