var mongoose = require("mongoose");
var settings = require('../settings');

var db = mongoose.createConnection(settings.host, settings.db, settings.port);
db.on('error', function(err) {
    console.log(err);
});
module.exports = db;