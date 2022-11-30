const express = require("express");const app = express();

// Require Cross-Origin Resource Sharing
const cors = require("cors");
// Initiate Cross-Origin Resource Sharing
app.use(cors());
app.use(express.json());

//   Welcome phrase for Deployment
app.get("/", (req, res) => {
  res.send("Welcome to the Server Side, Commander!");
});

// Require Router
const auth = require("./routes/auth");
// App use Router
app.use("/auth", auth);

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

module.exports = app;
