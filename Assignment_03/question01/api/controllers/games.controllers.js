const gamesData = require("../data/games.json")
module.exports.getAll = function(req, res){
    console.log("Get all games");
    res.status(200).json(gamesData);
};