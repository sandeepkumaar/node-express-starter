const bunyan = require("bunyan");

module.exports = bunyan.createLogger({
  name: "user",
  // env?dev = debug
  //level: "debug"
});
