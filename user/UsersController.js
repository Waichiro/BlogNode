const express = require("express");
const router = express.Router();
const User = require("./user");
const bcrypt = require("bcryptjs");
const adminAuth = require("../middlewares/adminAuth");


router.get("/admin/users", adminAuth, (req, res) => {
    User.findAll().then(users => {
        res.render("admin/users/index", {users: users});
    });
});

router.get("/admin/users/create", adminAuth, (req, res) => {
    res.render("admin/users/create");
});

router.post("/users/create", (req, res) => {
    var email = req.body.email;
    var password = req.body.password;

    User.findOne({
        where:{
            email: email
        }
    }).then(user => {
        if(user == undefined){
            //essa parte abaixo é a que encripta com hash a senha do usuario
            var salt = bcrypt.genSaltSync(process.env.BC_SALT);
            var hash = bcrypt.hashSync(password, salt);


            //salva no banco de dados
            User.create({
                email: email,
                password: hash
            }).then(() => {
                res.redirect("/");
            }).catch((err) => {
                res.redirect("/");
            });

        }else{
            res.redirect("/admin/users/create");
        }
    })

    
 });

 router.post("/users/delete", (req, res) => {
    var id = req.body.id;
    if(id != undefined){
        if(!isNaN(id)){

            User.destroy({
                where:{
                    id: id
                }
            }).then(() => {
                res.redirect("/admin/users");
            });

        }else{//Se não for NULL
            res.redirect("/admin/users");
        }
    }else{// Se for NULL
        res.redirect("/admin/users");
    }
});

router.get("/login", (req, res) => {
    res.render("admin/users/login");
})

router.post("/authenticate", (req, res) => {
    var email = req.body.email;
    var password = req.body.password;

    User.findOne({
        where: {
            email: email
        }
    }).then(user => {
        if(user != undefined){//se existe um usuario com esse email
            var correct = bcrypt.compareSync(password, user.password);
            if(correct){
                req.session.user = {
                    id: user.id,
                    email: user.email
                }
                res.redirect("/admin/articles");
            }else{
                res.redirect("/login");
            }
        }else{
            res.redirect("/login");
        }
    })

})

router.get("/logout", (req, res) => {
    req.session.user = undefined;
    res.redirect("/");
})



module.exports = router;