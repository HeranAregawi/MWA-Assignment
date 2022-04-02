const mongoose = require("mongoose");
const publisherSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    country: {
        type: String,
        required: true
    },

    established: Number
});
const ReviewSchema = mongoose.Schema({
    title: {
        type: String,
        require: true
    },
    rating: {
        type: Number,
        min: 1,
        max: 5,
        requied: true
    },
    review: {
        type: String,
        required: true,
    },
    postDate: {
        type: Date,
        "default": Date.now
    },
});

const GameSchema = mongoose.Schema({

    title: {
        type: String,
        required: true
    },
    year: Number,
    rate: {
        type: Number,
        min: 1,
        max: 5,
        default: 1
    },
    price: Number,
    minPlayers: {
        type: Number,
        min: 1,
        max: 10
    },
    maxPlayers: {
        type: Number,
        min: 1,
        max: 10
    },
    minAge: Number,
    publisher: [publisherSchema],
    designers: [Number],
    reviews: [ReviewSchema]
});


mongoose.model(process.env.GAME_MODEL, GameSchema, process.env.GAME_COLLECTION);

//mongoose.model("Game", GameSchema);