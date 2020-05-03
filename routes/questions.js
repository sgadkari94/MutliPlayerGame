const express = require("express");
const router = express.Router();
const data = require("../data");
const questionData = data.questions;
const path = require('path');
const xss = require("xss");

let totalRequests = 0;
router.get("/", async (req, res) => {
  try {

  const totalReq = await questionData.getQuestions();

  console.log(totalReq.length);
  if(totalRequests <= totalReq.length-1)
  {
    const question = await questionData.getQuestionsbyId(totalRequests);
    const answer = await questionData.getAnswers(question.question_id);
    res.render('MultiPlayerGame/dashboard', { 'question': question, 'answers':answer, 'question_no':totalRequests+1});
    totalRequests ++;
  }
  else{
    res.render('MultiPlayerGame/result');
  }
  } catch (e) {
    res.status(400).render('MultiPlayerGame/error', { 'err': e });
  }
});

//let totalRequests = 0;
router.post("/", async (req, res,next) => {
    try {
      const totalReq = await questionData.getQuestions();
      if(totalRequests <= totalReq.length-1)
      //if(totalRequests <= 6)
      {
      constQuesId = xss(req.body.question);
      constAnsId = xss(req.body.selcRadio);
      const saveAns = await questionData.saveAnswers(constQuesId,constAnsId,true,totalRequests);
      const question = await questionData.getQuestionsbyId(totalRequests);
      const answer = await questionData.getAnswers(question.question_id);
      res.render('MultiPlayerGame/dashboard', { 'question': question, 'answers':answer, 'question_no':totalRequests+1});
      totalRequests++;
      }
      else{
        res.render('MultiPlayerGame/result');
      }
    } catch (e) {
      res.status(400).render('MultiPlayerGame/error', { 'err': e });
    }
  });

  module.exports = router;