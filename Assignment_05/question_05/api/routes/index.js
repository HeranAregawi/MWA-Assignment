const express = require("express");

const router = express.Router();
const gamesController = require("../controllers/games.controllers");
const publisherControlleer = require("../controllers/publisher.controller");
const reviewController = require("../controllers/review.controller")
router.route("/games")
    .get(gamesController.getAll)

router.route("/games/:game_Id")
    .get(gamesController.getOne)

router.route("/games/:game_Id/publishers")
    .get(publisherControlleer.getAll);

router.route("/games/:game_Id/publishers/:publisher_Id")
    .get(publisherControlleer.getAll);

router.route("/games/:game_Id/reviews")
    .get(reviewController.getAll)


module.exports = router;