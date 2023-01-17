const express = require("express");const router = express.Router();
const Account = require("../models/Account");

router.post("/", async (req, res) => {
  try {
    const result = await Account.create({
      name: req.body.name,
      password: req.body.password,
    });
    res.send(result);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});

module.exports = router;
