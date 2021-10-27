const Sequelize = require("sequelize");
require('dotenv/config');
require('dotenv').config({  
    path: process.env.NODE_ENV === "test" ? ".env.testing" : ".env"
  })


const connection = new Sequelize(process.env.DB_NAME, process.env.DB_NOMEACESS, process.env.DB_PASS,{
    host: process.env.DB_HOST,
    dialect: 'mysql',
    timezone: "-03:00"
});

module.exports = connection;