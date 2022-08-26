var mongoose = require("mongoose");
require("dotenv").config({ path: `../.env` });

const {MONGODB_URI} = process.env;

mongoose.connect(MONGODB_URI, { useNewUrlParser: true });
var conn = mongoose.connection;
conn.on("connected", function () {
  console.log("database is connected successfully");
});
conn.on("disconnected", function () {
  console.log("database is disconnected successfully");
});
conn.on("error", console.error.bind(console, "connection error:"));
