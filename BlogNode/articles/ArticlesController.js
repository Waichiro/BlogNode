const express = require("express");
const router = express.Router();

router.get("/articles", (req, res) => {
    res.send("Rota artigos")
})

router.get("/admin/articles/new", (req, res) => {
    res.send("Novo artigo")
})



module.exports = router;