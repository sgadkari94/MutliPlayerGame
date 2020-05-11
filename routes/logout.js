const express = require("express");
const router = express.Router();
const data = require("../data");
const regPlayer = data.register;
const path = require('path');
const xss = require("xss");
const storage = require('node-sessionstorage');
const localStorage = require("localStorage");

router.get('/logout', async(req, res) => {
    req.session.destroy()
    res.render('MultiPlayerGame/login') 
    
  });

module.exports = router;