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

router.get('/xd', function (req, res, next) {
    client.indices.delete({
        index: '*'
    }, function (error, response) {
        res.end();
    });
});

router.get('/threads', function (req, res, next) {

    client.search({
        index: 'threads',
        size: 1000,
        body: {
            sort: [{"Date": { "order": "desc"}}],
            query: { match_all: {}}
        }
    }, function(error, response) {
        console.log("Response:");
        res.json(response.hits.hits);
        console.log(response);
    });   

    // client.search({    //dobry search
    //     index: 'threads',
    //     size: 1000,
    //     q: 'innovative.project@outlook.com'
    // }, function(error, response) {
    //     console.log("Response:");
    //     res.json(response.hits.hits);
    //     console.log(response);
    // });    

});

router.get('/threads/:id', function(req, res, next) {
    //   Thread.findById(req.params.id).then((result)=>{
    //     if(result == null) {
    //         res.sendStatus(404);
    //         res.end();
    //     }
    //     else {
    //         return Mail.findAll({
    //         where: {
    //             reference: result.messageId
    //          },
    //             order: [
    //                 ['Date', 'ASC'],
    //             ]
    //         }).then((result2)=>{            
    //             console.log(result, " cccccccccccccccccccccccccccccccccccccccccccasds",  result2)
    //             res.json([result,...result2]);
    //             res.end();        
    //         })  
    //     }      
    //   })
    client.search({
        index: 'threads',
        body: {
            query: {
                match_phrase: {
                    MessageId: req.params.id
                }
            }
        }
    }, function (error, response) {
        console.log(response);
        console.log(req.params.id);
    })
  })



module.exports = router;