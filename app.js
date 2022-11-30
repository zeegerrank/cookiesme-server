const express = require("express");const app = express();

// Require Database connection
const dbConnect = require("./db/dbConnect");
// Execute Database Connection
dbConnect();

// Listen to server port
port = process.env.PORT || 3030;
app
  .listen(port, () => {
    console.log("✔ Listening on port:", port);
  })
  .on("error", (e) => {
    console.log("Error happened:", e.message);
  });
