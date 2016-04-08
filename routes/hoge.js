var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var db = require("./dbConnect");
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function(callback){
   //console.log("connect successfuly!"); 
});

//mongo
var User = require("./schema/user_model");
var Post = require('./schema/post_model');

/* GET users listing. */
router.get('/', function(req, res, next) {
  //res.send('hoge with a resource');
    var query = {};
    Post
      .find({query})
      .populate('author_id')
      .populate('liked')
      .populate('shared')
      .exec(function(err, docs) {
        if(err) throw new Error(err);
        //console.log(docs);
        res.json(docs);
        
        /*
        Post.populate(docs,{
            path: 'liked',
            model: 'User'
        }, function(err, docs) {
            if(err) throw new Error(err);
            //console.log(docs);
        });
        */
        //mongoose.disconnect();
    });
    
});

module.exports = router;
