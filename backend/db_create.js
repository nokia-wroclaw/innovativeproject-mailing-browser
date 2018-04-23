const Sequelize = require('sequelize');
const connection = require('./db_connect'); //handle for specific database


const Mail = connection.define('mail', {
    Subject: {
        type: Sequelize.STRING
    },
    From: {
        type: Sequelize.STRING
    },
    To: {
        type: Sequelize.STRING
    },
    Date: {
        type: Sequelize.DATE
    },
    Text: {
        type: Sequelize.TEXT
    },
    TextAsHtml: {
        type: Sequelize.TEXT
    },
    messageId: {
        type: Sequelize.STRING
    },
    reference: {
        type: Sequelize.STRING
    },
    threadId: {
        type: Sequelize.INTEGER
    }
}, {timestamps: false});

const Thread = connection.define('thread',{
    Subject: {
        type: Sequelize.STRING
    },
    From: {
        type: Sequelize.STRING
    },
    To: {
        type: Sequelize.STRING
    },
    Date: {
        type: Sequelize.DATE
    },
    threadDate: {
        type: Sequelize.DATE
    },
    Text: {
        type: Sequelize.TEXT
    },
    TextAsHtml: {
        type: Sequelize.TEXT
    },
    messageId: {
        type: Sequelize.STRING
    },
    NumberOfReplies: {
        type: Sequelize.INTEGER
    }
}, {timestamps: false});
//

//
// Thread.hasMany(Mail,{foreignKey: 'threadId'});
// Mail.belongsTo(Thread,{foreignKey: 'threadId'});

     Mail.sync().then(() => {});
     Thread.sync().then(()=>{});


//



//Mail.belongsTo(Thread, {foreignKey: 'threadId'});

module.exports.Mail = Mail;
module.exports.Thread = Thread;