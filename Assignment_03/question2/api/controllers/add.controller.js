const gameData = require("../data/games.json")
module.exports.gamesGetAll= function(req, res) {
    console.log("add numbers");
    console.log(req.query);
    let num1 = req.params.num1;
    let count = 0;
   
    const add = parseInt( num1) + req.query.num2;
    res.status(200).send(add);
};

