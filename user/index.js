const express = require("express");
const router = express.Router();
const log = require("./logger");

router.get("/", function(req, res, next) {
	res.json([
		{
			name:"sandeep"
		}
	]);
});

router.post("/create", function(req, res, next) {
  let { body } = req; 
	log.debug({body});
  res.json(req.body);
});

module.exports = router;
