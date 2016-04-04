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

function findtest(){
    var query = {};
    Post
      .find({query})
      .populate('author_id')
      .populate('liked')
      .populate('shared')
      .exec(function(err, docs) {
        if(err) throw new Error(err);
        console.log(docs);
        
        /*
        Post.populate(docs,{
            path: 'liked',
            model: 'User'
        }, function(err, docs) {
            if(err) throw new Error(err);
            //console.log(docs);
        });
        */
        docs.forEach(function(element){
            //console.log(element);
            /*
            for(var field in element._doc){
                console.log( field + " : " + element._doc[field] );
            }*/
        },this);
        
    });
}
findtest();