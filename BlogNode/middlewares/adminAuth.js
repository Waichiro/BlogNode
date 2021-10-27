function adminAuth(req, res, next){
    if(req.session.user != undefined){
        next();// se nn adicionar o next ele vai ficar travado 
    }else{
        res.redirect("/login");
    }
}

module.exports = adminAuth;