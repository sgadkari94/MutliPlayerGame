const express = require("express");
const router = express.Router();
const data = require("../data");
const score = data.score;
const path = require('path');
const xss = require("xss");

router.post("/", async (req, res,next) => {
    try {
        console.log(req.body['player']);
    if(req.session.user || req.body['player']){
       const getLeaderBoardData = await score.getTopPlayer();
       console.log(getLeaderBoardData);
       res.render("MultiPlayerGame/leaderBoard",{'winnerData':getLeaderBoardData});
    }
    else{
        res.status(400).render('MultiPlayerGame/error', { 'error': 'please login' });
    }
}
    catch(e){
        res.status(400).render('MultiPlayerGame/error', { 'err': e });
    }
})

router.get("/", async (req, res,next) => {
    try {
        if(req.session.user || req.body['player']){
       const getLeaderBoardData = await score.getTopPlayer();
       console.log(getLeaderBoardData);
       res.render("MultiPlayerGame/leaderBoard",{'winnerData':getLeaderBoardData});
        }
        else{
            res.status(400).render('MultiPlayerGame/login', { 'error': 'please login' });
        }
    }
    catch(e){
        res.status(400).render('MultiPlayerGame/error', { 'err': e });
    }
})

module.exports = router;