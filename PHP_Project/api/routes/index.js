const express = require("express");
const router = express.Router();
const hikingController = require("../controllers/hikings.controller");
const placesController = require("../controllers/places.controller");

router.route("/hikings")
    .get(hikingController.getAll)
    .post(hikingController.addOne)
    

router.route("/hikings/:hiking_Id")
    .get(hikingController.getOne)
    .delete(hikingController.deleteOne)
    .put(hikingController.fullUpdateOne)
    .patch(hikingController.partialUpdate)
    

router.route("/hikings/:hiking_Id/places")
    .get(placesController.getAll)
    .put(placesController.addOne)

router.route("/hikings/:hiking_Id/places/:place_Id")
    .get(placesController.getOne)
    .delete(placesController.deleteOne)
    .put(placesController.fullUpdatePlace)
    .patch(placesController.partialUpdatePlace)


module.exports = router;