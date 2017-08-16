var express = require('express');
var router = express.Router();
var Connection  = require('tedious').Connection;
var Request = require('tedious').Request;

var config={
    userName:'kerry',
    password:'asdfQWER1234',
    server:'pvservice.database.windows.net',   //這邊要注意一下!!
    options: {
        encrypt: true, // Use this if you're on Windows Azure
        database:'PVCPS',
        rowCollectionOnDone: true
    }
};

router.get('/insert', function(req, res, next) {
    var connection = new Connection(config);
    connection.on('connect', function(err) {
        if (err) return console.error(err);
        //console.log("Connected");
        var str = new Date().toJSON();
        var request = new Request('insert into Message (Msg, IsActive, CreateBy, CreateTime, UpdateBy, UpdateTime) VALUES (\'' + str  + '\', 1, \'kerry\', GETDATE(), \'kerry\', GETDATE())', function(err, r) {
            if (err) { console.log(err);}
            console.log(r);
            res.send(null);
            connection.close();
        });

        request.on('doneInProc', function(rowCount, more, rows) {
            //console.log('doneInProc end');
        });

        request.on('doneProc', function(rowCount, more, rows) {
            //console.log('doneProc end');
        });

        connection.execSql(request);
    });

    var a = 0;
});

router.get('/read', function(req, res, next) {
    var connection = new Connection(config);
    connection.on('connect', function(err) {
        if (err) return console.error(err);
        //console.log("Connected");
        var request = new Request('select * from Message where itemid=1 and isActive = 1', function(err, r) {
            if (err) { console.log(err);}
            res.send(result);
            connection.close();
        });
        var result = "";
        request.on('row', function(columns) {
            columns.forEach(function(column) {
                if (column.value === null) {
                    console.log('NULL');
                } else {
                    result+= column.value + " ";
                }
            });
            //console.log(result);
        });

        request.on('doneInProc', function(rowCount, more, rows) {
            //console.log('doneInProc end');
        });

        request.on('doneProc', function(rowCount, more, rows) {
            //console.log('doneProc end');
        });

        connection.execSql(request);
    });

    var a = 0;

    //res.render('index', { title: 'Express' });
});

module.exports = router;