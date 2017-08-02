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
        request.query('select * from SalesLT.Address',function(err,recordset){
            if(err) console.log(err);

    //send records as a response
            res.send(recordset);
        });
    });

    //res.render('index', { title: 'Express' });
});

module.exports = router;