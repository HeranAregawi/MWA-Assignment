const mongoose = require("mongoose");
const Game = mongoose.model(process.env.GAME_MODEL);

const getAll = function (req, res) {
    console.log("Getone Publisher controller ");
    const game_Id = req.params.game_Id;
    Game.findById(game_Id).exec(function (err, game) {
        console.log("Game found", game.publisher);
        //res.status(200).json({mmessage : "found"})
        res.status(200).json(game.publisher);
    })

}
const getOne = function(req, res){
    const game_Id = req.params.game_Id;
    const publisher_Id = req.params.publisher_Id;
    const game = Game.find({_id:game_Id,"publisher._id":publisher_Id}).exec(function(err, game){
        console.log("Found game", game.publisher);
        res.status(200).json(game.publisher)
    })

}


module.exports = {
    getOne,
    getAll
}