var mongoose = require('mongoose');
var db = require("./db");

var message = new mongoose.Schema({
    msg: String,
    createTime: { type: Date, default: Date.now },
    createBy: String,
    updateTime: Date,
    updateBy: String
});

module.exports = db.model('Message', message);