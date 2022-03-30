const express = require("express");
const path = require("path");
require("dotenv").config();
const app = express();

app.use(express.static(path.join(__dirname, "public")));
console.log("Get Received");

app.get("/", function(req, res){
  res.status(200).sendFile(path.join(__dirname, "public ","index.html"));
})




const server = app.listen(process.env.PORT, function(){
    console.log(process.env.LISTEN_PROCESS_MSG, server.address().port);
});

