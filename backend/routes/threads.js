var express = require('express');
var router = express.Router();
const MyThread = require('../db_create')
var Thread = MyThread.Thread;
const Sequelize = require('sequelize')
const Op = Sequelize.Op
const MyMail = require('../db_create')
var Mail = MyMail.Mail;

/* GET users listing. */

router.get('/', function(req, res, next) {
    Mail.findAll({
        where: {
            reference: {
            [Op.eq] : ''
            }
        }
    }).then((result)=>{
        res.json(result);
        res.end();
    })
});

module.exports = router;