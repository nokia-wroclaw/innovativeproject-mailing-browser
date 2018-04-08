var express = require('express');
var router = express.Router();
const MyThread = require('../db_create')
var Thread = MyThread.Thread;


/* GET users listing. */
router.get('/', function(req, res, next) {
//   res.writeHead(200,{'Content-Type': 'text/html; charset=utf-8'});
//   res.contentType('text/html');
//   res.charset = 'utf-8';
//   res.write(Mail.textAsHtml);

    Thread.findAll().then((result)=>{
        res.json(result); //to list all mails
        res.end();
    })



});

module.exports = router;