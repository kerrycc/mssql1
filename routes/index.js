var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  // var a = new Object();
  // a.InvertData = new Array();
  // var t1 = new Object();
  // t1.SN = "123";
  // t1.ModelCode = "BR600";
  // var t2 = new Object();
  // t2.SN = "456";
  // t2.ModelCode = "BR700";
  // a.InvertData.push(t1);
  // a.InvertData.push(t2);
  // var str = JSON.stringify(a);
  //
  // var b = JSON.parse(str);

    var ss = "{\"InvertData\":[{\"SN\":\"123\",\"ModelCode\":\"BR600\"},{\"SN\":\"456\",\"ModelCode\":\"BR700\"}]}";
    var sss = ss.replace("\\\"", "\"");
    var b = JSON.parse(sss);

  res.render('index', { title: 'Express' });
});

module.exports = router;
