const questionRoutes = require("./questions");
const path = require('path');
const xss = require("xss");

const constructorMethod = app => {

app.use("/dashboard", questionRoutes);

app.use("/dashboard", questionRoutes);

app.get('/', (req, res) => {
    res.sendFile(path.resolve('public/index.html'));
});

  app.use("*", (req, res) => {
    res.sendStatus(404);
  });
};

module.exports = constructorMethod;