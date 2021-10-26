const express = require("express");
const router = express.Router();
const User = require("./user");
const bcrypt = require("bcryptjs");


router.get("/admin/users", (req, res) => {
    res.send("Listagem usuarios");
});

router.get("/admin/users/create", (req, res) => {
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
            var salt = bcrypt.genSaltSync(10);
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



module.exports = router;