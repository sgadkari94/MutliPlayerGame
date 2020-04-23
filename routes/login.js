const express = require("express");
const router = express.Router();
//const data = require("../data");
//const postData = data.palindrome;


router.get("/", (req, res) => {
    res.render('layouts/main', {layout: false});
})

router.get("/register", (req, res) => {
    res.render('login/register', {layout: false});
})
router.get("/login", (req, res) => {
    res.render('login/login', {layout: false});
})


module.exports = router;