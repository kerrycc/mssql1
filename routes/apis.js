var express = require('express');
var router = express.Router();
var sql = require('mssql');
//config for your database
var config={
    user:'kerry',
    password:'asdfQWER1234',
    server:'servercp.database.windows.net',   //這邊要注意一下!!
    database:'PVCPS',
    options: {
        encrypt: true // Use this if you're on Windows Azure
    }
};

router.get('/', function(req, res, next) {

    var sql=require('mssql');
    //config for your database
    var config={
        user:'kerry',
        password:'asdfQWER1234',
        server:'servercp.database.windows.net',   //這邊要注意一下!!
        database:'PVCPS',
        options: {
            encrypt: true // Use this if you're on Windows Azure
        }
    };

    //connect to your database
    sql.connect(config,function (err) {
        if(err) console.log(err);

        //create Request object
        var request=new sql.Request();
        request.query('select * from Message where isActive = 1').then(function(result){
            res.send(result.recordset);
        }).catch(function(err) {
            console.log('Request error: ' + err);
        }).then(function(){
            sql.close();
        });
    });

    //res.render('index', { title: 'Express' });
});

router.get('/:id', function(req, res, next) {

    var conn = new sql.ConnectionPool(config);
    //connect to your database
    conn.connect().then(function(){
        var request = new sql.Request(conn)
        request.query('select * from Message where itemid=' +  req.params.id + ' and isActive = 1').then(function(result){
            if (result.recordset.length > 0){
                res.send(result.recordset[0]);
            }else{
                res.send(null);
            }
        }).catch(function(err) {
            console.log('Request error: ' + err);
        }).then(function(){
            conn.close();
        });
    }).catch(function(err){
        console.log(err);
    });

    //res.render('index', { title: 'Express' });
});

router.post('/add', function(req, res, next) {

    var sql=require('mssql');
    //config for your database
    var config={
        user:'kerry',
        password:'asdfQWER1234',
        server:'servercp.database.windows.net',   //這邊要注意一下!!
        database:'PVCPS',
        options: {
            encrypt: true // Use this if you're on Windows Azure
        }
    };

    //connect to your database
    sql.connect(config,function (err) {
        if(err) console.log(err);

        //create Request object
        var request=new sql.Request();
        request.query('insert into Message (Msg, IsActive, CreateBy, CreateTime, UpdateBy, UpdateTime) VALUES (\'' + req.body.Msg + '\', 1, \'' + req.body.UserId + '\', GETDATE(), \'' + req.body.UserId + '\', GETDATE())').then(function(result) {
            console.log(result.rowsAffected)
            res.send(result);
        }).catch(function(err) {
            console.log('Request error: ' + err);
        }).then(function(){
            console.log('Close DB');
            sql.close();
        });;
    });

    //res.render('index', { title: 'Express' });
});

router.post('/addData', function(req, res, next) {

    var sql=require('mssql');
    //config for your database
    var config={
        user:'kerry',
        password:'asdfQWER1234',
        server:'servercp.database.windows.net',   //這邊要注意一下!!
        database:'PVCPS',
        options: {
            encrypt: true // Use this if you're on Windows Azure
        }
    };

    //connect to your database
    sql.connect(config,function (err) {
        if(err) console.log(err);

        //create Request object
        var request=new sql.Request();
        var data = JSON.parse(req.body.data);
        request.query('insert into Message (Msg, IsActive, CreateBy, CreateTime, UpdateBy, UpdateTime) VALUES (\'' + data.Msg + '\', 1, \'' + data.UserId + '\', GETDATE(), \'' + data.UserId + '\', GETDATE())').then(function(result) {
            console.log(result.rowsAffected)
            res.send(result);
        }).catch(function(err) {
            console.log('Request error: ' + err);
        }).then(function(){
            console.log('Close DB');
            sql.close();
        });;
    });

    //res.render('index', { title: 'Express' });
});

router.put('/:id', function(req, res, next) {

    var sql=require('mssql');
    //config for your database
    var config={
        user:'kerry',
        password:'asdfQWER1234',
        server:'servercp.database.windows.net',   //這邊要注意一下!!
        database:'PVCPS',
        options: {
            encrypt: true // Use this if you're on Windows Azure
        }
    };

    //connect to your database
    sql.connect(config,function (err) {
        if(err) console.log(err);

        //create Request object
        var request=new sql.Request();
        request.query('update Message set Msg = \'' + req.body.Msg +'\', UpdateBy = \'' + req.body.UserId + '\', UpdateTime = GETDATE() where ItemId = ' + req.params.id + ' and IsActive = 1').then(function(result) {
            console.log(result.rowsAffected)
            res.send(result);
        }).catch(function(err) {
            console.log('Request error: ' + err);
        }).then(function(){
            console.log('Close DB');
            sql.close();
        });;
    });

    //res.render('index', { title: 'Express' });
});

router.delete('/:id', function(req, res, next) {

    var sql=require('mssql');
    //config for your database
    var config={
        user:'kerry',
        password:'asdfQWER1234',
        server:'servercp.database.windows.net',   //這邊要注意一下!!
        database:'PVCPS',
        options: {
            encrypt: true // Use this if you're on Windows Azure
        }
    };

    //connect to your database
    sql.connect(config,function (err) {
        if(err) console.log(err);

        //create Request object
        var request=new sql.Request();
        request.query('update Message set isActive = 0 where ItemId = ' + req.params.id).then(function(result) {
            console.log(result.rowsAffected)
            res.send(result);
        }).catch(function(err) {
            console.log('Request error: ' + err);
        }).then(function(){
            console.log('Close DB');
            sql.close();
        });
    });
    //res.render('index', { title: 'Express' });
});

router.get('/test/insert', function(req, res, next) {

    var conn = new sql.ConnectionPool(config);
    //connect to your database
    conn.connect().then(function(){
        var request = new sql.Request(conn)
        var str = new Date().toJSON();
        request.query('insert into Message (Msg, IsActive, CreateBy, CreateTime, UpdateBy, UpdateTime) VALUES (\'' + str  + '\', 1, \'kerry\', GETDATE(), \'kerry\', GETDATE())').then(function(result) {
            console.log(result.rowsAffected);
            res.send(result);
        }).catch(function(err) {
            console.log('Request error: ' + err);
        }).then(function(){
            conn.close();
        });
    }).catch(function(err){
        console.log(err);
    });

});

router.get('/test/insert1', function(req, res, next) {

    var config1={
        userName:'kerry',
        password:'asdfQWER1234',
        server:'servercp.database.windows.net',   //這邊要注意一下!!
        //database:'PVCPS',
        options: {
            encrypt: true, // Use this if you're on Windows Azure
            database:'PVCPS',
            rowCollectionOnDone: true
        }
    };

    var Connection  = require('tedious').Connection;
    var Request = require('tedious').Request;

    var connection = new Connection(config1);
    connection.on('connect', function(err) {
        if (err) return console.error(err);
        //console.log("Connected");
        var str = new Date().toJSON();
        var request = new Request('insert into Message (Msg, IsActive, CreateBy, CreateTime, UpdateBy, UpdateTime) VALUES (\'' + str  + '\', 1, \'kerry\', GETDATE(), \'kerry\', GETDATE())', function(err, r) {
            if (err) { console.log(err);}
            console.log(r);
            res.send(str);
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

// Taipei
router.get('/test/insert2', function(req, res, next) {

    var config1={
        user:'cpadmin',
        password:'cpadmin@cps',
        server:'wstest.cyberpower.com',   //這邊要注意一下!!
        database:'PVCPS',
        options: {
            encrypt: true // Use this if you're on Windows Azure
        }
    };
    var conn = new sql.ConnectionPool(config1);
    //connect to your database
    conn.connect().then(function(){
        var request = new sql.Request(conn)
        var str = new Date().toJSON();
        request.query('insert into Message (Msg, IsActive, CreateBy, CreateTime, UpdateBy, UpdateTime) VALUES (\'' + str  + '\', 1, \'kerry\', GETDATE(), \'kerry\', GETDATE())').then(function(result) {
            console.log(result.rowsAffected);
            res.send(result);
        }).catch(function(err) {
            console.log('Request error: ' + err);
        }).then(function(){
            conn.close();
        });
    }).catch(function(err){
        console.log(err);
    });

});

// Taipei
router.get('/test/read2', function(req, res, next) {

    var config1={
        user:'cpadmin',
        password:'cpadmin@cps',
        server:'wstest.cyberpower.com',   //這邊要注意一下!!
        database:'PVCPS',
        options: {
            encrypt: true // Use this if you're on Windows Azure
        }
    };

    var conn = new sql.ConnectionPool(config1);
    //connect to your database
    conn.connect().then(function(){
        var request = new sql.Request(conn)
        request.query('select * from Message where itemid=1 and isActive = 1').then(function(result){
            if (result.recordset.length > 0){
                res.send(result.recordset[0]);
            }else{
                res.send(null);
            }
        }).catch(function(err) {
            console.log('Request error: ' + err);
        }).then(function(){
            conn.close();
        });
    }).catch(function(err){
        console.log(err);
    });

    //res.render('index', { title: 'Express' });
});

//Tedious
router.get('/test/read', function(req, res, next) {
    var config1={
        userName:'kerry',
        password:'asdfQWER1234',
        server:'servercp.database.windows.net',   //這邊要注意一下!!
        //database:'PVCPS',
        options: {
            encrypt: true, // Use this if you're on Windows Azure
            database:'PVCPS',
            rowCollectionOnDone: true
        }
    };

    var Connection  = require('tedious').Connection;
    var Request = require('tedious').Request;

    //
    var connection = new Connection(config1);
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

//hosting
router.get('/test/insert3', function(req, res, next) {

    var config1={
        userName:'kerry',
        password:'asdfQWER1234',
        server:'pvservice.database.windows.net',   //這邊要注意一下!!
        //database:'PVCPS',
        options: {
            encrypt: true, // Use this if you're on Windows Azure
            database:'PVCPS',
            rowCollectionOnDone: true
        }
    };

    var Connection  = require('tedious').Connection;
    var Request = require('tedious').Request;

    var connection = new Connection(config1);
    connection.on('connect', function(err) {
        if (err) return console.error(err);
        //console.log("Connected");
        var str = new Date().toJSON();
        var request = new Request('insert into Message (Msg, IsActive, CreateBy, CreateTime, UpdateBy, UpdateTime) VALUES (\'' + str  + '\', 1, \'kerry\', GETDATE(), \'kerry\', GETDATE())', function(err, r) {
            if (err) { console.log(err);}
            console.log(r);
            res.send(str);
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

//hosting
router.get('/test/read3', function(req, res, next) {
    var config1={
        userName:'kerry',
        password:'asdfQWER1234',
        server:'pvservice.database.windows.net',   //這邊要注意一下!!
        //database:'PVCPS',
        options: {
            encrypt: true, // Use this if you're on Windows Azure
            database:'PVCPS',
            rowCollectionOnDone: true
        }
    };

    var Connection  = require('tedious').Connection;
    var Request = require('tedious').Request;

    //
    var connection = new Connection(config1);
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