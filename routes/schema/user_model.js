var mongoose = require('mongoose');

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

module.exports = mongoose.model('User', userSchema);