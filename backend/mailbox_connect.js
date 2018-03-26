var Imap = require('imap'),
    inspect = require('util').inspect;

var imap = new Imap({
    user: 'innovative.project@outlook.com',
    password: 'MailingGroup',
    host: 'imap-mail.outlook.com',
    port: 993,
    tls: true
  });

  function encode_utf8(s) {
    return unescape(encodeURIComponent(s));
  }
  
  function decode_utf8(s) {
    return decodeURIComponent(escape(s));
  }


  function openInbox(cb) {
    imap.openBox('INBOX', true, cb);
  }
  
  imap.once('ready', function() {
    openInbox(function(err, box) {
      if (err) throw err;
      var f = imap.seq.fetch('3:3', {   // '1:*' for all
        bodies: ['HEADER.FIELDS (FROM TO SUBJECT DATE BODY TEXT)', 'TEXT'],
        //bodies: 'TEXT',
        struct: true
      });
      f.on('message', function(msg, seqno) {
        console.log('Message #%d', seqno);
        var prefix = '(#' + seqno + ') ';
        msg.on('body', function(stream, info) {
          var buffer = '';
          stream.on('data', function(chunk) {
            buffer += chunk.toString('utf8');    
          });
          stream.once('end', function() {    /////////
            //console.log(prefix + 'Parsed header: %s', inspect(Imap.parseHeader(buffer), true));
            if(info.which === 'HEADER.FIELDS (FROM TO SUBJECT DATE BODY TEXT)'){
              var mails = Imap.parseHeader(buffer);
              console.log('From: ' + mails.from[0]);
              console.log('Date: ' + mails.date[0]);
              console.log('Subject: ' + mails.subject[0]);
              for(i = 0; i<mails.to.length; i++) {
                console.log('To: ' + mails.to[i]);
              }
            }
            //console.log(buffer);
            if(info.which === 'TEXT') {
              var lines = buffer.split(/\r\n/g);
              var key = lines[0];  //the unique mail key
              //console.log(key);
              // console.log(lines.length);
              console.log('Message:');
              let start = 0, end = 0;
              //console.log(lines[12]);
              for( i = 0; i< lines.length; i++ ) {
                 //console.log(lines[20]);
                  if(String(lines[i]).search("text/plain") != -1) {  //if text/plain segment is found
                    start = i + 11; //start of the message
                    // console.log('Found at line: ');
                    // console.log(start);

                    for(j = start; j<lines.length; j++) {
                      if(String(lines[j]).search(String(key)) != -1 || String(lines[j]).search('ipmcdn.avast.com') != -1 ) {
                        end = j;
                        //  console.log('end found:');
                        //  console.log(end);
                        break;
                      }                    
                    }
                    break;
                  }

                }
                  for(i = start; i < end; i++)
                  // console.log(lines[i]);
                  console.log(decode_utf8(String(lines[i])));    //...

            }
            
            // if(info.which === 'TEXT')
            //   console.log('Body [%s] Finished', inspect(info.which));
            
            
          });
        });
        // msg.once('attributes', function(attrs) {
        //   console.log(prefix + 'Attributes: %s', inspect(attrs, false, 8));
        // });
        msg.once('end', function() {
          console.log(prefix + 'Finished');
        });
      });
      f.once('error', function(err) {
        console.log('Fetch error: ' + err);
      });
      f.once('end', function() {
        console.log('Done fetching all messages!');
        imap.end();
      });
    });
  });
  
  imap.once('error', function(err) {
    console.log(err);
  });
  
  imap.once('end', function() {
    console.log('Connection ended');
  });
  
  imap.connect();
  ////////////dotad bylo ok
  // var fs = require('fs'), fileStream;

  // imap.once('ready', function() {
  // openInbox(function(err, box) {
  //   if (err) throw err;
  //   imap.search([ 'SEEN', ['SINCE', 'May 20, 2010'] ], function(err, results) {
  //     if (err) throw err;
  //     var f = imap.fetch(results, { bodies: '' });
  //     f.on('message', function(msg, seqno) {
  //       console.log('Message #%d', seqno);
  //       var prefix = '(#' + seqno + ') ';
  //       msg.on('body', function(stream, info) {
  //         console.log(prefix + 'Body');
  //         stream.pipe(fs.createWriteStream('msg-' + seqno + '-body.txt'));
  //       });
  //       msg.once('attributes', function(attrs) {
  //         console.log(prefix + 'Attributes: %s', inspect(attrs, false, 8));
  //       });
  //       msg.once('end', function() {
  //         console.log(prefix + 'Finished');
  //       });
  //     });
  //     f.once('error', function(err) {
  //       console.log('Fetch error: ' + err);
  //     });
  //     f.once('end', function() {
  //       console.log('Done fetching all messages!');
  //       imap.end();
  //     });
  //   });
  // });
  // });

  module.exports=imap;