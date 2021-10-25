const Sequelize = require("sequelize");
const connection = require("../database/database");
const Category = require("../categories/Category");

const Article = connection.define('articles',{
    title:{
        type: Sequelize.STRING,
        allowNull: false
    },
    slug:{
        type: Sequelize.STRING,
        allowNull: false
    },
    body:{
        type: Sequelize.TEXT,
        allowNull: false
    }
        
})

Category.hasMany(Article); // Uma categoria tem muitos artigos, relacionamento
Article.belongsTo(Category);// O artigo pertence a uma categoria, relacionamento 1 para 1

/*Article.sync({force:true}); Essa linha aqui serve para criar a tabela no banco de dados, depois 
que for rodada uma vez é bom retirar ou comentar essa linha para o codigo nao ficar tentando criar
as tabelas toda vez que executar*/ 

module.exports = Article;