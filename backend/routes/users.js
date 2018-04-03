var express = require('express');
var router = express.Router();


var users = require('./db.json').users;

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.json(users);
  res.end();
});

module.exports = router;
