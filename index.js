const express = require("express");
const bodyParser = require("body-parser");
const { httpLogger, errorLogger }  = require("./logger");
// modules
const user = require("./user");


const app = express();
app.use(httpLogger); // log req, res 
app.use(bodyParser.json());

// user module
app.use("/user",user);

app.get("/", function(req, res, next) {
  var x = new Error("asdf");
  x.statusCode = 400;
  throw x;
})



app.use(errorLogger, function(err, req, res, next) {
  // sanity
  if(res.headerSent) { return next(err) };
  // an error passed without statusCode is assinged 500
  err.statusCode = (err.statusCode) ? err.statusCode : 500;
  res.status(err.statusCode).send(err);
});

// listen for request
app.listen(process.env.port || 8000, function () {
	console.log('server running on port',process.env.port || 8000);
});
