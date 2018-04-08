var express = require('express');
var app = express();
var Imap = require('imap'),
    inspect = require('util').inspect;
var imap = require('./mailbox_connect'); //to connect with mailbox
var mails = require('./routes/mails');
var users = require('./routes/users');

app.use("/mails",mails)
const Sequelize = require('sequelize');   //to connect with database
module.exports = app;

//const connection = require('./db_create'); //handle for specific database

