const Sequelize = require('sequelize');
const connection = require('./db_connect'); //handle for specific database

var MyMails = require('./mailbox_connect');
var mails = MyMails.mails;

const User = connection.define('user', {
    firstName: {
        type: Sequelize.STRING
    },
    lastName: {
        type: Sequelize.STRING
    },
}, {timestamps: false});

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
    }
}, {timestamps: false});

const Thread = connection.define('thread', {
    name: {
        type: Sequelize.STRING
    },
    messageId:{
    type: Sequelize.STRING
    }

    // ,
    // mail_id:{
    //     type: Sequelize.STRING,
    //     references:'mails',
    //     referencesKey:'messageId'
    // }
}, {timestamps: false});


/*Mail.hasOne(Thread, {
    foreignKey: {
        name: 'mail_id',
       allowNull: false
    }
});*/
//Thread.belongsTo(Mail);

User.sync({force: true}).then(() => {
    return User.create();
});

Mail.sync({force: true}).then(() => {
    //return Mail.create();
});

Thread.sync({force: true}).then(() => {
    return Thread.create();
});

/*var mail = {subject : "temat", from : "adress", to :"do kogo",
    date : "data", text : "text", textAsHtml: "html",
     messageId : "id"};

const obj = {
    firstN:"leszek",
    lastN:"peszek"
}
User.create({
    firstName:obj.firstN,
    lastName:obj.lastN
})
*/
/*
const createPromises = mails.map((mail) => {
    return Mail.create({
            Subject: mail.subject,
            From: mail.from,
            To: mail.to[0].address,
            Date: mail.date,
            Text: mail.text,
            TextAsHtml: mail.textAsHtml,
            messageId: mail.messageID
        });
});*/
/*
//const createPromises = mails.map((mail) => {
Mail.create({
        Subject: mail.subject,
        From: mail.from,
        To: mail.to,
        Date: mail.date,
        Text: mail.text,
        TextAsHtml: mail.textAsHtml,
        messageID: mail.messageId
    });
*/

/*
Promise.all(createPromises).then((results) => {
    console.log(results)
});*/
//module.exports=connection
module.exports.Mail = Mail
module.exports.Thread = Thread
