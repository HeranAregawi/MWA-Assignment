require("../question_02/node_modules/dotenv/lib/main").config();
const express = require("express");
const path = require("path");
require("./api/data/db");

const routes = require("./api/routes");
const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(function (req, res, next) {
    console.log(req.method, req.url);
    next();
});

app.use("/api", routes);
app.use(express.static(path.join(__dirname, process.env.PUBLIC_FOLDER)));


const server = app.listen(process.env.PORT, function () {
    console.log("Listening to PORT ", server.address().port);
})