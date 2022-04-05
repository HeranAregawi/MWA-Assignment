const mongoose = require("mongoose");
const Hiking = mongoose.model(process.env.HIKING_MODEL);
let response = {
    status: process.env.HTTP_STATUS_OK,
    message: {}
}

const getAll = function (req, res) {
    console.log("Get All Places controller");
    const hiking_Id = req.params.hiking_Id;

    Hiking.findById(hiking_Id).select("places").exec(function (err, hikingPlaces) {
        if (err) {
            response.status = process.env.HTTP_STATUS_INTERNAL_ERROR;
            response.message = "Error finding hiking"
        } else if (!hikingPlaces) {
            response.status = process.env.HTTP_STATUS_BAD_REQUEST;
            response.message = "Hiking ID can not found";
        }
        else {
            response.status = process.env.HTTP_STATUS_OK;
            response.message = hikingPlaces;
        }
        res.status(response.status).json(response.message);
    })
}
const getOne = function (req, res) {
    const { place_Id } = req.params;
    const { hiking_Id } = req.params;
    Hiking.findById(hiking_Id).select("places").exec(function (err, hikingPlace) {
        const response = { status: process.env.HTTP_STATUS_OK, message: hikingPlace.places.id(place_Id) };
        if (err) {
            console.log("Error finding hiking ");
            response.status = process.env.HTTP_STATUS_INTERNAL_ERROR;
            response.message = "Error finding hiking";

        } else if (!hikingPlace) {
            console.log("Hiking notfound");
            response.status = process.env.HTTP_STATUS_NOT_FOUND;
            response.message = "Hiking ID not found";
        }

        res.status(response.status).json(response.message);
    })


}

const addOne = function (req, res) {
    const { hiking_Id } = req.params;

    Hiking.findByIdAndUpdate({ _id: hiking_Id }, { $push: { places: req.body.places } }).exec((err, hiking) => {
        const response = { status: process.env.HTTP_STATUS_OK, message: "Place created successfully" };

        if (err) {
            console.log("Error finding hiking");
            response.status = process.env.HTTP_STATUS_INTERNAL_ERROR;
            response.message = "Error finding hiking";

        }
        else if (!hiking) {
            console.log("Error finding hiking");
            response.status = process.env.HTTP_STATUS_NOT_FOUND;
            response.message = "hiking cannot found";
        }

        res.status(res.statusCode).json(response.message);

    });
}

const deleteOne = function (req, res) {
    console.log("delete place controller");
    const { hiking_Id, place_Id } = req.params;
    Hiking.updateOne({ _id: hiking_Id }, { $pull: { places: { _id: place_Id } } }).exec((err, data) => {
        const response = { status: process.env.HTTP_STATUS_NO_CONTENT, message: "Place deleted successfully" };
        if (err) {
            console.log();
            response.status = process.env.HTTP_STATUS_INTERNAL_ERROR;
            response.message = "Error deleting place";
        }
        res.status(response.status).json(response.message);

    });
}
const fullUpdatePlace = (req, res) => {
    console.log("update place controller");
    const { hiking_Id } = req.params;
    const { place_Id } = req.params;
    Hiking.updateOne({ _id: hiking_Id, "places._id": place_Id },
        { $set: { "places.$.name": req.body.name , "places.$.country": req.body.country } }).exec((err, hiking) => {
            console.log(hiking);
            const response = { status: process.env.HTTP_STATUS_OK, message: "Place updated successfully!" }
            if (err) {
                console.log(err);
                response.status = process.env.HTTP_STATUS_INTERNAL_ERROR;
                response.message = "Error updating place"
            }

            res.status(response.status).json(response.message);
        })
}

const partialUpdatePlace = (req, res) => {
    console.log("update place controller");
    const { hiking_Id } = req.params;
    const { place_Id } = req.params;
    Hiking.updateOne({ _id: hiking_Id, "places._id": place_Id },
        { $set: { "places.$.name": req.body.name , "places.$.country": req.body.country } }).exec((err, hiking) => {
            console.log(hiking);
            const response = { status: process.env.HTTP_STATUS_OK, message: "Place updated successfully!" }
            if (err) {
                console.log(err);
                response.status = process.env.HTTP_STATUS_INTERNAL_ERROR;
                response.message = "Error updating place"
            }

            res.status(response.status).json(response.message);
        })
}




module.exports = {
    getAll,
    getOne,
    addOne,
    deleteOne,
    fullUpdatePlace,
    partialUpdatePlace

}