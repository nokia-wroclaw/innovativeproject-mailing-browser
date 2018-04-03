const Sequelize = require('sequelize');
const connection = require('./db_connect'); //handle for specific database

const User = connection.define('user',{
    firstName: {
        type: Sequelize.STRING,
        get: function () {
            return JSON.parse(this.getDataValue(''));
        },
        set: function (value) {
            return this.setDataValue('rules', JSON.stringify(value));
        }
    },
    lastName: {
        type: Sequelize.STRING
    },
}, {timestamps:false} );

const Mail = connection.define('mail',{
    topic : {
        type: Sequelize.STRING
    },
    user_id: {
        type: Sequelize.STRING
    },
    body: {
        type: Sequelize.STRING
    },
    attachment: {
        type: Sequelize.STRING
    },
    address: {
        type: Sequelize.STRING
    },
}, {timestamps:false} );

const Thread = connection.define('thread',{
  name : {
      type : Sequelize.STRING
  }
}, {timestamps:false} );

User.sync({force: true}).then(() => {
    return User.create();
});

Mail.sync({force: true}).then(() => {
    return Mail.create();
});

Thread.sync({force: true}).then(() => {
    return Thread.create();
});
/*
connection.sync({
    force: true
}).then(function()
{
    User.create({
        firstName: 'Jacek',
        lastName: 'Placek',
    })
});*/



/*
User.sync({force: true}).then(() => {
    User.bulkCreate([
    {firstName: 'John',
        lastName: 'Lock'}],
    { validate: true }).catch(errors => {

});*/


module.exports=connection

