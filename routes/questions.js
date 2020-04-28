const express = require("express");
const router = express.Router();
const data = require("../data");
const questionData = data.questions;
const path = require('path');

let totalRequests = 0;
router.get("/", async (req, res) => {
  try {
  if(totalRequests <= 6)
  {
    console.log("in questions");
    const question = await questionData.getQuestionsbyId(totalRequests);
   // const question = await questionData.getQuestions();
    const answer = await questionData.getAnswers(question.Question_id);
    // res.render('MultiPlayerGame/dashboard',{ 'question': question[0], 'answers':answer, 'question_no':1});
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
      //totalRequests ++;
      if(totalRequests <= 6){
      constQuesId = req.body.question;
      constAnsId = req.body.selcRadio;
      const saveAns = await questionData.saveAnswers(constQuesId,constAnsId,true,totalRequests);
      const question = await questionData.getQuestionsbyId(totalRequests);
      const answer = await questionData.getAnswers(question.Question_id);
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