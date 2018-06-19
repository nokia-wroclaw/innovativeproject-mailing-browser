var express = require('express');
var app = express();
var Imap = require('imap'),
    inspect = require('util').inspect;
var imap = require('./mailbox_connect'); //to connect with mailbox
var mails = require('./routes/mails');
var users = require('./routes/users');
var threads = require('./routes/threads');
var search = require('./routes/search');


app.use("/search",search);
app.use("/api",mails);
app.use("/",threads);

module.exports = app;


