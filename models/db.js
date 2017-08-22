var mongoose = require("mongoose");
var settings = require('../settings');

var db = mongoose.createConnection(settings.host, settings.db, settings.port);

module.exports = db;