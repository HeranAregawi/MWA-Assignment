const mongoose = require("mongoose");

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
    designers: [Number],
    reviews: [Number]
});


mongoose.model(process.env.GAME_MODEL, GameSchema, process.env.GAME_COLLECTION);

//mongoose.model("Game", GameSchema);