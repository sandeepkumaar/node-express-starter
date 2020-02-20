const bunyan = require("bunyan");

module.exports = bunyan.createLogger({
  name: "user",
  level: process.env.NODE_ENV === "production" ? "info" : "debug"
});
