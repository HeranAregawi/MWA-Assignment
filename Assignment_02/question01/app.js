const http = require("http");
const fs = require("fs");
require("dotenv").config();
let indexFileBuffer;
let statusCode;

const serveAllRequests = function(req, res){
    
//  switch (req.method){
//      case "POST":
if(req.method == "POST"){
        res.setHeader("Content-Type", "application/json");
        res.writeHead(200);
        res.end("{'message : 'Hello World'}");
}
    else if (req.url == "/"){
        res.setHeader("Content-Type", "text/html");
        fs.readFile(__dirname + "/index.html", function(err, buffer){
            if(err){
                indexFileBuffer = "FIle Not found";
                statusCode = 404;
            }else{
                indexFileBuffer = buffer;
                statusCode = 200;
            }
        
            res.writeHead(statusCode);
            res.end(indexFileBuffer);
        });
          

    }
    else if(req.url = "/page1"){
        res.setHeader("Content-Type" , "text/html");
        fs.readFile(__dirname + "/page1.html", function(err, buffer){
            if(err){
                indexFileBuffer= "File Not Found";
                statusCode = 404;
            }else{
                indexFileBuffer = buffer;
                statusCode = 200;

            }
        });
        res.writeHead(statusCode);
        res.end(indexFileBuffer);
    }
    else if(req.url == "/page2"){
       
        res.setHeader("Content-Type", "text/html");
        fs.readFile(__dirname + "/page2.html",function(err, buffer){
            if(err){
                indexFileBuffer = "File Not Found!";
                statusCode = 404;
            }
            else{
                indexFileBuffer = buffer;
                statusCode = 200;
            }
        })
    }
}

const server = http.createServer(serveAllRequests);
server.listen(process.env.PORT, "localhost", function(){
    console.log(process.env.LISTEN_PORT_MSG, server.address().port);
});

