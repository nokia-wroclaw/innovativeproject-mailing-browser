var express = require('express');
var router = express.Router();
const MyMail = require('../db_create')
var Mail = MyMail.Mail;
const MyThread = require('../db_create')
var Thread = MyThread.Thread
const Sequelize = require('sequelize')
const Op = Sequelize.Op

router.get('/:searchPhrase', function (req, res, next) {
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
        }).then((result2) => {
            console.log(result2)
            res.json(result2);
            res.end();
        });

});
module.exports = router;