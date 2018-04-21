var express = require('express');
var router = express.Router();
const MyMail = require('../db_create')
var Mail = MyMail.Mail;
const MyThread = require('../db_create')
var Thread = MyThread.Thread
const Sequelize = require('sequelize')
const Op = Sequelize.Op

router.get('/thread/:searchPhrase', function (req, res, next) {
    Thread.findAll({
            where: {
                    [Op.or]: [
                        { Subject : { [Op.iLike]: '%'+req.params.searchPhrase+'%' }},
                        { Text: { [Op.iLike]: '%'+req.params.searchPhrase+'%' }}
                      //  { '$Mail.Text': { [Op.iLike]: '%'+req.params.searchPhrase+'%' }}
                    ]
                },
            order: [
                ['Date', 'ASC'],
            ]
        }).then((thread) => {
            res.json(thread);
        });        
});

router.get('/answer/:searchPhrase', function (req, res, next) {
    Mail.findAll({
        where: {
            [Op.or]: [
                { Subject : { [Op.iLike]: '%'+req.params.searchPhrase+'%' }},
                { Text: { [Op.iLike]: '%'+req.params.searchPhrase+'%' }}                
            ]
        }
    }).then((answer)=>{
        var list=[];
            for(i = 0; i < answer.length; i++) {
                list.push(answer[i].reference);
            }
        Thread.findAll({
        where: {
            messageId: {
                [Op.or]: list
              }
        }
        }).then((thread)=>{
            res.json(thread);
            res.end();
        })          
    })
});
module.exports = router;