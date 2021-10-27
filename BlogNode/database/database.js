const Sequelize = require("sequelize");
require('dotenv/config');
require('dotenv').config({  
    path: process.env.NODE_ENV === "test" ? ".env.testing" : ".env"
  })

const connection = new Sequelize(process.env.JAWSDB_URL,{
    timezone: "-03:00"
});

module.exports = connection;