const gameData = require("../data/games.json")
module.exports.gamesGetAll= function(req, res) {
    console.log("GET all games");
    console.log(req.query);
    let offset = 0;
    let count = 5;
    if(req.query && req.query.offset){
        offset = parseInt(req.query.offset, 10);
    }
    if(req.query && req.query.count){
        count = parseInt(req.query.count, 10);

    }
    const pageGames = gameData.slice(offset, offset + count);
    res.status(200).json(pageGames);
};

module.exports.gamesAddOne = function(req, res){
    console.log("POST new game");
    console.log(req.body);
    res.status(200).json(req.body);
}