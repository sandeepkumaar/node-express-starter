const express = require("express");

const router = express.Router();

router.get("/", function(req, res, next) {
	res.json([
		{
			name:"sandeep"
		}
	]);
});

router.post("/create", function(req, res, next) {
	console.log(req.body);
  res.json(req.body);
});

module.exports = router;
