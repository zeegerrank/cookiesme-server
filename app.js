const express = require("express");const app = express();

// Listen to server port
port = process.env.PORT || 3030;
express()
  .listen(port, () => {
    console.log("Listening on port: ", port);
  })
  .on("error", (e) => {
    console.log("Error happened: ", e.message);
  });
