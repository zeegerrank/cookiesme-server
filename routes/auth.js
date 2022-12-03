const express = require("express");const router = express.Router();

const User = require("../models/User");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const { registerValidator } = require("../validators/RegisterValidator");

// Register endpoint
router.post("/register", registerValidator, async (req, res) => {
  // Extract key from request body
  const { email, password } = req.body;

  // Check validator detection from request
  // Which passthrough registerValidator middleware
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).send({ errors: errors.array() });
  }

  // Hash password from request
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Contain user info before save execution
  const user = new User({
    email,
    password: hashedPassword,
    createdAt: new Date().toUTCString(),
  });

  // save the new user
  user
    .save()
    // return success if the new user is added to the database successfully
    .then((result) => {
      res.status(201).send({
        message: "User Created Successfully",
        result,
      });
    })
    // catch error if the new user wasn't added successfully to the database
    .catch((error) => {
      res.status(500).send({
        message: "Error creating user",
        error,
      });
    });
});

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
