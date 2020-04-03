if (process.env.NODE_ENV !== "production")
  require("dotenv").config();

let config = {
  databaseURL: process.env.databaseURL
};
module.exports = config;
