var mongoose = require('mongoose');

var Schema = mongoose.Schema;
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

module.exports = mongoose.model('Post', postSchema);