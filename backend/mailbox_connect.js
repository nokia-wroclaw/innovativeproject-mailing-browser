const MyMail = require('./db_create')
var Mail = MyMail.Mail;
const MyThread = require('./db_create')
var Thread = MyThread.Thread;
const Sequelize = require('sequelize')
const Op = Sequelize.Op
const uuidv4 = require('uuid/v4');
var waitUntil = require('wait-until');

var elasticsearch = require('elasticsearch')
var client = new elasticsearch.Client({
    host: 'localhost:9200',
    log: [{type: "stdio", levels: ["error"]}]
});

const threads = [], mails = [];

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
    //TUTAJ DAC Z LIBKI wait-until ze dopoki client.search nie zwroci czegos innego niz null to niech probuje znowu
    ////~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    ////~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    ////~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    //~~~~~~~~~~~~~~~~~~~~~~~~`
    var ref = String(mail.references).split(",");

    var names = null;
    for(i = 0; i < mail.attachments.length; i++){
        var filename = mail.attachments[i].filename;
        var extension = String(filename).split(".");    
        var name = uuidv4() + "." + extension[1];
        require('fs').writeFile("./att/" + name, mail.attachments[i].content, 'base64', function(err) {
            console.log(err);
        });
        
        names += name + " ";
    }
    var search_result = null;
    var xd = null;

    waitUntil()
    .interval(200)  //???????????????????????????????????????????????????????????????
    .times(1000)     //???????????????????????????????????????????????????????????????
    .condition(function() {
        client.search({
            index: 'threads',
            body: {
                query: {
                    match_phrase: {
                       MessageId : ref[0]
                    }
                }
            }
        }, function (error, response) {
            if(response.hits.total != 0)
                search_result = response.hits;
        })
        return (search_result != null ? search_result : null);
    })
    .done(function(result) {
        // do stuff
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
                threadId: result.hits[0]._id,
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
                client.update({
                    index: 'threads',
                    type: 'thread',
                    id: result.hits[0]._id,
                    body: {
                        doc: {
                            ThreadDate: mail.date,
                            NumberOfReplies: result.hits[0]._source.NumberOfReplies + 1
                        }
                    },
                    retryOnConflict: 1000    //???????????????????????????????????????????????????????????????
                }).catch( function (error) { 
                    console.log(error);
                })
            }
        });  

        
    });
}


function processThreads(mail) {
    // console.log(threads.length);
    var names = null;
    for(i = 0; i < mail.attachments.length; i++){
        var filename = mail.attachments[i].filename;
        var extension = String(filename).split(".");    
        var name = uuidv4() + "." + extension[1];
        require('fs').writeFile("./att/" + name, mail.attachments[i].content, 'base64', function(err) {
            console.log(err);
        });
        
        names += name + " ";
    }
    return client.index({
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
                  processMail(mail);             
            }
        });
    });
}

// setInterval(execute, 2500);
module.exports.client = client;
module.exports.imap = imap;
