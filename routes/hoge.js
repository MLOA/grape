var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');

var con = mongoose.connect('mongodb://localhost:27017/ramen');
var db = con.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function(callback){
   console.log("mongo connect successfuly!"); 
});

//mongo
var Schema = mongoose.Schema;
var userSchema = new Schema({
    user_id: String,
    screen_name: String,
    friend: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    follow: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    follower: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    post: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    like: [{ type: Schema.Types.ObjectId, ref: 'Post' }],
    attribute: [String]
    }, { _id: true }
);

var postSchema = new Schema({
    date: { type: Date, default: Date.now },
    author_id: { type: Schema.Types.ObjectId, ref: 'User' },
    text: String,
    fig: String,
    liked: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    shared: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    reply_from: [{ type: Schema.Types.ObjectId, ref: 'Post' }],
    reply_to: [{ type: Schema.Types.ObjectId, ref: 'Post' }]
    }, { _id: true }
);

var User = mongoose.model('User', userSchema);
var Post = mongoose.model('Post', postSchema);


/* GET users listing. */
router.get('/', function(req, res, next) {
  //res.send('hoge with a resource');
    var query = {};
    Post.find({query}).populate('User').exec(function(err, docs) {
        if(err) throw new Error(err);
        //console.log(docs);
        res.json(docs);
        /*
        console.log("ok");
        for (var i=0, size=docs.length; i<size; ++i) {
            console.log(docs[i]);
        }*/
        docs.forEach(function(element){
            //console.log(element);
            /*
            for(var field in element._doc){
                console.log( field + " : " + element._doc[field] );
            }*/
        
        },this);
        
    });
});

module.exports = router;
