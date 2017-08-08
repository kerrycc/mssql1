var express=require('express');
var router = express.Router();

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
        request.query('select * from Message where itemid=' +  req.params.id + ' and isActive = 1').then(function(result){
            if (result.recordset.length > 0){
                res.send(result.recordset[0]);
            }
            res.send(null);
        }).catch(function(err) {
            console.log('Request error: ' + err);
        }).then(function(){
            sql.close();
        });
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
        var str = new Date().toJSON();
        request.query('insert into Message (Msg, IsActive, CreateBy, CreateTime, UpdateBy, UpdateTime) VALUES (\'' + str  + '\', 1, \'kerry\', GETDATE(), \'kerry\', GETDATE())').then(function(result) {
            //console.log(result.rowsAffected)
            res.send(result);
        }).catch(function(err) {
            console.log('Request error: ' + err);
            request.query('insert into ErrorMsg (Msg, From) VALUES (\'' + err  + '\', \'' + str + '\')').then(function(result1) {
                //console.log(result.rowsAffected)
                res.send(result1);
            });
        }).then(function(){
            console.log('Close DB');
            sql.close();
        });;
    });

    //res.render('index', { title: 'Express' });
});

module.exports = router;