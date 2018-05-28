const MyMail = require('./db_create')
var Mail = MyMail.Mail;
const MyThread = require('./db_create')
var Thread = MyThread.Thread;
const Sequelize = require('sequelize')
const Op = Sequelize.Op
const {emit} = require('./socket');

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
imap.once("error", function (err) {
    console.error("Connection error:" + err.stack);
});
imap.connect();

function execute() {
    setInterval(function () {
    imap.openBoxAsync("INBOX", false).then(function () {
        return imap.searchAsync(["UNSEEN"]);
    }).then(function (results) {
        imap.setFlags(results, ['\\Seen'], function (err) {
            if (!err) {
                console.log("Marked as read");
                //Sockets
                emit("event");
            } else {
                console.log(JSON.stringify(err, null, 2));
            }
        });

        var f = imap.fetch(results, {
            bodies: [""]
        });
        f.on("message", processMessage);
        f.once("error", function (err) {
            return Promise.reject(err);
        });
        f.once("end", function () {
            console.info("Done fetching all unseen messages.");        
        });
    }).catch(function (err) {
        //console.log(err);
    });

}, 2500);
}

function isThread(mail) {
    return !mail.references;
}

function processMail(mail) {

    var [ref] = String(mail.references).split(",");

    Thread.find({
        where: {
            messageId: ref
        }
    }).then((result) => {
        Mail.create({
            Subject: mail.subject,
            From: mail.from.value[0].address,
            To: mail.to.value[0].address,
            Date: mail.date,
            Text: mail.text,
            TextAsHtml: mail.html,
            messageId: mail.messageId,
            reference: ref,
            threadId: result.id

            //  }).then(function(record){
            //   return record.setThread(result);
            //   });
        }).then((mail) => {
            console.log("mailEmit:"+mail);
            emit('mail', mail);
         });

    Thread.update({
            threadDate: mail.date},
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
        Thread.update({
            NumberOfReplies: Sequelize.literal('"NumberOfReplies" + 1')},
            {
                where: {messageId: ref}
            }
        );

    });
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
        messageId: mail.messageId,
        NumberOfReplies: 0
    }).then((thread) => {
        emit('thread', thread);
     });
}

function processMessage(msg, seqno) {

    msg.on("body", function (stream) {
        parser(stream).then(mail => {
            if (isThread(mail)) {
                processThreads(mail);
            } else {
                processMail(mail);
            }
        });
    });
}



module.exports = imap;
