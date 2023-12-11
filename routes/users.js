var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

/* Challenge */
router.get('/cool/', function(req, res, next) {
  res.send("You're wicked cool");
});

module.exports = router;
