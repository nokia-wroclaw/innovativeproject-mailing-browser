var express = require('express');
var app = express();
var Imap = require('imap'),
    inspect = require('util').inspect;

var index = require('./routes/index');
var users = require('./routes/users');

const Sequelize = require('sequelize');   //to connect with database
const connection = require('./db_connect'); //handle for specific database

var imap = require('./mailbox_connect'); //to connect with mailbox

module.exports = app;