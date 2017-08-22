var mongoose = require("mongoose");
var settings = require('../settings');

var db = mongoose.createConnection(settings.host, settings.db, settings.port);
db.on('error', function(err) {
    console.log("error" + err);
});
db.on('connected', function(err) {
    if (err){
        console.log("connected err:" + err);
    }
});
module.exports = db;