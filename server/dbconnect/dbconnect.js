const mongoose = require("mongoose");
const connection = mongoose.connection;
mongoose
  .connect("mongodb+srv://Abhinav:12345@todoapp.e1yteqz.mongodb.net/ToDoApp")
  .then(() => console.log("Database connected"))
  .catch((err) => console.log(err));
  module.exports = connection;
