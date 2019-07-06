/**
 * add request id for all request
 * Replace this with  `uuid/v4` package for production
 */

let counter = 0;
module.exports = function(req, res, next) {
	req.id = String(counter++);
	next();
};
