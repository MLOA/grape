var mongoose = require('mongoose');

var con = mongoose.connect('mongodb://localhost:27017/ramen');
var db = con.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function(callback){
   console.log("connect successfuly!"); 
});

//mongo
var Schema = mongoose.Schema;
var userSchema = new Schema({
    user_id: String,
    screen_name: String,
    friend: [{ type: Schema.Types.ObjectId, ref: 'user' }],
    follow: [{ type: Schema.Types.ObjectId, ref: 'user' }],
    follower: [{ type: Schema.Types.ObjectId, ref: 'user' }],
    post: [{ type: Schema.Types.ObjectId, ref: 'user' }],
    like: [{ type: Schema.Types.ObjectId, ref: 'post' }],
    attribute: [String]
    }, { _id: true }
);

var postSchema = new Schema({
    date: { type: Date, default: Date.now },
    author_id: { type: Schema.Types.ObjectId, ref: 'user' },
    content: {text: String, fig: String},
    liked: [{ type: Schema.Types.ObjectId, ref: 'user' }],
    shared: [{ type: Schema.Types.ObjectId, ref: 'user' }],
    reply_from: [{ type: Schema.Types.ObjectId, ref: 'post' }],
    reply_to: [{ type: Schema.Types.ObjectId, ref: 'post' }]
    }, { _id: true }
);

var User = mongoose.model('user', userSchema);
var Post = mongoose.model('post', postSchema);


var insertUser = new User();
insertUser.user_id = "wakame";
insertUser.screen_name = "yakiniku-waiwai";
insertUser.attribute = ["sushi","niku","ddr"];
insertUser.save(function(err){
    if(err){
        console.log(err);
    } else{
        console.log("insert success!!!!");
    }
});