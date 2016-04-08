var express = require('express');
var router = express.Router();

var bodyParser = require('body-parser');
router.use(bodyParser.json()); 
router.use(bodyParser.urlencoded({ extended: true }));

var mongoose = require('mongoose');
var db =require("./dbConnect");
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function(callback){
   //console.log("connect successfuly!"); 
});


//mongo

var User = require("./schema/user_model");
var Post = require('./schema/post_model');


router.post('/', function(req, res) {
  //res.render('index', { title: 'Expressにゃーーーん' });
  res.send('POST request to the homepage');
});
module.exports = router;


function insertTest2(_inputText){
    var insertPost = new Post();
    insertPost.author_id = "56fe9a62ff64b4f445e264f4";
    insertPost.text = _inputText;
    //insertPost.fig = "";
    //insertPost.liked = ["56fa23976876877b50a0f3f7","56fe9a62ff64b4f445e264f4"];
    //insertPost.shared = ["56fa23976876877b50a0f3f7","56fa2b1d613a21eb57265699"];
    //insertPost.reply_from = "";
    //insertPost.reply_to = "";
    insertPost.save(function(err){
        if(err){
            console.log(err);
        } else{
            console.log("insert success!!!!");
        }
    });
}
