const loginRoutes = require('./login');
const mpgameRoutes = require('./mpgame')
const constructorMethod = (app) => { 
   
    app.use('', loginRoutes);
    app.use('', mpgameRoutes);

    app.use('*', (req, res) => {   
        res.status(404).json({ error: 'Not found' });  
    }); 
};  
module.exports = constructorMethod;