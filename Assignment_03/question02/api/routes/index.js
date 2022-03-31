const express = require("express");

const router = express.Router();
const adderController = require("../controllers/add.controller");

router.route("/add/:num1")
.get(adderController.add)



module.exports = router;