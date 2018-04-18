const MyMail = require('./db_create')
var Mail = MyMail.Mail;
const MyThread = require('./db_create')
var Thread = MyThread.Thread;
const Sequelize = require('sequelize')
const Op = Sequelize.Op

console.log(Mail);

const Imap = require('imap'),
    parser = require('mailparser').simpleParser,
    Promise = require('bluebird');

const imap = new Imap({
    user: 'innovative.project@outlook.com',
    password: 'MailingGroup',
    host: 'imap-mail.outlook.com',
    port: 993,
    tls: true
  });


  Promise.promisifyAll(imap);

  imap.once("ready", execute);
  imap.once("error", function(err) {
    console.error("Connection error:" + err.stack);
  });
  imap.connect();

  function execute() {
    imap.openBoxAsync("INBOX", false).then(function() {
      return imap.searchAsync(["UNSEEN"]);
    }).then(function(results) {
      imap.setFlags(results, ['\\Seen'], function(err) {
        if (!err) {
            console.log("Marked as read");
        } else {
            console.log(JSON.stringify(err, null, 2));
        }
      });

      var f = imap.fetch(results, {
        bodies: [""]
      });
      f.on("message", processMessage);
      f.once("error", function(err) {
        return Promise.reject(err);
    });
    f.once("end", function() {
      console.info("Done fetching all unseen messages.");
      imap.end();
    });
    }).catch(function (err) {
      console.error("Error fetching messages: " + err.stack);
      imap.end();
    });

  }

function isThread(mail) {
      return !mail.references;
}

function processMail(mail) {

    var [ref] = String(mail.references).split(",");

    Mail.create({
        Subject: mail.subject,
        From: mail.from.value[0].address,
        To: mail.to.value[0].address,
        Date: mail.date,
        Text: mail.text,
        TextAsHtml: mail.html,
        messageId: mail.messageId,
        reference: ref
    });

    Thread.update({
            threadDate: mail.date
        },
        {
            where: {
                [Op.and]:
                    [
                        {messageId: ref},
                        {Date: {[Op.lt]: mail.date}}

                    ]
            }
        }
    );
}


function processThreads(mail) {

    Thread.create({
        Subject: mail.subject,
        From: mail.from.value[0].address,
        To: mail.to.value[0].address,
        Date: mail.date,
        threadDate: mail.date,
        Text: mail.text,
        TextAsHtml: mail.html,
        messageId: mail.messageId
    });
}

function processMessage(msg, seqno) {

    msg.on("body", function (stream) {
        parser(stream).then(mail => {
            if(isThread(mail)) {
                processThreads(mail);
            } else {
                processMail(mail);
            }
        });
    });
}

  module.exports=imap;
