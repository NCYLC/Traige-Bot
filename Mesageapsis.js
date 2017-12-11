var message=require('.//Server.js');
var bodyParser = require('body-parser');// to read data from req.body
var multer = require('multer');//to read objectified data
message.use(bodyParser.json()); // for parsing application/json
message.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

message.post('/watson',data,function (req, res, next) {
    console.log(req.body);
    res.json(req.body);
  });