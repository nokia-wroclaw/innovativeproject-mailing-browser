// import { Thread } from '../db_create';
var express = require('express');
var router = express.Router();
const MyMail = require('../db_create')
var Mail = MyMail.Mail;
const MyThread = require('../db_create')
var Thread = MyThread.Thread
const Sequelize = require('sequelize')
const Op = Sequelize.Op



/* GET users listing. */
// router.get('/', function(req, res, next) {
//     var id = req.params[0];
//     Mail.findAll({
//       where: {
//         reference: Thread.messageId
//       }
//     }).then((result)=>{
//       res.json(result); //to list all mails
//     res.end();
//     })


// });

router.get('/threads', function(req, res, next) {
  Mail.findAll({
      where: {
          reference: {
          [Op.eq] : ''
          }
      },
      order: [
          ['Date', 'DESC'],
      ]
    }).then((result)=>{
      res.json(result); //to list all mails
    res.end();
    })
});

router.get('/threads/:id', function(req, res, next) {
      Thread.findById(req.params.id).then((result)=>{
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
      })
  }) ;



module.exports = router;