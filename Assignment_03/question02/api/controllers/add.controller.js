const gameData = require("../data/games.json")
module.exports.gamesGetAll= function(req, res) {
    console.log("add numbers");
    console.log(req.query);
    let num1 = req.params.num1;
    
   
    const add = parseInt( num1) + parseInt( req.query.num2);
    console.log(add);
    res.status(200).send(add + "");
};

