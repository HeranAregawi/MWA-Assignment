
const mongoose = require("mongoose");
const Game = mongoose.model(process.env.GAME_MODEL);
//const Game = require('../data/games-model')
const getAll = function (req, res) {
    console.log("GET all controller called");
    Game.find().exec(function (err, games) {
        console.log("Found games", games.length);
        res.status(200).json(games);
    })
}
const getOne = function (req, res) {
    const game_Id = req.params.game_Id;
    Game.findById(game_Id).exec(function (err, game) {
        console.log("Found game");
        res.status(200).json(game);
    });
}



module.exports = {
    getOne,
    getAll
}












