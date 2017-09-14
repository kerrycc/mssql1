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

    connection.on('error', function(err){
        if (err) return console.error(err);
    });
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

router.post('/add', function(req, res, next) {
    var connection = new Connection(config);
    connection.on('connect', function(err) {
        if (err) {
            console.log(err);
            res.send("error" + err);
        }
        var request = new Request('insert into MessageTest (Msg, IsActive, CreateBy, CreateTime, UpdateBy, UpdateTime) VALUES (\'' + req.body.Msg + '\', 1, \'' + req.body.UserId + '\', GETDATE(), \'' + req.body.UserId + '\', GETDATE())', function(err, r) {
            if (err) {
                console.log(err);
                res.send("error" + err);
            }
            res.send("INSERT ok");
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
});

router.post('/addData', function(req, res, next) {
    var connection = new Connection(config);
    connection.on('connect', function(err) {
        if (err) {
            console.log(err);
            res.send("error" + err);
        }
        var data = JSON.parse(req.body.data);
        var request = new Request('insert into MessageTest (Msg, IsActive, CreateBy, CreateTime, UpdateBy, UpdateTime) VALUES (\'' + data.Msg + '\', 1, \'' + data.UserId + '\', GETDATE(), \'' + data.UserId + '\', GETDATE())', function(err, r) {
            if (err) {
                console.log(err);
                res.send("error" + err);
            }
            res.send("INSERT ok");
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
});

router.post('/addJson', function(req, res, next) {
    var connection = new Connection(config);
    connection.on('connect', function(err) {
        if (err) {
            console.log(err);
            res.send("error" + err);
        }
        var str = JSON.stringify(req.body);
        var request = new Request('insert into MessageTest (Msg, IsActive, CreateBy, CreateTime, UpdateBy, UpdateTime) VALUES (\'' + str + '\', 1, \'sys\', GETDATE(), \'sys\', GETDATE())', function(err, r) {
            if (err) {
                console.log(err);
                res.send("error" + err);
            }
            res.send("INSERT ok");
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
});

router.get('/getUTC', function(req, res, next) {
    // Date Format
    //var utc = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');

    // Timestamp
    var t = (new Date().getTime()) / 1000;
    //var date = new Date(t * 1000);
    //var year = date.getFullYear();
    //var month = date.getMonth();
    var obj = new Object();
    obj.UTCTimeStamp = t.toString();
    var str = JSON.stringify(obj);
    res.send(str);
});

router.post('/getTimeZone', function(req, res, next) {
    var mac = req.body.MAC;
    var result = 0;
    if (mac.length > 0){
        var s = mac.substring(0, 1);
        var asc = s.charCodeAt(0);
        var num = 0 ;
        if (asc >= 48 && asc <= 57 ){
             num = parseInt(s) + 1;
        }else{
            asc = s.toUpperCase().charCodeAt(0);
            if (asc >= 65 && asc <= 70 ){
                num = asc - 54;
            }
        }
        if (num > 0) num++;
        if (num % 2 == 1) num = num * -1 ;
        result = 0.5 * parseInt(num);
    }
    var obj = new Object();
    obj.TimeZone = result.toString();
    var str = JSON.stringify(obj);
    res.send(str);
});

module.exports = router;