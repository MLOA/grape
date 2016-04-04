var express = require('express');
var router = express.Router();

router.post('/', function(req, res) {
  //res.render('index', { title: 'Expressにゃーーーん' });
  res.send('POST request to the homepage');
});
module.exports = router;