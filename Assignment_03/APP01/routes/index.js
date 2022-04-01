const express = require("express");

const router = express.Router();
const gamesController = require("../controllers/games.controllers");

router.route("/games")
.get(gamesController.gamesGetAll)
.post(gamesController.gamesAddOne);


module.exports = router;