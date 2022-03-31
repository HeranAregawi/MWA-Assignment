const express = require("express");
const path = require("path");
const s=require("dotenv").config();
const app = express();

app.use(express.static(path.join(__dirname, "public")));


app.get("/", function(req, res){ß
    console.log("Get Received");
    res.status(200).sendFile(path.join(__dirname, "public ","index.html"));
})

app.post("/json", function(req, res){
    console.log("Json Received");
    res.status(200).sendFile(path.join(__dirname, "public", "json"));
})



const server = app.listen(process.env.PORT, function(){
    console.log(process.env.LISTEN_PORT_MSG, server.address().port);
});

