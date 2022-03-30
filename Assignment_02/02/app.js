const express = require("express");
const path = require("path");
const s=require("dotenv").config();
const app = express();
app.use(express.static(path.join(__dirname, "public")));

app.get("/", function(req, res){
    console.log("Get Received");
    res.status(200).sendFile(path.join(__dirname, "public ","index.html"));
})


app.get("/page1", function(req, res){
    console.log("Get Received");
    res.status(200).sendFile(path.join(__dirname, "public ","page1.html"));
})
app.get("/page2", function(req, res){
    console.log("Get Received");
    res.status(200).sendFile(path.join(__dirname, "public ","page2.html"));
})
app.post("/json", function(req, res){
    console.log("Json Received");
    res.status(200).json({"JSON_Data" : true});
})



const server = app.listen(process.env.PORT, function(){
    console.log(process.env.LISTEN_PORT_MSG, server.address().port);
});

