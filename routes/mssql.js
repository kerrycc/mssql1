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
        request.query('select * from SalesLT.Address').then(function(recordset){
            res.send(recordset);
        }).catch(function(err) {
            console.log('Request error: ' + err);
        }).then(function(){
            console.log('Close DB');
            sql.close();
        });
    });

    //res.render('index', { title: 'Express' });
});

router.get('/update', function(req, res, next) {

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
        request.query('update SalesLT.Address set ModifiedDate = GETDATE() where AddressID < 1100').then(function(result) {
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

router.get('/insert', function(req, res, next) {

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
        request.query('insert into SalesLT.Address (AddressLine1, AddressLine2, City, StateProvince, CountryRegion, PostalCode) VALUES (\'13F.-1, No.32, Chongyang 1st St., Luzhou Dist.\', NULL, \'New Taipei\', \'Taiwan\', \'Asia\', \'24747\')').then(function(result) {
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

router.get('/delete', function(req, res, next) {

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
        request.query('delete SalesLT.Address where PostalCode = \'24747\'').then(function(result) {
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


module.exports = router;