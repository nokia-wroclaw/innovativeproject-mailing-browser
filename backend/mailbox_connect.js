const Mail = require("./db_create")
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

  var mails = [];  //array of mails

  Promise.promisifyAll(imap);

  imap.once("ready", execute);
  imap.once("error", function(err) {
    console.error("Connection error:" + err.stack);
  });
  imap.connect();

  function execute() {
    imap.openBoxAsync("INBOX", false).then(function() {
      return imap.searchAsync(["ALL"]);
    }).then(function(results) {
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

  function processMessage(msg, seqno) {
    msg.on("body" , function (stream) {
      parser(stream).then(mail => {
          Mail.create({
          Subject: mail.subject,
          From: mail.from.value[0].address,
          To: mail.to.value[0].address,
          Date: mail.date,
          Text: mail.text,
          TextAsHtml: mail.html,
          messageId: mail.messageId
      });

      /*if(mail.references) {   //if there are some references
        var x = mail.references.split(",");   //split them by ','
        var ss = x[0];    //first reference is the main mail
         for(i=0; i < mails.length; i++) {    //for all main mails
          if(mails[i] != null) {    //if specific one exists
            if(mails[i][0].messageID == ss) {  //if any of existing messageIDs matches the first reference
              mails[i][mails[i].length] = {"subject" : mail.subject, "from" : mail.from.value[0].address, "to" : mail.to.value,
              "date" : mail.date, "text" : mail.text, "textAsHtml": mail.html, "number" : seqno,
              "references" : mail.references, "messageID" : mail.messageId};
            }
          }
        }
      } else {  //if there are no references - it's the main mail so just put it in the array 
        mails[seqno] = ([{"subject" : mail.subject, "from" : mail.from.value[0].address, "to" : mail.to.value,
        "date" : mail.date, "text" : mail.text, "textAsHtml": mail.html, "number" : seqno,
        "references" : mail.references, "messageID" : mail.messageId}]); 
      }*/
      })
    });
  }


  JSON.stringify(mails);  //convert json to string
  module.exports=imap;
  module.exports.mails = mails;