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
    var query = {};
    Post
      .find({query})
      //.limit(5)
      .populate('author_id')
      .populate('liked')
      .populate('shared')
      .exec(function(err, docs) {
        if(err) throw new Error(err);
        
        docs.sort(function(a,b){
          if(Date.parse(a.date) < Date.parse(b.date)) return -1;
          if(Date.parse(a.date) > Date.parse(b.date)) return 1;
          return 0;
        });
        res.json(docs);
    });
    
});

module.exports = router;
