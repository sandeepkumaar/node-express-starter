const express = require("express");

const router = express.Router();

router.get("/create", function(req, res, next) {
 res.send("create");
});


module.exports = router;
