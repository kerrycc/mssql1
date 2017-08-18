var express = require('express');
var router = express.Router();
var Message = require('../models/message');

router.get('/insert', function(req, res, next) {
    var now = new Date();
    var str = now.toJSON();
    Message.create({
        msg : str,
        createBy: 'kerryM',
        updateTime: now,
        updateBy: 'kerryM'
    }, function(err, msg){
        if (err){
            console.log(err);
            res.send('error' + err);
        }
        res.send('ok');
    })
});

module.exports = router;