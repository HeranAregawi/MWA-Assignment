const express = require("express");
const router = express.Router();
const hikingController = require("../controllers/hikings.controller");
const placeController = require("../controllers/place.controller");

router.route("/hikings")
    .get(hikingController.getAll)
    .post(hikingController.addOne)
    

router.route("/hikings/:hiking_Id")
    .get(hikingController.getOne)
    .delete(hikingController.deleteOne)
    .patch(hikingController.updateRating)
    

router.route("/hikings/:hiking_Id/places")
    .get(placeController.getAll)
    .put(placeController.addOne)

router.route("/hikings/:hiking_Id/places/:place_Id")
    .get(placeController.getOne)
    .delete(placeController.deleteOne)
    .put(placeController.updatePlace)


module.exports = router;