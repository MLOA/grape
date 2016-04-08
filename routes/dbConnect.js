var mongoose = require('mongoose');

var con = mongoose.connect('mongodb://localhost:27017/ramen');
var db = con.connection;

module.exports = db;