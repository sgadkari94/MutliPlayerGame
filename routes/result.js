const express = require("express");
const router = express.Router();
const data = require("../data");
const questionData = data.questions;
const resultData = data.result;
const path = require('path');


router.get("/result", async (req, res,next) => {
    try {
        console.log("in result");
        const resultData = await resultData.generateResult();
        console.log(resultData);
    }
    catch(e){

    }
})

module.exports = router;