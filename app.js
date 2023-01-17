require("dotenv").config();const express = require("express");
const app = express();
const logger = require("morgan");
const cors = require("cors");

const account = require("./routes/account");

const connectDB = require("./db/connectDB");
const port = process.env.PORT;

app.use(logger("dev"));
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/account", account);

connectDB();

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
