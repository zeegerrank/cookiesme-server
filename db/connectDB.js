const mongoose = require("mongoose");
const connectDB = async () => {
  try {
    mongoose.set("strictQuery", true);
    await mongoose
      .connect(process.env.DB_URI, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
      })
      .then(() => {
        console.log("DB Connected");
      });
  } catch (error) {
    console.log(error);
  }
};

module.exports = connectDB;
