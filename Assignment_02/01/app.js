const http = require("http");
const fs = require("fs");
require("dotenv").config();
let indexFileBffer;
let statusCode;

const serveAllRequests = function(req, res){
    
 switch (req.method){
     case "POST":
        res.setHeader("Content-Type", "application/json");
        res.writeHead(200);
        res.end("{'message : 'Hello World'}");
        break;
    case "GET":
        res.setHeader("Content-Type", "text/html");
        fs.readFile(__dirname + "/index.html", function(err, buffer){
            if(err){
                indexFileBffer = "FIle Not found";
                statusCode = 404;
            }else{
                indexFileBffer = buffer;
                statusCode = 200;
            }
        
            res.writeHead(statusCode);
            res.end(indexFileBffer);
        });
          break;

    }
}

const server = http.createServer(serveAllRequests);
server.listen(process.env.PORT, "localhost", function(){
    console.log(process.env.LISTEN_PROCESS_MSG, server.address().port);
});

