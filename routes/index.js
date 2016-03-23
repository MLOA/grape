var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  //res.render('index', { title: 'Expressにゃーーーん' });
  res.sendFile('/home/ubuntu/workspace/grape/html/sushi.html');
});

module.exports = router;
