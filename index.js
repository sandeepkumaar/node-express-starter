const express = require("express");
const uuid = require("./uuid");
const httpLogger = require("./http-logger");

const user = require("./user");
// instantiate
const app = express();
// adding unique id for every request
app.use(uuid);
// log all http req/res 
app.use(httpLogger.req);
app.use(httpLogger.res);

// user module
app.use("/user",user);

// listen for request
app.listen(process.env.port || 8000, function () {
	console.log('server running on port',process.env.port || 8000);
});
