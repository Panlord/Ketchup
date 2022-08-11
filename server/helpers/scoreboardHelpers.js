const {db, scoreboard} = require('../../database/index.js');


// Function to get top 10 high scores
const getTopTen = () => {
  return scoreboard.find().sort({score: 'desc', time: 'desc'}).limit(10).exec();
}

// Function to post new high score
const addNewScore = (newScoreData) => {
  return scoreboard.create({
    name: newScoreData.name,
    score: newScoreData.score,
    time: newScoreData.time
  });
}

module.exports.getTopTen = getTopTen;
module.exports.addNewScore = addNewScore;