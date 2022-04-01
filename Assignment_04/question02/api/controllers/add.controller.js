const gameData = require("../data/games.json")
module.exports.add= function(req, res) {
    console.log("add numbers");
    console.log(req.query);
    console.log(req.params);

    let num1 = req.params.num1;
    let num2 = req.query.num2;
    
    const sum = parseInt(num1) + parseInt(num2); 
    console.log(sum);
    res.status(200).json(sum);
    //res.status(200).send(sum +"");
};

