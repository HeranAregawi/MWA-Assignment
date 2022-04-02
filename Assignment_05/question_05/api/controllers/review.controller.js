const mongoose = require("mongoose");
const Game = mongoose.model(process.env.GAME_MODEL);

const getAll = function (req, res) {
    const game_Id = req.params.game_Id;
    Game.findById(game_Id).exec(function (err, game) {
        console.log("Found reviews", game.reviews);
        res.status(200).json(game.reviews)
    })
}
module.exports = {
    getAll
}