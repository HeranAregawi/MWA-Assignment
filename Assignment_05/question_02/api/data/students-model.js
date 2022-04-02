const mongoose = require("mongoose");
const courceSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    country: String,
    established: Number
});
const studentSchema = mongoose.Schema({

    name: {
        type: String,
        required: true
    },

    gpa: {
        type: Number,
        min: 2,
        max: 4,

    },

    courses: [courceSchema],

});


mongoose.model(process.env.STUDENT_MODEL, studentSchema, process.env.STUDENT_COLLECTION);

