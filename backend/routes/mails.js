var express = require('express');
var router = express.Router();
const MyMail = require('../db_create')
var Mail = MyMail.Mail;
const MyThread = require('../db_create')
var Thread = MyThread.Thread
const Sequelize = require('sequelize')
const Op = Sequelize.Op
const MyClient = require('../mailbox_connect')
var client = MyClient.client;

router.get('/threads', function (req, res, next) {
    // Thread.findAll({
    //     order: [
    //         ['threadDate', 'DESC'],
    //     ]
    // }).then(result => {
    //     res.json(result);
    //     res.end();
    // });

    client.msearch({
        body: [
            { index: 'threads', type: 'thread'},
            { query: {match_all: {}}}
        ]
    }, function(error, response) {
        console.log("Response:");
        // console.log(JSON.stringify(response.responses[0].hits.hits));
        res.json(response.responses[0].hits.hits);
    });    
});

router.get('/threads/:id', function(req, res, next) {
      Thread.findById(req.params.id).then((result)=>{
        if(result == null) {
            res.sendStatus(404);
            res.end();
        }
        else {
            return Mail.findAll({
            where: {
                reference: result.messageId
             },
                order: [
                    ['Date', 'ASC'],
                ]
            }).then((result2)=>{            
                console.log(result, " cccccccccccccccccccccccccccccccccccccccccccasds",  result2)
                res.json([result,...result2]);
                res.end();        
            })  
        }      
      })
  }) ;



module.exports = router;