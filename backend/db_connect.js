/////////////////////   Connection to db   //////////////////////////
const Sequelize = require('sequelize');
const connection = new Sequelize('dataBase_name', 'postgres','haslo', {
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