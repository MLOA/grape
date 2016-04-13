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
  var postID = "";
  var userID = "";
  if(req.body.postId && req.body.userId){
    // postデータはreq.body.xxxで受け取る
    postID = req.body.postId;
    userID = req.body.userId;
    update(postID,"56fa23976876877b50a0f3f7");
  }
  res.send(postID+":"+userID);
});
module.exports = router;

function update(_postId,_userId){
  var exitData = false;
  Post
    .findById(_postId)
    .exec(function(err, docs) {
        if(err) throw new Error(err);
        //console.log(docs.author_id);
        for(var i=0;i<docs.liked.length;i++){
          if(docs.liked[i]==_userId){
            exitData = true;
          }
        }
        if(exitData) {
          console.log("おるで");
        }else{
          console.log("おらんで");
          Post.update({_id: _postId},{$pushAll: {liked:[_userId]}},function(err){
            if(err){
              console.log(err);
            }else{
              console.log("Successfully added");
            }
          });
        }
    });
}