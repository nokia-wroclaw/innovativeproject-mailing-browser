var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var index = require('./routes/index');
var users = require('./routes/users');
var app = express();
var Imap = require('imap'),
    inspect = require('util').inspect;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', index);
app.use('/users', users);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});
// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// /////////////////////   Connection to db   //////////////////////////
//  const Sequelize = require('sequelize');
//  const connection = new Sequelize('postgres', 'postgres','1234', {
//    host: 'localhost',
//    dialect: 'postgres',
//    operatorsAliases: false,

//    pool: {
//      max: 1,
//      min: 0,
//      acquire: 30000,
//      idle: 10000
//    },

//  });


////////////////////  end connection ////////////////////////////////
const Sequelize = require('sequelize');
const connection = require('./db_connect');

  // const User = connection.define('user',{   //to swiezo zakomentowane
	//   firstName: {
	// 	type: Sequelize.STRING
	//   },
	//   lastName: {
	// 	  type: Sequelize.STRING
	//   }
  // }) 
 /* 
  User.sync({force: true}).then(() => {    //tu byl komentarz
  // Table created
  return User.create({
    firstName: 'John',
    lastName: 'Hancock'
  });
});*/
  
// connection.sync().then(function(){       ///to swiezo zakomentowane
// 	User.findById(1).then(function(user) {
// 		console.log(user.dataValues);
// 	});
// }); 

// connection.sync({
// 	logging: console.log
// });

////////////////////////////  email  //////////////////////
// emailjs = require('emailjs');
// var server 	= emailjs.server.connect({
//     user:    "innovative.project@outlook.com",
//     password:"password",
//     host:	 "smtp-mail.outlook.com",
//     tls: {ciphers: "SSLv3"}
// });
// var message	= {
//     text:	"i hope this works",
//     from:	"you <innovative.project@outlook.com>",
//     to:		"someone <mail@mail.pl>, another <mail@gmail.com>",
//     cc:		"else <mail@gmail.com>",
//     subject:	"testing emailjs"
// };

// // send the message and get a callback with an error or details of the message that was sent
// server.send(message, function(err, message) { console.log(err || message); });

// console.log('START RECEIVING MAILS');
// var imap = new Imap({
//   user: 'innovative.project@outlook.com',
//   password: 'MailingGroup',
//   host: 'imap-mail.outlook.com',
//   port: 993,
//   tls: true
// });

// function openInbox(cb) {
//   imap.openBox('INBOX', true, cb);
// }

// imap.once('ready', function() {
//   openInbox(function(err, box) {
//     if (err) throw err;
//     var f = imap.seq.fetch('1:6', {
//       bodies: 'HEADER.FIELDS (FROM TO SUBJECT DATE)',
//       struct: true
//     });
//     f.on('message', function(msg, seqno) {
//       console.log('Message #%d', seqno);
//       var prefix = '(#' + seqno + ') ';
//       msg.on('body', function(stream, info) {
//         var buffer = '';
//         stream.on('data', function(chunk) {
//           buffer += chunk.toString('utf8');
//         });
//         stream.once('end', function() {    /////////
//           console.log(prefix + 'Parsed header: %s', inspect(Imap.parseHeader(buffer)));
//         });
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

// imap.once('error', function(err) {
//   console.log(err);
// });

// imap.once('end', function() {
//   console.log('Connection ended');
// });

// imap.connect();

module.exports = app;