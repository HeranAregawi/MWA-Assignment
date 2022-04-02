
const mongoose = require("mongoose");
const Student = mongoose.model(process.env.STUDENT_MODEL);
//const Student = require('../data/students-model')
const getAll = function (req, res) {
    console.log("GET all student controller called");

    // let offset = 0;
    // let count = 0;
    // if (req.query && req.query.offset) {
    //     offset = parseInt(req.query.offset);
    // }
    // if (req.query && req.query.count) {
    //     count = parseInt(req.query.count);
    // }
    
    Student.find().exec(function (err, students) {
        console.log("Student Found", students.length);
        res.status(200).json(students);
    })
}
const getOne = function (req, res) {
    const student_Id = req.params.student_Id;
    Student.findById(student_Id).exec(function (err, student) {
        console.log("Student Found");
        res.status(200).json(student);
    });
}



module.exports = {
    getOne,
    getAll
}












