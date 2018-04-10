const Sequelize = require('sequelize');
const connection = require('./db_connect'); //handle for specific database

var MyMails = require('./mailbox_connect');
var mails = MyMails.mails;


const Mail = connection.define('mail', {
    Subject: {
        type: Sequelize.STRING
    },
    From: {
        type: Sequelize.STRING
    },
    To: {
        type: Sequelize.STRING
    },
    Date: {
        type: Sequelize.DATE
    },
    Text: {
        type: Sequelize.TEXT
    },
    TextAsHtml: {
        type: Sequelize.TEXT
    },
    messageId: {
        type: Sequelize.STRING
    },
    reference: {
        type: Sequelize.STRING
    }
}, {timestamps: false});

Mail.sync().then(() => {});

module.exports.Mail = Mail;
