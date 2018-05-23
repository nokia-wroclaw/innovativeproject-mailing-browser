var elasticsearch = require('elasticsearch')
var client = new elasticsearch.Client({
    host: 'localhost:9200',
    log: [{type: "stdio", levels: ["error"]}]
});

// client.indices.create({
//     index: 'threads'
// });

// client.indices.create({
//     index: 'mails'
// });

// client.delete({
//     index: 'threads',
//     type: 'thread',
//     id: '1'
// }, function (error, response) {

// });

// client.indices.delete({
//     index: '*'
// }, function (error, response) {

// });

//
//
//
//
//grrWWGMB95YZjs4mYCwm
//g7rZWGMB95YZjs4mzSz0
//hbrgWGMB95YZjs4mtCxE
//hLreWGMB95YZjs4mzSw4
//console.log(Mail);

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

    var ref = String(mail.references).split(",");

    var names = null;
    for(i = 0; i < mail.attachments.length; i++){
        var filename = mail.attachments[i].filename;
        var extension = String(filename).split(".");
        var name = uuidv4() + "." + extension[1];
        console.log(mail.attachments.length);
        require('fs').writeFile("./att/" + name, mail.attachments[i].content, 'base64', function(err) {
            console.log(err);
        });

        names += name + " ";
    }

    client.search({
        index: 'threads',
        q: ref[0]
    }, function (error, response) {
        client.index({
            index: 'mails',
            type: 'mail',
            body: {
                Subject: mail.subject,
                From: mail.from.value[0].address,
                To: mail.to.value[0].address,
                Date: mail.date,
                Text: mail.text,
                TextAsHtml: mail.html,
                messageId: mail.messageId,
                reference: ref[0],
                threadId: response.hits.hits[0]._id,
                Att: names
            }
        }, function (error, response) {
            if(error) {
                console.log("Error:");
                console.log(error);
            }
            if(response) {
                console.log("Response:");
                console.log(response);
            }
        });

        client.update({
            index: 'threads',
            type: 'thread',
            id: response.hits.hits[0]._id,
            body: {
                doc: {
                    ThreadDate: mail.date,
                    NumberOfReplies: response.hits.hits[0]._source.NumberOfReplies + 1
                }
            }
        });
    });

    // client.index({
    //     index: 'mails',
    //     type: 'mail',
    //     id: '1',
    //     body: {
    //         Subject: mail.subject,
    //         From: mail.from.value[0].address,
    //         To: mail.to.value[0].address,
    //         Date: mail.date,
    //         Text: mail.text,
    //         TextAsHtml: mail.html,
    //         messageId: mail.messageId,
    //         reference: ref[0],
    //         threadId: thread._id,
    //         Att: names
    //     }
    // }, function (error, response) {
    //     if(error) {
    //         console.log("Error:");
    //         console.log(error);
    //     }
    //     if(response) {
    //         console.log("Response:");
    //         console.log(response);
    //     }
    // });




    // Thread.find({
    //     where: {
    //         messageId: ref
    //     }
    // }).then((result) => {
    //     Mail.create({
    //         Subject: mail.subject,
    //         From: mail.from.value[0].address,
    //         To: mail.to.value[0].address,
    //         Date: mail.date,
    //         Text: mail.text,
    //         TextAsHtml: mail.html,
    //         messageId: mail.messageId,
    //         reference: ref,
    //         threadId: result.id

    //         //  }).then(function(record){
    //         //   return record.setThread(result);
    //         //   });
    //     });

    // client.update({
    //     index: 'threads',
    //     type: 'thread',
    //     id: thread._id,
    //     body: {
    //         doc: {
    //             threadDate: mail.date,
    //             NumberOfReplies: NumberOfReplies+1
    //         }
    //     }
    // });



    // Thread.update({
    //         threadDate: mail.date},
    //         {
    //             where: {
    //                 [Op.and]:
    //                     [
    //                         {messageId: ref},
    //                         {Date: {[Op.lt]: mail.date}}
    //                     ]
    //             }
    //         }
    // );
    //     Thread.update({
    //         NumberOfReplies: Sequelize.literal('"NumberOfReplies" + 1')},
    //         {
    //             where: {messageId: ref}
    //         }
    //     );

    // });
}


function processThreads(mail) {

    // Thread.create({
    //     Subject: mail.subject,
    //     From: mail.from.value[0].address,
    //     To: mail.to.value[0].address,
    //     Date: mail.date,
    //     threadDate: mail.date,
    //     Text: mail.text,
    //     TextAsHtml: mail.html,
    //     messageId: mail.messageId,
    //     NumberOfReplies: 0
    // });
    var names = null;
    for(i = 0; i < mail.attachments.length; i++){
        var filename = mail.attachments[i].filename;
        var extension = String(filename).split(".");
        var name = uuidv4() + "." + extension[1];
        console.log(mail.attachments.length);
        require('fs').writeFile("./att/" + name, mail.attachments[i].content, 'base64', function(err) {
            console.log(err);
        });

        names += name + " ";
    }

    client.index({
        index: 'threads',
        type: 'thread',
        body: {
            Subject: mail.subject,
            From: mail.from.value[0].address,
            To: mail.to.value[0].address,
            Date: mail.date,
            ThreadDate: mail.date,
            Text: mail.text,
            TextAsHtml: mail.html,
            MessageId: mail.messageId,
            NumberOfReplies: 0,
            Att: names
        }
    }, function (error, response) {
        if(error) {
            console.log("Error:");
            console.log(error);
        }
        if(response) {
            console.log("Response:");
            console.log(response);
        }
    });  

    // client.indices.refresh({
    //     index: 'threads'
    // });
}

function processMessage(msg, seqno) {

    msg.on("body", function (stream) {
        parser(stream).then(mail => {
            if (isThread(mail)) {
                processThreads(mail);
            } else {
                // processMail(mail);
            }
        });
    });
}

// setInterval(execute, 2500);
module.exports.client = client;
module.exports.imap = imap;
