const dbConnection = require ("../data/dbconnection");
const ObjectId = require("mongodb").ObjectId;



module.exports.gamesAddOne = function(req, res){
    const db = dbConnection.get();
    const gamesCollection = db.collection("games");
    let newGame = {};
    console.log(req.body);
    if(req.body  && req.body.title && req.body.price && req.body.players && req.body.age){
    
        newGame.title=req.body.title;
        newGame.price=parseFloat(req.body.price);
        newGame.players = parseInt(req.body.players);
        newGame.age = parseInt(req.body.age);
        if((newGame.players > 1 && newGame.players < 11) && (newGame.age > 6 && newGame.age < 99)){
        gamesCollection.insertOne(newGame, function(err, response){
            if(err){
                res.status(500).json({error:err});
            }else{
                console.log(response);
                res.status(201).json(response);
            }
        })
    }
    
    }else{
        console.log("Data missing from post body");
        res.status(400).json({error : " required data missing from POST"});
    }

}
module.exports.gamesGetAll= function(req, res) {
    console.log("GET all controller called");

    const db = dbConnection.get();
   // console.log("db", db);
   const gamesCollection = db.collection("games");
   //const docs = gamesCollection.find();

   
        gamesCollection.find().toArray(function(err, games){
            
           if(err){
               res.status(200).json({msg : res.statusCode})
           }
            res.status(200).json(games);
           });
         
        }
    
                

    module.exports.gamesDelete = function(req, res){
        console.log("Get delete controller called");
        const db = dbConnection.get();
        const gamesCollection = db.collection("games");
        const gameId = req.params.gameId;
        gamesCollection.deleteOne({_id : ObjectId(gameId)}, function(err, game){
            console.log("Deleted game", game);
            res.status(res.statusCode).json({msg : "Deletde Succesfully"})
            

        })
    }





