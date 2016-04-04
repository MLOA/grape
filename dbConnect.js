var mongoose = require('mongoose');

var con = mongoose.connect('mongodb://localhost:27017/ramen');
var db = con.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function(callback){
   //console.log("connect successfuly!"); 
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


function insertTest1(){
    var insertUser = new User();
    insertUser.user_id = "umibudo";
    insertUser.screen_name = "すし食べたい";
    insertUser.attribute = ["seppuku","umaru","ddr"];
    insertUser.save(function(err){
        if(err){
            console.log(err);
        } else{
            console.log("insert success!!!!");
        }
    });
}
//insertTest1();

function insertTest2(){
    var insertPost = new Post();
    insertPost.author_id = "56fe9a62ff64b4f445e264f4";
    insertPost.text = "やめてめう！せっかくいれたデータなんだめう！";
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
//insertTest2();

function findtest(){
    var query = {};
    Post.find({query})
    .populate('author_id')
    .populate('liked')
    .populate('shared')
    .exec(function(err, docs) {
        if(err) throw new Error(err);
        console.log(docs);
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
}
//findtest();

function postDel(_id){
    var targetId = _id;
    Post.findByIdAndRemove(targetId)
    .exec(function(err, docs) {
        if(err) throw new Error(err);
        //データが無くてもsuccess帰ってくるよ注意
        console.log("del success");
    });
}
//postDel("5702389c732e7e46e0e6f903");

function updatelike(_idP,_idU){
    var targetPostId = _idP;
    var fromUserId = { liked : _idU };
    Post.findByIdAndUpdate(targetPostId,{ liked : "56fa23976876877b50a0f3f" })
    .exec(function(err, docs) {
        if(err) throw new Error(err);
        //データが無くてもsuccess帰ってくるよ注意
        console.log("update success");
    });
}
//updatelike("57023f24cf8c040ff9551569","56fa23976876877b50a0f3f");