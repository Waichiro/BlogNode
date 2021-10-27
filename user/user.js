const Sequelize = require("sequelize");
const connection = require("../database/database");

const User = connection.define('users', {
    email:{
        type: Sequelize.STRING,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    }
});


//User.sync({force:true}); 

/* Essa linha aqui serve para criar a tabela no banco de dados, depois 
que for rodada uma vez é bom retirar ou comentar essa linha para o codigo nao ficar tentando criar
as tabelas toda vez que executar*/ 

module.exports = User;