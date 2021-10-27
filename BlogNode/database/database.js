const Sequelize = require("sequelize");
require('dotenv/config');

console.log(process.env.APP_NAME)


const connection = new Sequelize('guiapress', 'root', '36272097',{
    host: 'localhost',
    dialect: 'mysql',
    timezone: "-03:00"
});

module.exports = connection;