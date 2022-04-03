const mongoose = require("mongoose");
const placeSchema = mongoose.Schema({
    name:{
        type: String,
        required : true
    },
    country:{
        type: String,
        required: true
    }
})

const hikingSchema = mongoose.Schema({
    typeOfPlace:{
        type: String,
        required : true
    },
    place: [placeSchema],
    rating: {
        type: Number,
        required: true
    },
    feedback : String
})


mongoose.model(process.env.HIKING_MODEL, hikingSchema, process.env.HIKING_COLLECTION);