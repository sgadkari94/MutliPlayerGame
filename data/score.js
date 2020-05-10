const collection = require('../config/mongoCollections');
const ObjectId = require('mongodb').ObjectID;
const scoreCollection = collection.score;


async function getScore(player){ 
    if(player){
    const scoreVal = await scoreCollection();
    let mysort = { gameDay: 1 };  
    let index = 0;
    const scoreData = await scoreVal.find({playerid : player}).sort(mysort).toArray();
    //bandDetail.find
    if (scoreData === null) throw `No record for player {player}`;      
    return scoreData;
    }
    else{
        throw `$ {player} is not a valid player`
    }
    
}

//to get top Player of all time
async function getTopPlayer(){ 
    const scoreVal = await scoreCollection();
    let mysort = { totalMarks:-1};  
    const topScorer = await scoreVal.find({}).sort(mysort).limit(3).toArray();    
    return topScorer;
}

module.exports = {
    getScore,
    getTopPlayer 
}
