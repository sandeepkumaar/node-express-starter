const express = require("express");
const bodyParser = require("body-parser");
const httpLogger = require("./middlewares/http-logger");
const errorLogger = require("./middlewares/error-logger");
// modules
//const user = require("./user");


const app = express();
app.use(httpLogger); // log req, res 
app.use(bodyParser.json());

// user module
//app.use("/user",user);

app.get("/", function(req, res, next) {
  var x = new Error("asdf");
  x.statusCode = 400;
  throw x;
})



app.use(errorLogger, function(err, req, res, next) {
  // when no code specified set to 500 Internal Server Error
  err.statusCode = (err.statusCode) ? err.statusCode : 500;
  res.status(err.statusCode).send(err);
});

// listen for request
app.listen(process.env.port || 8000, function () {
	console.log('server running on port',process.env.port || 8000);
});
