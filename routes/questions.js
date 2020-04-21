const express = require("express");
const router = express.Router();
const data = require("../data");
const questionData = data.questions;
const path = require('path');

router.get("/", async (req, res) => {
  try {
    console.log("in questions");

    const question = await questionData.getQuestions();
    const answer = await questionData.getAnswers(question[0].Question_id);
    res.render('MultiPlayerGame/dashboard',{ 'question': question[0].Question, 'answers':answer, 'question_no':1});
    // res.render('layouts/dashboard', { 'question': question[0].Question, 'answers':answer});
  } catch (e) {
    res.status(400).render('layouts/error', { 'err': e });
  }
});

let totalRequests = 0;
router.post("/", async (req, res,next) => {
    try {
      totalRequests ++;
      const question = await questionData.getQuestionsbyId(totalRequests);
      const answer = await questionData.getAnswers(question.Question_id);
      res.render('MultiPlayerGame/dashboard', { 'question': question.Question, 'answers':answer, 'question_no':totalRequests+1});
    } catch (e) {
      res.status(400).render('layouts/error', { 'err': e });
    }
  });

  module.exports = router;