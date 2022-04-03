const mongoose = require("mongoose");
require("./hiking-model");
mongoose.connect(process.env.DB_URL);

mongoose.connection.on("connected", function () {
    console.log("mongoose connected to", process.env.DB_NAME);
});

mongoose.connection.on("disconnected", function(){
    console.log("mongoose disconnected to", process.env.DB_NAME);
});
mongoose.connection.on("error", function(err){
    console.log("mongoose Error to ", err);
});

process.on("SIGINT", function(){
    console.log(process.env.SIGINT_MESSAGE);
})