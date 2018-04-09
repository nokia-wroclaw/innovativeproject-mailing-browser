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
router.get('/', function(req, res, next) {
    var id = req.params[0];
    Mail.findAll({
      where: {
        reference: Thread.messageId
      }
    }).then((result)=>{
      res.json(result); //to list all mails
    res.end();
    })


});

router.get('/:id', function(req, res, next) {
      Mail.findAll({
        where: {
          id: req.params.id
        }
      }).then((result)=>{
        Mail.findAll({
          where: {
            reference: result[0].messageId
          }
        }).then((result2)=>{
          res.json(result2)
          res.end();
        })
        
      })
  });

module.exports = router;