/////////////////////   Connection to db   //////////////////////////
var config = require('./config');
const Sequelize = require('sequelize');
const connection = new Sequelize(config.DB_name, config.DB_user, config.DB_password, {
  host: 'localhost',
  dialect: 'postgres',
  operatorsAliases: false,

  pool: {
    max: 1,
    min: 0,
    acquire: 30000,
    idle: 10000
  },

});

connection.authenticate().then(() => {
    console.log('Connection has been established successfully.');
  }).catch(err => {
    console.error('Unable to connect to the database:', err);
  });
/////////////////////  end connection  //////////////////////////

module.exports=connection
