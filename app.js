const path = require('path');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const exphbs  = require('express-handlebars');
const configRoutes = require("./routes");

app.use(express.static(path.join(__dirname, '/public')));
app.use(bodyParser.urlencoded({ extended: true }));

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

let totalRequests = 0;
app.use(async (req, res, next) => {
	totalRequests++;
	console.log(`There have been ${totalRequests} requests made to the server`);
	next();
});

configRoutes(app);

app.listen(3000, () => {
	console.log("We've now got a server!");
	console.log('Your routes will be running on http://localhost:3000');
});