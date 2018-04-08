var express = require('express');
var app = express();
var Imap = require('imap'),
    inspect = require('util').inspect;
var imap = require('./mailbox_connect'); //to connect with mailbox
var mails = require('./routes/mails');
var users = require('./routes/users');
var threads = require('./routes/threads');

app.use("/mails",mails)
app.use("/threads",threads)

const Sequelize = require('sequelize');   //to connect with database
module.exports = app;

//const connection = require('./db_create'); //handle for specific database

