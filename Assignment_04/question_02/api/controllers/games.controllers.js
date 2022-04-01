const dbConnection = require ("../data/dbconnection");
const ObjectId = require("mongodb").ObjectId;
module.exports.gamesGetAll= function(req, res) {
    console.log("GET all controller called");

    const db = dbConnection.get();
   // console.log("db", db);
   const gamesCollection = db.collection("games");
   //const docs = gamesCollection.find();

   let offset;
    
    if(req.query && req.query.offset){
        offset = parseInt(req.query.offset, 10);
    }
    if(req.query && req.query.count){
        count = parseInt(req.query.count, 10);
    }
    if(offset && offset <= 10){
        gamesCollection.find().limit(offset).toArray(function(err, games){
            
           if(err){
               res.status(200).json({msg : res.statusCode})
           }
            res.status(200).json(games);
           });
         }else{
            gamesCollection.find().limit(3).toArray(function(err, games){
                console.log("found games", games);
                res.status(200).json(games);
               });
        }
    
                }



