const mongoose = require("mongoose");
require("dotenv").config();

function dbConnect() {
  mongoose
    .connect(process.env.DB_URL)
    .then(console.log("✔ Database Connected!"))
    .catch((err) => {
      console.log(err);
      console.log("❌ Failed to reach Database");
    });
}

module.exports = dbConnect;
