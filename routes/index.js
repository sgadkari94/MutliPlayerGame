const questionRoutes = require("./questions");
const resultRoutes = require("./result");
// const path = require('path');
const xss = require("xss");

const constructorMethod = app => {

app.use("/dashboard", questionRoutes);

app.use("/result", resultRoutes);

app.get('/', (req, res) => {
    //res.sendFile(path.resolve('public/index.html'));
    res.render('MultiPlayerGame/index');
});

  app.use("*", (req, res) => {
    res.sendStatus(404);
  });
};

module.exports = constructorMethod;