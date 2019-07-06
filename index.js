const express = require("express");


// instantiate
const app = express();

// listen for request
app.listen(process.env.port || 8000, function () {
	console.log('server running on port',process.env.port || 8000);
});
