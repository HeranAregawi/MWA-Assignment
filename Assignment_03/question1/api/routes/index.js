const express = require("express");
const { route } = require("../../../../APP28/routes");
const router = express.Router();
const gamesController = require("../controllers/games.controllers");

router.route("/games")
.get(gamesController.getAll);

module.exports = router;