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
        places: req.body.places,
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
const fullUpdateOne = function (req, res) {
    console.log("fullUpdate hiking controller");
    _updateOne(req, res, _replaceOneCallback);


}
const partialUpdate = function (req, res) {
    console.log("partialUpdate hiking controller");
    _updateOne(req, res, _partialUpdateCallback)
}
const _updateOne = function (req, res, replaceHikingCallback) {
    console.log(" _updateOne controller");
    const { hiking_Id } = req.params;
    isValid = mongoose.isValidObjectId(hiking_Id);
    if (isValid) {
        Hiking.findById(hiking_Id).exec(function (err, hiking) {
            const response = { status: process.env.HTTP_STATUS_NO_CONTENT, message: hiking };

             if (!hiking) {
                console.log("Hiking with this Id not found");
                response.status = process.env.HTTP_STATUS_NOT_FOUND;
                response.message = { message: "Hiking Id not found" }
            } if (response.status !== process.env.HTTP_STATUS_NO_CONTENT) {
                res.status(response.status).json(response.message);
            }
            replaceHikingCallback(req, res, hiking);

        })
    } else {
        console.log("Please insert Valid hiking ID");
        res.status(response.status).json("please insert valid hiking ID")
    }
}


const _replaceOneCallback = function (req, res, hiking) {
    hiking.typeOfPlace = req.body.typeOfPlace;
    hiking.places = req.body.places;
    hiking.rating = parseInt(req.body.rating);
    hiking.feedback = req.body.feedback;
    hiking.save(function (err, replacedHiking) {
        console.log(replacedHiking);
        const response = { status: process.env.HTTP_STATUS_NO_CONTENT, message: replacedHiking };
        if (err) {
            response.status = process.env.HTTP_STATUS_INTERNAL_ERROR;
            response.message = "Error saving hiking"
        }
        res.status(response.status).json(response.message);
    });
}
const _partialUpdateCallback = function(req, res, hiking){
    hiking.typeOfPlace = req.body.typeOfPlace || hiking.typeOfPlace;
    hiking.places = req.body.places || hiking.places;
    hiking.rating = parseInt(req.body.rating || hiking.rating);
    hiking.feedback = req.body.feedback || hiking.feedback;
    hiking.save(function (err, replacedHiking){
        const response = { status: process.env.HTTP_STATUS_NO_CONTENT , message: replacedHiking};
        if(err){
            console.log("Error saving hiking partial updates");
            res.status = response.status.process.env.HTTP_STATUS_INTERNAL_ERROR;
            res.message = "Error saving hiking partial updates";
        }
        res.status(response.status).json(response.message);
        
    }
    )};





// console.log("update rating controller");
// const { hiking_Id } = req.params;
// Hiking.findByIdAndUpdate({ _id: hiking_Id }, { $set: { typeOfPlace: req.body.typeOfPlace, places: req.body.places, rating: req.body.rating, feedback: req.body.feedback } }).exec((err, hiking) => {
//     const response = { status: 200, message: "Hiking updated successfully" };
//     if (err) {
//         console.log(err);
//         response.status = process.env.HTTP_STATUS_INTERNAL_ERROR;
//         response.message = "Error updating Hiking";
//     }
//     else if (!hiking) {
//         console.log(err);
//         response.status = process.env.HTTP_STATUS_NOT_FOUND;
//         response.message = "hiking not found";
//     }

//     res.status(response.status).json(response.message);
// });
//}

module.exports = {
    getAll,
    getOne,
    addOne,
    deleteOne,
    fullUpdateOne,
    partialUpdate


}