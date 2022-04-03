const mongoose = require("mongoose");
const Hiking = mongoose.model(process.env.HIKING_MODEL);
let response = {
    status: 200,
    message: {}
}

const getAll = function (req, res) {
    console.log("Get All Place controller");
    const hiking_Id = req.params.hiking_Id;

    Hiking.findById(hiking_Id).select("place").exec(function (err, hikingPlaces) {
        if (err) {
            response.status = 500;
            response.message = "Error finding hiking"
        } else if (!hikingPlaces) {
            response.status = 400;
            response.message = "Hiking ID can not found";
        }
        else {
            response.status = 200;
            response.message = hikingPlaces;
        }
        res.status(response.status).json(response.message);
    })
}
const getOne = function (req, res) {
    const { place_Id } = req.params;
    const { hiking_Id } = req.params;
    Hiking.findById(hiking_Id).select("place").exec(function (err, hikingPlace) {
        const response = { status: 200, message: hikingPlace.place.id(place_Id) };
        if (err) {
            console.log("Error finding hiking ");
            response.status = 500;
            response.message = "Error finding hiking";

        } else if (!hikingPlace) {
            console.log("Hiking notfound");
            response.status = 404;
            response.message = "Hiking ID not found";
        }

        res.status(response.status).json(response.message);
    })


}

const addOne = function (req, res) {
    const { hiking_Id } = req.params;

    Hiking.findByIdAndUpdate({ _id: hiking_Id }, { $push: { place: req.body.place } }).exec((err, hiking) => {
        const response = { status: 200, message: "Place created successfully" };

        if (err) {
            console.log("Error finding hiking");
            response.status = 500;
            response.message = "Error finding hiking";

        }
        else if (!hiking) {
            console.log("Error finding hiking");
            response.status = 404;
            response.message = "hiking cannot found";
        }

        res.status(res.statusCode).json(response.message);

    });
}

const deleteOne = function (req, res) {
    console.log("delete place controller");
    const { hiking_Id, place_Id } = req.params;
    Hiking.updateOne({ _id: hiking_Id }, { $pull: { place: { _id: place_Id } } }).exec((err, data) => {
        const response = { status: 204, message: "Place deleted successfully" };
        if (err) {
            console.log();
            response.status = 500;
            response.message = "Error deleting place";
        }
        res.status(response.status).json(response.message);

    });
}

const updatePlace = (req, res) => {
    console.log("update place controller");
    const { hiking_Id } = req.params;
    const { place_Id } = req.params;
    Hiking.updateOne({ _id: hiking_Id, "place._id": place_Id },
        { $set: { "place.$.name": req.body.name } }).exec((err, hiking) => {
            console.log(hiking);
            const response = { status: 200, message: "Place updated successfully!" }
            if (err) {
                console.log(err);
                response.status = 500;
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
    updatePlace

}