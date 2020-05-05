const express = require("express");
const router = express.Router();
const data = require("../data");
const questionData = data.questions;
const resultData = data.result;
const path = require('path');
const xss = require("xss");

let totalRequests = 0;
//let totalTime = new Date();
router.get("/", async (req, res,next) => {
  try {

  const totalReq = await questionData.getQuestions();

  console.log(totalReq.length);
  if(totalReq.length > 0)
      {
        if(totalRequests <= totalReq.length)
        {
          const question = await questionData.getQuestionsbyId(totalRequests);
          const answer = await questionData.getAnswers(question.question_id);
          res.render('MultiPlayerGame/dashboard', { 'question': question, 'answers':answer, 'question_no':totalRequests+1});
          totalRequests ++;
        }
        else{
          // const result = await resultData.generateResult();
          // console.log(result);
          const getResult = await resultData.getResult();
          console.log(getResult);
          const totalMarks = await resultData.countTotalMarks();
          //res.redirect("/result");
          res.render('MultiPlayerGame/result',{'data':getResult , 'totalMarks':totalMarks});
          // res.render('MultiPlayerGame/result');
          // //res.redirect("/result");
          // //next();
        }
      }
      else{
        res.status(400).render('MultiPlayerGame/error', { 'err': "there is no question in the database. do npm run seed or export files to the database"});
      }
  } catch (e) {
    res.status(400).render('MultiPlayerGame/error', { 'err': e });
  }
});

//let totalRequests = 0;
router.post("/", async (req, res,next) => {
    try {
      const totalReq = await questionData.getQuestions();

      // for checking if there is any question in database.
      if(totalReq.length > 0 ){

      // for saving the question and getting the next question and answer
      if(totalRequests < totalReq.length)
      {
      constQuesId = xss(req.body.question);
      constAnsId = xss(req.body.selcRadio);
      const saveAns = await questionData.saveAnswers(constQuesId,constAnsId,true,totalRequests);
      const question = await questionData.getQuestionsbyId(totalRequests);
      const answer = await questionData.getAnswers(question.question_id);
      res.render('MultiPlayerGame/dashboard', { 'question': question, 'answers':answer, 'question_no':totalRequests+1});
      totalRequests++;
      }

      // for saving the last question
      else if(totalRequests == totalReq.length){
        constQuesId = xss(req.body.question);
        constAnsId = xss(req.body.selcRadio);
        const saveAns = await questionData.saveAnswers(constQuesId,constAnsId,true,totalRequests);
        totalRequests++;
        const result = await resultData.generateResult();

        const getResult = await resultData.getResult();
        console.log(getResult);
        const totalMarks = await resultData.countTotalMarks();
        //res.redirect("/result");
        res.render('MultiPlayerGame/result',{'data':getResult , 'totalMarks':totalMarks});
      }
      else{
        const getResult = await resultData.getResult();
        console.log(getResult);
        const totalMarks = await resultData.countTotalMarks();
        console.log(totalMarks);
        res.render('MultiPlayerGame/result',{'data':getResult , 'totalMarks':totalMarks});
      }
    } 
    else{
      res.status(400).render('MultiPlayerGame/error', { 'err': "there is no question in the database. do npm run seed or export files to the database" });
    }
  }catch (e) {
      res.status(400).render('MultiPlayerGame/error', { 'err': e });
    }
  });

  module.exports = router;