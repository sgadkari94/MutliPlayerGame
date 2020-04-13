const mongoCollections = require('./config/mongoCollections');
const players = mongoCollections.player

const express = require('express')
const app = express()
const static = express.static(__dirname + '/public');

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended: true}))

app.use("/public", static);

const exphbs = require('express-handlebars');
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');



app.get('/', async(request, response) =>{
    response.sendFile(__dirname + '/register.html')
})

app.post('/result', async (req, res)=>{

    const UserName =  req.body['name']
    const Email =  req.body['email']
    const Password = req.body['password']

    const playerCollection = await players();

    let newPlayer = {
        "UserName": UserName, 
        "Email":Email,  
        "Password": Password 
    };

    const insertInfo = await playerCollection.insertOne(newPlayer);
    if (insertInfo.insertedCount === 0) throw 'Could not add player';

    res.sendFile(__dirname + '/result.html')
})


app.get('*', async(request, response) => {
    response.status(404).json({ error: "Not found" })
})

app.listen(3000, () => {
    console.log("We've now got a server!");
    console.log("Your routes will be running on http://localhost:3000");
  })