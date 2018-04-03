const Sequelize = require('sequelize');
const connection = require('./db_connect'); //handle for specific database

const User = connection.define('user',{
    firstName: {
        type: Sequelize.STRING
    },
    lastName: {
        type: Sequelize.STRING
    },
}, {timestamps:false} );

const Mail = connection.define('mail',{
    subject : {
        type: Sequelize.STRING
    },
    from: {
        type: Sequelize.STRING
    },
    to: {
        type: Sequelize.STRING
    },
    date: {
        type: Sequelize.STRING
    },
    text: {
        type: Sequelize.STRING
    },
    textAsHtml: {
        type: Sequelize.STRING
    },
    number: {
        type: Sequelize.STRING
    },
    refeerences: {
        type: Sequelize.STRING
    },
    messageID: {
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


connection.sync({
    force: true
}).then(function()
{
    var userInstance = User.build({
        firstName: 'Jacek',
        lastName: 'Placek',
    })
    userInstance.save()
 //   User.bulkCreate([
 //       {
 //           firstName: 'Marek',
 //           lastName: 'sadfasdgad',
 //       }
 //   ])
});

connection.sync({
    force: true
}).then(function()
{
    var userInstance = User.build({
        firstName: 'Jacek',
        lastName: 'fhjfhj',
    })
    userInstance.save()
    //   User.bulkCreate([
    //       {
    //           firstName: 'Marek',
    //           lastName: 'sadfasdgad',
    //       }
    //   ])
});


module.exports=connection

