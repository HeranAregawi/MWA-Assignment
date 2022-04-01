const express = require("express");

const router = express.Router();
const gamesController = require("../controllers/games.controllers");

router.route("/games")
.get(gamesController.gamesGetAll)
.post(gamesController.gamesAddOne)
router.route("/games/:gameId")
.delete(gamesController.gamesDelete);


module.exports = router;