var express = require("express");
var router = express.Router();
var path = require("path");
let basePath = "../public";

router.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, basePath, "index.html"));
});

router.use("/", express.static(path.join(__dirname, basePath)));

module.exports = router;
