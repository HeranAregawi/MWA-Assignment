const express = require("express");

const router = express.Router();
const gamesController = require("../controllers/add.controller");

router.route("/add/:num1")
.get(gamesController.gamesGetAll)



module.exports = router;