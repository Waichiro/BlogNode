const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const session = require("express-session");
const connection = require("./database/database");
const adminAuth = require("./middlewares/adminAuth");
require('dotenv/config');
require('dotenv').config({  
    path: process.env.NODE_ENV === "test" ? ".env.testing" : ".env"
  })


//const controllers
const categoriesController = require("./categories/CategoriesController");
const articlesController = require("./articles/ArticlesController");
const usersController = require("./user/UsersController");

//models importados
const Article = require("./articles/Article");
const Category = require("./categories/Category");
const User = require("./user/User");


const router = require("./categories/CategoriesController");

//view engine
app.set('view engine', 'ejs');


//session
app.use(session({
    secret: "madiwyrfbvxaqesgçhk", cookie: {maxAge: 30000000} //É uma tipo uma senha para melhorar a seguranca e o cookie é para 
                                                           //dizer o tempo maximo da sessao ate ele deslogar sozinho, ele é feito em
                                                           //milisegundos 1s = 1000
}))

//static
app.use(express.static('public'));


//body-parser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//database
connection.authenticate().then(() => {
    console.log("Conexão feita com sucesso!");
}).catch((error) => {
    console.log(error);
})

//rotas controller
app.use("/", categoriesController);
app.use("/", articlesController);
app.use("/", usersController);


//rotas
app.get("/", (req, res) =>{
    Article.findAll({
        order: [
            ['id', 'DESC']
        ], 
        limit: 4
    }).then(articles => {

        Category.findAll().then(categories => {
            res.render("index", {articles: articles, categories: categories});
        })

        
    })
})

app.get("/:slug", (req, res) => {
    var slug = req.params.slug;

    Article.findOne({
        where: {
            slug: slug
        }
    }).then(article => {
        if(article != undefined){
            Category.findAll().then(categories => {
                res.render("article", {article: article, categories: categories});
            })
        }else{
            res.redirect("/");
        }
    }).catch( err => {
        res.redirect("/");
    })
});

router.get("/category/:slug", (req, res) =>{
    var slug = req.params.slug;

    Category.findOne({
        where: {
            slug:slug
        },
        include: [{model: Article}]
    }).then(category => {
        if(category != undefined){
            
            Category.findAll().then(categories => {
                res.render("index", {articles: category.articles, categories: categories});
            });


        }else{
            res.redirect("/");
        }
    }).catch(err => {
        res.redirect("/");
    })

});

app.listen(8080, () =>{
    console.log("Servidor logado...");
})