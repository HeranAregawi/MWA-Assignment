const mongoose = require("mongoose");
const Hiking = mongoose.model(process.env.HIKING_MODEL);
const response = {
    status: process.env.HTTP_STATUS_OK,
    message: process.env.DEFAULT_MESSAGE

}

const getAll = function (req, res) {

    let offset = 0;
    let count = 0;
    const maxCount = 6;
    const response = {
        status: process.env.HTTP_STATUS_OK,
        message: {}
    }
    if (req.query && req.query.offset) {
        offset = parseInt(req.query.offset, 10);
    }
    if (req.query && req.query.count) {
        count = parseInt(req.query.count, 10);
    }
    if (isNaN(offset) || isNaN(count)) {
        console.log("NaN value entered");
        res.status(process.env.HTTP_STATUS_BAD_REQUEST).json({ message: "QueryString offset and count shold be numbers" });
        return;
    }
    if (count > maxCount || offset > maxCount) {
        res.status(process.env.HTTP_STATUS_BAD_REQUEST).json({ message: "Count and offsee cannot exceed " + maxCount });
        return;
    }


    Hiking.find().skip(offset).limit(count).exec(function (err, hiking) {
        if (err) {
            console.log("Error finding hiking");
            response.status = process.env.HTTP_STATUS_INTERNAL_ERROR;
            response.message = "Error finding hiking "

        } else {
            console.log("hikings Found!");
            response.status = 200;
            response.message = hiking;

        }
        res.status(response.status).json(response.message);
    })
}
const getOne = function (req, res) {
    console.log("Get one hiking controller");
    const hiking_Id = req.params.hiking_Id;
    Hiking.findById(hiking_Id).exec(function (err, hiking) {

        if (err) {
            console.log("Error finding hiking");
            response.status = process.env.HTTP_STATUS_INTERNAL_ERROR;
            response.message = "Error finding hiking";
        } else if (!hiking) {
            console.log("hiking ID not found");
            response.status = process.env.HTTP_STATUS_NOT_FOUND;
            response.message = "hiking ID not found";
        }
        else {
            console.log("hiking Found");
            response.status = 200;
            response.message = hiking;
        }
        res.status(response.status).json(response.message);

    });
}
const addOne = function (req, res) {
    console.log("Hiking AddOne request");
    const newHiking = {
        typeOfPlace: req.body.typeOfPlace,
        place: req.body.place,
        rating: parseInt(req.body.rating),
        feedback: req.body.feedback

    };
    Hiking.create(newHiking, function (err, hiking) {
        const response = { status: process.env.HTTP_STATUS_CREATED, message: "hiking created successfully" }
        if (err) {
            console.log("Error creating hiking");
            response.status = process.env.HTTP_STATUS_INTERNAL_ERROR;
            response.message = "Error creating hiking";
        }
        res.status(response.status).json(response.message);
    })
}
const deleteOne = function (req, res) {
    console.log(req.params.hiking_Id);
    const { hiking_Id } = req.params;
    Hiking.findByIdAndDelete(hiking_Id).exec(function (err, deletedhiking) {
        const response = { status: process.env.HTTP_STATUS_NO_CONTENT, message: "Hiking deleted Successfully!" };
        if (err) {
            console.log("Error finding hiking");
            response.status = process.env.HTTP_STATUS_INTERNAL_ERROR;
            response.message = "Error finding hiking";
        } else if (!deletedhiking) {
            console.log("hiking ID not found");
            response.status = process.env.HTTP_STATUS_NOT_FOUND
            response.message = { message: "Hiking Id not found" };
        }
        res.status(response.status).json(response.message);

    })
}
const updateRating = function (req, res) {
    console.log("update rating controller");
    const { hiking_Id } = req.params;
    Hiking.findByIdAndUpdate({ _id: hiking_Id }, { $set: { rating: req.body.rating } }).exec((err, hiking) => {
        const response = { status: 200, message: "Rating updated successfully" };
        if (err) {
            console.log(err);
            response.status = process.env.HTTP_STATUS_INTERNAL_ERROR;
            response.message = "Error updating rating";
        }
        else if (!hiking) {
            console.log(err);
            response.status = process.env.HTTP_STATUS_NOT_FOUND;
            response.message = "hiking not found";
        }

        res.status(response.status).json(response.message);
    });
}




module.exports = {
    getAll,
    getOne,
    addOne,
    deleteOne,
    updateRating,
   

}