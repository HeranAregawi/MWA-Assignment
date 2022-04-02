const express = require("express");

const router = express.Router();
const gamesController = require("../controllers/games.controllers");
const publisherController = require("../controllers/publisher.controller");

router.route("/games")
    .get(gamesController.getAll)

router.route("/games/:game_Id")
    .get(gamesController.getOne)
router.route("/games/:game_Id/publishers")
    .get(publisherController.getAll);

router.route("/games/:game_Id/publishers/:publisher_Id")
    .get(publisherController.getOne);




module.exports = router;